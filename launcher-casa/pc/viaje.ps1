# Skill de viajes de MIA: "cuánto tardo en llegar a X", "cómo llego a casa", "guardá mi ubicación como casa".
# Usa la ubicación que mandan las apps (activarla en el menú del orbe: "Ubicación (tiempos de viaje)").
# Mapas y rutas: OpenStreetMap (Nominatim para buscar lugares, routing.openstreetmap.de para la ruta). Gratis, SIN tráfico en vivo.
# Lugares propios: datos\lugares.json  ->  { "casa": { "lat": -38.0, "lon": -57.5, "alias": ["mi casa","el depto"] } }
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$script:ubic = $null
$lugaresF = Join-Path $data "lugares.json"
$script:invc = [Globalization.CultureInfo]::InvariantCulture

function Lugares-Load {
  if (-not (Test-Path $lugaresF)) { return @{} }
  try {
    $o = [System.IO.File]::ReadAllText($lugaresF, $utf8) | ConvertFrom-Json
    $h = @{}
    foreach ($p in $o.PSObject.Properties) { $h[$p.Name] = $p.Value }
    return $h
  } catch { return @{} }
}
function Lugares-Save($h) { [System.IO.File]::WriteAllText($lugaresF, ($h | ConvertTo-Json -Depth 5), $utf8) }

function Viaje-Duracion([double]$seg) {
  $min = [int][Math]::Round($seg / 60.0)
  if ($min -lt 1) { return "menos de un minuto" }
  if ($min -lt 60) { if ($min -eq 1) { return "1 minuto" } else { return "$min minutos" } }
  $h = [int][Math]::Floor($min / 60); $r = $min - $h * 60
  $hs = "$h horas"; if ($h -eq 1) { $hs = "1 hora" }
  if ($r -eq 0) { return $hs } else { return "$hs y $r minutos" }
}

function Viaje-Buscar([string]$q) {
  $lugares = Lugares-Load
  $nq = Norm $q
  foreach ($k in $lugares.Keys) {
    $names = @($k) + @($lugares[$k].alias)
    foreach ($nm in $names) { if ($nm -and ((Norm ([string]$nm)) -eq $nq)) { return @{ lat = [double]$lugares[$k].lat; lon = [double]$lugares[$k].lon; nombre = $k } } }
  }
  $ua = "MIA-asistente-casa/1.0 (uso personal)"
  foreach ($suf in @(", Mar del Plata, Buenos Aires, Argentina", ", Argentina")) {
    $url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ar&q=" + [uri]::EscapeDataString($q + $suf)
    try {
      $r = @(Invoke-RestMethod -Uri $url -UserAgent $ua -TimeoutSec 10)
      if ($r.Count -gt 0) { return @{ lat = [double]::Parse($r[0].lat, $script:invc); lon = [double]::Parse($r[0].lon, $script:invc); nombre = $q } }
    } catch { }
    Start-Sleep -Milliseconds 1100
  }
  return $null
}

function Viaje-Ruta($a, $b, [string]$modo) {
  $coords = [string]::Format($script:invc, "{0},{1};{2},{3}", $a.lon, $a.lat, $b.lon, $b.lat)
  $urls = @()
  switch ($modo) {
    "foot" { $urls += "https://routing.openstreetmap.de/routed-foot/route/v1/driving/$coords?overview=false" }
    "bike" { $urls += "https://routing.openstreetmap.de/routed-bike/route/v1/driving/$coords?overview=false" }
    default { $urls += "https://routing.openstreetmap.de/routed-car/route/v1/driving/$coords?overview=false"; $urls += "https://router.project-osrm.org/route/v1/driving/$coords?overview=false" }
  }
  foreach ($u in $urls) {
    try {
      $r = Invoke-RestMethod -Uri $u -UserAgent "MIA-asistente-casa/1.0" -TimeoutSec 10
      if ($r.routes -and $r.routes.Count -gt 0) { return @{ seg = [double]$r.routes[0].duration; m = [double]$r.routes[0].distance } }
    } catch { }
  }
  return $null
}

function Viaje-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  $guardar = [regex]::Match($n, "(guarda|anota|marca|grabate|memoriza)\w* (mi ubicacion|este lugar|donde estoy|mi posicion)( actual)? (como|de) (.+)$")
  $pregunta = ($n -match "(cuanto|cuanta) (tardo|tarda|demoro|demora|falta|me falta|se tarda|me lleva|lleva|tiempo|distancia)|en cuanto (llego|llegaria)|a que hora (llego|llegaria)|como llego|como voy a|tiempo de viaje|ruta a|cuanto para llegar") -and ($n -match "llegar|llego|llegaria|ir a|ir al|ir hasta|voy|volver|viaje|ruta|tardo|tarda|demoro|demora|distancia")
  if (-not $guardar.Success -and -not $pregunta) { return $null }
  if ($speaker -eq "invitado") { return @{ ok = $true; action = "say"; reply = "Eso solo lo pueden pedir Luciano o Mili." } }
  $u = $script:ubic
  if (-not $u) {
    return @{ ok = $true; action = "say"; reply = "No tengo tu ubicación. Activá Ubicación en el menú de la app, manteniendo apretado el orbe, y probá de nuevo." }
  }
  if ($guardar.Success) {
    $nombre = $guardar.Groups[5].Value.Trim()
    if (-not $nombre) { return $null }
    $h = Lugares-Load
    $h[$nombre] = @{ lat = $u.lat; lon = $u.lon; alias = @() }
    Lugares-Save $h
    return @{ ok = $true; action = "say"; reply = "Listo, guardé este lugar como $nombre." }
  }
  # Modo de viaje
  $modo = "car"; $modoTxt = "en auto"
  if ($n -match "caminando|a pie|caminar") { $modo = "foot"; $modoTxt = "caminando" }
  elseif ($n -match "bici|bicicleta") { $modo = "bike"; $modoTxt = "en bici" }
  $nota = ""
  if ($n -match "colectivo|bondi|omnibus|transporte|micro") { $nota = " El transporte público no lo calculo; te doy el tiempo en auto." }
  # Destino: lo que viene después de la última preposición
  $m = [regex]::Match($n, "\b(?:a|al|hasta|hacia|para)\s+(?:la\s+|el\s+|los\s+|las\s+)?([a-z0-9 ]+?)(?:\s+(?:caminando|a pie|en bici|en bicicleta|en auto|en colectivo|en bondi|en coche|ahora|hoy))*$")
  $dest = ""
  if ($m.Success) { $dest = $m.Groups[1].Value.Trim() }
  if ($dest -match "^(llegar|ir|volver|viajar|casa de vuelta)$" -or -not $dest) {
    $m2 = [regex]::Match($n, "(?:llegar|ir|volver|viajar|llego|voy)\s+(?:a|al|hasta|hacia)?\s*(?:la\s+|el\s+)?([a-z0-9 ]+)$")
    if ($m2.Success) { $dest = $m2.Groups[1].Value.Trim() }
  }
  if (-not $dest) { return @{ ok = $true; action = "say"; reply = "¿A dónde querés ir? Decime, por ejemplo: cuánto tardo en llegar a la costa." } }
  $b = Viaje-Buscar $dest
  if (-not $b) { return @{ ok = $true; action = "say"; reply = "No encontré $dest en el mapa. Probá con la dirección o el nombre más completo, o guardalo con: guardá mi ubicación como $dest." } }
  $a = @{ lat = $u.lat; lon = $u.lon }
  $r = Viaje-Ruta $a $b $modo
  if (-not $r) { return @{ ok = $true; action = "say"; reply = "No pude calcular la ruta ahora. ¿Hay internet en la PC?" } }
  $km = [Math]::Round($r.m / 1000.0, 1)
  $kmTxt = $km.ToString("0.0", $es)
  $llega = (Get-Date).AddSeconds($r.seg).ToString("H:mm", $inv)
  $reply = "Estás a unos $(Viaje-Duracion $r.seg) $modoTxt de $dest, unos $kmTxt kilómetros, sin contar el tráfico. Llegarías a las $llega.$nota"
  if ($u.edad -gt 600) { $reply += " Ojo, tu última ubicación es de hace " + [int]($u.edad / 60) + " minutos." }
  return @{ ok = $true; action = "say"; reply = $reply }
}
