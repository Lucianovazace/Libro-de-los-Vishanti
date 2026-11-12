# ============================================================
# MIA - Autotest (autotest.ps1)
# Con el cerebro abierto (iniciar-cerebro.bat), corre esto y te dice que funciona y que no:
#   powershell -NoProfile -ExecutionPolicy Bypass -File autotest.ps1
#   (o doble clic en autotest.bat). Opciones:  -Rapido  (salta lo que usa el modelo Qwen)
# Hace 3 cosas:
#   1) Revisa la SINTAXIS de todos los .ps1 de esta carpeta (errores de escritura).
#   2) Revisa que los archivos de datos (.json) se lean bien.
#   3) Le dice frases de ejemplo al cerebro (http://localhost:5003/mia) y mira si contesta lo esperado.
# El resultado completo queda en autotest-resultado.txt: mandamelo y lo arreglo de una.
# No borra ni cambia nada tuyo (solo agrega y saca la palabra "autotest" de la lista de compras).
# ============================================================
param([int]$Puerto = 5003, [switch]$Rapido)

$ErrorActionPreference = "Continue"
$aqui = Split-Path -Parent $MyInvocation.MyCommand.Path
$salida = Join-Path $aqui "autotest-resultado.txt"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$log = New-Object System.Collections.ArrayList
$cuenta = @{ PASA = 0; FALLA = 0; SALTA = 0 }

function Linea([string]$txt, [string]$color = "Gray") {
  Write-Host $txt -ForegroundColor $color
  [void]$log.Add($txt)
}

function Sin-Tildes([string]$s) {
  if (-not $s) { return "" }
  $d = $s.Normalize([Text.NormalizationForm]::FormD)
  $sb = New-Object Text.StringBuilder
  foreach ($c in $d.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($c) -ne [Globalization.UnicodeCategory]::NonSpacingMark) { [void]$sb.Append($c) }
  }
  return $sb.ToString().ToLower()
}

function Resultado([string]$estado, [string]$nombre, [string]$detalle) {
  $cuenta[$estado]++
  $color = "Green"; if ($estado -eq "FALLA") { $color = "Red" } elseif ($estado -eq "SALTA") { $color = "DarkYellow" }
  Linea ("[{0}] {1}  {2}" -f $estado.PadRight(5), $nombre, $detalle) $color
}

function Pedir([string]$texto, [string]$speaker = "Luciano", [int]$timeoutMs = 150000) {
  $url = "http://localhost:$Puerto/mia"
  $body = (@{ text = $texto; device = "autotest"; speaker = $speaker } | ConvertTo-Json -Compress)
  $req = [System.Net.HttpWebRequest]::Create($url)
  $req.Method = "POST"
  $req.ContentType = "application/json; charset=utf-8"
  $req.Timeout = $timeoutMs
  $req.ReadWriteTimeout = $timeoutMs
  $bytes = $utf8.GetBytes($body)
  $req.ContentLength = $bytes.Length
  $rs = $req.GetRequestStream(); $rs.Write($bytes, 0, $bytes.Length); $rs.Close()
  $resp = $req.GetResponse()
  $sr = New-Object System.IO.StreamReader($resp.GetResponseStream(), $utf8)
  $txt = $sr.ReadToEnd(); $sr.Close(); $resp.Close()
  return ($txt | ConvertFrom-Json)
}

Linea "=== Autotest de MIA - $(Get-Date -Format 'yyyy-MM-dd HH:mm') ===" "Cyan"
Linea "Carpeta: $aqui"
Linea "PowerShell: $($PSVersionTable.PSVersion)"

# ---------- 1) Sintaxis de los .ps1 ----------
Linea ""
Linea "--- 1) Sintaxis de los scripts ---" "Cyan"
foreach ($f in (Get-ChildItem $aqui -Filter *.ps1 | Sort-Object Name)) {
  $tokens = $null; $errores = $null
  try {
    [void][System.Management.Automation.Language.Parser]::ParseFile($f.FullName, [ref]$tokens, [ref]$errores)
    if ($errores -and $errores.Count -gt 0) {
      Resultado "FALLA" $f.Name ("{0} error(es)" -f $errores.Count)
      foreach ($e in ($errores | Select-Object -First 5)) { Linea ("      linea {0}: {1}" -f $e.Extent.StartLineNumber, $e.Message) "Red" }
    } else { Resultado "PASA" $f.Name "sintaxis ok" }
  } catch { Resultado "FALLA" $f.Name $_.Exception.Message }
}

# ---------- 2) Archivos de datos ----------
Linea ""
Linea "--- 2) Archivos de datos ---" "Cyan"
$datos = Join-Path $aqui "datos"
$obligatorios = @("objetos.json", "conocimiento.json")
foreach ($n in $obligatorios) {
  $p = Join-Path $datos $n
  if (-not (Test-Path $p)) { Resultado "FALLA" ("datos\" + $n) "no existe (copialo desde el repo)"; continue }
  try { [void](Get-Content $p -Raw -Encoding UTF8 | ConvertFrom-Json); Resultado "PASA" ("datos\" + $n) "se lee bien" }
  catch { Resultado "FALLA" ("datos\" + $n) ("no se pudo leer: " + $_.Exception.Message) }
}
$dirE = Join-Path $datos "estudio"
$temasConfig = @()
try { $temasConfig = @((Get-Content (Join-Path $datos "conocimiento.json") -Raw -Encoding UTF8 | ConvertFrom-Json).temas) } catch { }
$temasEnDisco = @{}
if (Test-Path $dirE) {
  foreach ($f in (Get-ChildItem $dirE -Filter *.json)) {
    try {
      $j = Get-Content $f.FullName -Raw -Encoding UTF8 | ConvertFrom-Json
      $temasEnDisco[[string]$j.tema] = $true
      $kb = [math]::Round($f.Length / 1024)
      $aviso = ""; if ($f.Length -gt 1800000) { $aviso = "  (OJO: pesa casi 2 MB, el limite de PowerShell 5.1)" }
      Resultado "PASA" ("datos\estudio\" + $f.Name) ("{0} fragmentos, {1} KB, tema '{2}'{3}" -f @($j.chunks).Count, $kb, [string]$j.tema, $aviso)
    } catch { Resultado "FALLA" ("datos\estudio\" + $f.Name) ("no se pudo leer: " + $_.Exception.Message) }
  }
} else { Resultado "FALLA" "datos\estudio" "la carpeta no existe" }
foreach ($t in $temasConfig) {
  if (-not $temasEnDisco.ContainsKey([string]$t.tema)) { Resultado "FALLA" ("tema " + [string]$t.tema) "esta en conocimiento.json pero falta su archivo en datos\estudio" }
}
$calCfg = Join-Path $datos "calendario-config.json"
if (Test-Path $calCfg) { Resultado "PASA" "datos\calendario-config.json" "existe (no muestro el enlace)" } else { Resultado "SALTA" "datos\calendario-config.json" "todavia no lo armaste (calendario de Google sin conectar)" }

# ---------- 3) El cerebro ----------
Linea ""
Linea "--- 3) El cerebro responde ---" "Cyan"
$vivo = $false
try {
  $r = [System.Net.HttpWebRequest]::Create("http://localhost:$Puerto/health"); $r.Timeout = 4000
  $resp = $r.GetResponse(); $resp.Close(); $vivo = $true
} catch { }
if (-not $vivo) {
  Resultado "FALLA" "cerebro" "no responde en el puerto $Puerto. Abri iniciar-cerebro.bat, espera a que diga 'listo' y volve a correr el autotest."
} else {
  Resultado "PASA" "cerebro" "responde en el puerto $Puerto"
  $hayEstudio = (Test-Path (Join-Path $dirE "analitica.json")) -or (Test-Path (Join-Path $dirE "carpeta2024.json"))
  $hayCal = Test-Path $calCfg

  # q = frase; esp = regex que debe aparecer (sin tildes, minusculas); no = regex que NO debe aparecer; llm = usa el modelo; req = condicion
  $pruebas = @(
    @{ n = "Hora";                  q = "qué hora es";                                   esp = "\d" },
    @{ n = "Clima";                 q = "cómo está el clima hoy";                        esp = "grados|temperatura|llov|clima|nubl|sol|despej|°"; red = $true },
    @{ n = "Objetos: donde";        q = "dónde están las pilas";                         esp = "pilas" },
    @{ n = "Objetos: cajon";        q = "qué hay en el cajón 2 de la cocina";            esp = "cajon|cocina|nada|no encuentro|no hay" },
    @{ n = "Futbol: Boca";          q = "cuándo juega Boca";                             esp = "boca"; red = $true },
    @{ n = "Futbol: Champions";     q = "fechas de la champions league";                 esp = "champions|liga de campeones"; red = $true },
    @{ n = "Boca historia";         q = "cuántas libertadores ganó Boca";                esp = "6|seis|libertadores"; no = "esta jugando|proximo partido"; llm = $true },
    @{ n = "Boca no pisa a futbol"; q = "cuándo juega Boca hoy";                         esp = "boca|partido|juega|no encontr|no hay"; no = "base:"; red = $true },
    @{ n = "Seleccion";             q = "cuántas copas del mundo ganó la Selección Argentina"; esp = "3|tres|1978|1986|2022"; llm = $true },
    @{ n = "Seleccion 2026";        q = "cómo le fue a Argentina en el Mundial 2026";    esp = "espana|final"; llm = $true },
    @{ n = "Real Madrid";           q = "cuántas champions tiene el Real Madrid";        esp = "15|quince"; llm = $true },
    @{ n = "Barcelona";             q = "quién es el presidente del Barcelona";          esp = "laporta"; llm = $true },
    @{ n = "Mar del Plata";         q = "quién fundó Mar del Plata";                     esp = "peralta"; llm = $true },
    @{ n = "Mar del Plata 2";       q = "qué es el Torreón del Monje";                   esp = "torreon|1904|mirador"; llm = $true },
    @{ n = "Conocimiento: no sabe"; q = "cuántos goles hizo Boca en el torneo de 1931";  esp = "no (lo )?tengo|no encuentro|no se|no puedo|todavia"; llm = $true },
    @{ n = "Calendario";            q = "qué tengo hoy en mi agenda";                    esp = "calendario|tenes|nada|conectado|ya no te queda|hoy" },
    @{ n = "Calendario (Mili)";     q = "qué tengo hoy en mi agenda"; speaker = "Mili";  esp = "privado" },
    @{ n = "Resumen del dia";       q = "resumen del día";                               esp = "hoy|buen"; red = $true },
    @{ n = "Lista: agregar";        q = "agregá autotest a la lista";                    esp = "autotest|lista"; q2 = "qué hay en la lista"; esp2 = "autotest"; q3 = "sacá autotest de la lista"; esp3 = "autotest|saque|quit|elimin|borr" },
    @{ n = "Repregunta";            q = "recordame pagar la luz";                        esp = "cuando|que dia|hora|a que"; q2 = "no"; esp2 = "bueno|listo|cancel|dale|ok|nada|de acuerdo" },
    @{ n = "Humano";                q = "Mia, ¿estás ahí?";                              esp = "aca|aqui|ahi|escucho|si|estoy|dime|decime" },
    @{ n = "Estudio";               q = "qué dice el material sobre la titulación";      esp = "titul|material|carpeta|analitica"; llm = $true; req = $hayEstudio },
    @{ n = "Modelo (charla libre)"; q = "contame un chiste corto";                       esp = "\w{6}"; llm = $true },
    @{ n = "Invitado"; q = "recordame comprar leche"; speaker = "invitado";              esp = "\w{4}" }
  )

  foreach ($p in $pruebas) {
    $spk = "Luciano"; if ($p.speaker) { $spk = [string]$p.speaker }
    if ($p.llm -and $Rapido) { Resultado "SALTA" $p.n "(modo -Rapido: usa el modelo)"; continue }
    if ($p.ContainsKey("req") -and -not $p.req) { Resultado "SALTA" $p.n "falta el material en datos\estudio"; continue }
    $pasos = @(@{ q = $p.q; esp = $p.esp; no = $p.no })
    if ($p.q2) { $pasos += @{ q = $p.q2; esp = $p.esp2; no = $null } }
    if ($p.q3) { $pasos += @{ q = $p.q3; esp = $p.esp3; no = $null } }
    $ok = $true; $detalle = ""; $ms = 0
    foreach ($s in $pasos) {
      try {
        $sw = [System.Diagnostics.Stopwatch]::StartNew()
        $res = Pedir $s.q $spk
        $sw.Stop(); $ms += $sw.ElapsedMilliseconds
        $txt = Sin-Tildes (([string]$res.reply) + " " + ([string]$res.display))
        $corta = ([string]$res.reply); if ($corta.Length -gt 110) { $corta = $corta.Substring(0, 110) + "..." }
        $detalle = "(" + $ms + " ms) " + $s.q + "  ->  " + $corta
        if (-not $txt.Trim()) { $ok = $false; $detalle += "  [respuesta vacia]"; break }
        if ($s.esp -and ($txt -notmatch $s.esp)) { $ok = $false; $detalle += "  [no aparece: " + $s.esp + "]"; break }
        if ($s.no -and ($txt -match $s.no)) { $ok = $false; $detalle += "  [aparece lo que NO debia: " + $s.no + "]"; break }
      } catch {
        $ok = $false; $detalle = $s.q + "  ->  ERROR: " + $_.Exception.Message; break
      }
    }
    if ($ok) { Resultado "PASA" $p.n $detalle }
    elseif ($p.red -and $detalle -match "no aparece|ERROR") { Resultado "FALLA" $p.n ($detalle + "   (necesita internet: ¿hay conexion?)") }
    else { Resultado "FALLA" $p.n $detalle }
  }
}

# ---------- Resumen ----------
Linea ""
Linea ("=== RESULTADO: {0} pasan, {1} fallan, {2} saltadas ===" -f $cuenta.PASA, $cuenta.FALLA, $cuenta.SALTA) "Cyan"
if ($cuenta.FALLA -eq 0) { Linea "Todo en orden." "Green" } else { Linea "Mandame el archivo autotest-resultado.txt (esta en esta misma carpeta) y lo corrijo." "Yellow" }
try { [System.IO.File]::WriteAllText($salida, ($log -join "`r`n"), (New-Object System.Text.UTF8Encoding($true))); Write-Host "Guardado en: $salida" } catch { Write-Host "No pude guardar el resultado: $($_.Exception.Message)" }
