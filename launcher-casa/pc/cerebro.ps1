# Cerebro de MIA (PC). Un solo cerebro para el celu, la tablet y el reloj.
# Puerto 5003.  POST /mia  {"text":"...","device":"celu|tablet|reloj"}  ->  {"ok":true,"action":"say|alexa","reply":"...","display":"..."}
# Guarda todo en la carpeta "datos": perfil.txt, memoria.txt, alexa.json (se pueden editar con el Bloc de notas).
$ErrorActionPreference = "Continue"
try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch { }
$port = 5003
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$data = Join-Path $root "datos"
New-Item -ItemType Directory -Force -Path $data | Out-Null
$llm = $env:MIA_LLM; if (-not $llm) { $llm = "http://127.0.0.1:8080" }
$weatherBase = $env:MIA_WEATHER; if (-not $weatherBase) { $weatherBase = "https://api.open-meteo.com/v1/forecast" }
$utf8 = New-Object System.Text.UTF8Encoding($false)
$ascii = [System.Text.Encoding]::ASCII
$es = [Globalization.CultureInfo]::GetCultureInfo("es-AR")
$inv = [Globalization.CultureInfo]::InvariantCulture

$perfilF = Join-Path $data "perfil.txt"
$memF = Join-Path $data "memoria.txt"
$alexaF = Join-Path $data "alexa.json"
if (-not (Test-Path $perfilF)) {
  Write-Host "Falta datos\perfil.txt (el perfil de Luciano). Copialo desde la carpeta de MIA."
  Read-Host "Enter para cerrar"; exit 1
}
if (-not (Test-Path $memF)) { [System.IO.File]::WriteAllText($memF, "", $utf8) }
if (-not (Test-Path $alexaF)) {
  $def = '{"Modo cine":"modo cine","Modo testamentos":"modo testamentos","Alien":"modo alien","Navidad":"modo navidad","Luz normal":"luz normal"}'
  [System.IO.File]::WriteAllText($alexaF, $def, $utf8)
}

$script:history = New-Object System.Collections.ArrayList
$script:weatherError = ""

function Norm([string]$s) {
  $d = $s.ToLowerInvariant().Normalize([Text.NormalizationForm]::FormD)
  $sb = New-Object System.Text.StringBuilder
  foreach ($ch in $d.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($ch) -ne [Globalization.UnicodeCategory]::NonSpacingMark) { [void]$sb.Append($ch) }
  }
  $t = [regex]::Replace($sb.ToString(), "[^a-z0-9 ]", " ")
  return ([regex]::Replace($t, "\s+", " ")).Trim()
}

function R($x) { return [int][Math]::Round([double]$x, [MidpointRounding]::AwayFromZero) }

function Get-Text([string]$url, [string]$method, [string]$body, [int]$timeoutMs) {
  $req = [System.Net.HttpWebRequest]::Create($url)
  $req.Method = $method
  $req.Timeout = $timeoutMs
  $req.ReadWriteTimeout = $timeoutMs
  if ($method -eq "POST") {
    $req.ContentType = "application/json"
    $bytes = $utf8.GetBytes($body)
    $req.ContentLength = $bytes.Length
    $rs = $req.GetRequestStream(); $rs.Write($bytes, 0, $bytes.Length); $rs.Close()
  }
  $resp = $req.GetResponse()
  $sr = New-Object System.IO.StreamReader($resp.GetResponseStream(), $utf8)
  $txt = $sr.ReadToEnd()
  $sr.Close(); $resp.Close()
  return $txt
}

# ---------- Clima (Open-Meteo, sin clave) ----------

function Wmo([int]$c) {
  switch ($c) {
    0 { "despejado" }
    1 { "mayormente despejado" }
    2 { "parcialmente nublado" }
    3 { "nublado" }
    { $_ -in 45, 48 } { "con niebla" }
    { $_ -in 51, 53, 55 } { "con llovizna" }
    { $_ -in 56, 57 } { "con llovizna helada" }
    61 { "con lluvia débil" }
    63 { "con lluvia" }
    65 { "con lluvia fuerte" }
    { $_ -in 66, 67 } { "con lluvia helada" }
    { $_ -in 71, 73, 75, 77, 85, 86 } { "con nieve" }
    80 { "con chubascos leves" }
    81 { "con chubascos" }
    82 { "con chubascos fuertes" }
    95 { "con tormenta" }
    { $_ -in 96, 99 } { "con tormenta y granizo" }
    default { "sin datos del cielo" }
  }
}

function DayPart([int]$h) {
  if ($h -ge 6 -and $h -le 11) { return "a la mañana" }
  if ($h -ge 12 -and $h -le 17) { return "a la tarde" }
  return "a la noche"
}

function Is-Weather([string]$n) {
  $keys = @("clima", "pronostico", "va a llover", "llover", "llueve", "lluvia", "temperatura", "cuantos grados", "hace frio", "hace calor", "como esta el tiempo", "como va a estar el tiempo", "que tiempo hace", "tiempo hace", "viento", "paraguas")
  foreach ($k in $keys) { if ($n.Contains($k)) { return $true } }
  return $false
}

function Weather-Scope([string]$n) {
  if ($n.Contains("pasado manana")) { return 3 }
  if ($n.Contains("manana")) { return 2 }
  if ($n.Contains("hoy") -or $n.Contains("ahora") -or $n.Contains("esta noche") -or $n.Contains("esta tarde")) { return 1 }
  return 0
}

function Get-Weather([int]$scope, [bool]$wind) {
  $script:weatherError = ""
  try {
    $url = $weatherBase + "?latitude=-38.0055&longitude=-57.5426" +
      "&current=temperature_2m,weather_code,wind_speed_10m,wind_gusts_10m" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max" +
      "&hourly=temperature_2m,precipitation_probability" +
      "&forecast_days=3&timezone=America%2FArgentina%2FBuenos_Aires"
    $j = (Get-Text $url "GET" "" 10000) | ConvertFrom-Json
    $cur = $j.current; $d = $j.daily; $hr = $j.hourly
    $day = 0
    if ($scope -eq 2) { $day = 1 } elseif ($scope -eq 3) { $day = 2 }
    if (-not $d.temperature_2m_max -or $d.temperature_2m_max.Count -le $day) { $script:weatherError = "el servicio no mandó el pronóstico por día"; return $null }
    $nowH = (Get-Date).Hour
    $tmax = R $d.temperature_2m_max[$day]
    $tmin = R $d.temperature_2m_min[$day]
    $out = ""
    if ($day -eq 0) {
      $out = "Ahora hay $(R $cur.temperature_2m) grados, $(Wmo ([int]$cur.weather_code)). Hoy la máxima es de $tmax y la mínima de $tmin."
    } else {
      $lbl = "Mañana"; if ($day -eq 2) { $lbl = "Pasado mañana" }
      $out = "${lbl}: $(Wmo ([int]$d.weather_code[$day])), máxima de $tmax y mínima de $tmin."
    }
    # Lluvia: para hoy solo cuenta lo que falta del día
    $startH = 0; if ($day -eq 0) { $startH = $nowH }
    $rainP = 0
    $parts = New-Object System.Collections.ArrayList
    if ($hr.precipitation_probability) {
      for ($h = $startH; $h -le 23; $h++) {
        $p = [int]$hr.precipitation_probability[$day * 24 + $h]
        if ($p -gt $rainP) { $rainP = $p }
        if ($p -ge 40 -and $h -ge 6) { $nm = DayPart $h; if (-not $parts.Contains($nm)) { [void]$parts.Add($nm) } }
      }
    } else { $rainP = [int]$d.precipitation_probability_max[$day] }
    $whenS = ""; if ($parts.Count -gt 0) { $whenS = ", sobre todo " + ($parts -join " y ") }
    if ($rainP -ge 60) { $out += " Va a llover: $rainP% de probabilidad$whenS." }
    elseif ($rainP -ge 30) { $out += " Podría llover, $rainP% de probabilidad$whenS." }
    elseif ($rainP -ge 15) { $out += " Hay poca probabilidad de lluvia, $rainP%." }
    else { $out += " No se espera lluvia." }
    # Noche: temperatura a las 22 comparada con la máxima
    if ($hr.temperature_2m -and ($day -gt 0 -or $nowH -lt 21)) {
      $tn = R $hr.temperature_2m[$day * 24 + 22]
      $drop = $tmax - $tn
      if ($drop -ge 6) { $out += " A la noche refresca bastante: unos $tn grados a las 22." }
      elseif ($drop -ge 3) { $out += " A la noche refresca un poco, unos $tn grados." }
      else { $out += " A la noche se mantiene parecido, unos $tn grados." }
    }
    # Viento: solo si lo pidieron
    if ($wind) {
      if ($day -eq 0) { $out += " Viento de $(R $cur.wind_speed_10m) km/h con ráfagas de $(R $cur.wind_gusts_10m)." }
      else { $out += " Viento de hasta $(R $d.wind_speed_10m_max[$day]) km/h." }
    }
    return $out.Trim()
  } catch {
    $script:weatherError = $_.Exception.Message
    return $null
  }
}

# ---------- Modelo (llama-server) ----------

function Build-System([string]$device) {
  $perfil = [System.IO.File]::ReadAllText($perfilF, $utf8).Trim()
  $mem = [System.IO.File]::ReadAllText($memF, $utf8).Trim()
  $now = (Get-Date).ToString("dddd d 'de' MMMM 'de' yyyy, H:mm", $es)
  $oraciones = "máximo 3 oraciones cortas"
  $donde = "en voz alta"
  if ($device -eq "reloj") { $oraciones = "máximo 2 oraciones cortas"; $donde = "en voz alta desde un reloj" }
  $s = "/no_think Sos MIA (Mi Inteligencia Artificial), la asistente personal de Luciano. Hablás en español rioplatense (voseo). Tu estilo es sereno, elegante, eficiente y atento, con un humor seco y sutil de vez en cuando, nunca exagerado ni infantil. Anticipás lo que Luciano pueda necesitar. Ocasionalmente podés llamarlo `"señor`", sin abusar. " +
    "Tus respuestas se leen $donde`: $oraciones, sin listas, sin markdown, sin emojis. " +
    "Si no sabés algo o no lo tenés en lo que te contaron, decilo en vez de inventar. No inventes datos de Mar del Plata ni de dispositivos.`n`n" +
    "Lo que sabés de Luciano y su casa:`n" + $perfil
  if ($mem.Length -gt 0) { $s += "`n`nCosas que Luciano te pidió recordar:`n" + $mem }
  $s += "`n`nAhora es: " + $now + "."
  return $s
}

function Ask-Model([string]$said, [string]$device) {
  [void]$script:history.Add(@{ role = "user"; content = $said })
  while ($script:history.Count -gt 8) { $script:history.RemoveAt(0) }
  $msgs = New-Object System.Collections.ArrayList
  [void]$msgs.Add(@{ role = "system"; content = (Build-System $device) })
  foreach ($m in $script:history) { [void]$msgs.Add($m) }
  $body = @{ model = "local"; messages = $msgs; temperature = 0.6; max_tokens = 300; stream = $false } | ConvertTo-Json -Depth 6 -Compress
  try {
    $txt = Get-Text "$llm/v1/chat/completions" "POST" $body 120000
    $r = $txt | ConvertFrom-Json
    $c = [string]$r.choices[0].message.content
    $c = [regex]::Replace($c, "(?s)<think>.*?</think>", "")
    $c = ([regex]::Replace($c, '[*_#`]+', "")).Trim()
    if ($c.Length -eq 0) { $c = "No supe qué contestarte, probá de nuevo." }
    [void]$script:history.Add(@{ role = "assistant"; content = $c })
    return @{ ok = $true; action = "say"; reply = $c }
  } catch {
    if ($script:history.Count -gt 0) { $script:history.RemoveAt($script:history.Count - 1) }
    Write-Host ("Modelo: " + $_.Exception.Message)
    return @{ ok = $false; action = "say"; reply = "No pude hablar con el modelo. ¿Está abierta la ventana del modelo en la PC?" }
  }
}

# ---------- Decisión: qué hacer con lo que dijo Luciano ----------

function Decide([string]$said, [string]$device) {
  $n = Norm $said
  $t = $said.Trim()

  # 1) Órdenes de la casa (Alexa)
  $rules = @(
    @("Modo cine", @("modo cine"), "modo cine"),
    @("Modo testamentos", @("modo testamentos", "modo testamento"), "modo testamentos"),
    @("Alien", @("modo alien"), "modo alien"),
    @("Navidad", @("modo navidad"), "modo navidad"),
    @("Luz normal", @("luz normal"), "luz normal")
  )
  $custom = $null
  try { $custom = [System.IO.File]::ReadAllText($alexaF, $utf8) | ConvertFrom-Json } catch { }
  foreach ($r in $rules) {
    foreach ($trg in $r[1]) {
      if ($n.Contains($trg)) {
        $phrase = $r[2]
        if ($custom -and ($custom.PSObject.Properties.Name -contains $r[0])) { $phrase = [string]$custom.($r[0]) }
        if ($phrase.Trim().Length -eq 0) { return @{ ok = $true; action = "say"; reply = "Ese modo no tiene frase para Alexa configurada." } }
        return @{ ok = $true; action = "alexa"; reply = "Alexa, $phrase"; display = "→ Alexa: `"$phrase`"" }
      }
    }
  }

  # 2) Memoria: "acordate que ..."
  $m = [regex]::Match($t, "(?i)^\s*(?:mia[,\s]+)?(?:acordate|record[aá]|anot[aá]|guard[aá])(?:\s+que|\s+de)?\s+(.+)$")
  if ($m.Success) {
    $fact = $m.Groups[1].Value.Trim().TrimEnd([char[]]".")
    $old = [System.IO.File]::ReadAllText($memF, $utf8).TrimEnd()
    $new = $fact; if ($old.Length -gt 0) { $new = $old + "`n" + $fact }
    [System.IO.File]::WriteAllText($memF, $new, $utf8)
    return @{ ok = $true; action = "say"; reply = "Anotado: $fact." }
  }

  # 2b) Relevo a Alexa: "preguntale a Alexa ...", "decile a Alexa ..."
  $m = [regex]::Match($t, "(?i)^\s*(?:mia[,\s]+)?(?:preguntale|pregúntale|decile|dile|pedile)\s+a\s+alexa\s+(?:que\s+)?(.+)$")
  if ($m.Success) {
    $phrase = $m.Groups[1].Value.Trim().TrimEnd([char[]]".?!")
    return @{ ok = $true; action = "alexa"; reply = "Alexa, $phrase"; display = "→ Alexa: `"$phrase`"" }
  }

  # 3) Hora y fecha, sin IA
  if ($n.Contains("que hora es")) { return @{ ok = $true; action = "say"; reply = ("Son las " + (Get-Date).ToString("H:mm", $inv) + ".") } }
  if ($n.Contains("que dia es") -or $n.Contains("que fecha es")) { return @{ ok = $true; action = "say"; reply = ("Hoy es " + (Get-Date).ToString("dddd d 'de' MMMM", $es) + ".") } }

  # 4) Clima de Mar del Plata
  if (Is-Weather $n) {
    $wind = $n.Contains("viento") -or $n.Contains("ventoso") -or $n.Contains("rafaga")
    $sum = Get-Weather (Weather-Scope $n) $wind
    if ($sum) { return @{ ok = $true; action = "say"; reply = $sum } }
    return @{ ok = $false; action = "say"; reply = ("No pude consultar el pronóstico. " + $script:weatherError) }
  }

  # 5) Todo lo demás: el modelo
  return (Ask-Model $said $device)
}

# ---------- Servidor HTTP mínimo ----------

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
Write-Host "Cerebro de MIA listo - puerto $port"
Write-Host "Datos en: $data"
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
    elseif ($first -like "GET /memoria*") {
      Send-Response $stream 200 "text/plain; charset=utf-8" ($utf8.GetBytes([System.IO.File]::ReadAllText($memF, $utf8)))
    }
    elseif ($first -like "POST /mia*") {
      $req = $utf8.GetString($bodyBytes) | ConvertFrom-Json
      $said = ([string]$req.text).Trim()
      $device = [string]$req.device
      if ($said.Length -eq 0) {
        Send-Response $stream 400 "text/plain" ($ascii.GetBytes("sin texto"))
      } else {
        $sw = [System.Diagnostics.Stopwatch]::StartNew()
        $res = Decide $said $device
        $sw.Stop()
        $json = $res | ConvertTo-Json -Compress
        Send-Response $stream 200 "application/json; charset=utf-8" ($utf8.GetBytes($json))
        Write-Host ("[{0}] {1}: {2} -> {3} ({4} ms)" -f (Get-Date -Format "HH:mm:ss"), $device, $said, $res.action, $sw.ElapsedMilliseconds)
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
