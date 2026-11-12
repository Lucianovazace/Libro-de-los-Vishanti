# Skill "futbol" de MIA: Boca (liga, Copa Argentina, copas internacionales), Champions League y los equipos top de Europa.
# Se carga desde cerebro.ps1 (dot-source). Usa Norm, $data, $utf8, $es e $inv del cerebro.
# Fuente: API publica de ESPN (sin clave). Config editable: datos\futbol.json
$futF = Join-Path $data "futbol.json"
$script:futCache = @{}
$script:futLigas = @{
  "arg.1" = "Liga Profesional"; "arg.copa" = "Copa Argentina"; "conmebol.libertadores" = "Copa Libertadores"; "conmebol.sudamericana" = "Copa Sudamericana"
  "uefa.champions" = "Champions League"; "eng.1" = "Premier League"; "esp.1" = "La Liga"; "ger.1" = "Bundesliga"; "ita.1" = "Serie A"; "fra.1" = "Ligue 1"
}
$script:futDef = @{
  boca = @{ id = "5"; nombre = "Boca"; espn = "boca juniors"; ligas = @("arg.1", "arg.copa", "conmebol.libertadores", "conmebol.sudamericana") }
  europa = @(
    @{ nombre = "Atlético Madrid"; espn = "atletico madrid"; alias = @("atletico madrid", "atletico", "el atleti", "atleti"); liga = "esp.1" },
    @{ nombre = "Real Madrid"; espn = "real madrid"; alias = @("real madrid", "madrid", "el madrid", "merengues"); liga = "esp.1" },
    @{ nombre = "Barcelona"; espn = "barcelona"; alias = @("barcelona", "barca", "el barca"); liga = "esp.1" },
    @{ nombre = "Manchester City"; espn = "manchester city"; alias = @("manchester city", "city", "el city"); liga = "eng.1" },
    @{ nombre = "Liverpool"; espn = "liverpool"; alias = @("liverpool"); liga = "eng.1" },
    @{ nombre = "Arsenal"; espn = "arsenal"; alias = @("arsenal"); liga = "eng.1" },
    @{ nombre = "Chelsea"; espn = "chelsea"; alias = @("chelsea"); liga = "eng.1" },
    @{ nombre = "Manchester United"; espn = "manchester united"; alias = @("manchester united", "united", "el united"); liga = "eng.1" },
    @{ nombre = "Bayern Múnich"; espn = "bayern"; alias = @("bayern", "bayern munich", "el bayern"); liga = "ger.1" },
    @{ nombre = "Borussia Dortmund"; espn = "dortmund"; alias = @("dortmund", "borussia"); liga = "ger.1" },
    @{ nombre = "PSG"; espn = "paris saint-germain"; alias = @("psg", "paris", "paris saint germain"); liga = "fra.1" },
    @{ nombre = "Inter"; espn = "inter milan"; alias = @("inter de milan", "inter milan", "el inter"); liga = "ita.1" },
    @{ nombre = "Milan"; espn = "ac milan"; alias = @("milan", "ac milan", "el milan"); liga = "ita.1" },
    @{ nombre = "Juventus"; espn = "juventus"; alias = @("juventus", "juve", "la juve"); liga = "ita.1" },
    @{ nombre = "Napoli"; espn = "napoli"; alias = @("napoli", "el napoli"); liga = "ita.1" }
  )
}
function Fut-Load {
  if (-not (Test-Path $futF)) { [System.IO.File]::WriteAllText($futF, ($script:futDef | ConvertTo-Json -Depth 6), $utf8) }
  try { return ([System.IO.File]::ReadAllText($futF, $utf8) | ConvertFrom-Json) } catch { return ($script:futDef | ConvertTo-Json -Depth 6 | ConvertFrom-Json) }
}

function Fut-Get([string]$url, [int]$ttlMin = 10) {
  if ($script:futCache.ContainsKey($url) -and (((Get-Date) - $script:futCache[$url].t).TotalMinutes -lt $ttlMin)) { return $script:futCache[$url].d }
  $req = [System.Net.HttpWebRequest]::Create($url)
  $req.Method = "GET"; $req.UserAgent = "Mozilla/5.0 (MIA)"; $req.Timeout = 7000; $req.ReadWriteTimeout = 7000
  $resp = $req.GetResponse()
  $sr = New-Object System.IO.StreamReader($resp.GetResponseStream(), $utf8)
  $txt = $sr.ReadToEnd(); $sr.Close(); $resp.Close()
  $d = $txt | ConvertFrom-Json
  $script:futCache[$url] = @{ t = (Get-Date); d = $d }
  return $d
}
function Fut-Score($x) {
  if ($null -eq $x) { return "" }
  if ($x.PSObject.Properties.Name -contains "displayValue") { return [string]$x.displayValue }
  return [string]$x
}
function Fut-Local([datetime]$utc) {
  try { return [TimeZoneInfo]::ConvertTimeFromUtc($utc, [TimeZoneInfo]::FindSystemTimeZoneById("Argentina Standard Time")) } catch { return $utc.AddHours(-3) }
}
function Fut-Ev($e, [string]$slug) {
  $c = $e.competitions[0]
  $h = $null; $a = $null
  foreach ($t in @($c.competitors)) { if ([string]$t.homeAway -eq "home") { $h = $t } else { $a = $t } }
  if (-not $h -or -not $a) { return $null }
  $dt = [datetime]::Parse([string]$e.date, $inv, ([Globalization.DateTimeStyles]::AdjustToUniversal -bor [Globalization.DateTimeStyles]::AssumeUniversal))
  return [pscustomobject]@{
    id = [string]$e.id; utc = $dt; estado = [string]$e.status.type.state; detalle = [string]$e.status.type.shortDetail
    local = [string]$h.team.displayName; visita = [string]$a.team.displayName
    gl = (Fut-Score $h.score); gv = (Fut-Score $a.score)
    liga = $script:futLigas[$slug]; slug = $slug
  }
}
function Fut-Scoreboard([string]$slug, [int]$atras, [int]$adelante) {
  $ini = (Get-Date).ToUniversalTime().AddDays(-$atras).ToString("yyyyMMdd")
  $fin = (Get-Date).ToUniversalTime().AddDays($adelante).ToString("yyyyMMdd")
  $r = Fut-Get "https://site.api.espn.com/apis/site/v2/sports/soccer/$slug/scoreboard?dates=$ini-$fin&limit=300"
  $out = @()
  foreach ($e in @($r.events)) { $x = $null; try { $x = Fut-Ev $e $slug } catch { }; if ($x) { $out += $x } }
  $script:futCal = $null; try { $script:futCal = @($r.leagues[0].calendar[0].entries) } catch { }
  return $out
}
function Fut-Es($ev, [string]$frag) { return ((Norm $ev.local).Contains($frag) -or (Norm $ev.visita).Contains($frag)) }
function Fut-Dedupe($lista) {
  $h = @{}
  foreach ($x in $lista) {
    if (-not $h.ContainsKey($x.id) -or ($x.estado -eq "post" -and $h[$x.id].estado -ne "post")) { $h[$x.id] = $x }
  }
  return @($h.Values | Sort-Object { $_.utc })
}
function Fut-Proximo($ev) { return (($ev.estado -eq "in") -or ($ev.estado -eq "pre" -and $ev.utc -gt [datetime]::UtcNow.AddHours(-3))) }

function Fut-Cuando($ev) {
  $loc = Fut-Local $ev.utc
  $hoy = (Fut-Local ([datetime]::UtcNow)).Date
  $dias = [int](($loc.Date - $hoy).TotalDays)
  $hora = if ($loc.Minute -eq 0) { "a las " + $loc.Hour } else { "a las " + $loc.ToString("H:mm") }
  switch ($dias) {
    0 { return "hoy $hora" }
    1 { return "mañana $hora" }
    -1 { return "ayer" }
    -2 { return "anteayer" }
    default { return "el " + $loc.ToString("dddd d 'de' MMMM", $es) + $(if ($dias -gt 0) { " $hora" } else { "" }) }
  }
}

# Boca: liga (historial + fixture) y copas (tablero de ~3 semanas atras y ~11 adelante)
function Fut-BocaEventos($cfg) {
  $lista = @(); $fallas = @()
  foreach ($slug in @($cfg.boca.ligas)) {
    try {
      if ($slug -eq "arg.1") {
        foreach ($u in @("https://site.api.espn.com/apis/site/v2/sports/soccer/arg.1/teams/$($cfg.boca.id)/schedule", "https://site.api.espn.com/apis/site/v2/sports/soccer/arg.1/teams/$($cfg.boca.id)/schedule?fixture=true")) {
          $r = Fut-Get $u
          foreach ($e in @($r.events)) { $x = $null; try { $x = Fut-Ev $e $slug } catch { }; if ($x) { $lista += $x } }
        }
      } else {
        foreach ($x in (Fut-Scoreboard $slug 21 75)) { if (Fut-Es $x $cfg.boca.espn) { $lista += $x } }
      }
    } catch { $fallas += $script:futLigas[$slug] }
  }
  return @{ items = (Fut-Dedupe $lista); fallas = $fallas }
}
function Fut-FraseProx($ev, [string]$mi, [string]$frag) {
  $local = (Norm $ev.local).Contains($frag)
  $rival = if ($local) { $ev.visita } else { $ev.local }
  if ($ev.estado -eq "in") { return "$mi esta jugando contra $rival por $($ev.liga): $($ev.local) $($ev.gl) a $($ev.gv) $($ev.visita), $($ev.detalle)" }
  $cond = if ($local) { "de local" } else { "de visitante" }
  return "$mi juega $(Fut-Cuando $ev) contra $rival, $cond, por $($ev.liga)"
}
function Fut-FraseRes($ev, [string]$mi, [string]$frag) {
  $local = (Norm $ev.local).Contains($frag)
  $rival = if ($local) { $ev.visita } else { $ev.local }
  $gm = if ($local) { [int]$ev.gl } else { [int]$ev.gv }
  $gr = if ($local) { [int]$ev.gv } else { [int]$ev.gl }
  $cond = if ($local) { "de local" } else { "de visitante" }
  $cuando = Fut-Cuando $ev
  if ($gm -gt $gr) { return "$mi le gano $gm a $gr a $rival $cond por $($ev.liga), $cuando" }
  if ($gm -lt $gr) { return "$mi perdio $gm a $gr con $rival $cond por $($ev.liga), $cuando" }
  return "$mi empato $gm a $gm con $rival $cond por $($ev.liga), $cuando"
}
function Fut-Boca([string]$modo) {
  $cfg = Fut-Load
  $r = Fut-BocaEventos $cfg
  $items = @($r.items)
  if ($items.Count -eq 0) { return @{ voz = "No pude consultar los partidos de Boca ahora."; display = "Sin datos de ESPN ($($r.fallas -join ', '))." } }
  $frag = [string]$cfg.boca.espn; $mi = [string]$cfg.boca.nombre
  $prox = @($items | Where-Object { Fut-Proximo $_ })
  $ult = @($items | Where-Object { $_.estado -eq "post" }); [array]::Reverse($ult)
  $lines = @(); $voz = @()
  if ($modo -eq "ultimo") {
    if ($ult.Count -gt 0) { $voz += (Fut-FraseRes $ult[0] $mi $frag) } else { $voz += "No encuentro partidos jugados de Boca." }
    foreach ($u in ($ult | Select-Object -First 5)) { $loc = Fut-Local $u.utc; $lines += "$($loc.ToString('dd/MM')) $($u.liga): $($u.local) $($u.gl) - $($u.gv) $($u.visita)" }
  } elseif ($modo -eq "vivo") {
    $vivo = @($prox | Where-Object { $_.estado -eq "in" })
    if ($vivo.Count -gt 0) { $voz += (Fut-FraseProx $vivo[0] $mi $frag) } else { $voz += "Boca no esta jugando en este momento."; if ($prox.Count -gt 0) { $voz += (Fut-FraseProx $prox[0] $mi $frag) } }
  } else {
    if ($prox.Count -gt 0) {
      $voz += (Fut-FraseProx $prox[0] $mi $frag)
      if ($prox.Count -gt 1) { $voz += "Despues: " + (Fut-FraseProx $prox[1] $mi $frag) }
    } else { $voz += "No encuentro el proximo partido de Boca todavia." }
    foreach ($p in ($prox | Select-Object -First 5)) { $loc = Fut-Local $p.utc; $lines += "$($loc.ToString('ddd dd/MM HH:mm', $es)) $($p.liga): $($p.local) vs $($p.visita)" }
  }
  if ($r.fallas.Count -gt 0) { $voz += "No pude consultar " + ($r.fallas -join " ni ") }
  return @{ voz = ($voz -join ". "); display = ($lines -join "`n") }
}

function Fut-EsSeguido($ev, $cfg) {
  foreach ($t in @($cfg.europa)) { $f = [string]$t.espn; if ((Norm $ev.local).Contains($f) -or (Norm $ev.visita).Contains($f)) { return $true } }
  return $false
}
function Fut-FaseEs([string]$s) {
  switch -regex ($s) {
    "(?i)league phase" { return "la fase de liga" }
    "(?i)play.?off" { return "los play-offs" }
    "(?i)round of 16" { return "los octavos de final" }
    "(?i)quarter" { return "los cuartos de final" }
    "(?i)semi" { return "las semifinales" }
    "(?i)final" { return "la final" }
    default { return $s }
  }
}
function Fut-Champions([string]$modo) {
  $cfg = Fut-Load
  $evs = @(Fut-Scoreboard "uefa.champions" 4 60)
  $cal = $script:futCal
  if ($modo -eq "ultimo") {
    $post = @($evs | Where-Object { $_.estado -eq "post" } | Sort-Object { $_.utc } -Descending)
    if ($post.Count -eq 0) { return @{ voz = "No tengo resultados recientes de la Champions."; display = "" } }
    $mios = @($post | Where-Object { Fut-EsSeguido $_ $cfg })
    $usar = if ($mios.Count -gt 0) { $mios } else { $post }
    $frases = @($usar | Select-Object -First 4 | ForEach-Object { "$($_.local) $($_.gl) a $($_.gv) $($_.visita)" })
    $lines = @($post | Select-Object -First 12 | ForEach-Object { "$((Fut-Local $_.utc).ToString('ddd dd/MM', $es)) $($_.local) $($_.gl) - $($_.gv) $($_.visita)" })
    return @{ voz = ("Ultimos de la Champions: " + ($frases -join ". ")); display = ($lines -join "`n") }
  }
  $prox = @($evs | Where-Object { Fut-Proximo $_ } | Sort-Object { $_.utc })
  $lines = @(); $voz = @()
  if ($prox.Count -eq 0) {
    $voz += "No veo partidos de Champions en las proximas semanas"
    $sig = $null
    foreach ($c in @($cal)) { try { $ini = [datetime]::Parse([string]$c.startDate, $inv, [Globalization.DateTimeStyles]::AdjustToUniversal -bor [Globalization.DateTimeStyles]::AssumeUniversal); if ($ini -gt [datetime]::UtcNow -and (-not $sig -or $ini -lt $sig.f)) { $sig = @{ f = $ini; n = [string]$c.label } } } catch { } }
    if ($sig) { $voz += "La siguiente fase, $(Fut-FaseEs $sig.n), arranca el " + (Fut-Local $sig.f).ToString("d 'de' MMMM", $es) }
  } else {
    $base = (Fut-Local $prox[0].utc).Date
    $jornada = @($prox | Where-Object { ((Fut-Local $_.utc).Date - $base).TotalDays -le 2 })
    $diasTxt = @($jornada | ForEach-Object { (Fut-Local $_.utc).ToString("dddd d", $es) } | Select-Object -Unique)
    $voz += "La Champions juega " + ($diasTxt -join " y ") + " con " + $jornada.Count + " partidos"
    $mios = @($jornada | Where-Object { Fut-EsSeguido $_ $cfg })
    if ($mios.Count -gt 0) {
      $frases = @($mios | Select-Object -First 4 | ForEach-Object { "$($_.local) contra $($_.visita) $(Fut-Cuando $_)" })
      $voz += "De tus equipos: " + ($frases -join ". ")
    } else { $voz += "Ninguno de tus equipos juega esa fecha" }
    foreach ($p in ($prox | Select-Object -First 12)) { $loc = Fut-Local $p.utc; $lines += "$($loc.ToString('ddd dd/MM HH:mm', $es)) $($p.local) vs $($p.visita)" }
  }
  foreach ($c in @($cal)) { try { if ($c.label) { $lines += "Fase: $($c.label) $(([string]$c.startDate).Substring(0,10)) a $(([string]$c.endDate).Substring(0,10))" } } catch { } }
  return @{ voz = ($voz -join ". "); display = ($lines -join "`n") }
}

function Fut-Equipo($t, [string]$modo) {
  $f = [string]$t.espn
  $lista = @(); $fallas = @()
  foreach ($slug in @([string]$t.liga, "uefa.champions")) {
    try { foreach ($x in (Fut-Scoreboard $slug 7 21)) { if (Fut-Es $x $f) { $lista += $x } } } catch { $fallas += $script:futLigas[$slug] }
  }
  $items = @(Fut-Dedupe $lista)
  if ($items.Count -eq 0) { return @{ voz = "No encontre partidos recientes ni proximos del $($t.nombre)."; display = "" } }
  $prox = @($items | Where-Object { Fut-Proximo $_ })
  $ult = @($items | Where-Object { $_.estado -eq "post" }); [array]::Reverse($ult)
  $voz = @()
  if ($modo -eq "ultimo") { if ($ult.Count -gt 0) { $voz += (Fut-FraseRes $ult[0] ([string]$t.nombre) $f) } else { $voz += "No tengo un partido reciente del $($t.nombre)" } }
  else { if ($prox.Count -gt 0) { $voz += (Fut-FraseProx $prox[0] ([string]$t.nombre) $f) } else { $voz += "No encuentro el proximo partido del $($t.nombre)" } }
  if ($fallas.Count -gt 0) { $voz += "No pude consultar " + ($fallas -join " ni ") }
  $lines = @($items | ForEach-Object { "$((Fut-Local $_.utc).ToString('ddd dd/MM HH:mm', $es)) $($_.liga): $($_.local) $($_.gl) - $($_.gv) $($_.visita) [$($_.estado)]" })
  return @{ voz = ($voz -join ". "); display = ($lines -join "`n") }
}

function Futbol-Decide([string]$said) {
  $n = Norm $said
  if ($n -match "camiseta") { return $null }
  $cuando = "cuando|que dia|proximo|proxima|siguiente|calendario|fixture|a que hora|cuando le toca|cuando es|fecha"
  $resu = "como salio|como quedo|como le fue|resultado|cuanto salio|cuanto quedo|gano|perdio|empato|ultimo partido|ultimo resultado"
  $vivo = "como va|como esta|esta jugando|juega ahora|en vivo|va ganando|va perdiendo"
  $cfg = $null

  # Boca
  if ($n -match "\bboca\b" -and $n -match "partido|juega|jugo|fixture|calendario|resultado|salio|quedo|gano|perdio|empato|como va|como esta|como le fue|le toca|en vivo") {
    $modo = "proximo"
    if ($n -match $vivo) { $modo = "vivo" } elseif ($n -match $resu) { $modo = "ultimo" }
    if ($n -match "cuando|proximo|proxima|siguiente|le toca|a que hora") { $modo = "proximo" }
    $r = Fut-Boca $modo
    return @{ ok = $true; action = "say"; reply = $r.voz; display = $r.display }
  }
  # Champions
  if ($n -match "champions|liga de campeones") {
    $modoC = "proximo"; if ($n -match $resu -and $n -notmatch $cuando) { $modoC = "ultimo" }
    $r = Fut-Champions $modoC
    return @{ ok = $true; action = "say"; reply = $r.voz; display = $r.display }
  }
  # Equipos top de Europa
  $cfg = Fut-Load
  foreach ($t in @($cfg.europa)) {
    foreach ($al in @($t.alias)) {
      if ($n -match "(^|\s)$([regex]::Escape((Norm $al)))(\s|$)" -and $n -match "partido|juega|jugo|resultado|salio|quedo|gano|perdio|empato|le toca|como le fue|cuando") {
        $modo = "proximo"; if ($n -match $resu -and $n -notmatch $cuando) { $modo = "ultimo" }
        $r = Fut-Equipo $t $modo
        return @{ ok = $true; action = "say"; reply = $r.voz; display = $r.display }
      }
    }
  }
  return $null
}
