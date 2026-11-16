# Skill "comidas" de MIA: registro simple de lo que come Luciano (por voz o cargado desde fotos). Solo Luciano.
# Datos: datos\comidas.json (solo en esta PC). Se carga desde cerebro.ps1 (dot-source).
$comF = Join-Path $data "comidas.json"
function Com-Load { if (Test-Path $comF) { try { $r = [System.IO.File]::ReadAllText($comF, $utf8) | ConvertFrom-Json; return @($r) } catch { } }; return @() }
function Com-Save($l) { [System.IO.File]::WriteAllText($comF, (ConvertTo-Json -InputObject @($l) -Depth 4), $utf8) }

# Tabla de alimentos comunes (aprox.): clave(s) separadas por "/" | nombre | kcal/100g | prot | carb | gras | porcion en g
$script:comTabla = @"
milanesa napolitana|milanesa napolitana|230|18|12|12|250
milanesa|milanesa|250|20|14|13|150
pure|puré de papa|90|2|15|3|200
papas fritas/papa frita|papas fritas|312|3.4|41|15|150
papa hervida/papas hervidas|papa hervida|87|1.9|20|0.1|200
arroz|arroz|130|2.7|28|0.3|200
fideos/tallarines/spaghetti/espagueti/ravioles|fideos|158|5.8|31|0.9|250
noquis|ñoquis|130|3|27|0.8|250
polenta|polenta|70|1.6|15|0.4|250
pizza|pizza (porción)|270|11|33|10|110
empanada/empanadas|empanada|250|10|25|12|90
choripan|choripán|270|12|25|17|200
hamburguesa|hamburguesa completa|250|13|25|11|200
asado|asado|270|25|0|19|200
bife|bife|200|27|0|10|200
carne|carne vacuna|200|27|0|10|200
pollo|pollo|190|27|0|8|200
huevo/huevos|huevo|143|12.6|0.7|9.5|55
tostado|tostado de jamón y queso|260|13|28|10|120
tostada/tostadas|tostada|300|10|55|4|25
pan|pan|265|9|49|3.2|60
sandwich de miga/sanguchito de miga|sándwich de miga|250|10|30|9|40
medialuna/medialunas|medialuna|400|8|45|21|55
facturas/factura|factura|400|7|48|20|60
jamon|jamón cocido|110|17|1|4|30
queso|queso|300|20|2|24|40
leche|leche|61|3.2|4.8|3.3|250
yogur|yogur|62|3.5|4.7|3.3|200
cafe con leche|café con leche|35|1.8|3|1.5|250
tarta|tarta|230|7|22|12|150
guiso|guiso|120|7|16|3|350
lentejas|guiso de lentejas|120|7|16|3|300
sopa|sopa|40|2|6|1|300
ensalada|ensalada (sin aderezo)|25|1.5|4|0.3|150
manzana|manzana|52|0.3|14|0.2|180
banana/platano|banana|89|1.1|23|0.3|120
naranja|naranja|47|0.9|12|0.1|180
galletitas/galletita|galletitas dulces|480|6|70|19|30
alfajor/alfajores|alfajor|410|4|63|16|50
helado|helado|207|3.5|24|11|100
dulce de leche|dulce de leche|320|6|55|8|30
coca/coca cola/gaseosa|gaseosa|42|0|10.6|0|350
cerveza|cerveza|43|0.5|3.6|0|330
vino|vino|85|0.1|2.6|0|150
"@
$script:comNum = @{ un = 1; una = 1; uno = 1; dos = 2; tres = 3; cuatro = 4; cinco = 5; seis = 6; medio = 0.5; media = 0.5 }
function Com-Estimar([string]$txt) {
  $n = Norm $txt
  $tot = @{ kcal = 0.0; prot = 0.0; carb = 0.0; gras = 0.0 }; $hallados = @(); $usado = @{}
  foreach ($ln in ($script:comTabla -split "`n")) {
    $f = $ln.Trim().Split("|"); if ($f.Count -lt 7) { continue }
    foreach ($k in ($f[0] -split "/")) {
      $m = [regex]::Match($n, "(?:^|\s)(?:(\d+(?:[\.,]\d+)?|un|una|uno|dos|tres|cuatro|cinco|seis|medio|media)\s+(?:de\s+)?)?" + [regex]::Escape($k) + "(?=\s|$)")
      if (-not $m.Success) { continue }
      if ($usado[$f[1]]) { break }
      $q = 1.0
      if ($m.Groups[1].Success) { $v = $m.Groups[1].Value; if ($script:comNum.ContainsKey($v)) { $q = [double]$script:comNum[$v] } else { $q = [double]::Parse(($v -replace ",", "."), [Globalization.CultureInfo]::InvariantCulture) } }
      $g = $q * [double]::Parse($f[6], [Globalization.CultureInfo]::InvariantCulture)
      $inv = [Globalization.CultureInfo]::InvariantCulture
      $tot.kcal += $g / 100 * [double]::Parse($f[2], $inv); $tot.prot += $g / 100 * [double]::Parse($f[3], $inv); $tot.carb += $g / 100 * [double]::Parse($f[4], $inv); $tot.gras += $g / 100 * [double]::Parse($f[5], $inv)
      $usado[$f[1]] = $true; $hallados += $f[1]; break
    }
  }
  if ($hallados.Count -eq 0) { return $null }
  return [pscustomobject]@{ kcal = [int]([math]::Round($tot.kcal / 10) * 10); prot = [int][math]::Round($tot.prot); carb = [int][math]::Round($tot.carb); gras = [int][math]::Round($tot.gras); items = ($hallados -join ", ") }
}
function Com-Say([string]$t) { return @{ ok = $true; action = "say"; reply = $t } }
function Com-Momento([string]$v, [datetime]$ahora) {
  if ($v -match "desayun") { return "desayuno" }
  if ($v -match "almorc|almorz|almuerz") { return "almuerzo" }
  if ($v -match "meriend") { return "merienda" }
  if ($v -match "cen[eoa]") { return "cena" }
  $h = $ahora.Hour
  if ($h -lt 11) { return "desayuno" }; if ($h -lt 15) { return "almuerzo" }; if ($h -lt 19) { return "merienda" }; return "cena"
}
function Comidas-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  if (-not $n) { return $null }
  $anotar = [regex]::Match($n, "^(?:mia )?(?:hoy |recien |ayer )?(?:yo )?(comi|almorce|cene|desayune|meriende|me comi|me tome)\s+(.+)$")
  $calor = $n -match "\b(cuantas calorias|calorias de|cuanto comi)\b"
  $consulta = $calor -or $n -match "\bque (?:comi|almorce|cene|desayune|meriende)\b|\bque (?:vengo comiendo|comida anote)\b|\bmis comidas\b"
  $borrar = $n -match "^(?:mia )?(?:borra|saca|elimina)\w* (?:lo ultimo que comi|la ultima comida)"
  if (-not $anotar.Success -and -not $consulta -and -not $borrar) { return $null }
  if ($speaker -and $speaker -ne "Luciano") { return (Com-Say "El registro de comidas es privado: solo Luciano lo puede usar.") }
  $l = @(Com-Load)
  if ($borrar) {
    if ($l.Count -eq 0) { return (Com-Say "No hay comidas anotadas.") }
    $u = $l[$l.Count - 1]; $l = @($l | Select-Object -First ($l.Count - 1)); Com-Save $l
    return (Com-Say ("Listo, borré: " + $u.texto + "."))
  }
  if ($anotar.Success) {
    $ahora = Get-Date
    $dia = $ahora; if ($n -match "^(?:mia )?ayer ") { $dia = $ahora.AddDays(-1) }
    $txt = $anotar.Groups[2].Value.Trim()
    $mom = Com-Momento $anotar.Groups[1].Value $ahora
    $est = Com-Estimar $txt
    $reg = [pscustomobject]@{ fecha = $dia.ToString("yyyy-MM-dd"); hora = $ahora.ToString("HH:mm"); momento = $mom; texto = $txt; fuente = "voz" }
    if ($est) { $reg | Add-Member -NotePropertyName kcal -NotePropertyValue $est.kcal; $reg | Add-Member -NotePropertyName prot -NotePropertyValue $est.prot; $reg | Add-Member -NotePropertyName carb -NotePropertyValue $est.carb; $reg | Add-Member -NotePropertyName gras -NotePropertyValue $est.gras }
    $l += $reg; Com-Save $l
    $extra = ""; if ($est) { $extra = " Calculo unas " + $est.kcal + " calorías, aproximadas." }
    return (Com-Say ("Anotado en " + $mom + ": " + $txt + "." + $extra))
  }
  # consulta
  $desde = (Get-Date).Date; $hasta = $desde; $cuando = "hoy"
  if ($n -match "\bayer\b") { $desde = $desde.AddDays(-1); $hasta = $desde; $cuando = "ayer" }
  elseif ($n -match "semana") { $desde = $desde.AddDays(-6); $cuando = "en los últimos 7 días" }
  $sel = @($l | Where-Object { $d = [datetime]::ParseExact([string]$_.fecha, "yyyy-MM-dd", $null); $d -ge $desde -and $d -le $hasta })
  if ($sel.Count -eq 0) { return (Com-Say "No tengo comidas anotadas para $cuando.") }
  if ($calor) {
    $k = 0; $sin = 0; foreach ($c in $sel) { if ($c.kcal) { $k += [int]$c.kcal } else { $sin++ } }
    $t = "Para $cuando sumo unas $k calorías aproximadas"; if ($sin -gt 0) { $t += ", sin contar $sin comida(s) que no pude calcular" }
    return (Com-Say ($t + "."))
  }
  $partes = @(); foreach ($c in $sel) { $p = [string]$c.momento + ": " + [string]$c.texto; if ($cuando -like "en los*") { $p = ([datetime]::ParseExact([string]$c.fecha, "yyyy-MM-dd", $null)).ToString("dd/MM") + " " + $p }; $partes += $p }
  $r = Com-Say ("Anotado " + $cuando + " -> " + ($partes -join ". ") + ".")
  return $r
}
