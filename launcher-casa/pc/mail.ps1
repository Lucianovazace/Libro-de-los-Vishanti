# Skill "mail" de MIA: lee (SOLO lectura) los mails sin leer de Gmail por IMAP. Solo Luciano.
# Configuracion: datos\mail-config.json  {"usuario":"tucuenta@gmail.com","clave":"contrasena de aplicacion de 16 letras","soloPrincipal":true}
# La contrasena de aplicacion la crea Luciano en su cuenta de Google (no es su clave normal). MIA usa EXAMINE + BODY.PEEK:
# no marca nada como leido, no borra, no manda. Se carga desde cerebro.ps1 (dot-source). Usa Norm, $data y $utf8.
$mailF = Join-Path $data "mail-config.json"
function Mail-Say([string]$t) { return @{ ok = $true; action = "say"; reply = $t; display = $t } }
function Mail-Cfg {
  if (-not (Test-Path $mailF)) { return $null }
  try { $c = [System.IO.File]::ReadAllText($mailF, $utf8) | ConvertFrom-Json; if ($c.usuario -and $c.clave) { return $c } } catch { }
  return $null
}
function Mail-DecodeWord([string]$s) {
  $rx = '=\?([^?]+)\?([bBqQ])\?([^?]*)\?='
  $s = [regex]::Replace($s, '(\?=)\s+(=\?)', '$1$2')
  return [regex]::Replace($s, $rx, {
    param($m)
    try {
      $enc = [System.Text.Encoding]::GetEncoding($m.Groups[1].Value)
      if ($m.Groups[2].Value -match "[bB]") { return $enc.GetString([Convert]::FromBase64String($m.Groups[3].Value)) }
      $q = $m.Groups[3].Value.Replace("_", " ")
      $bytes = New-Object System.Collections.Generic.List[byte]
      for ($i = 0; $i -lt $q.Length; $i++) { if ($q[$i] -eq "=" -and $i + 2 -lt $q.Length + 0 -and $q.Substring($i + 1, 2) -match "^[0-9A-Fa-f]{2}$") { $bytes.Add([Convert]::ToByte($q.Substring($i + 1, 2), 16)); $i += 2 } else { $bytes.Add([byte][char]$q[$i]) } }
      return $enc.GetString($bytes.ToArray())
    } catch { return $m.Value }
  })
}
# Convierte las lineas de respuesta de FETCH en objetos {de, asunto, fecha}
function Mail-ParseHeaders([string[]]$lines) {
  $out = @(); $cur = $null; $campo = ""
  foreach ($l in $lines) {
    if ($l -match '^\* \d+ FETCH') { if ($cur) { $out += $cur }; $cur = @{ de = ""; asunto = ""; fecha = "" }; $campo = ""; continue }
    if (-not $cur) { continue }
    if ($l -match '^\s+\S' -and $campo) { $cur[$campo] += " " + $l.Trim(); continue }
    if ($l -match '^(From|Subject|Date):\s*(.*)$') { $campo = @{ From = "de"; Subject = "asunto"; Date = "fecha" }[$Matches[1]]; $cur[$campo] = $Matches[2].Trim(); continue }
    $campo = ""
  }
  if ($cur) { $out += $cur }
  foreach ($o in $out) {
    $o.asunto = (Mail-DecodeWord $o.asunto).Trim(); if (-not $o.asunto) { $o.asunto = "(sin asunto)" }
    $d = Mail-DecodeWord $o.de
    $m = [regex]::Match($d, '^\s*"?([^"<]+?)"?\s*<'); if ($m.Success) { $d = $m.Groups[1].Value.Trim() } else { $d = ($d -replace '[<>]', '').Trim() }
    $o.de = $d
  }
  return $out
}
function Mail-Leer([int]$max = 5) {
  $c = Mail-Cfg; if (-not $c) { throw "sin-config" }
  $tcp = New-Object System.Net.Sockets.TcpClient; $tcp.ReceiveTimeout = 15000; $tcp.SendTimeout = 15000
  $tcp.Connect("imap.gmail.com", 993)
  $ssl = New-Object System.Net.Security.SslStream($tcp.GetStream(), $false); $ssl.AuthenticateAsClient("imap.gmail.com")
  $rd = New-Object System.IO.StreamReader($ssl, [System.Text.Encoding]::UTF8); $wr = New-Object System.IO.StreamWriter($ssl, (New-Object System.Text.UTF8Encoding($false))); $wr.NewLine = "`r`n"; $wr.AutoFlush = $true
  $null = $rd.ReadLine()
  $n = 0
  function Cmd([string]$t) { $script:n++; $tag = "A$($script:n)"; $wr.WriteLine("$tag $t"); $r = @(); while ($true) { $l = $rd.ReadLine(); if ($null -eq $l) { break }; if ($l.StartsWith("$tag ")) { $r += $l; break }; $r += $l }; return $r }
  try {
    $clave = ([string]$c.clave) -replace "\s", ""
    $r = Cmd ('LOGIN "' + ([string]$c.usuario).Replace('"', '') + '" "' + $clave.Replace('\', '\\').Replace('"', '\"') + '"')
    if ($r[-1] -notmatch " OK ") { throw "login" }
    $null = Cmd "EXAMINE INBOX"
    $crit = "UNSEEN"; if ($c.soloPrincipal -ne $false) { $crit = 'X-GM-RAW "is:unread category:primary"' }
    $s = Cmd "SEARCH $crit"
    $ids = @(); foreach ($l in $s) { if ($l -match '^\* SEARCH\s*(.*)$') { $ids = @($Matches[1].Trim() -split "\s+" | Where-Object { $_ }) } }
    $total = $ids.Count
    $ult = @($ids | Select-Object -Last $max)
    $mails = @()
    if ($ult.Count -gt 0) { $f = Cmd ("FETCH " + ($ult -join ",") + " (BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE)])"); $mails = @(Mail-ParseHeaders $f); [array]::Reverse($mails) }
    $null = Cmd "LOGOUT"
    return @{ total = $total; mails = $mails }
  } finally { try { $tcp.Close() } catch { } }
}
function Mail-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  if ($n -notmatch "\b(mails?|correos?|emails?|gmail|e mails?)\b") { return $null }
  if ($n -notmatch "(tengo|hay|nuevos?|sin leer|leeme|lee|dime|decime|revisa|mira|chequea|que )") { return $null }
  if ($speaker -and $speaker -ne "Luciano") { return (Mail-Say "El correo es privado: solo Luciano lo puede consultar.") }
  if (-not (Mail-Cfg)) { return (Mail-Say "Todavía no tengo configurado su correo. Falta crear el archivo mail-config.json en la carpeta de datos.") }
  try { $r = Mail-Leer 5 } catch {
    if ($_.Exception.Message -eq "login") { return (Mail-Say "Gmail rechazó el usuario o la contraseña de aplicación. Revise el archivo mail-config.json.") }
    return (Mail-Say "No pude conectarme a Gmail. Revise que la PC tenga internet.")
  }
  if ($r.total -eq 0) { return (Mail-Say "No tiene mails nuevos en la bandeja principal.") }
  $p = @(); foreach ($m in $r.mails) { $p += ("de " + $m.de + ": " + $m.asunto) }
  $head = "Tiene " + $r.total + " mail" + $(if ($r.total -ne 1) { "s" }) + " sin leer"
  if ($r.total -gt $r.mails.Count) { $head += ". Los últimos " + $r.mails.Count + " son" } else { $head += ":" }
  return (Mail-Say ($head + " " + ($p -join ". ") + "."))
}
