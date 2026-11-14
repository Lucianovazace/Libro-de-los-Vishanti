# ============================================================
# MIA - Salud (salud.ps1)
# Recibe de la app "MIA Salud" del celu (Health Connect: pasos, sueno, pulsaciones, entrenamientos, peso)
# y contesta por voz. Datos: datos\salud.json (solo en esta PC). Solo para Luciano. MIA cuenta lo que dicen
# los numeros; no diagnostica ni da consejos medicos.
# Frases:
#   "cuanto dormi" / "como dormi anoche" / "como vengo de sueno esta semana"
#   "cuantos pasos hice hoy" / "cuantos pasos ayer"
#   "como estan mis pulsaciones" / "frecuencia cardiaca de hoy"
#   "cual fue mi ultimo entrenamiento" / "cuanto corri esta semana" / "mi ultimo partido"
#   "me pese 78,5"  (anota el peso)   "cuanto peso" / "como viene mi peso"
#   "resumen de salud" / "como vengo esta semana"
#   "cuando fue la ultima sincronizacion de salud"
# Se carga desde cerebro.ps1 (dot-source). El celu manda un POST a http://IP:5003/salud (ver Salud-Recibir).
# ============================================================

$salF = Join-Path $data "salud.json"
$script:salInv = [Globalization.CultureInfo]::InvariantCulture

# En PowerShell 7 ConvertFrom-Json convierte las fechas en objetos; las dejamos siempre como texto ISO.
function Sal-S($x) { if ($x -is [datetime]) { return $x.ToString("yyyy-MM-ddTHH:mm:ss", $script:salInv) }; return [string]$x }
function Sal-Load {
  $d = $null
  if (Test-Path $salF) { try { $d = ([System.IO.File]::ReadAllText($salF, $utf8) | ConvertFrom-Json) } catch { $d = $null } }
  $o = @{ actualizado = ""; dias = @(); ejercicio = @(); peso = @() }
  if ($d) {
    if ($d.actualizado) { $o.actualizado = Sal-S $d.actualizado }
    if ($d.dias) { $o.dias = @($d.dias | ForEach-Object { $_.dia = (Sal-S $_.dia).Substring(0, 10); $_ }) }
    if ($d.ejercicio) { $o.ejercicio = @($d.ejercicio | ForEach-Object { $_.inicio = Sal-S $_.inicio; $_.fin = Sal-S $_.fin; $_ }) }
    if ($d.peso) { $o.peso = @($d.peso | ForEach-Object { $_.fecha = Sal-S $_.fecha; $_ }) }
  }
  return $o
}
function Sal-Save($s) {
  $o = [pscustomobject]@{ actualizado = [string]$s.actualizado; dias = @($s.dias); ejercicio = @($s.ejercicio); peso = @($s.peso) }
  [System.IO.File]::WriteAllText($salF, ($o | ConvertTo-Json -Depth 6), $utf8)
}
function Sal-Say([string]$t, [bool]$listen = $false) {
  $r = @{ ok = $true; action = "say"; reply = $t }
  if ($listen) { $r.listen = $true }
  return $r
}

# Llamado desde cerebro.ps1 cuando el celu hace POST /salud. Devuelve un texto corto para la app.
function Salud-Recibir([string]$body) {
  $j = $body | ConvertFrom-Json
  $s = Sal-Load
  # dias: se reemplazan los que llegan, se conservan los demas
  $in = @{}; foreach ($d in @($j.dias)) { if ($d.dia) { $in[[string]$d.dia] = $d } }
  $dias = @(@($s.dias) | Where-Object { -not $in.ContainsKey([string]$_.dia) }) + @($in.Values)
  $s.dias = @($dias | Sort-Object { [string]$_.dia } | Select-Object -Last 400)
  # entrenamientos: por inicio
  $ein = @{}; foreach ($e in @($j.ejercicio)) { if ($e.inicio) { $ein[[string]$e.inicio] = $e } }
  $ej = @(@($s.ejercicio) | Where-Object { -not $ein.ContainsKey([string]$_.inicio) }) + @($ein.Values)
  $s.ejercicio = @($ej | Sort-Object { [string]$_.inicio } | Select-Object -Last 400)
  # peso: los del celu se reemplazan por fecha; los anotados por voz se conservan
  $pin = @{}; foreach ($p in @($j.peso)) { if ($p.fecha) { $pin[[string]$p.fecha] = [pscustomobject]@{ fecha = [string]$p.fecha; kg = [double]$p.kg; fuente = "celu" } } }
  $pe = @(@($s.peso) | Where-Object { ([string]$_.fuente) -eq "voz" -or -not $pin.ContainsKey([string]$_.fecha) }) + @($pin.Values)
  $s.peso = @($pe | Sort-Object { [string]$_.fecha } | Select-Object -Last 400)
  $s.actualizado = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss", $script:salInv)
  Sal-Save $s
  return ("ok dias=" + @($in.Keys).Count + " entrenamientos=" + @($ein.Keys).Count + " pesos=" + @($pin.Keys).Count)
}

# ---------- Formatos ----------
function Sal-N($n) { return ([math]::Round([double]$n, 0)).ToString("0", $script:salInv) }
function Sal-Kg([double]$k) { return ([math]::Round($k, 1)).ToString("0.#", $script:salInv).Replace(".", ",") }
function Sal-Horas([double]$min) {
  $m = [int][math]::Round($min)
  $h = [math]::Floor($m / 60); $r = $m % 60
  if ($h -le 0) { return "$r minutos" }
  if ($r -eq 0) { if ($h -eq 1) { return "1 hora" }; return "$h horas" }
  if ($h -eq 1) { return "1 hora y $r minutos" }
  return "$h horas y $r minutos"
}
function Sal-Dia([int]$atras) { return [datetime]::Today.AddDays(-$atras).ToString("yyyy-MM-dd", $script:salInv) }
function Sal-DiaDe($s, [string]$dia) { return @($s.dias | Where-Object { [string]$_.dia -eq $dia })[0] }
function Sal-Prom($vals) {
  $v = @($vals | Where-Object { $null -ne $_ -and "$_" -ne "" } | ForEach-Object { [double]$_ })
  if ($v.Count -eq 0) { return $null }
  return ($v | Measure-Object -Average).Average
}
function Sal-Rango($s, [int]$desdeAtras, [int]$hastaAtras = 0) {
  $a = Sal-Dia $desdeAtras; $b = Sal-Dia $hastaAtras
  return @($s.dias | Where-Object { [string]$_.dia -ge $a -and [string]$_.dia -le $b })
}
function Sal-Frescura($s) {
  if (-not $s.actualizado) { return "" }
  try {
    $h = ((Get-Date) - [datetime]::Parse($s.actualizado, $script:salInv)).TotalHours
    if ($h -ge 12) { return " Ojo: el último dato que recibí del celu es de hace " + (Sal-Horas ($h * 60)).Replace(" y 0 minutos", "") + "; abrí MIA Salud en el celu para actualizar." }
  } catch { }
  return ""
}
function Sal-SinDatos([string]$que) { return (Sal-Say ("No tengo datos de $que. Abrí la app MIA Salud en el celu, con el wifi de casa, y tocá Enviar a MIA.")) }
function Sal-Tipo([string]$t) { if ($t) { return $t }; return "entrenamiento" }
function Sal-FechaCorta([string]$iso) {
  $d = [datetime]::Parse($iso, $script:salInv)
  $n = ([datetime]::Today - $d.Date).Days
  if ($n -le 0) { return "hoy" }
  if ($n -eq 1) { return "ayer" }
  if ($n -lt 7) { return "hace $n días" }
  return "el " + $d.ToString("dd/MM", $script:salInv)
}
function Sal-Ejercicio($e) {
  $t = (Sal-Tipo ([string]$e.tipo)) + " " + (Sal-FechaCorta ([string]$e.inicio)) + ", " + (Sal-Horas ([double]$e.min))
  if ($e.dist) { $t += ", " + (([math]::Round([double]$e.dist, 1)).ToString("0.#", $script:salInv).Replace(".", ",")) + " kilómetros" }
  if ($e.kcal) { $t += ", " + (Sal-N $e.kcal) + " calorías activas" }
  if ($e.fcProm) { $t += ", pulsaciones promedio " + (Sal-N $e.fcProm) }
  if ($e.fcMax) { $t += " y máxima " + (Sal-N $e.fcMax) }
  return $t
}

# ---------- Decision ----------
function Salud-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  if (-not $n) { return $null }

  $pesar = $n -match "^(?:mia )?(?:hoy )?(?:me )?(?:pese|pesaron|me pesaron|marco la balanza|marque)\b"
  $consulta = $n -match "\b(?:cuanto dormi|como dormi|mi sueno|horas de sueno|sueno de|de sueno|dormi (?:bien|mal|poco|mucho)|cuantos pasos|pasos (?:de |del )?(?:hoy|ayer|esta semana)|cuanto camine|mis pasos|pulsaciones|frecuencia cardiaca|ritmo cardiaco|latidos|ultimo entrenamiento|ultimo partido|mis entrenamientos|cuanto corri|cuanto entrene|cuando entrene|entrenamientos de|cuanto peso|mi peso|como viene mi peso|como voy de peso|resumen de salud|como estoy de salud|como vengo (?:esta semana|de salud|con (?:el|los|las) \w+)|sincronizacion|datos de salud)"
  if (-not $pesar -and -not $consulta) { return $null }
  if ($speaker -and $speaker -ne "Luciano") { return (Sal-Say "Los datos de salud son privados: solo Luciano los puede consultar.") }

  $s = Sal-Load

  # --- Anotar peso por voz ---
  if ($pesar) {
    $m = [regex]::Match($said.ToLowerInvariant(), "(\d{2,3})(?:\s*(?:con|coma|,|\.)\s*(\d))?")
    if (-not $m.Success) { return (Sal-Say "¿Cuánto marcó la balanza?" $true) }
    $kg = [double]$m.Groups[1].Value
    if ($m.Groups[2].Success) { $kg += ([double]$m.Groups[2].Value) / 10 }
    if ($kg -lt 30 -or $kg -gt 250) { return (Sal-Say "Ese peso no me cierra. Decime por ejemplo: me pesé 78 con 5." $true) }
    $hoy = [datetime]::Now.ToString("yyyy-MM-ddTHH:mm:ss", $script:salInv)
    $s.peso = @($s.peso) + [pscustomobject]@{ fecha = $hoy; kg = $kg; fuente = "voz" }
    if (-not $s.actualizado) { $s.actualizado = $hoy }
    Sal-Save $s
    $prev = @($s.peso | Where-Object { [string]$_.fecha -lt $hoy } | Sort-Object { [string]$_.fecha } | Select-Object -Last 1)
    $t = "Anotado: " + (Sal-Kg $kg) + " kilos."
    if ($prev.Count -gt 0) {
      $dif = $kg - [double]$prev[0].kg
      if ([math]::Abs($dif) -lt 0.05) { $t += " Igual que la última vez." }
      elseif ($dif -gt 0) { $t += " " + (Sal-Kg $dif) + " más que la vez anterior (" + (Sal-FechaCorta ([string]$prev[0].fecha)) + ")." }
      else { $t += " " + (Sal-Kg (-$dif)) + " menos que la vez anterior (" + (Sal-FechaCorta ([string]$prev[0].fecha)) + ")." }
    }
    return (Sal-Say $t)
  }

  # --- Sincronizacion ---
  if ($n -match "sincronizacion|datos de salud") {
    if (-not $s.actualizado) { return (Sal-Say "Todavía no recibí nada del celu. Abrí la app MIA Salud con el wifi de casa, escribí la dirección de la PC y tocá Enviar a MIA.") }
    $h = ((Get-Date) - [datetime]::Parse($s.actualizado, $script:salInv)).TotalHours
    return (Sal-Say ("Lo último que recibí del celu fue hace " + (Sal-Horas ($h * 60)) + ". Tengo " + @($s.dias).Count + " días, " + @($s.ejercicio).Count + " entrenamientos y " + @($s.peso).Count + " pesajes."))
  }

  # --- Peso ---
  if ($n -match "cuanto peso|mi peso|como viene mi peso|como voy de peso") {
    $p = @($s.peso | Sort-Object { [string]$_.fecha })
    if ($p.Count -eq 0) { return (Sal-Say "No tengo ningún peso anotado. Decime: me pesé 78 con 5.") }
    $u = $p[$p.Count - 1]
    $t = "Tu último peso fue " + (Sal-Kg $u.kg) + " kilos (" + (Sal-FechaCorta ([string]$u.fecha)) + ")."
    foreach ($k in @(@(7, "una semana"), @(30, "un mes"))) {
      $lim = [datetime]::Today.AddDays(-$k[0]).ToString("yyyy-MM-ddTHH:mm:ss", $script:salInv)
      $ant = @($p | Where-Object { [string]$_.fecha -le $lim } | Select-Object -Last 1)
      if ($ant.Count -gt 0) {
        $dif = [double]$u.kg - [double]$ant[0].kg
        if ([math]::Abs($dif) -lt 0.05) { $t += " Igual que hace " + $k[1] + "." }
        elseif ($dif -gt 0) { $t += " " + (Sal-Kg $dif) + " más que hace " + $k[1] + "." }
        else { $t += " " + (Sal-Kg (-$dif)) + " menos que hace " + $k[1] + "." }
      }
    }
    return (Sal-Say $t)
  }

  # --- Sueno ---
  if ($n -match "dormi|sueno") {
    $semana = $n -match "semana"
    if ($semana) {
      $r = Sal-Rango $s 6
      $v = @($r | Where-Object { $null -ne $_.sueno })
      if ($v.Count -eq 0) { return (Sal-SinDatos "sueño de esta semana") }
      $pr = Sal-Prom ($v | ForEach-Object { $_.sueno })
      $mejor = $v | Sort-Object { [double]$_.sueno } -Descending | Select-Object -First 1
      $peor = $v | Sort-Object { [double]$_.sueno } | Select-Object -First 1
      return (Sal-Say ("En los últimos " + $v.Count + " días dormiste en promedio " + (Sal-Horas $pr) + ". Lo mejor fue " + (Sal-Horas $mejor.sueno) + " y lo peor " + (Sal-Horas $peor.sueno) + "." + (Sal-Frescura $s)))
    }
    $dia = Sal-Dia 0; $cual = "anoche"
    if ($n -match "\bayer\b") { $dia = Sal-Dia 1; $cual = "ayer" }
    $d = Sal-DiaDe $s $dia
    if (-not $d -or $null -eq $d.sueno) { return (Sal-SinDatos "sueño de $cual") }
    $t = "$cual dormiste " + (Sal-Horas $d.sueno) + "."
    $prom = Sal-Prom (Sal-Rango $s 7 1 | ForEach-Object { $_.sueno })
    if ($null -ne $prom) {
      $dif = [double]$d.sueno - $prom
      if ([math]::Abs($dif) -lt 20) { $t += " Es parecido a tu promedio de la semana." }
      elseif ($dif -gt 0) { $t += " Es " + (Sal-Horas $dif) + " más que tu promedio de la semana." }
      else { $t += " Es " + (Sal-Horas (-$dif)) + " menos que tu promedio de la semana." }
    }
    return (Sal-Say (([string]$t.Substring(0, 1)).ToUpper() + $t.Substring(1) + (Sal-Frescura $s)))
  }

  # --- Pasos ---
  if ($n -match "pasos|camine") {
    if ($n -match "semana") {
      $v = @(Sal-Rango $s 6 | Where-Object { $null -ne $_.pasos })
      if ($v.Count -eq 0) { return (Sal-SinDatos "pasos de esta semana") }
      $tot = ($v | Measure-Object -Property pasos -Sum).Sum
      return (Sal-Say ("En los últimos " + $v.Count + " días hiciste " + (Sal-N $tot) + " pasos, unos " + (Sal-N ($tot / $v.Count)) + " por día." + (Sal-Frescura $s)))
    }
    $dia = Sal-Dia 0; $cual = "hoy"
    if ($n -match "\bayer\b") { $dia = Sal-Dia 1; $cual = "ayer" }
    $d = Sal-DiaDe $s $dia
    if (-not $d -or $null -eq $d.pasos) { return (Sal-SinDatos "pasos de $cual") }
    $t = "$cual hiciste " + (Sal-N $d.pasos) + " pasos"
    if ($d.dist) { $t += ", unos " + ([math]::Round([double]$d.dist, 1)).ToString("0.#", $script:salInv).Replace(".", ",") + " kilómetros" }
    $t += "."
    $prom = Sal-Prom (Sal-Rango $s 7 1 | ForEach-Object { $_.pasos })
    if ($null -ne $prom -and $cual -eq "ayer") { $t += " Tu promedio de los días anteriores es " + (Sal-N $prom) + "." }
    if ($cual -eq "hoy" -and $null -ne $prom) { $t += " Tu promedio diario de la última semana es " + (Sal-N $prom) + "." }
    return (Sal-Say (([string]$t.Substring(0, 1)).ToUpper() + $t.Substring(1) + (Sal-Frescura $s)))
  }

  # --- Pulsaciones ---
  if ($n -match "pulsaciones|frecuencia cardiaca|ritmo cardiaco|latidos") {
    $dia = Sal-Dia 0; $cual = "hoy"
    if ($n -match "\bayer\b") { $dia = Sal-Dia 1; $cual = "ayer" }
    $d = Sal-DiaDe $s $dia
    if (-not $d -or $null -eq $d.fcProm) { return (Sal-SinDatos "pulsaciones de $cual") }
    $t = "$cual tus pulsaciones promediaron " + (Sal-N $d.fcProm) + " por minuto, con un mínimo de " + (Sal-N $d.fcMin) + " y un máximo de " + (Sal-N $d.fcMax) + "."
    $prom = Sal-Prom (Sal-Rango $s 7 1 | ForEach-Object { $_.fcMin })
    if ($null -ne $prom) { $t += " Tu mínimo de los días anteriores es en promedio " + (Sal-N $prom) + "." }
    return (Sal-Say (([string]$t.Substring(0, 1)).ToUpper() + $t.Substring(1) + (Sal-Frescura $s)))
  }

  # --- Entrenamientos ---
  if ($n -match "entren|partido|corri") {
    $ej = @($s.ejercicio | Sort-Object { [string]$_.inicio })
    if ($ej.Count -eq 0) { return (Sal-SinDatos "entrenamientos") }
    if ($n -match "partido") {
      $f = @($ej | Where-Object { [string]$_.tipo -match "f.tbol" })
      if ($f.Count -eq 0) { return (Sal-Say "No encuentro partidos de fútbol en los entrenamientos. Si el reloj los guardó con otro tipo, decime y lo ajusto.") }
      return (Sal-Say ("Tu último partido: " + (Sal-Ejercicio $f[$f.Count - 1]) + "."))
    }
    if ($n -match "semana|corri|cuanto entrene") {
      $a = [datetime]::Today.AddDays(-6).ToString("yyyy-MM-dd", $script:salInv)
      $v = @($ej | Where-Object { [string]$_.inicio -ge $a })
      if ($n -match "corri") { $v = @($v | Where-Object { [string]$_.tipo -match "correr" }) }
      if ($v.Count -eq 0) { return (Sal-Say "No tengo entrenamientos de los últimos 7 días.") }
      $min = ($v | Measure-Object -Property min -Sum).Sum
      $dist = 0.0; foreach ($x in $v) { if ($x.dist) { $dist += [double]$x.dist } }
      $pl = "entrenamientos"; if ($v.Count -eq 1) { $pl = "entrenamiento" }
      $t = "En los últimos 7 días tuviste " + $v.Count + " $pl, " + (Sal-Horas $min) + " en total"
      if ($dist -gt 0) { $t += " y " + ([math]::Round($dist, 1)).ToString("0.#", $script:salInv).Replace(".", ",") + " kilómetros" }
      return (Sal-Say ($t + "." + (Sal-Frescura $s)))
    }
    return (Sal-Say ("Tu último entrenamiento: " + (Sal-Ejercicio $ej[$ej.Count - 1]) + "." + (Sal-Frescura $s)))
  }

  # --- Resumen ---
  if ($n -match "resumen de salud|como estoy de salud|como vengo") {
    $r = Sal-Rango $s 6
    if ($r.Count -eq 0 -and @($s.peso).Count -eq 0) { return (Sal-SinDatos "esta semana") }
    $partes = @()
    $ps = Sal-Prom ($r | ForEach-Object { $_.pasos }); if ($null -ne $ps) { $partes += ("pasos: " + (Sal-N $ps) + " por día") }
    $sl = Sal-Prom ($r | ForEach-Object { $_.sueno }); if ($null -ne $sl) { $partes += ("sueño: " + (Sal-Horas $sl) + " en promedio") }
    $fc = Sal-Prom ($r | ForEach-Object { $_.fcMin }); if ($null -ne $fc) { $partes += ("pulsaciones mínimas: " + (Sal-N $fc) + " en promedio") }
    $a = [datetime]::Today.AddDays(-6).ToString("yyyy-MM-dd", $script:salInv)
    $ne = @($s.ejercicio | Where-Object { [string]$_.inicio -ge $a }).Count
    $partes += ("entrenamientos: " + $ne)
    $p = @($s.peso | Sort-Object { [string]$_.fecha })
    if ($p.Count -gt 0) { $partes += ("último peso: " + (Sal-Kg $p[$p.Count - 1].kg) + " kilos") }
    return (Sal-Say ("Esta semana, " + ($partes -join "; ") + "." + (Sal-Frescura $s)))
  }

  return $null
}
