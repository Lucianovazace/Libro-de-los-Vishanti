# Skill "objetos" de MIA: donde estan las cosas de la casa. Se carga desde cerebro.ps1 (dot-source). Usa Norm, $data y $utf8 del cerebro.
# Datos editables: datos\objetos.json  (lugares, objetos, dispositivos). El visor 3D (http://IP:5003/buscador) lee el mismo archivo.
$objF = Join-Path $data "objetos.json"
$script:objStop = @("el","la","los","las","de","del","en","al","a","un","una","unos","unas","mi","mis","lo","que","hay","esta","estan","por","con","y")
$script:objArt = @{ "Cocina" = "la cocina"; "Sala" = "la sala"; "Entrada" = "la entrada"; "Baño" = "el baño"; "Pieza" = "la pieza"; "Balcón" = "el balcón" }

function Obj-Load {
  if (-not (Test-Path $objF)) { return $null }
  try { return ([System.IO.File]::ReadAllText($objF, $utf8) | ConvertFrom-Json) } catch { return $null }
}
function Obj-Save($o) { [System.IO.File]::WriteAllText($objF, ($o | ConvertTo-Json -Depth 8), $utf8) }

# palabras "limpias" de un texto: sin acentos, sin articulos, plural -> singular simple, ordinales -> numero
function Obj-Words([string]$text) {
  $out = @()
  foreach ($w in ((Norm $text) -split " ")) {
    if (-not $w) { continue }
    if ($script:objStop -contains $w) { continue }
    switch -regex ($w) {
      "^(primer|primero|primera|uno|una)$" { $w = "1" }
      "^(segundo|segunda|dos)$" { $w = "2" }
      "^(tercer|tercero|tercera|tres)$" { $w = "3" }
      "^(cuarto|cuarta|cuatro)$" { $w = "4" }
      "^(quinto|quinta|cinco)$" { $w = "5" }
    }
    if ($w.Length -gt 3 -and $w.EndsWith("s")) { $w = $w.Substring(0, $w.Length - 1) }
    $out += $w
  }
  return $out
}
function Obj-Cap([string]$s) { if ($s.Length -eq 0) { return $s }; return $s.Substring(0, 1).ToUpper() + $s.Substring(1) }

function Obj-PlaceText($o, [string]$id) {
  $l = $o.lugares.$id
  if (-not $l) { return $id }
  $nom = ([string]$l.nombre) -replace " · ", ", "
  $amb = [string]$l.ambiente
  if ($script:objArt.ContainsKey($amb)) { $amb = $script:objArt[$amb] }
  if ((Norm $nom).StartsWith((Norm ([string]$l.ambiente)))) { return "en $nom" }
  return "en $amb, " + $nom.Substring(0, 1).ToLower() + $nom.Substring(1)
}

# lugares cuyas palabras incluyen TODAS las de la consulta
function Obj-FindPlaces($o, [string]$q) {
  $qw = @(Obj-Words $q)
  if ($qw.Count -eq 0) { return @() }
  $res = @()
  foreach ($p in $o.lugares.PSObject.Properties) {
    $l = $p.Value
    $hay = @(Obj-Words (([string]$l.ambiente) + " " + ([string]$l.nombre) + " " + ($p.Name -replace "_", " ")))
    $ok = $true
    foreach ($w in $qw) { if ($hay -notcontains $w) { $ok = $false; break } }
    if ($ok) { $res += $p.Name }
  }
  return $res
}
function Obj-FindItems($o, [string]$q) {
  $qw = @(Obj-Words $q)
  if ($qw.Count -eq 0) { return @() }
  $res = @()
  foreach ($it in @($o.objetos)) {
    $hay = @(Obj-Words (([string]$it.n) + " " + (@($it.t) -join " ")))
    $ok = $true
    foreach ($w in $qw) { if ($hay -notcontains $w) { $ok = $false; break } }
    if ($ok) { $res += $it }
  }
  return $res
}
function Obj-FindDevs($o, [string]$q) {
  $qw = @(Obj-Words $q)
  if ($qw.Count -eq 0) { return @() }
  $res = @()
  foreach ($d in @($o.dispositivos)) {
    $hay = @(Obj-Words (([string]$d.n) + " " + (@($d.t) -join " ")))
    $ok = $true
    foreach ($w in $qw) { if ($hay -notcontains $w) { $ok = $false; break } }
    if ($ok) { $res += $d }
  }
  return $res
}
function Obj-Say([string]$txt) { return @{ ok = $true; action = "say"; reply = $txt; display = $txt } }
function Obj-List([string[]]$names) {
  if ($names.Count -eq 1) { return $names[0] }
  return (($names | Select-Object -First ($names.Count - 1)) -join ", ") + " y " + $names[$names.Count - 1]
}

function Objetos-Decide([string]$said) {
  $n = Norm $said
  $o = $null

  # 1) "donde esta(n) X" / "donde dejamos X" / "en que cajon estan las pilas"
  $m = [regex]::Match($n, "^(?:mia )?(?:donde|en donde|en que (?:lugar|cajon|estante|mueble|parte))\s+(?:esta|estan|quedo|quedaron|dejamos|deje|guarde|guardamos|puse|tengo|tenemos|hay)\s+(.+)$")
  if ($m.Success) {
    $o = Obj-Load; if (-not $o) { return $null }
    $q = $m.Groups[1].Value
    $items = @(Obj-FindItems $o $q)
    if ($items.Count -gt 0) {
      $partes = @()
      foreach ($it in ($items | Select-Object -First 4)) {
        $p = Obj-PlaceText $o ([string]$it.c)
        $t = "$($it.n) $p"
        if ($it.ej) { $t += " (ojo: ese dato es de ejemplo, confirmalo)" }
        $partes += $t
      }
      return (Obj-Say (($partes -join ". ") + "."))
    }
    $devs = @(Obj-FindDevs $o $q)
    if ($devs.Count -gt 0) {
      $d = $devs[0]
      $donde = ([string]$d.donde) -replace " · ", ", "
      return (Obj-Say "$($d.n): $donde.")
    }
    return $null
  }

  # 2) "que hay en <lugar>"
  $m = [regex]::Match($n, "^(?:mia )?(?:que|que cosas|que tengo|que guardamos|que guarde)\s+(?:hay|tengo|tenemos|guardamos|guarde)?\s*(?:en|dentro de|sobre)\s+(.+)$")
  if ($m.Success) {
    $o = Obj-Load; if (-not $o) { return $null }
    # solo un ambiente ("que hay en la cocina"): lista todo lo cargado ahi
    $qw = @(Obj-Words $m.Groups[1].Value)
    if ($qw.Count -eq 1) {
      foreach ($amb in @("Cocina", "Sala", "Entrada", "Baño", "Pieza", "Balcón")) {
        if ((Obj-Words $amb)[0] -eq $qw[0]) {
          $ids = @($o.lugares.PSObject.Properties | Where-Object { [string]$_.Value.ambiente -eq $amb } | ForEach-Object { $_.Name })
          $dentro = @(@($o.objetos) | Where-Object { $ids -contains [string]$_.c } | ForEach-Object { [string]$_.n })
          if ($dentro.Count -eq 0) { return (Obj-Say "No tengo cosas cargadas en $($script:objArt[$amb]).") }
          return (Obj-Say ("En $($script:objArt[$amb]) tengo cargado: " + (Obj-List $dentro) + "."))
        }
      }
    }
    $pl = @(Obj-FindPlaces $o $m.Groups[1].Value)
    if ($pl.Count -eq 0) { return $null }
    if ($pl.Count -gt 1) {
      $nombres = @($pl | Select-Object -First 4 | ForEach-Object { ([string]$o.lugares.$_.nombre) -replace " · ", ", " })
      return (Obj-Say ("Hay varios lugares que coinciden: " + ($nombres -join "; ") + ". Decime cual."))
    }
    $id = $pl[0]
    $dentro = @(@($o.objetos) | Where-Object { [string]$_.c -eq $id } | ForEach-Object { [string]$_.n })
    $donde = (Obj-PlaceText $o $id).Substring(3)
    if ($dentro.Count -eq 0) { return (Obj-Say "No tengo cosas cargadas en $donde.") }
    return (Obj-Say ("En $donde hay: " + (Obj-List $dentro) + "."))
  }

  # 3) "guarde las pilas en el cajon 2 de la cocina" / "puse X en ..." / "movi X a ..."
  $m = [regex]::Match($n, "^(?:mia )?(?:guarde|guarda|guardamos|puse|pone|pusimos|deje|deja|dejamos|movi|mueve|meti|mete)\s+(?:el |la |los |las |mis |mi )?(.+?)\s+(?:en|dentro de|sobre|a)\s+(.+)$")
  if ($m.Success -and $n -notmatch "^(?:mia )?guarda(?:r)? que ") {
    $o = Obj-Load; if (-not $o) { return $null }
    $cosa = $m.Groups[1].Value.Trim()
    $pl = @(Obj-FindPlaces $o $m.Groups[2].Value)
    if ($pl.Count -eq 0) { return $null }
    if ($pl.Count -gt 1) {
      $nombres = @($pl | Select-Object -First 4 | ForEach-Object { ([string]$o.lugares.$_.nombre) -replace " · ", ", " })
      return (Obj-Say ("No se cual es: " + ($nombres -join "; ") + ". Repetime con mas detalle."))
    }
    $id = $pl[0]
    $items = @(Obj-FindItems $o $cosa)
    $exacto = $null
    foreach ($it in $items) { if ((Norm ([string]$it.n)) -eq $cosa -or (Norm ([string]$it.n)) -eq ($cosa + "s")) { $exacto = $it } }
    if (-not $exacto -and $items.Count -eq 1) { $exacto = $items[0] }
    if ($exacto) {
      $exacto.c = $id; $exacto.ej = $false
    } else {
      $nuevo = [pscustomobject]@{ n = (Obj-Cap $cosa); t = @(); c = $id; ej = $false }
      $o.objetos = @(@($o.objetos) + $nuevo)
    }
    Obj-Save $o
    $nom = if ($exacto) { [string]$exacto.n } else { Obj-Cap $cosa }
    return (Obj-Say "Listo, anote: $nom $(Obj-PlaceText $o $id).")
  }

  # 4) "borra X de mis cosas" / "ya no tengo X"
  $m = [regex]::Match($n, "^(?:mia )?(?:borra|saca|elimina|quita)\s+(?:el |la |los |las )?(.+?)\s+de (?:mis cosas|los objetos|la lista de objetos|la lista de cosas)$")
  if ($m.Success) {
    $o = Obj-Load; if (-not $o) { return $null }
    $items = @(Obj-FindItems $o $m.Groups[1].Value)
    if ($items.Count -eq 0) { return (Obj-Say "No encontre eso en tu lista de cosas.") }
    $it = $items[0]
    $o.objetos = @(@($o.objetos) | Where-Object { $_ -ne $it -and -not ([string]$_.n -eq [string]$it.n -and [string]$_.c -eq [string]$it.c) })
    Obj-Save $o
    return (Obj-Say "Listo, saque $($it.n) de tu lista de cosas.")
  }
  return $null
}
