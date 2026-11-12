# ============================================================
# MIA - Calendario de Google (calendario.ps1) - SOLO LECTURA
# Lee el enlace secreto en formato iCal (.ics) de tu Google Calendar (datos\calendario-config.json,
# que NO se sube al repo) y contesta: "que tengo hoy", "que tengo manana", "mi agenda de esta semana",
# "que tengo el viernes", "que tengo el 20 de noviembre", "cuando es mi proximo turno", "proximos eventos".
# Entiende eventos repetidos (diarios, semanales, mensuales, anuales), excepciones y eventos movidos.
# Solo responde a Luciano. Se carga desde cerebro.ps1 (dot-source). Usa Norm, Get-Text y $root del cerebro.
# ============================================================

$script:calCfgPath = Join-Path $root "datos\calendario-config.json"
$script:calCache = $null
$script:calCacheT = [datetime]::MinValue
$script:calEs = [Globalization.CultureInfo]::GetCultureInfo("es-AR")
$script:calDow = @{ SU = 0; MO = 1; TU = 2; WE = 3; TH = 4; FR = 5; SA = 6 }

function Cal-Configurados {
  if (-not (Test-Path $script:calCfgPath)) { return @() }
  $out = @()
  try {
    $j = Get-Content $script:calCfgPath -Raw -Encoding UTF8 | ConvertFrom-Json
    foreach ($c in @($j.calendarios)) { if ($c.url -and ([string]$c.url) -match '^https?://' -and ([string]$c.url) -notmatch 'TU_CORREO') { $out += $c } }
  } catch { Write-Host ("Calendario: no pude leer calendario-config.json: " + $_.Exception.Message) }
  return $out
}

function Cal-Unesc([string]$s) {
  if (-not $s) { return "" }
  $s = $s -replace '\\[nN]', ' '
  $s = $s -replace '\\,', ','
  $s = $s -replace '\\;', ';'
  $s = $s -replace '\\\\', '\'
  return $s.Trim()
}

# Fecha de una linea DTSTART/DTEND/EXDATE/RECURRENCE-ID/UNTIL. Devuelve @{ dt; allday } o $null.
# Las horas con Z (UTC) se pasan a la hora de la PC; las que traen zona o son locales se toman tal cual (Argentina no tiene horario de verano).
function Cal-Dt([string]$val) {
  $inv = [Globalization.CultureInfo]::InvariantCulture
  $v = $val.Trim()
  try {
    if ($v -match '^\d{8}$') { return @{ dt = [datetime]::ParseExact($v, "yyyyMMdd", $inv); allday = $true } }
    if ($v -match '^\d{8}T\d{6}Z$') {
      $u = [datetime]::ParseExact($v.TrimEnd('Z'), "yyyyMMdd'T'HHmmss", $inv)
      $u = [datetime]::SpecifyKind($u, [DateTimeKind]::Utc)
      return @{ dt = $u.ToLocalTime(); allday = $false }
    }
    if ($v -match '^\d{8}T\d{6}$') { return @{ dt = [datetime]::ParseExact($v, "yyyyMMdd'T'HHmmss", $inv); allday = $false } }
  } catch { }
  return $null
}

function Cal-Parse([string]$ics) {
  $txt = [regex]::Replace($ics, "\r?\n[ \t]", "")
  $evs = @()
  $cur = $null
  foreach ($raw in ($txt -split "\r?\n")) {
    $line = $raw.TrimEnd()
    if ($line -eq "BEGIN:VEVENT") { $cur = @{ ex = @(); rid = ""; uid = ""; titulo = ""; lugar = ""; status = ""; rrule = ""; allday = $false; start = $null; end = $null }; continue }
    if ($line -eq "END:VEVENT") { if ($cur -and $cur.start) { $evs += $cur }; $cur = $null; continue }
    if (-not $cur) { continue }
    $i = $line.IndexOf(":")
    if ($i -lt 1) { continue }
    $prop = $line.Substring(0, $i)
    $val = $line.Substring($i + 1)
    $name = ($prop -split ";")[0].ToUpper()
    if ($name -eq "SUMMARY") { $cur.titulo = Cal-Unesc $val }
    elseif ($name -eq "LOCATION") { $cur.lugar = Cal-Unesc $val }
    elseif ($name -eq "UID") { $cur.uid = $val.Trim() }
    elseif ($name -eq "STATUS") { $cur.status = $val.Trim().ToUpper() }
    elseif ($name -eq "RRULE") { $cur.rrule = $val.Trim() }
    elseif ($name -eq "DTSTART") { $d = Cal-Dt $val; if ($d) { $cur.start = $d.dt; $cur.allday = $d.allday } }
    elseif ($name -eq "DTEND") { $d = Cal-Dt $val; if ($d) { $cur.end = $d.dt } }
    elseif ($name -eq "EXDATE") { foreach ($x in ($val -split ",")) { $d = Cal-Dt $x; if ($d) { $cur.ex += $d.dt.ToString("yyyyMMdd") } } }
    elseif ($name -eq "RECURRENCE-ID") { $d = Cal-Dt $val; if ($d) { $cur.rid = $d.dt.ToString("yyyyMMdd") } }
  }
  return $evs
}

# Ocurrencias entre $desde y $hasta (incluye repetidas). Devuelve objetos ordenados por inicio.
function Cal-Ocurrencias($evs, [datetime]$desde, [datetime]$hasta) {
  $out = New-Object System.Collections.ArrayList
  $over = @{}
  foreach ($e in $evs) { if ($e.rid -and $e.uid) { $over[$e.uid + "|" + $e.rid] = $true } }
  foreach ($e in $evs) {
    try {
      if ($e.status -eq "CANCELLED") { continue }
      if (-not $e.end) { if ($e.allday) { $e.end = $e.start.AddDays(1) } else { $e.end = $e.start } }
      $dur = $e.end - $e.start
      if (-not $e.rrule) {
        $dentro = ($e.start -ge $desde -and $e.start -lt $hasta) -or ($e.end -gt $desde -and $e.start -lt $hasta)
        if ($dentro) { [void]$out.Add([pscustomobject]@{ ini = $e.start; fin = $e.end; titulo = $e.titulo; lugar = $e.lugar; todo = $e.allday; cal = $e.cal }) }
        continue
      }
      # --- eventos repetidos ---
      $r = @{}
      foreach ($kv in ($e.rrule -split ";")) { $p = $kv -split "=", 2; if ($p.Count -eq 2) { $r[$p[0].ToUpper()] = $p[1] } }
      $freq = [string]$r["FREQ"]
      $int = 1; if ($r["INTERVAL"]) { $int = [int]$r["INTERVAL"]; if ($int -lt 1) { $int = 1 } }
      $max = 0; if ($r["COUNT"]) { $max = [int]$r["COUNT"] }
      $untilDay = $null
      if ($r["UNTIL"]) { $ud = Cal-Dt $r["UNTIL"]; if ($ud) { $untilDay = $ud.dt.Date } }
      $bydays = @()
      if ($r["BYDAY"]) {
        foreach ($b in ($r["BYDAY"] -split ",")) {
          if ($b -match '^(-?\d+)?(MO|TU|WE|TH|FR|SA|SU)$') { $bydays += @{ n = [string]$matches[1]; d = [int]$script:calDow[$matches[2]] } }
        }
      }
      $bymd = @()
      if ($r["BYMONTHDAY"]) { foreach ($m in ($r["BYMONTHDAY"] -split ",")) { $bymd += [int]$m } }
      $startDay = $e.start.Date
      $from = $desde.Date.AddDays(-[math]::Ceiling($dur.TotalDays))
      if ($from -lt $startDay) { $from = $startDay }
      $iterFrom = $from
      if ($max -gt 0) { $iterFrom = $startDay }
      $count = 0
      for ($day = $iterFrom; $day -lt $hasta; $day = $day.AddDays(1)) {
        if ($untilDay -and $day -gt $untilDay) { break }
        $ok = $false
        if ($freq -eq "DAILY") {
          $ok = ((($day - $startDay).Days % $int) -eq 0)
        } elseif ($freq -eq "WEEKLY") {
          $w0 = $startDay.AddDays(-(([int]$startDay.DayOfWeek + 6) % 7))
          $w1 = $day.AddDays(-(([int]$day.DayOfWeek + 6) % 7))
          $wk = [int][math]::Round(($w1 - $w0).Days / 7)
          if (($wk % $int) -eq 0) {
            if ($bydays.Count -gt 0) { foreach ($b in $bydays) { if ([int]$day.DayOfWeek -eq $b.d) { $ok = $true } } }
            else { $ok = ([int]$day.DayOfWeek -eq [int]$startDay.DayOfWeek) }
          }
        } elseif ($freq -eq "MONTHLY" -or $freq -eq "YEARLY") {
          $okPeriodo = $false
          if ($freq -eq "MONTHLY") {
            $md = ($day.Year - $startDay.Year) * 12 + $day.Month - $startDay.Month
            $okPeriodo = (($md % $int) -eq 0)
          } else {
            $mes = $startDay.Month; if ($r["BYMONTH"]) { $mes = [int]$r["BYMONTH"] }
            $okPeriodo = ((($day.Year - $startDay.Year) % $int) -eq 0 -and $day.Month -eq $mes)
          }
          if ($okPeriodo) {
            if ($bymd.Count -gt 0) { foreach ($m in $bymd) { if ($day.Day -eq $m) { $ok = $true } } }
            elseif ($bydays.Count -gt 0) {
              $dim = [datetime]::DaysInMonth($day.Year, $day.Month)
              foreach ($b in $bydays) {
                if ([int]$day.DayOfWeek -ne $b.d) { continue }
                if (-not $b.n) { $ok = $true }
                else {
                  $nn = [int]$b.n
                  if ($nn -gt 0) { if ([math]::Ceiling($day.Day / 7) -eq $nn) { $ok = $true } }
                  else { if ((($dim - $day.Day) -lt (7 * (-$nn))) -and (($dim - $day.Day) -ge (7 * (-$nn - 1)))) { $ok = $true } }
                }
              }
            }
            else { $ok = ($day.Day -eq $startDay.Day) }
          }
        }
        if (-not $ok) { continue }
        $count++
        if ($max -gt 0 -and $count -gt $max) { break }
        if ($day -lt $from) { continue }
        $key = $day.ToString("yyyyMMdd")
        if ($e.ex -contains $key) { continue }
        if ($e.uid -and $over.ContainsKey($e.uid + "|" + $key)) { continue }
        $ini = $day.Add($e.start.TimeOfDay)
        $fin = $ini.Add($dur)
        if (($ini -ge $desde -and $ini -lt $hasta) -or ($fin -gt $desde -and $ini -lt $hasta)) {
          [void]$out.Add([pscustomobject]@{ ini = $ini; fin = $fin; titulo = $e.titulo; lugar = $e.lugar; todo = $e.allday; cal = $e.cal })
        }
      }
    } catch { Write-Host ("Calendario: evento '" + $e.titulo + "' no se pudo leer: " + $_.Exception.Message) }
  }
  return @($out | Sort-Object ini)
}

# Baja los calendarios (cache de 10 minutos; si falla la red usa lo ultimo que tenia).
function Cal-Todos {
  $cals = @(Cal-Configurados)
  if ($cals.Count -eq 0) { return @() }
  if ($script:calCache -and ((Get-Date) - $script:calCacheT).TotalMinutes -lt 10) { return $script:calCache }
  $all = @()
  $fallo = $false
  foreach ($c in $cals) {
    try {
      $txt = Get-Text ([string]$c.url) "GET" "" 40000
      foreach ($e in (Cal-Parse $txt)) { $e.cal = [string]$c.nombre; $all += $e }
    } catch { $fallo = $true; Write-Host ("Calendario '" + [string]$c.nombre + "': " + $_.Exception.Message) }
  }
  if ($all.Count -gt 0 -or -not $fallo) { $script:calCache = $all; $script:calCacheT = Get-Date; return $all }
  if ($script:calCache) { return $script:calCache }
  throw "no pude bajar el calendario"
}

function Cal-Hora([datetime]$d) {
  if ($d.Minute -eq 0) { return "las " + $d.Hour }
  return "las " + $d.Hour + ":" + $d.Minute.ToString("00")
}

function Cal-NombreDia([datetime]$d) {
  $hoy = (Get-Date).Date
  $dif = ($d.Date - $hoy).Days
  if ($dif -eq 0) { return "hoy" }
  if ($dif -eq 1) { return "mañana" }
  $dia = $script:calEs.DateTimeFormat.GetDayName($d.DayOfWeek)
  if ($dif -gt 1 -and $dif -lt 7) { return "el " + $dia }
  return "el " + $dia + " " + $d.Day + " de " + $script:calEs.DateTimeFormat.GetMonthName($d.Month)
}

# Interpreta el rango pedido en la frase normalizada ($n). Devuelve @{ desde; hasta; etiqueta } o $null.
function Cal-Rango([string]$n) {
  $hoy = (Get-Date).Date
  $meses = @("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","setiembre","octubre","noviembre","diciembre")
  if ($n -match '\b(\d{1,2}) de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)\b') {
    $dd = [int]$matches[1]; $mm = ([array]::IndexOf($meses, $matches[2])) + 1
    if ($mm -eq 10) { $mm = 9 } elseif ($mm -gt 10) { $mm = $mm - 1 }
    try {
      $f = New-Object DateTime ($hoy.Year, $mm, $dd)
      if ($f -lt $hoy.AddDays(-1)) { $f = $f.AddYears(1) }
      return @{ desde = $f; hasta = $f.AddDays(1); etiqueta = (Cal-NombreDia $f) }
    } catch { }
  }
  if ($n -match '(esta manana|de la manana|por la manana)' -and $n -notmatch '(pasado manana|\bmanana a|\bmanana por)') { return @{ desde = $hoy; hasta = $hoy.AddDays(1); etiqueta = "hoy" } }
  if ($n -match 'pasado manana') { return @{ desde = $hoy.AddDays(2); hasta = $hoy.AddDays(3); etiqueta = (Cal-NombreDia $hoy.AddDays(2)) } }
  if ($n -match '\bmanana\b') { return @{ desde = $hoy.AddDays(1); hasta = $hoy.AddDays(2); etiqueta = "mañana" } }
  if ($n -match '\b(hoy|esta noche|esta tarde)\b') { return @{ desde = $hoy; hasta = $hoy.AddDays(1); etiqueta = "hoy" } }
  if ($n -match 'fin de semana') {
    $dow = [int]$hoy.DayOfWeek
    if ($dow -eq 0) { $sab = $hoy.AddDays(-1) } elseif ($dow -eq 6) { $sab = $hoy } else { $sab = $hoy.AddDays(6 - $dow) }
    $d0 = $sab; if ($d0 -lt $hoy) { $d0 = $hoy }
    return @{ desde = $d0; hasta = $sab.AddDays(2); etiqueta = "este fin de semana" }
  }
  if ($n -match '(semana que viene|proxima semana|semana proxima)') {
    $lun = $hoy.AddDays(7 - (([int]$hoy.DayOfWeek + 6) % 7))
    return @{ desde = $lun; hasta = $lun.AddDays(7); etiqueta = "la semana que viene" }
  }
  if ($n -match 'esta semana') {
    $lun = $hoy.AddDays(-(([int]$hoy.DayOfWeek + 6) % 7))
    return @{ desde = $hoy; hasta = $lun.AddDays(7); etiqueta = "esta semana" }
  }
  if ($n -match '(mes que viene|proximo mes)') {
    $p = (New-Object DateTime ($hoy.Year, $hoy.Month, 1)).AddMonths(1)
    return @{ desde = $p; hasta = $p.AddMonths(1); etiqueta = "el mes que viene" }
  }
  if ($n -match 'este mes') {
    $fin = (New-Object DateTime ($hoy.Year, $hoy.Month, 1)).AddMonths(1)
    return @{ desde = $hoy; hasta = $fin; etiqueta = "este mes" }
  }
  if ($n -match '\b(lunes|martes|miercoles|jueves|viernes|sabado|domingo)\b') {
    $map = @{ domingo = 0; lunes = 1; martes = 2; miercoles = 3; jueves = 4; viernes = 5; sabado = 6 }
    $objetivo = [int]$map[$matches[1]]
    $dif = ($objetivo - [int]$hoy.DayOfWeek + 7) % 7
    $f = $hoy.AddDays($dif)
    return @{ desde = $f; hasta = $f.AddDays(1); etiqueta = (Cal-NombreDia $f) }
  }
  return $null
}

# Arma la respuesta hablada y la de pantalla para una lista de ocurrencias
function Cal-Formatear($occ, [string]$etiqueta, [bool]$agrupar) {
  $ahora = Get-Date
  $voz = @(); $pant = @()
  $porDia = $occ | Group-Object { $_.ini.Date.ToString("yyyyMMdd") }
  foreach ($g in $porDia) {
    $dia = $g.Group[0].ini.Date
    $nombre = Cal-NombreDia $dia
    $items = @()
    foreach ($o in $g.Group) {
      $t = $o.titulo; if (-not $t) { $t = "(sin título)" }
      $lug = ""; if ($o.lugar) { $lug = " en " + (($o.lugar -split ",")[0]).Trim() }
      if ($o.todo) { $cuando = "todo el día" } else { $cuando = "a " + (Cal-Hora $o.ini) }
      $items += ($cuando + ", " + $t + $lug)
      $h = "todo el día"; if (-not $o.todo) { $h = $o.ini.ToString("HH:mm") }
      $pant += ($nombre + " " + $h + "  " + $t + $lug)
    }
    if ($agrupar) { $voz += ($nombre.Substring(0,1).ToUpper() + $nombre.Substring(1) + ": " + ($items -join ". ")) }
    else { $voz += ($items -join ". ") }
  }
  return @{ voz = ($voz -join ". "); display = ($pant -join "`n") }
}

# Resumen corto para "resumen del dia": eventos de hoy que faltan
function Cal-ResumenHoy {
  if (@(Cal-Configurados).Count -eq 0) { return $null }
  $hoy = (Get-Date).Date
  $evs = Cal-Todos
  $occ = @(Cal-Ocurrencias $evs $hoy $hoy.AddDays(1))
  $ahora = Get-Date
  $quedan = @($occ | Where-Object { $_.todo -or $_.fin -gt $ahora })
  if ($quedan.Count -eq 0) { return @{ voz = "En tu calendario no tenés nada más para hoy"; display = "Calendario: nada más para hoy" } }
  $f = Cal-Formatear $quedan "hoy" $false
  $cosas = "cosas"; if ($quedan.Count -eq 1) { $cosas = "cosa" }
  return @{ voz = ("En tu calendario hoy tenés " + $quedan.Count + " " + $cosas + ". " + $f.voz); display = ("Calendario de hoy:`n" + $f.display) }
}

function Calendario-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  $palabrasAgenda = "\b(agenda|calendario|evento|eventos|turno|turnos|reunion|reuniones|compromiso|compromisos)\b"
  $esAgenda = ($n -match $palabrasAgenda)
  $esQue = ($n -match "\b(que tengo|que hay|que tenemos|tengo algo|que tengo agendado|tengo (turno|reunion|compromiso|examen|parcial|cumple))\b")
  $esCuando = ($n -match "\bcuando (es|tengo|era|me toca)\b")
  $rango = Cal-Rango $n
  $esProx = ($n -match "\b(proximo|proxima|proximos|proximas)\b" -and $esAgenda)
  $dispara = ($esAgenda -and ($rango -or $esProx -or $n -match "\b(mi|mis|el|la|de)\b agenda|mi calendario|que (tengo|hay)")) -or ($esQue -and $rango -and -not ($n -match "tengo que|hay que"))
  $dispara = $dispara -or ($esCuando -and $n -match "\b(mi|mis)\b" -and $n -match "turno|reunion|examen|parcial|cumple|cita|medico|dentista|evento")
  if (-not $dispara) { return $null }
  if ($n -match "lista|compras|recordame|recordatorio|clima|llueve|partido|champions|\bboca\b|madrid|barcelona|camiseta") { return $null }
  if (-not $speaker) { $speaker = "Luciano" }
  if ($speaker -ne "Luciano") {
    if ($esAgenda) { return @{ ok = $true; action = "say"; reply = "Ese calendario es privado de Luciano, no te lo puedo decir." } }
    return $null
  }
  if (@(Cal-Configurados).Count -eq 0) {
    if (-not $esAgenda) { return $null }
    $ayuda = "Todavía no tengo conectado tu calendario de Google. En la compu abrí Google Calendar, Configuración, elegí tu calendario, Integrar el calendario, y copiá la dirección secreta en formato iCal. Pegala en el archivo datos calendario-config.json, tomando como modelo calendario-config.ejemplo.json."
    return @{ ok = $true; action = "say"; reply = $ayuda }
  }
  try { $evs = Cal-Todos } catch {
    return @{ ok = $false; action = "say"; reply = "No pude bajar tu calendario de Google ahora. Revisá la conexión a internet o que el enlace secreto siga vigente." }
  }
  $ahora = Get-Date

  # proximo evento / cuando es mi X
  if ($esProx -or $esCuando) {
    $kw = ""
    if ($n -match "(?:turno|reunion|examen|parcial|cumple\w*|cita|medico|dentista|evento)") { $kw = $matches[0] }
    elseif ($n -match "cuando (?:es|tengo|era|me toca) (?:mi |mis |el |la |los |las )?(?:proximo |proxima )?([a-z0-9 ]{3,30})") { $kw = $matches[1].Trim() }
    $occ = @(Cal-Ocurrencias $evs $ahora $ahora.AddDays(120))
    $occ = @($occ | Where-Object { $_.todo -or $_.fin -gt $ahora })
    if ($kw) {
      $kws = $kw -replace "s$", ""
      $occ2 = @($occ | Where-Object { (Norm $_.titulo) -like ("*" + $kws + "*") })
      if ($occ2.Count -gt 0 -or $esCuando) { $occ = $occ2 }
    }
    if ($occ.Count -eq 0) {
      if ($esCuando -and -not $esAgenda) { return $null }
      return @{ ok = $true; action = "say"; reply = "No encuentro nada así en tu calendario en los próximos cuatro meses." }
    }
    $primero = $occ[0]
    if ($n -match "proximos|proximas") { $lista = @($occ | Select-Object -First 5) } else { $lista = @($primero) }
    $f = Cal-Formatear $lista "" $true
    return @{ ok = $true; action = "say"; reply = $f.voz; display = ("Calendario:`n" + $f.display) }
  }

  if (-not $rango) { $hoy = (Get-Date).Date; $rango = @{ desde = $hoy; hasta = $hoy.AddDays(1); etiqueta = "hoy" } }
  $occ = @(Cal-Ocurrencias $evs $rango.desde $rango.hasta)
  $nombreRango = [string]$rango.etiqueta
  if ($occ.Count -eq 0) {
    $txt = "No tenés nada en tu calendario para " + $nombreRango + "."
    if ($nombreRango -like "el *") { $txt = "No tenés nada en tu calendario " + $nombreRango + "." }
    return @{ ok = $true; action = "say"; reply = $txt }
  }
  # Para hoy, lo hablado deja afuera lo que ya terminó
  $hablar = $occ
  if ($rango.desde -eq (Get-Date).Date -and $rango.hasta -eq (Get-Date).Date.AddDays(1)) {
    $hablar = @($occ | Where-Object { $_.todo -or $_.fin -gt $ahora })
    if ($hablar.Count -eq 0) { return @{ ok = $true; action = "say"; reply = "Hoy ya no te queda nada; lo de hoy ya pasó."; display = ("Calendario de hoy:`n" + (Cal-Formatear $occ "hoy" $false).display) } }
  }
  $multi = (($rango.hasta - $rango.desde).Days -gt 1)
  $fv = Cal-Formatear $hablar $nombreRango $multi
  $fd = Cal-Formatear $occ $nombreRango $multi
  $cosas = "cosas"; if ($hablar.Count -eq 1) { $cosas = "cosa" }
  $intro = "Para " + $nombreRango + " tenés " + $hablar.Count + " " + $cosas + ". "
  if ($nombreRango -like "el *") { $intro = "El " + $nombreRango.Substring(3) + " tenés " + $hablar.Count + " " + $cosas + ". " }
  if ($multi -and $hablar.Count -gt 8) { $fv.voz = (($fv.voz -split "\. ") | Select-Object -First 8) -join ". " ; $intro = $intro + "Te digo las primeras. " }
  return @{ ok = $true; action = "say"; reply = ($intro + $fv.voz); display = ("Calendario, " + $nombreRango + ":`n" + $fd.display) }
}
