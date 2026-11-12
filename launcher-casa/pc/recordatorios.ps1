# Skill "recordatorios y lista de compras" de MIA. Se carga desde cerebro.ps1 (dot-source). Usa Norm, $data, $utf8, $es e $inv del cerebro.
# Datos editables: datos\recordatorios.json y datos\compras.txt (una cosa por linea). La lista tambien se ve y edita desde cualquier celu en http://IP:5003/lista
# Los recordatorios con hora los dice MIA en voz alta por los parlantes de la PC (Recordatorios-Tick, que corre desde el bucle de cerebro.ps1)
# y se repiten una vez en la siguiente respuesta que reciba cualquier app (celu, tablet, reloj).
$recF = Join-Path $data "recordatorios.json"
$compF = Join-Path $data "compras.txt"
$script:recAvisos = New-Object System.Collections.ArrayList
$script:recDias = @{ lunes = 1; martes = 2; miercoles = 3; jueves = 4; viernes = 5; sabado = 6; domingo = 0 }
$script:recMeses = @{ enero = 1; febrero = 2; marzo = 3; abril = 4; mayo = 5; junio = 6; julio = 7; agosto = 8; septiembre = 9; setiembre = 9; octubre = 10; noviembre = 11; diciembre = 12 }
$script:recNum = @{ un = 1; una = 1; dos = 2; tres = 3; cuatro = 4; cinco = 5; seis = 6; siete = 7; ocho = 8; nueve = 9; diez = 10; quince = 15; veinte = 20; treinta = 30; sesenta = 60 }
$script:recFmt = "yyyy-MM-dd HH:mm"

# ---------- Almacenamiento ----------
function Rec-Load {
  if (-not (Test-Path $recF)) { return @() }
  try { $o = [System.IO.File]::ReadAllText($recF, $utf8) | ConvertFrom-Json; return @($o.items) } catch { return @() }
}
function Rec-Save($items) { [System.IO.File]::WriteAllText($recF, (@{ items = @($items) } | ConvertTo-Json -Depth 5), $utf8) }
function Rec-NextId($items) { $m = 0; foreach ($i in @($items)) { if ([int]$i.id -gt $m) { $m = [int]$i.id } }; return ($m + 1) }
function Rec-Cap([string]$s) { if ($s.Length -eq 0) { return $s }; return $s.Substring(0, 1).ToUpper() + $s.Substring(1) }
function Rec-Num([string]$s) { if ($s -match "^\d+$") { return [int]$s }; if ($script:recNum.ContainsKey($s)) { return $script:recNum[$s] }; return 0 }

# ---------- Fechas en lenguaje natural ----------
function Rec-Parse([string]$n, [datetime]$now) {
  $t = " " + $n + " "
  $dia = $null; $h = -1; $mi = 0; $rel = $null; $repite = ""; $parteDelDia = $false
  function Cut([string]$s, $m) { return ($s.Substring(0, $m.Index) + " " + $s.Substring($m.Index + $m.Length)) }

  # en 20 minutos / en 2 horas / en media hora / en 3 dias
  $m = [regex]::Match($t, "\sen\s(?:(\d+|un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|quince|veinte|treinta|sesenta)\s+(minutos?|min|horas?|hs|dias?)|(media)\s+hora)\s")
  if ($m.Success) {
    if ($m.Groups[3].Success) { $rel = $now.AddMinutes(30) }
    else {
      $q = Rec-Num $m.Groups[1].Value; $u = $m.Groups[2].Value
      if ($u -like "min*") { $rel = $now.AddMinutes($q) } elseif ($u -like "h*") { $rel = $now.AddHours($q) } else { $dia = $now.Date.AddDays($q) }
    }
    $t = Cut $t $m
  }
  # repeticion: todos los dias / todos los lunes
  $m = [regex]::Match($t, "\stodos\slos\sdias\s")
  if ($m.Success) { $repite = "diario"; $t = Cut $t $m }
  $m = [regex]::Match($t, "\stodos\slos\s(lunes|martes|miercoles|jueves|viernes|sabado|domingo)\s")
  if ($m.Success) { $repite = "sem"; $dow = $script:recDias[$m.Groups[1].Value]; $d = (($dow - [int]$now.DayOfWeek) + 7) % 7; $dia = $now.Date.AddDays($d); $t = Cut $t $m }
  # hora: a las 9 / a las 9:30 / a las 9 y media / a las 8 de la noche / a la una
  $m = [regex]::Match($t, "\sa\s(?:las?\s)?(\d{1,2}|una)(?:[\s:h\.](\d{2}))?(?:\s?hs)?(\sy\s(?:media|cuarto)|\smenos\scuarto)?(?:\sde\sla\s(manana|tarde|noche))?(?=\s)")
  if ($m.Success) {
    $h = if ($m.Groups[1].Value -eq "una") { 1 } else { [int]$m.Groups[1].Value }
    if ($m.Groups[2].Success) { $mi = [int]$m.Groups[2].Value }
    $extra = $m.Groups[3].Value
    if ($extra -match "media") { $mi = 30 } elseif ($extra -match "y cuarto") { $mi = 15 } elseif ($extra -match "menos") { $h = $h - 1; $mi = 45 }
    $p = $m.Groups[4].Value
    if (($p -eq "tarde" -or $p -eq "noche") -and $h -lt 12) { $h += 12 }
    if ($p) { $parteDelDia = $true }
    if ($h -gt 23 -or $mi -gt 59) { $h = -1; $mi = 0 } else { $t = Cut $t $m }
  }
  # franja sin hora: a la mañana / esta tarde / mediodia
  $m = [regex]::Match($t, "\s(?:a\sla|esta|por\sla|de\sla)\s(manana|tarde|noche)\s")
  if ($m.Success) {
    if ($h -lt 0) { $h = switch ($m.Groups[1].Value) { "manana" { 9 } "tarde" { 17 } default { 21 } }; $mi = 0; $parteDelDia = $true }
    if ($m.Value -match "esta") { $dia = $now.Date }
    $t = Cut $t $m
  }
  $m = [regex]::Match($t, "\s(?:al\s)?mediodia\s")
  if ($m.Success) { if ($h -lt 0) { $h = 12; $mi = 0; $parteDelDia = $true }; $t = Cut $t $m }
  # dia: pasado mañana / mañana / hoy / el viernes / el 15 de diciembre / el 15
  $m = [regex]::Match($t, "\spasado\smanana\s")
  if ($m.Success) { $dia = $now.Date.AddDays(2); $t = Cut $t $m }
  else {
    $m = [regex]::Match($t, "\smanana\s")
    if ($m.Success) { $dia = $now.Date.AddDays(1); $t = Cut $t $m }
  }
  $m = [regex]::Match($t, "\shoy\s")
  if ($m.Success) { $dia = $now.Date; $t = Cut $t $m }
  $m = [regex]::Match($t, "\s(?:el\s|este\s|proximo\s|el\sproximo\s)?(lunes|martes|miercoles|jueves|viernes|sabado|domingo)\s")
  if ($m.Success -and -not $dia) {
    $dow = $script:recDias[$m.Groups[1].Value]
    $d = (($dow - [int]$now.DayOfWeek) + 7) % 7
    if ($d -eq 0) { $d = 7; if ($h -ge 0 -and $now.Date.AddHours($h).AddMinutes($mi) -gt $now) { $d = 0 } }
    $dia = $now.Date.AddDays($d); $t = Cut $t $m
  }
  $m = [regex]::Match($t, "\sel\s(\d{1,2})\sde\s(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)\s")
  if ($m.Success -and -not $dia) {
    try {
      $dd = Get-Date -Year $now.Year -Month $script:recMeses[$m.Groups[2].Value] -Day ([int]$m.Groups[1].Value)
      $dia = $dd.Date; if ($dia -lt $now.Date) { $dia = $dia.AddYears(1) }
      $t = Cut $t $m
    } catch { }
  }
  # resolver
  $cuando = $null
  if ($rel) { $cuando = $rel }
  elseif ($dia -or $h -ge 0) {
    $explicito = [bool]$dia
    if (-not $dia) { $dia = $now.Date }
    if ($h -ge 0) {
      $cand = $dia.AddHours($h).AddMinutes($mi)
      if ($cand -le $now -and -not $explicito) {
        if ($h -lt 12 -and -not $parteDelDia -and -not $repite -and $cand.AddHours(12) -gt $now) { $cand = $cand.AddHours(12) } else { $cand = $cand.AddDays(1) }
      }
      $cuando = $cand
    } else {
      $cuando = $dia.AddHours(9)
      if ($cuando -le $now) { $cuando = $now.AddHours(1); $cuando = $cuando.AddSeconds(-$cuando.Second) }
    }
  }
  $resto = ([regex]::Replace($t, "\s+", " ")).Trim()
  $resto = [regex]::Replace($resto, "^(?:(?:que|de|para|a|el|la|y)\s+)+", "")
  $resto = [regex]::Replace($resto, "(?:\s+(?:que|de|para|a|el|la|y|en))+$", "")
  return @{ cuando = $cuando; repite = $repite; resto = $resto.Trim() }
}
function Rec-CuandoTxt([datetime]$c) {
  $now = Get-Date
  $hora = if ($c.Minute -eq 0) { "a las " + $c.Hour } else { "a las " + $c.ToString("H:mm") }
  $d = [int](($c.Date - $now.Date).TotalDays)
  if ($d -eq 0) { return "hoy $hora" }
  if ($d -eq 1) { return "mañana $hora" }
  return "el " + $c.ToString("dddd d 'de' MMMM", $es) + " $hora"
}

# ---------- Aviso en voz alta por la PC ----------
function Speak-PC([string]$text) {
  try {
    $req = [System.Net.HttpWebRequest]::Create("http://127.0.0.1:5002/tts")
    $req.Method = "POST"; $req.ContentType = "text/plain; charset=utf-8"; $req.Timeout = 15000; $req.ReadWriteTimeout = 15000
    $b = $utf8.GetBytes($text); $req.ContentLength = $b.Length
    $rs = $req.GetRequestStream(); $rs.Write($b, 0, $b.Length); $rs.Close()
    $resp = $req.GetResponse(); $ms = New-Object System.IO.MemoryStream
    $resp.GetResponseStream().CopyTo($ms); $resp.Close(); $ms.Position = 0
    $sp = New-Object System.Media.SoundPlayer($ms); $sp.PlaySync()
    return
  } catch { }
  try { Add-Type -AssemblyName System.Speech; $s = New-Object System.Speech.Synthesis.SpeechSynthesizer; $s.Speak($text) } catch { }
}
function Recordatorios-Tick {
  $items = @(Rec-Load); if ($items.Count -eq 0) { return }
  $now = Get-Date; $cambio = $false; $nuevos = @(); $sigId = Rec-NextId $items
  foreach ($r in $items) {
    if ($r.hecho -or -not $r.cuando) { continue }
    $c = $null; try { $c = [datetime]::ParseExact([string]$r.cuando, $script:recFmt, $inv) } catch { continue }
    if ($c -gt $now) { continue }
    $cambio = $true; $r.hecho = $true
    $atraso = ($now - $c).TotalMinutes
    if ($atraso -gt 1440) { continue }
    $txt = [string]$r.texto
    $frase = if ($atraso -gt 10) { "Se te pasó este recordatorio: $txt" } else { "Recordatorio: $txt" }
    [void]$script:recAvisos.Add($txt)
    Write-Host ("[{0}] Recordatorio: {1}" -f (Get-Date -Format "HH:mm:ss"), $txt)
    if ($r.repite) {
      $next = if ($r.repite -eq "sem") { $c.AddDays(7) } else { $c.AddDays(1) }
      while ($next -le $now) { $next = if ($r.repite -eq "sem") { $next.AddDays(7) } else { $next.AddDays(1) } }
      $nuevos += [pscustomobject]@{ id = $sigId; texto = $txt; cuando = $next.ToString($script:recFmt, $inv); repite = [string]$r.repite; hecho = $false; creado = (Get-Date).ToString($script:recFmt, $inv) }
      $sigId++
    }
    Rec-Save (@($items) + $nuevos)
    Speak-PC $frase
  }
  if ($cambio) { Rec-Save (@($items) + $nuevos) }
}
# Texto para agregar al final de la proxima respuesta a las apps (una sola vez por recordatorio)
function Recordatorios-ParaApp {
  if ($script:recAvisos.Count -eq 0) { return "" }
  $l = @($script:recAvisos.ToArray()); $script:recAvisos.Clear()
  return "Ah, y te recuerdo: " + ($l -join ". ") + "."
}
function Rec-Pendientes { return @(Rec-Load | Where-Object { -not $_.hecho } | Sort-Object { if ($_.cuando) { $_.cuando } else { "9999" } }) }
function Rec-Hoy {
  $now = Get-Date; $fin = $now.Date.AddDays(1)
  $hoy = @(); $sin = 0
  foreach ($r in (Rec-Pendientes)) {
    if (-not $r.cuando) { $sin++; continue }
    $c = [datetime]::ParseExact([string]$r.cuando, $script:recFmt, $inv)
    if ($c -lt $fin) { $hoy += "$($r.texto) " + $(if ($c.Date -lt $now.Date) { "(atrasado)" } else { "a las " + $(if ($c.Minute -eq 0) { $c.Hour } else { $c.ToString("H:mm") }) }) }
  }
  $out = @()
  if ($hoy.Count -eq 1) { $out += "Tenés un recordatorio para hoy: " + $hoy[0] } elseif ($hoy.Count -gt 1) { $out += "Tenés $($hoy.Count) recordatorios para hoy: " + ($hoy -join "; ") }
  if ($sin -gt 0) { $out += "y $sin sin fecha" }
  return ($out -join " ")
}

# ---------- Lista de compras ----------
function Compras-Load {
  if (-not (Test-Path $compF)) { return @() }
  return @([System.IO.File]::ReadAllLines($compF, $utf8) | Where-Object { $_.Trim() })
}
function Compras-Save($l) { [System.IO.File]::WriteAllText($compF, ((@($l) -join "`r`n") + "`r`n"), $utf8) }
function Compras-Words([string]$s) {
  $out = @()
  foreach ($w in ((Norm $s) -split " ")) {
    if (-not $w -or @("el", "la", "los", "las", "de", "del", "un", "una", "unos", "unas", "mi", "mis") -contains $w) { continue }
    if ($w.Length -gt 3 -and $w.EndsWith("s")) { $w = $w.Substring(0, $w.Length - 1) }
    $out += $w
  }
  return $out
}
function Compras-Add([string]$texto) {
  $lista = @(Compras-Load); $agregados = @(); $ya = @()
  $partes = @([regex]::Split(($texto -replace "\s+y\s+", ","), "\s*,\s*") | Where-Object { $_.Trim() })
  foreach ($p in $partes) {
    $it = Rec-Cap ($p.Trim())
    $dup = $false; foreach ($e in $lista) { if ((Norm $e) -eq (Norm $it)) { $dup = $true; break } }
    if ($dup) { $ya += $it } else { $lista += $it; $agregados += $it }
  }
  if ($agregados.Count -gt 0) { Compras-Save $lista }
  return @{ agregados = $agregados; ya = $ya; total = $lista.Count }
}
function Compras-Find([string]$q) {
  $qw = @(Compras-Words $q); if ($qw.Count -eq 0) { return @() }
  $res = @()
  foreach ($e in @(Compras-Load)) {
    $ew = @(Compras-Words $e); $ok = $true
    foreach ($w in $qw) { if ($ew -notcontains $w) { $ok = $false; break } }
    if ($ok) { $res += $e }
  }
  return $res
}
function Compras-Remove([string]$exacto) {
  $lista = @(Compras-Load | Where-Object { $_ -ne $exacto }); Compras-Save $lista
}
function Compras-Resumen {
  $n = @(Compras-Load).Count
  if ($n -eq 0) { return "" }
  if ($n -eq 1) { return "En la lista de compras hay una cosa" }
  return "En la lista de compras hay $n cosas"
}
function Rec-Say([string]$txt) { return @{ ok = $true; action = "say"; reply = $txt; display = $txt } }
function Rec-ListaTxt([string[]]$l) {
  if ($l.Count -eq 1) { return $l[0] }
  return (($l | Select-Object -First ($l.Count - 1)) -join ", ") + " y " + $l[$l.Count - 1]
}

# ---------- Decisión ----------
function Recordatorios-Decide([string]$said) {
  $n = Norm $said

  # Crear recordatorio
  $m = [regex]::Match($n, "^(?:mia )?(?:recordame|recuerdame|recordarme|avisame|haceme acordar|poneme un recordatorio|ponme un recordatorio|agendame|agenda un recordatorio|crea un recordatorio)\s*(.*)$")
  if ($m.Success) {
    $p = Rec-Parse $m.Groups[1].Value (Get-Date)
    if ($p.resto -match "^cuando\b") { return $null }
    if (-not $p.resto) { return (Rec-Say "¿Qué querés que te recuerde? Decime por ejemplo: recordame mañana a las 9 pagar la luz.") }
    $items = @(Rec-Load)
    $c = ""; if ($p.cuando) { $c = ([datetime]$p.cuando).ToString($script:recFmt, $inv) }
    $nuevo = [pscustomobject]@{ id = (Rec-NextId $items); texto = (Rec-Cap $p.resto); cuando = $c; repite = [string]$p.repite; hecho = $false; creado = (Get-Date).ToString($script:recFmt, $inv) }
    Rec-Save (@($items) + $nuevo)
    if ($p.cuando) {
      $rep = ""; if ($p.repite -eq "diario") { $rep = ", todos los días" } elseif ($p.repite -eq "sem") { $rep = ", todas las semanas" }
      return (Rec-Say "Listo, te lo recuerdo $(Rec-CuandoTxt ([datetime]$p.cuando))$rep`: $($nuevo.texto).")
    }
    return (Rec-Say "Anotado sin fecha: $($nuevo.texto). Si me decís cuándo, te aviso.")
  }

  # Ver recordatorios
  if ($n -match "(que|cuales) (recordatorios|pendientes|tareas) (tengo|hay)|mis recordatorios|recordatorios (de hoy|pendientes)|que tengo pendiente|tengo algun recordatorio") {
    $pen = @(Rec-Pendientes)
    if ($pen.Count -eq 0) { return (Rec-Say "No tenés recordatorios pendientes.") }
    $lineas = @($pen | Select-Object -First 6 | ForEach-Object { if ($_.cuando) { "$($_.texto), $(Rec-CuandoTxt ([datetime]::ParseExact([string]$_.cuando, $script:recFmt, $inv)))" } else { "$($_.texto), sin fecha" } })
    $r = Rec-Say ("Tenés " + $pen.Count + " pendientes: " + ($lineas -join ". ") + ".")
    return $r
  }

  # Borrar / cancelar recordatorio
  $m = [regex]::Match($n, "^(?:mia )?(?:borra|cancela|elimina|saca|quita|tacha|ya esta)\w*\s+(?:el\s+)?recordatorio\s+(?:de\s+|para\s+|que\s+)?(.+)$")
  if ($m.Success) {
    $qw = @(Compras-Words $m.Groups[1].Value); $items = @(Rec-Load); $hit = $null
    foreach ($r in $items) { if (-not $r.hecho) { $rw = @(Compras-Words ([string]$r.texto)); $ok = $true; foreach ($w in $qw) { if ($rw -notcontains $w) { $ok = $false } }; if ($ok -and $qw.Count -gt 0) { $hit = $r; break } } }
    if (-not $hit) { return (Rec-Say "No encontré ese recordatorio.") }
    $hit.hecho = $true; Rec-Save $items
    return (Rec-Say "Listo, cancelé el recordatorio: $($hit.texto).")
  }

  # Lista de compras: agregar
  $m = [regex]::Match($n, "^(?:mia )?(?:agrega|suma|anota|pone|mete|anade)\w*\s+(.+?)\s+(?:a|en)\s+(?:la\s+)?lista(?:\s+de\s+(?:compras|super|supermercado|mandados))?$")
  if (-not $m.Success) { $m = [regex]::Match($n, "^(?:mia )?(?:agrega|suma|anota|pone|mete|anade)\w*\s+(?:a|en)\s+(?:la\s+)?lista(?:\s+de\s+(?:compras|super|supermercado|mandados))?\s+(.+)$") }
  if (-not $m.Success) { $m = [regex]::Match($n, "^(?:mia )?(?:nos quedamos sin|me quede sin|hay que comprar|tengo que comprar|tenemos que comprar|necesito comprar)\s+(?:el |la |los |las )?(.+)$") }
  if ($m.Success) {
    $txt = [regex]::Replace($m.Groups[1].Value.Trim(), "^(?:el |la |los |las )", "")
    if ($txt -match "bateria|internet|senal|luz|plata|tiempo|nafta|gas|paciencia") { return $null }
    $r = Compras-Add $txt
    if ($r.agregados.Count -gt 0) {
      $s = "Listo, agregué " + (Rec-ListaTxt $r.agregados) + " a la lista"
      if ($r.ya.Count -gt 0) { $s += ". " + (Rec-ListaTxt $r.ya) + " ya estaba" }
      return (Rec-Say ($s + ". Ahora hay $($r.total)."))
    }
    return (Rec-Say ((Rec-ListaTxt $r.ya) + " ya estaba en la lista."))
  }
  # Lista de compras: leer
  if ($n -match "(lista de (compras|super|supermercado|mandados)|que (hay|tengo|tenemos|falta) en la lista|que hay que comprar|que falta comprar|leeme la lista|decime la lista|mostrame la lista|la lista)" -and $n -notmatch "agrega|suma|anota|pone|mete|saca|quita|borra|vacia|limpia|tacha") {
    $l = @(Compras-Load)
    if ($l.Count -eq 0) { return (Rec-Say "La lista de compras está vacía.") }
    $r = Rec-Say ("En la lista hay " + $l.Count + ": " + (Rec-ListaTxt $l) + ".")
    $r.display = ($l | ForEach-Object { "- $_" }) -join "`n"
    return $r
  }
  # Lista de compras: vaciar
  if ($n -match "^(?:mia )?(?:vacia|borra|limpia|elimina)\w*\s+(?:toda\s+)?la\s+lista(?:\s+de\s+\w+)?$") {
    Compras-Save @(); return (Rec-Say "Listo, vacié la lista de compras.")
  }
  # Lista de compras: sacar
  $m = [regex]::Match($n, "^(?:mia )?(?:saca|quita|borra|tacha|elimina)\w*\s+(.+?)\s+de\s+la\s+lista(?:\s+de\s+\w+)?$")
  if (-not $m.Success) { $m = [regex]::Match($n, "^(?:mia )?ya (?:compre|compramos|traje|trajimos|tengo|tenemos)\s+(?:el |la |los |las )?(.+)$") }
  if ($m.Success) {
    $hits = @(Compras-Find $m.Groups[1].Value)
    if ($hits.Count -eq 0) { if ($n -match "de la lista") { return (Rec-Say "No encontré eso en la lista.") } else { return $null } }
    foreach ($h in $hits) { Compras-Remove $h }
    return (Rec-Say ("Listo, saqué " + (Rec-ListaTxt $hits) + " de la lista."))
  }
  return $null
}
