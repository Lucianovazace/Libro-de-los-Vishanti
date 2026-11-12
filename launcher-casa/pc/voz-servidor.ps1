# Servidor de voz de MIA (Piper). Escucha en la red local, puerto 5002.
# Rutas esperadas, relativas a esta carpeta:  piper\piper.exe   y   voces\*.onnx
$ErrorActionPreference = "Continue"
$port = 5002
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
# Busca piper.exe y la voz (.onnx) en cualquier subcarpeta de esta carpeta
$piperFile = Get-ChildItem -Path $root -Recurse -Filter piper.exe -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $piperFile) { Write-Host "No encuentro piper.exe dentro de $root (ni en sus subcarpetas)"; Read-Host "Enter para cerrar"; exit 1 }
$piper = $piperFile.FullName
$voz = Get-ChildItem -Path $root -Recurse -Filter *.onnx -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $voz) { Write-Host "No encuentro ningun archivo .onnx dentro de $root (ni en sus subcarpetas)"; Read-Host "Enter para cerrar"; exit 1 }
Write-Host "Piper: $piper"
Write-Host "Voz:   $($voz.FullName)"

$tmp = Join-Path $root "tmp-voz"
New-Item -ItemType Directory -Force -Path $tmp | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding($false)
$ascii = [System.Text.Encoding]::ASCII

# ---- Piper persistente: el modelo se carga UNA vez y se reutiliza (mucho menos demora por frase) ----
# Si algo falla, se desactiva solo y se vuelve al modo de antes (un piper.exe por pedido).
$script:pp = $null
$script:ppOk = $true
$script:ppFalla = 0

function Stop-PiperPersist {
  if ($script:pp) { try { if (-not $script:pp.HasExited) { $script:pp.Kill() } } catch { } }
  $script:pp = $null
}

function Start-PiperPersist {
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = $piper
  $psi.Arguments = "--model `"$($voz.FullName)`" --json-input --output_dir `"$tmp`""
  $psi.WorkingDirectory = Split-Path $piper
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow = $true
  $psi.RedirectStandardInput = $true
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError = $true
  $script:pp = [System.Diagnostics.Process]::Start($psi)
  $script:pp.BeginErrorReadLine()   # descarta el log de piper para que no se trabe
}

# Devuelve $true si dejo el WAV en $outF
function Synth-Persist([string]$text, [string]$outF, [bool]$aprender = $false) {
  if (-not $script:ppOk) { return $false }
  try {
    if ((-not $script:pp) -or $script:pp.HasExited) { Start-PiperPersist }
    $json = (@{ text = $text; output_file = $outF } | ConvertTo-Json -Compress)
    $bytes = $utf8.GetBytes($json + "`n")
    $in = $script:pp.StandardInput.BaseStream
    $in.Write($bytes, 0, $bytes.Length); $in.Flush()
    $t = $script:pp.StandardOutput.ReadLineAsync()
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    $lastLen = -1; $stableSince = 0
    while ($true) {
      if ($t.IsCompleted) { break }
      if ($sw.ElapsedMilliseconds -gt 40000) { throw "piper no respondio en 40 s" }
      if ($aprender -and (Test-Path $outF)) {
        $len = (Get-Item $outF).Length
        if ($len -gt 100 -and $len -eq $lastLen) { if ($stableSince -eq 0) { $stableSince = $sw.ElapsedMilliseconds } elseif (($sw.ElapsedMilliseconds - $stableSince) -gt 1500) { throw "piper no avisa por stdout (modo no compatible)" } }
        else { $stableSince = 0 }
        $lastLen = $len
      }
      Start-Sleep -Milliseconds 20
    }
    $printed = [string]$t.Result
    if (-not (Test-Path $outF)) {
      $cand = $printed.Trim()
      if ($cand -and (Test-Path $cand)) { Move-Item $cand $outF -Force }
    }
    if ((Test-Path $outF) -and ((Get-Item $outF).Length -gt 100)) { $script:ppFalla = 0; return $true }
    throw "no aparecio el WAV"
  } catch {
    Write-Host ("Piper persistente: " + $_.Exception.Message)
    Stop-PiperPersist
    $script:ppFalla++
    if ($script:ppFalla -ge 2 -or $aprender) { $script:ppOk = $false; Write-Host "Piper persistente DESACTIVADO: vuelvo al modo de un piper.exe por frase." }
    return $false
  }
}

function Send-Response($stream, [int]$code, [string]$ctype, [byte[]]$body) {
  $status = "OK"
  if ($code -ne 200) { $status = "Error" }
  $head = "HTTP/1.1 $code $status`r`nContent-Type: $ctype`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
  $hb = $ascii.GetBytes($head)
  $stream.Write($hb, 0, $hb.Length)
  if ($body.Length -gt 0) { $stream.Write($body, 0, $body.Length) }
  $stream.Flush()
}

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
$listener.Start()
# Prueba inicial: si el modo persistente anda, las frases siguientes salen mucho mas rapido
$warmF = Join-Path $tmp "warm.wav"
$sw0 = [System.Diagnostics.Stopwatch]::StartNew()
if (Synth-Persist "Listo." $warmF $true) { Write-Host ("Piper persistente: SI (" + $sw0.ElapsedMilliseconds + " ms la primera vez)") } else { Write-Host "Piper persistente: NO (se usa el modo de siempre)" }
Remove-Item $warmF -ErrorAction SilentlyContinue
Write-Host "Voz de MIA lista. Voz: $($voz.Name) - puerto $port"
Write-Host "Deja esta ventana abierta. Para cerrar: Ctrl+C"

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $client.ReceiveTimeout = 10000
    $stream = $client.GetStream()
    $buf = New-Object byte[] 65536
    $ms = New-Object System.IO.MemoryStream
    $headerEnd = -1
    $txt = ""
    while ($headerEnd -lt 0) {
      $n = $stream.Read($buf, 0, $buf.Length)
      if ($n -le 0) { break }
      $ms.Write($buf, 0, $n)
      $txt = $ascii.GetString($ms.ToArray())
      $headerEnd = $txt.IndexOf("`r`n`r`n")
    }
    if ($headerEnd -lt 0) { Send-Response $stream 400 "text/plain" ($ascii.GetBytes("pedido incompleto")); continue }

    $headers = $txt.Substring(0, $headerEnd)
    $first = ($headers -split "`r`n")[0]
    $len = 0
    if ($headers -match "(?i)content-length:\s*(\d+)") { $len = [int]$Matches[1] }
    $bodyStart = $headerEnd + 4
    while (($ms.Length - $bodyStart) -lt $len) {
      $n = $stream.Read($buf, 0, $buf.Length)
      if ($n -le 0) { break }
      $ms.Write($buf, 0, $n)
    }
    $all = $ms.ToArray()
    $take = [Math]::Max(0, [Math]::Min($len, $all.Length - $bodyStart))
    $bodyBytes = New-Object byte[] $take
    if ($take -gt 0) { [Array]::Copy($all, $bodyStart, $bodyBytes, 0, $take) }

    if ($first -like "GET /health*") {
      Send-Response $stream 200 "text/plain" ($ascii.GetBytes("ok"))
    }
    elseif ($first -like "POST /tts*") {
      $text = $utf8.GetString($bodyBytes)
      $text = ($text -replace "\s+", " ").Trim()
      if ($text.Length -eq 0) {
        Send-Response $stream 400 "text/plain" ($ascii.GetBytes("sin texto"))
      }
      else {
        $id = [guid]::NewGuid().ToString("N")
        $inF = Join-Path $tmp "$id.txt"
        $outF = Join-Path $tmp "$id.wav"
        $errF = Join-Path $tmp "$id.err"
        [System.IO.File]::WriteAllText($inF, $text, $utf8)
        $sw = [System.Diagnostics.Stopwatch]::StartNew()
        $hecho = Synth-Persist $text $outF
        if (-not $hecho) {
          $args2 = @("--model", "`"$($voz.FullName)`"", "--output_file", "`"$outF`"")
          Start-Process -FilePath $piper -ArgumentList $args2 -WorkingDirectory (Split-Path $piper) -RedirectStandardInput $inF -RedirectStandardError $errF -WindowStyle Hidden -Wait | Out-Null
        }
        $sw.Stop()
        if (Test-Path $outF) {
          $wav = [System.IO.File]::ReadAllBytes($outF)
          Send-Response $stream 200 "audio/wav" $wav
          Write-Host ("[{0}] {1} caracteres, {2} ms {3}" -f (Get-Date -Format "HH:mm:ss"), $text.Length, $sw.ElapsedMilliseconds, $(if ($hecho) { "(persistente)" } else { "" }))
        }
        else {
          Send-Response $stream 500 "text/plain" ($ascii.GetBytes("piper no genero audio"))
          Write-Host "Piper no genero audio. Revisa: $errF"
        }
        Remove-Item $inF, $outF -ErrorAction SilentlyContinue
        if ((Test-Path $errF) -and ((Get-Item $errF).Length -eq 0)) { Remove-Item $errF -ErrorAction SilentlyContinue }
      }
    }
    else {
      Send-Response $stream 404 "text/plain" ($ascii.GetBytes("no encontrado"))
    }
  }
  catch {
    Write-Host ("Error: " + $_.Exception.Message)
  }
  finally {
    try { $client.Close() } catch { }
  }
}
