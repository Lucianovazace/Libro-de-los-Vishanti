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

# ---- Cuerpo del mail (MIME simple: multipart, quoted-printable, base64, html a texto) ----
function Mail-Bytes([string]$s, [string]$enc, [string]$charset) {
  $e = [System.Text.Encoding]::UTF8; try { if ($charset) { $e = [System.Text.Encoding]::GetEncoding($charset) } } catch { }
  $enc = $enc.Trim().ToLower()
  try {
    if ($enc -eq "base64") { return $e.GetString([Convert]::FromBase64String(($s -replace "\s", ""))) }
    if ($enc -eq "quoted-printable") {
      $t = ($s -replace "=\r?\n", "")
      $bytes = New-Object System.Collections.Generic.List[byte]
      for ($i = 0; $i -lt $t.Length; $i++) {
        if ($t[$i] -eq "=" -and $i + 2 -lt $t.Length + 0 -and $t.Substring($i + 1, 2) -match "^[0-9A-Fa-f]{2}$") { $bytes.Add([Convert]::ToByte($t.Substring($i + 1, 2), 16)); $i += 2 }
        else { foreach ($b in [System.Text.Encoding]::UTF8.GetBytes([string]$t[$i])) { $bytes.Add($b) } }
      }
      return $e.GetString($bytes.ToArray())
    }
  } catch { }
  return $s
}
function Mail-HtmlATexto([string]$h) {
  $h = [regex]::Replace($h, "(?is)<(style|script|head)[^>]*>.*?</\1>", " ")
  $h = [regex]::Replace($h, "(?i)<\s*(br|/p|/div|/tr|/li|/h\d)[^>]*>", " ")
  $h = [regex]::Replace($h, "<[^>]+>", " ")
  return [System.Net.WebUtility]::HtmlDecode($h)
}
function Mail-Hdr([string]$hdrs, [string]$nombre) {
  $m = [regex]::Match(($hdrs -replace "\r?\n[ \t]+", " "), "(?im)^" + $nombre + ":\s*(.*)$")
  if ($m.Success) { return $m.Groups[1].Value.Trim() }; return ""
}
# Devuelve @{ tipo = "plain"|"html"; texto = ... } o $null
function Mail-Parte([string]$raw, [int]$prof = 0) {
  $raw = $raw -replace "\r\n", "`n"
  $i = $raw.IndexOf("`n`n"); if ($i -lt 0) { return $null }
  $h = $raw.Substring(0, $i); $b = $raw.Substring($i + 2)
  $ct = Mail-Hdr $h "Content-Type"; $cte = Mail-Hdr $h "Content-Transfer-Encoding"
  $cs = ""; $mc = [regex]::Match($ct, "(?i)charset=""?([\w\-]+)"); if ($mc.Success) { $cs = $mc.Groups[1].Value }
  if ($ct -match "(?i)multipart/" -and $prof -lt 4) {
    $mb = [regex]::Match($ct, "(?i)boundary=""?([^"";\s]+)"); if (-not $mb.Success) { return $null }
    $bd = [regex]::Escape("--" + $mb.Groups[1].Value)
    $plain = $null; $html = $null
    foreach ($pt in ($b -split ("(?m)^" + $bd + "(?:--)?\s*$"))) {
      if ($pt.Trim().Length -eq 0) { continue }
      $r = Mail-Parte ($pt.TrimStart("`n")) ($prof + 1)
      if ($r) { if ($r.tipo -eq "plain" -and -not $plain) { $plain = $r } elseif ($r.tipo -eq "html" -and -not $html) { $html = $r } }
    }
    if ($plain) { return $plain }; return $html
  }
  if ($ct -and $ct -notmatch "(?i)^text/") { return $null }
  if ($h -match "(?im)^Content-Disposition:\s*attachment") { return $null }
  $t = Mail-Bytes $b $cte $cs
  if ($ct -match "(?i)text/html") { return @{ tipo = "html"; texto = (Mail-HtmlATexto $t) } }
  return @{ tipo = "plain"; texto = $t }
}
function Mail-Limpia([string]$t, [int]$max) {
  $t = [regex]::Replace($t, "https?://\S+", " ")
  $t = [regex]::Replace($t, "(?m)^>.*$", " ")
  $t = [regex]::Replace($t, "[​-‏­﻿͏]", "")
  $t = ($t -replace "\s+", " ").Trim()
  if ($t.Length -gt $max) { $c = $t.Substring(0, $max); $k = $c.LastIndexOfAny([char[]]@('.', '!', '?')); if ($k -gt $max * 0.5) { $c = $c.Substring(0, $k + 1) } else { $c = $c.TrimEnd() + "..." }; return $c }
  return $t
}
function Mail-Leer([int]$max = 5, [string]$raw = "", [bool]$cuerpo = $false) {
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
    if ($raw) { $crit = 'X-GM-RAW "' + $raw.Replace('\', '\\').Replace('"', '\"') + '"' }
    $s = Cmd "SEARCH $crit"
    $ids = @(); foreach ($l in $s) { if ($l -match '^\* SEARCH\s*(.*)$') { $ids = @($Matches[1].Trim() -split "\s+" | Where-Object { $_ }) } }
    $total = $ids.Count
    $ult = @($ids | Select-Object -Last $max)
    $mails = @()
    if ($ult.Count -gt 0) { $f = Cmd ("FETCH " + ($ult -join ",") + " (BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE)])"); $mails = @(Mail-ParseHeaders $f); [array]::Reverse($mails) }
    $txt = $null
    if ($cuerpo -and $ult.Count -gt 0) {
      $f2 = Cmd ("FETCH " + $ult[-1] + " (BODY.PEEK[]<0.80000>)")
      if ($f2.Count -gt 2) { $txt = Mail-Parte (($f2[1..($f2.Count - 3)]) -join "`n") }
    }
    $null = Cmd "LOGOUT"
    return @{ total = $total; mails = $mails; cuerpo = $txt }
  } finally { try { $tcp.Close() } catch { } }
}
function Mail-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  if ($n -notmatch "\b(mails?|correos?|emails?|gmail|e mails?)\b") { return $null }
  if ($n -notmatch "(tengo|hay|nuevos?|sin leer|leeme|lee|lees|dime|decime|revisa|mira|chequea|que |ultimo|mails? de|correos? de|emails? de)") { return $null }
  if ($speaker -and $speaker -ne "Luciano") { return (Mail-Say "El correo es privado: solo Luciano lo puede consultar.") }
  if (-not (Mail-Cfg)) { return (Mail-Say "Todavía no tengo configurado su correo. Falta crear el archivo mail-config.json en la carpeta de datos.") }
  # Filtro por remitente: "mails de mercado libre", "el ultimo mail de Shein", "mails nuevos de Google"
  $remit = $null
  $nn = ($n -replace "\s+(hoy|ayer|ahora)$", "").Trim()
  $mm = [regex]::Match($nn, "\b(?:de|desde)\s+([a-z0-9 ]+?)\s*$")
  if ($mm.Success) {
    $cand = $mm.Groups[1].Value.Trim()
    if ($cand -and $cand -notmatch "^(hoy|ayer|ahora|la|el|los|las|mi|mis|este|esta|esa|ese|aca|casa)\b") { $remit = $cand }
  }
  # Leer el contenido: "leeme el ultimo mail", "que dice el ultimo mail de Shein"
  if ($n -match "\b(lee|lees|leeme|leer|que dice|de que (?:trata|habla)|contenido|el texto|el cuerpo)\b" -and $n -match "\b(ultimo|ultima|mail|correo|email)\b") {
    $q = "in:inbox"; if ($remit) { $q = '(from:"' + $remit + '" OR from:' + ($remit -replace " ", "") + ')' }
    if ($n -match "sin leer|nuevos?\b") { $q += " is:unread" }
    try { $rr = Mail-Leer 1 $q $true } catch {
      if ($_.Exception.Message -eq "login") { return (Mail-Say "Gmail rechazó el usuario o la contraseña de aplicación. Revise el archivo mail-config.json.") }
      return (Mail-Say "No pude conectarme a Gmail. Revise que la PC tenga internet.")
    }
    if ($rr.total -eq 0 -or @($rr.mails).Count -eq 0) { return (Mail-Say ("No encontré ese mail" + $(if ($remit) { " de " + $remit }) + ".")) }
    $m = $rr.mails[0]
    $cab = "Mail de " + $m.de + ", asunto: " + $m.asunto + "."
    if (-not $rr.cuerpo -or -not $rr.cuerpo.texto) { return (Mail-Say ($cab + " No pude leer el texto, puede ser solo una imagen o un adjunto.")) }
    $voz = Mail-Limpia $rr.cuerpo.texto 450
    if (-not $voz) { return (Mail-Say ($cab + " El mail no tiene texto para leer.")) }
    $disp = Mail-Limpia $rr.cuerpo.texto 1500
    return @{ ok = $true; action = "say"; reply = ($cab + " Dice: " + $voz); display = ($cab + "`
" + $disp) }
  }
  if ($remit) {
    $q = '(from:"' + $remit + '" OR from:' + ($remit -replace " ", "") + ')'
    $soloNuevos = ($n -match "sin leer|nuevos?\b")
    if ($soloNuevos) { $q += " is:unread" }
    $uno = ($n -match "ultimo")
    $mx = 3; if ($uno) { $mx = 1 }
    try { $rr = Mail-Leer $mx $q } catch {
      if ($_.Exception.Message -eq "login") { return (Mail-Say "Gmail rechazó el usuario o la contraseña de aplicación. Revise el archivo mail-config.json.") }
      return (Mail-Say "No pude conectarme a Gmail. Revise que la PC tenga internet.")
    }
    if ($rr.total -eq 0) { return (Mail-Say ("No encontré mails" + $(if ($soloNuevos) { " sin leer" }) + " de " + $remit + ".")) }
    $items = @(); foreach ($m in $rr.mails) { $items += ($m.de + ": " + $m.asunto) }
    if ($uno) { return (Mail-Say ("El último mail de " + $remit + " es de " + $items[0] + ".")) }
    $h = "Encontré " + $rr.total + " mail" + $(if ($rr.total -ne 1) { "s" }) + " de " + $remit + ". Los más recientes: "
    return (Mail-Say ($h + ($items -join ". ") + "."))
  }
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
