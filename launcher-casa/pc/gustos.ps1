# ============================================================
# MIA - Gustos de cine (gustos.ps1) - SOLO PARA LUCIANO
# Conoce las peliculas que Luciano vio y como las puntuo (exportacion de Letterboxd) y sigue
# al dia con el feed publico de su perfil. Los datos estan en datos\gustos.json, que es PRIVADO
# (esta en .gitignore y no se sube al repo). Se arma con herramientas\build_gustos.py.
# Frases: "ya vi Dune?", "que puntaje le puse a Luca", "cual fue la ultima pelicula que vi",
#   "mis peliculas favoritas", "cuales puntue con 5 estrellas", "cuantas peliculas vi este ano",
#   "que tengo para ver", "recomendame una pelicula", "recomendame algo parecido a Dune".
# Se carga desde cerebro.ps1 (dot-source). Usa Norm, Get-Text, $root y (si existe) Est-Llm.
# ============================================================

$script:gusPath = Join-Path $root "datos\gustos.json"
$script:gus = $null
$script:gusSig = ""
$script:gusRssT = [datetime]::MinValue
$script:gusEs = [Globalization.CultureInfo]::GetCultureInfo("es-AR")

function Gus-Cargar {
  if (-not (Test-Path $script:gusPath)) { return $null }
  $fi = Get-Item $script:gusPath
  $sig = [string]$fi.LastWriteTimeUtc.Ticks
  if ($script:gus -and $sig -eq $script:gusSig) { return $script:gus }
  try {
    $j = Get-Content $script:gusPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $vis = New-Object System.Collections.ArrayList
    foreach ($v in $j.vistas) {
      $t = [string]$v.t
      $rr = $null; if ($null -ne $v.r) { $rr = [double]$v.r }
      $nn = Norm $t
      [void]$vis.Add(@{ t = $t; a = $v.a; r = $rr; f = [string]$v.f; l = [bool]$v.l; fav = [bool]$v.fav; n = $nn; n2 = ($nn -replace '^the ', '') })
    }
    $pen = New-Object System.Collections.ArrayList
    foreach ($p in $j.pendientes) { [void]$pen.Add(@{ t = [string]$p.t; a = $p.a; n = (Norm ([string]$p.t)) }) }
    $al = @{}
    if ($j.alias) { foreach ($p in $j.alias.PSObject.Properties) { $al[[string]$p.Name] = [string]$p.Value } }
    $sit = New-Object System.Collections.ArrayList
    foreach ($x in @($j.sitio)) { if ($x -and $x.t) { [void]$sit.Add(@{ t = [string]$x.t; tipo = [string]$x.tipo; a = $x.a; f = [string]$x.f; n = (Norm ([string]$x.t)) }) } }
    $script:gus = @{ usuario = [string]$j.usuario; vistas = $vis; pendientes = $pen; alias = $al; sitio = $sit; trad = @{} }
    $script:gusSig = $sig
    $script:gusRssT = [datetime]::MinValue
  } catch { Write-Host ("Gustos: no pude leer gustos.json: " + $_.Exception.Message); return $null }
  return $script:gus
}

function Gus-Tag([string]$s, [string]$tag) {
  $m = [regex]::Match($s, '(?s)<' + [regex]::Escape($tag) + '>(.*?)</' + [regex]::Escape($tag) + '>')
  if (-not $m.Success) { return "" }
  $v = $m.Groups[1].Value -replace '<!\[CDATA\[', '' -replace '\]\]>', ''
  return [System.Net.WebUtility]::HtmlDecode($v.Trim())
}

# Suma lo ultimo del feed publico (cada 6 horas) sin tocar el archivo
function Gus-Rss($g) {
  if (-not $g.usuario) { return }
  if (((Get-Date) - $script:gusRssT).TotalHours -lt 6) { return }
  $script:gusRssT = Get-Date
  try {
    $txt = Get-Text ("https://letterboxd.com/" + $g.usuario + "/rss/") "GET" "" 15000
    $estrella = [string][char]0x2605; $media = [string][char]0x00BD
    foreach ($m in [regex]::Matches($txt, '(?s)<item>(.*?)</item>')) {
      $it = $m.Groups[1].Value
      $tt = Gus-Tag $it "letterboxd:filmTitle"; $yy = Gus-Tag $it "letterboxd:filmYear"
      $rr = Gus-Tag $it "letterboxd:memberRating"; $ww = Gus-Tag $it "letterboxd:watchedDate"
      $rating = $null
      if ($rr -match '^\d+(\.\d+)?$') { $rating = [double]::Parse($rr, [Globalization.CultureInfo]::InvariantCulture) }
      if (-not $tt) {
        $ti = Gus-Tag $it "title"
        if ($ti -match '^(.*), (\d{4})(?: - (.*))?$') {
          $tt = $matches[1]; $yy = $matches[2]
          $st = [string]$matches[3]
          if ($st) { $rating = ($st.ToCharArray() | Where-Object { [string]$_ -eq $estrella }).Count; if ($st.Contains($media)) { $rating = $rating + 0.5 } }
        }
      }
      if (-not $tt) { continue }
      if (-not $ww) { $ww = (Get-Date).ToString("yyyy-MM-dd") }
      $nn = Norm $tt
      $ya = $null
      foreach ($v in $g.vistas) { if ($v.n -eq $nn -and ([string]$v.a -eq $yy -or -not $yy)) { $ya = $v; break } }
      if ($ya) {
        if ($ww -gt $ya.f) { $ya.f = $ww }
        if ($null -ne $rating -and $null -eq $ya.r) { $ya.r = $rating }
      } else {
        $anio = $null; if ($yy -match '^\d{4}$') { $anio = [int]$yy }
        [void]$g.vistas.Add(@{ t = $tt; a = $anio; r = $rating; f = $ww; l = $false; fav = $false; n = $nn; n2 = ($nn -replace '^the ', '') })
      }
    }
  } catch { Write-Host ("Gustos: no pude leer el feed de Letterboxd: " + $_.Exception.Message) }
}

function Gus-Estrellas($r) {
  if ($null -eq $r) { return "sin puntaje" }
  $r = [double]$r
  if ($r -eq 0.5) { return "media estrella" }
  $ent = [int][math]::Floor($r)
  if (($r - $ent) -gt 0) { return ($ent.ToString() + " y media") }
  if ($ent -eq 1) { return "1 estrella" }
  return ($ent.ToString() + " estrellas")
}

function Gus-Fecha([string]$f) {
  try {
    $d = [datetime]::ParseExact($f, "yyyy-MM-dd", [Globalization.CultureInfo]::InvariantCulture)
    $s = "el " + $d.Day + " de " + $script:gusEs.DateTimeFormat.GetMonthName($d.Month)
    if ($d.Year -ne (Get-Date).Year) { $s = $s + " de " + $d.Year }
    return $s
  } catch { return $f }
}

function Gus-Nombre($v) {
  if ($v.a) { return ($v.t + " (" + $v.a + ")") }
  return $v.t
}

function Gus-Buscar($g, [string]$texto) {
  $full = (Norm $texto)
  $full = ($full -replace '^(pelicula |peli |film |que se llama |llamada )', '').Trim()
  $strip = ($full -replace '^(la |el |los |las |un |una )', '').Trim()
  $cands = @($full)
  if ($strip -ne $full -and $strip.Length -ge 2) { $cands += $strip }
  # 1) titulo exacto (con alias en español) probando con y sin articulo
  foreach ($nq in $cands) {
    if ($nq.Length -lt 2) { continue }
    $q1 = $nq
    if ($g.alias.ContainsKey($nq)) { $q1 = Norm $g.alias[$nq] }
    $q2 = $q1 -replace '^the ', ''
    $exact = @($g.vistas | Where-Object { $_.n -eq $q1 -or $_.n2 -eq $q2 })
    if ($exact.Count -gt 0) { return $exact }
  }
  # 2) el titulo contiene lo dicho
  foreach ($nq in $cands) {
    if ($nq.Length -lt 4) { continue }
    $cont = @($g.vistas | Where-Object { $_.n -like ("*" + $nq + "*") })
    if ($cont.Count -gt 0) { return $cont }
  }
  # 3) lo dicho contiene un titulo (frases largas)
  foreach ($nq in $cands) {
    if ($nq.Length -lt 8) { continue }
    $cont = @($g.vistas | Where-Object { $_.n.Length -ge 6 -and $nq -like ("*" + $_.n + "*") })
    if ($cont.Count -gt 0) { return $cont }
  }
  return @()
}

# Traduce un titulo en español al original con el modelo (si no esta en el diccionario). Cachea el resultado.
function Gus-Traducir($g, [string]$texto) {
  $k = Norm $texto
  if ($g.trad.ContainsKey($k)) { return $g.trad[$k] }
  $res = ""
  if (Get-Command Est-Llm -ErrorAction SilentlyContinue) {
    try {
      $sys = "Sos un experto en cine. Te nombran una película, serie o juego por su título en español (o con un nombre popular). Respondé SOLO con el título original tal como figura en Letterboxd o IMDb, sin comillas, sin año y sin explicación. Si no estás seguro de cuál es, respondé exactamente: NO"
      $a = Est-Llm $sys $texto 40
      $l = (($a -split "`n")[0]).Trim().Trim('"')
      if ($l -and $l.Length -le 90 -and $l -ne "NO" -and $l -notmatch "^NO\b") { $res = $l }
    } catch { }
  }
  $g.trad[$k] = $res
  return $res
}

function Gus-BuscarSitio($g, [string]$texto) {
  $nq = (Norm $texto) -replace '^(la |el |los |las |un |una |serie |comic |libro |videojuego |juego )+', ''
  $nq = $nq.Trim()
  if ($nq.Length -lt 3) { return @() }
  $exact = @($g.sitio | Where-Object { $_.n -eq $nq })
  if ($exact.Count -gt 0) { return $exact }
  return @($g.sitio | Where-Object { $_.n -like ("*" + $nq + "*") })
}

function Gus-Lista($items, [int]$max) {
  $out = @()
  foreach ($v in ($items | Select-Object -First $max)) { $out += (Gus-Nombre $v) }
  return ($out -join ", ")
}

function Gus-Recomendar($g, [string]$parecido) {
  $vistos = @{}
  foreach ($v in $g.vistas) { $vistos[$v.n] = $true; $vistos[$v.n2] = $true }
  if (-not $parecido) {
    $disp = @($g.pendientes | Where-Object { -not $vistos.ContainsKey($_.n) })
    if ($disp.Count -gt 0) {
      $elegidas = Gus-Azar $disp 3
      $txt = Gus-Lista $elegidas 3
      return @{ voz = ("De tu lista para ver te sugiero: " + $txt + ". Decime cuál te tienta y te cuento lo que sepa."); display = ("Sugeridas de tu lista para ver:`n" + (($elegidas | ForEach-Object { Gus-Nombre $_ }) -join "`n")) }
    }
  }
  if (-not (Get-Command Est-Llm -ErrorAction SilentlyContinue)) { return $null }
  $top = @($g.vistas | Where-Object { $_.r -ge 4.5 } | Select-Object -First 30 | ForEach-Object { $_.t }) -join ", "
  $pedido = "Recomendame películas para ver esta noche."
  if ($parecido) { $pedido = "Recomendame películas parecidas a: " + $parecido + "." }
  $sys = "Sos MIA, el asistente de Luciano, en español rioplatense. Luciano ama estas películas (las puntuó con 4,5 o 5 estrellas): " + $top + ". Recomendá 8 películas REALES y conocidas que encajen con esos gustos, que no sean de esa lista. Respondé SOLO con una línea por película, con este formato exacto: Título (año). Sin comentarios ni numeración."
  try { $a = Est-Llm $sys $pedido 300 } catch { return $null }
  $ok = @()
  foreach ($l in ($a -split "`n")) {
    if ($l -match '^\s*[-\d\.\)\s]*(.+?)\s*\((\d{4})\)') {
      $tt = $matches[1].Trim(); $nn = Norm $tt
      if ($nn -and -not $vistos.ContainsKey($nn) -and -not $vistos.ContainsKey(($nn -replace '^the ', ''))) { $ok += ($tt + " (" + $matches[2] + ")") }
    }
  }
  if ($ok.Count -eq 0) { return $null }
  $ok = @($ok | Select-Object -First 3)
  return @{ voz = ("Te sugiero: " + ($ok -join ", ") + ". Ojo que son sugerencias mías, verificá los datos."); display = ("Sugerencias (del modelo, a verificar):`n" + ($ok -join "`n")) }
}

function Gus-Vista($g, [string]$q, [bool]$peli, [string]$n) {
  $q = ($q -replace '\b(alguna vez|todavia|antes|ya|en letterboxd|en la web|en mi lista)\b', ' ').Trim()
  $hits = @(Gus-Buscar $g $q)
  if ($hits.Count -eq 0 -and $g.sitio.Count -gt 0) {
    $sh = @(Gus-BuscarSitio $g $q)
    if ($sh.Count -gt 0) {
      $e = $sh[0]
      $cuando = ""; if ($e.f) { $cuando = " " + (Gus-Fecha $e.f) }
      $tipo = $e.tipo; if (-not $tipo) { $tipo = "título" }
      $txt = "Sí, en tu página de los Vishanti tenés marcado como visto " + $e.t + " (" + $tipo + ")" + $cuando + "."
      if ($sh.Count -gt 1) { $txt = "En tu página de los Vishanti tenés marcados " + $sh.Count + " títulos así: " + ((@($sh | Select-Object -First 4) | ForEach-Object { $_.t + " (" + $_.tipo + ")" }) -join "; ") + "." }
      return @{ ok = $true; action = "say"; reply = $txt }
    }
  }
  if ($hits.Count -eq 0 -and ($peli -or $n -match "ya vi|habia visto|puntaje|nota|puse")) {
    $en = Gus-Traducir $g $q
    if ($en) { $hits = @(Gus-Buscar $g $en) }
  }
  if ($hits.Count -eq 0) {
    if (-not $peli -and $n -notmatch "ya vi|habia visto|puntaje|nota|puse") { return $null }
    return @{ ok = $true; action = "say"; reply = "Esa no la encuentro entre tus películas vistas ni en tu página." }
  }
  if ($hits.Count -eq 1) {
    $v = $hits[0]
    $r = "Sí, viste " + (Gus-Nombre $v) + ". La registraste " + (Gus-Fecha $v.f) + "; " + $(if ($null -ne $v.r) { "la puntuaste con " + (Gus-Estrellas $v.r) } else { "no le pusiste puntaje" }) + "."
    if ($v.fav) { $r += " Es una de tus cuatro favoritas." } elseif ($v.l) { $r += " Además le diste like." }
    return @{ ok = $true; action = "say"; reply = $r }
  }
  $lista = @($hits | Select-Object -First 4 | ForEach-Object { (Gus-Nombre $_) + ", " + (Gus-Estrellas $_.r) })
  return @{ ok = $true; action = "say"; reply = ("Encontré " + $hits.Count + " parecidas: " + ($lista -join "; ") + ". ¿Cuál decís?"); display = (($hits | Select-Object -First 10 | ForEach-Object { (Gus-Nombre $_) + "  " + (Gus-Estrellas $_.r) }) -join "`n") }
}

function Gus-Azar($items, [int]$cuantos) {
  $arr = @($items)
  if ($arr.Count -eq 0) { return @() }
  return @($arr | Get-Random -Count ([math]::Min($cuantos, $arr.Count)))
}

function Gustos-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  $peli = ($n -match "\b(pelicula|peliculas|peli|pelis|film|films|cine|letterboxd|watchlist)\b")
  $disparos = ($peli -or $n -match "\b(serie|series|comic|comics|libro|libros|videojuego|videojuegos|ya vi|habia visto|vi la|vi el|que puntaje le puse|cuanto le puse|que nota le di|como puntue|estrellas|algo para ver|que veo)\b")
  if (-not $disparos) { return $null }
  if (-not $speaker) { $speaker = "Luciano" }
  if ($speaker -ne "Luciano") { return $null }
  $otros = ($n -match "\b(serie|series|comic|comics|libro|libros|videojuego|videojuegos|juego|juegos)\b")
  if ($otros -and -not $peli) {
    $gs = Gus-Cargar
    if (-not $gs -or $gs.sitio.Count -eq 0) { return $null }
    if ($n -match "cuant(?:as|os) (series|comics|libros|videojuegos|juegos)") {
      $mapa = @{ series = "Serie"; comics = "Cómic"; libros = "Libro"; videojuegos = "Videojuego"; juegos = "Videojuego" }
      $pref = $mapa[$matches[1]]
      $c = @($gs.sitio | Where-Object { $_.tipo -like ($pref + "*") })
      return @{ ok = $true; action = "say"; reply = ("En tu página de los Vishanti tenés marcados " + $c.Count + " " + $matches[1] + " como vistos o leídos.") }
    }
    if ($n -match "\b(?:ya vi|habia visto|vi|lei|jugue|termine)\s+(.+)$") {
      $sh = @(Gus-BuscarSitio $gs $matches[1])
      if ($sh.Count -eq 0) { return $null }
      $e = $sh[0]
      $cuando = ""; if ($e.f) { $cuando = " " + (Gus-Fecha $e.f) }
      return @{ ok = $true; action = "say"; reply = ("Sí, en tu página de los Vishanti tenés marcado " + $e.t + " (" + $e.tipo + ")" + $cuando + ".") }
    }
    return $null
  }
  if ($n -match "\b(camiseta|camisetas|calendario|agenda|clima|recordame|boca|madrid|barcelona|seleccion)\b") { return $null }

  $g = Gus-Cargar
  if (-not $g) {
    if ($n -match "letterboxd|mis peliculas|mis favoritas|que (pelicula|peli) vi|ya vi|puntaje") {
      return @{ ok = $true; action = "say"; reply = "Todavía no tengo cargado tu historial de cine. Copiá el archivo gustos punto json a la carpeta datos de la PC y probá de nuevo." }
    }
    return $null
  }
  Gus-Rss $g
  $vis = $g.vistas

  # --- ¿qué puntaje le puse a X?
  if ($n -match "\b(?:que puntaje le puse a|cuanto le puse a|que nota le di a|como puntue|que le puse a)\s+(.+)$") { $rv = Gus-Vista $g $matches[1] $peli $n; if ($rv) { return $rv } }

  # --- la última / las últimas
  if ($n -match "ultima (pelicula|peli)|(pelicula|peli) que vi (ultimo|recien|anoche|ayer|hoy)|ultima que vi|ultimas (peliculas|pelis)") {
    $ord = @($vis | Sort-Object { $_.f } -Descending)
    $cuantas = 1; if ($n -match "ultimas") { $cuantas = 5 }
    $sel = @($ord | Select-Object -First $cuantas)
    $partes = @(); foreach ($v in $sel) { $partes += ((Gus-Nombre $v) + ", " + (Gus-Fecha $v.f) + ", " + (Gus-Estrellas $v.r)) }
    $txt = "La última que registraste fue " + $partes[0] + "."
    if ($cuantas -gt 1) { $txt = "Las últimas que registraste: " + ($partes -join ". ") + "." }
    return @{ ok = $true; action = "say"; reply = $txt }
  }

  # --- favoritas
  if ($n -match "favorita|favoritas") {
    $f = @($vis | Where-Object { $_.fav })
    $c5 = @($vis | Where-Object { $_.r -ge 5 })
    $txt = ""
    if ($f.Count -gt 0) { $txt = "Tus cuatro favoritas en Letterboxd son " + (Gus-Lista $f 4) + ". " }
    $txt += "Además le pusiste cinco estrellas a " + $c5.Count + " películas, como " + (Gus-Lista (Gus-Azar $c5 4) 4) + "."
    return @{ ok = $true; action = "say"; reply = $txt }
  }

  # --- 5 estrellas / peores
  if ($n -match "(cinco|5) estrellas") {
    $c5 = @($vis | Where-Object { $_.r -ge 5 })
    return @{ ok = $true; action = "say"; reply = ("Puntuaste con cinco estrellas a " + $c5.Count + " películas. Por ejemplo: " + (Gus-Lista $c5 6) + "."); display = (($c5 | ForEach-Object { Gus-Nombre $_ }) -join "`n") }
  }
  if ($n -match "peores (peliculas|pelis)|(peor|peores) puntaje|menos me gustaron") {
    $mal = @($vis | Where-Object { $null -ne $_.r -and $_.r -le 1.5 } | Sort-Object { $_.r })
    return @{ ok = $true; action = "say"; reply = ("Las que peor puntuaste, con una estrella y media o menos, son " + $mal.Count + ". Por ejemplo: " + (Gus-Lista $mal 6) + "."); display = (($mal | ForEach-Object { (Gus-Nombre $_) + "  " + (Gus-Estrellas $_.r) }) -join "`n") }
  }

  # --- conteos y promedio
  if ($n -match "cuantas (peliculas|pelis)|promedio|nota media|puntaje medio") {
    $anio = (Get-Date).Year.ToString()
    if ($n -match "\b(20\d\d)\b") { $anio = $matches[1] }
    $pun = @($vis | Where-Object { $null -ne $_.r })
    $prom = [math]::Round((($pun | ForEach-Object { $_.r } | Measure-Object -Average).Average), 1)
    if ($n -match "promedio|nota media|puntaje medio") { return @{ ok = $true; action = "say"; reply = ("Tu puntaje promedio es " + $prom.ToString("0.0", $script:gusEs) + " estrellas sobre " + $pun.Count + " películas puntuadas.") } }
    if ($n -match "este ano|en 20\d\d") {
      $del = @($vis | Where-Object { $_.f.StartsWith($anio) })
      return @{ ok = $true; action = "say"; reply = ("En " + $anio + " registraste " + $del.Count + " películas.") }
    }
    return @{ ok = $true; action = "say"; reply = ("Viste " + $vis.Count + " películas y puntuaste " + $pun.Count + ", con un promedio de " + $prom.ToString("0.0", $script:gusEs) + " estrellas.") }
  }

  # --- lista para ver / recomendaciones
  if ($n -match "para ver|watchlist|pendientes?|que me falta ver") {
    $vistos = @{}; foreach ($v in $vis) { $vistos[$v.n] = $true }
    $disp = @($g.pendientes | Where-Object { -not $vistos.ContainsKey($_.n) })
    if ($disp.Count -eq 0) { return @{ ok = $true; action = "say"; reply = "No tenés películas pendientes cargadas." } }
    $sel = Gus-Azar $disp 3
    return @{ ok = $true; action = "say"; reply = ("Tenés " + $disp.Count + " películas en tu lista para ver. Por ejemplo: " + (Gus-Lista $sel 3) + ".") }
  }
  if (($peli -or $n -match "para ver|que veo|esta noche") -and $n -match "recomend|sugeri|que (pelicula|peli) (veo|vemos|miro|puedo ver|podemos ver)|que veo|algo para ver") {
    $par = ""
    if ($n -match "(?:parecid[ao]s? a|similar(?:es)? a|como|igual que)\s+(.+)$") { $par = $matches[1] }
    $rec = Gus-Recomendar $g $par
    if ($rec) { return @{ ok = $true; action = "say"; reply = $rec.voz; display = $rec.display } }
    return $null
  }

  # --- gustos en general
  if ($n -match "mis gustos|que (peliculas )?me gustan|que tipo de (cine|peliculas)|conoces mis gustos|me conoces") {
    $pun = @($vis | Where-Object { $null -ne $_.r })
    $prom = [math]::Round((($pun | ForEach-Object { $_.r } | Measure-Object -Average).Average), 1)
    $dec = @($vis | Where-Object { $_.a } | Group-Object { [int]([math]::Floor($_.a / 10) * 10) } | Sort-Object Count -Descending | Select-Object -First 1)
    $c5 = @($vis | Where-Object { $_.r -ge 5 })
    $txt = "Viste " + $vis.Count + " películas, con un promedio de " + $prom.ToString("0.0", $script:gusEs) + " estrellas. Tu década fuerte es la de " + $dec[0].Name + ". Tus cinco estrellas incluyen " + (Gus-Lista (Gus-Azar $c5 4) 4) + "."
    return @{ ok = $true; action = "say"; reply = $txt }
  }
  # --- "ya vi X" / "vi X" (al final para no tragarse "que pelicula vi ayer")
  if ($n -match "\b(?:ya vi|habia visto|alguna vez vi|vi)\s+(.+)$") { $rv = Gus-Vista $g $matches[1] $peli $n; if ($rv) { return $rv } }
  return $null
}
