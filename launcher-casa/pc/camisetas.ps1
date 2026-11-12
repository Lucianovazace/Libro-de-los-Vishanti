# Skill "camisetas" de MIA. Se carga desde cerebro.ps1 (dot-source). Usa Norm y $data del cerebro.
# Config editable: datos\camisetas.json  (talle, precio maximo, equipos, tiendas)
$camF = Join-Path $data "camisetas.json"
$camOut = Join-Path $data "camisetas-ultimo.txt"
$camDiag = Join-Path $data "camisetas-diagnostico.txt"
$script:camDefault = @{
  talle = "M"; maxPrecio = 0
  equipos = @("Argentina", "Inter Miami", "Manchester City")
  tiendas = @(
    @{ nombre = "Sporting"; tipo = "vtex"; base = "https://www.sporting.com.ar"; activa = $true },
    @{ nombre = "Open Sports"; tipo = "vtex"; base = "https://www.opensports.com.ar"; activa = $true },
    @{ nombre = "Adidas"; tipo = "adidas"; base = "https://www.adidas.com.ar"; activa = $true },
    @{ nombre = "Nike"; tipo = "vtex"; base = "https://www.nike.com.ar"; activa = $true },
    @{ nombre = "Puma"; tipo = "vtex"; base = "https://ar.puma.com"; activa = $true },
    @{ nombre = "Dexter"; tipo = "vtex"; base = "https://www.dexter.com.ar"; activa = $true },
    @{ nombre = "Netshoes"; tipo = "vtex"; base = "https://www.netshoes.com.ar"; activa = $true },
    @{ nombre = "Digital Sport"; tipo = "vtex"; base = "https://www.digitalsport.com.ar"; activa = $true },
    @{ nombre = "Solo Deportes"; tipo = "vtex"; base = "https://www.solodeportes.com.ar"; activa = $true },
    @{ nombre = "Stock Center"; tipo = "vtex"; base = "https://www.stockcenter.com.ar"; activa = $true },
    @{ nombre = "Moov"; tipo = "vtex"; base = "https://www.moov.com.ar"; activa = $true },
    @{ nombre = "Mercado Libre"; tipo = "ml"; base = "https://listado.mercadolibre.com.ar"; activa = $true }
  )
}
function Cam-Load {
  if (-not (Test-Path $camF)) { [System.IO.File]::WriteAllText($camF, ($script:camDefault | ConvertTo-Json -Depth 6), $utf8) }
  try { return ([System.IO.File]::ReadAllText($camF, $utf8) | ConvertFrom-Json) } catch { return ($script:camDefault | ConvertTo-Json -Depth 6 | ConvertFrom-Json) }
}
function Cam-Save($c) { [System.IO.File]::WriteAllText($camF, ($c | ConvertTo-Json -Depth 6), $utf8) }

function Cam-Vtex($tienda, [string]$q, [string]$talle) {
  $url = "$($tienda.base)/api/catalog_system/pub/products/search?ft=$([uri]::EscapeDataString($q))&_from=0&_to=11"
  $r = Invoke-RestMethod -Uri $url -TimeoutSec 6 -UserAgent "Mozilla/5.0" -Headers @{ Accept = "application/json" }
  $out = @()
  foreach ($p in @($r)) {
    $name = [string]$p.productName
    if ((Norm $name) -notmatch "camiseta|remera|jersey") { continue }
    $best = $null
    foreach ($it in @($p.items)) {
      $of = $it.sellers[0].commertialOffer
      if (-not $of -or $of.AvailableQuantity -le 0) { continue }
      $tal = ""; try { $tal = (@($it.Talle) + @($it.Talles) + @($it.name)) -join " " } catch { }
      if ($talle -and ($tal -notmatch "(^|\W)$talle(\W|$)")) { continue }
      if (-not $best -or $of.Price -lt $best) { $best = [double]$of.Price }
    }
    if ($best) { $out += @{ tienda = $tienda.nombre; nombre = $name; precio = $best; link = [string]$p.link } }
  }
  return $out
}
function Cam-Adidas($tienda, [string]$q, [string]$talle) {
  $url = "$($tienda.base)/api/plp/content-engine/search?query=$([uri]::EscapeDataString($q + ' camiseta'))&start=0"
  $r = Invoke-RestMethod -Uri $url -TimeoutSec 6 -UserAgent "Mozilla/5.0"
  $out = @()
  foreach ($p in @($r.raw.itemList.items)) {
    $name = [string]$p.displayName
    if ((Norm $name) -notmatch "camiseta") { continue }
    $pr = 0; try { $pr = [double]($p.salePrice, $p.price | Where-Object { $_ } | Select-Object -First 1) } catch { }
    $out += @{ tienda = $tienda.nombre; nombre = $name; precio = $pr; link = $tienda.base + [string]$p.link }
  }
  return $out
}
function Cam-Ml($tienda, [string]$q, [string]$talle) {
  $slug = ([regex]::Replace((Norm "camiseta $q original"), " ", "-"))
  $html = (Invoke-WebRequest -Uri "$($tienda.base)/$slug" -UseBasicParsing -TimeoutSec 6 -UserAgent "Mozilla/5.0").Content
  $out = @()
  foreach ($m in [regex]::Matches($html, '<a[^>]+href="(https://[^"]*mercadolibre[^"]*/(?:MLA|p/)[^"]*)"[^>]*title="([^"]+)"')) {
    $out += @{ tienda = $tienda.nombre; nombre = $m.Groups[2].Value; precio = 0; link = $m.Groups[1].Value }
    if ($out.Count -ge 8) { break }
  }
  return $out
}
function Cam-Buscar($c, [string]$equipo) {
  $res = @(); $fallas = @()
  foreach ($t in @($c.tiendas)) {
    if (-not $t.activa) { continue }
    if ($script:camMuertas.ContainsKey($t.nombre)) { continue }
    if ((Get-Date) -gt $script:camLimite) { $script:camMuertas[$t.nombre] = $true; $fallas += $t.nombre; continue }
    try {
      switch ($t.tipo) {
        "vtex"   { $res += Cam-Vtex $t "camiseta $equipo" $c.talle }
        "adidas" { $res += Cam-Adidas $t $equipo $c.talle }
        "ml"     { $res += Cam-Ml $t $equipo $c.talle }
      }
    } catch { $script:camMuertas[$t.nombre] = $true; $fallas += $t.nombre }
  }
  $ne = Norm $equipo
  $res = @($res | Where-Object { (Norm $_.nombre) -like "*$($ne.Split(' ')[0])*" })
  if ($c.maxPrecio -gt 0) { $res = @($res | Where-Object { $_.precio -eq 0 -or $_.precio -le $c.maxPrecio }) }
  return @{ items = @($res | Sort-Object { if ($_.precio -gt 0) { $_.precio } else { 1e12 } }); fallas = $fallas }
}
function Cam-Reporte([string[]]$equipos) {
  $c = Cam-Load
  $script:camMuertas = @{}; $script:camLimite = (Get-Date).AddSeconds(30)
  $lines = @("Camisetas $(Get-Date -Format 'dd/MM HH:mm') - talle $($c.talle)"); $voz = @(); $todasFallas = @{}
  foreach ($e in $equipos) {
    $r = Cam-Buscar $c $e
    foreach ($f in $r.fallas) { $todasFallas[$f] = $true }
    if ($r.items.Count -eq 0) { $lines += "$e : nada disponible en talle $($c.talle)"; continue }
    $b = $r.items[0]
    $pTxt = "sin precio"; if ($b.precio -gt 0) { $pTxt = '$' + ([int]$b.precio).ToString("N0", $es) }
    $voz += "$e desde $pTxt en $($b.tienda)"
    foreach ($i in ($r.items | Select-Object -First 3)) {
      $pp = "?"; if ($i.precio -gt 0) { $pp = '$' + ([int]$i.precio).ToString("N0", $es) }
      $lines += "$e | $($i.tienda) | $pp | $($i.nombre) | $($i.link)"
    }
  }
  if ($todasFallas.Count -gt 0) { $lines += "No pude consultar: " + (($todasFallas.Keys) -join ", ") }
  [System.IO.File]::WriteAllText($camOut, ($lines -join "`r`n"), $utf8)
  $txt = "No encontre nada en talle $($c.talle)."
  if ($voz.Count -gt 0) { $txt = ($voz | Select-Object -First 3) -join ". " }
  if ($todasFallas.Count -gt 0) { $txt += ". No pude consultar " + (($todasFallas.Keys) -join " ni ") }
  return @{ voz = $txt; display = ($lines -join "`n") }
}
function Cam-Diagnostico {
  # Prueba cada tienda activa con una busqueda real y dice cual responde y cual no.
  # Resultado completo en datos\camisetas-diagnostico.txt
  $c = Cam-Load
  $lines = @("Diagnostico de tiendas $(Get-Date -Format 'dd/MM/yyyy HH:mm') - consulta de prueba: camiseta Argentina"); $ok = @(); $vacias = @(); $mal = @()
  foreach ($t in @($c.tiendas)) {
    if (-not $t.activa) { continue }
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    try {
      $r = @()
      switch ($t.tipo) {
        "vtex"   { $r = @(Cam-Vtex $t "camiseta Argentina" "") }
        "adidas" { $r = @(Cam-Adidas $t "Argentina" "") }
        "ml"     { $r = @(Cam-Ml $t "Argentina" "") }
        default  { throw "tipo de conector desconocido: $($t.tipo)" }
      }
      $sw.Stop(); $ms = [int]$sw.Elapsed.TotalMilliseconds
      if ($r.Count -gt 0) { $ok += $t.nombre; $lines += "OK      | $($t.nombre) | $($r.Count) resultados | $ms ms | ej: $($r[0].nombre)" }
      else { $vacias += $t.nombre; $lines += "VACIA   | $($t.nombre) | responde pero 0 resultados (conector posiblemente desactualizado) | $ms ms" }
    } catch {
      $sw.Stop(); $ms = [int]$sw.Elapsed.TotalMilliseconds
      $mal += $t.nombre; $lines += "ERROR   | $($t.nombre) | $($_.Exception.Message) | $ms ms"
    }
  }
  [System.IO.File]::WriteAllText($camDiag, ($lines -join "`r`n"), $utf8)
  $total = $ok.Count + $vacias.Count + $mal.Count
  $txt = "Probe $total tiendas. Funcionan $($ok.Count)."
  if ($vacias.Count -gt 0) { $txt += " Responden pero sin resultados: " + ($vacias -join ", ") + "." }
  if ($mal.Count -gt 0) { $txt += " No responden: " + ($mal -join ", ") + "." }
  $txt += " El detalle quedo en el archivo de diagnostico."
  return @{ voz = $txt; display = ($lines -join "`n") }
}
function Camisetas-Decide([string]$said) {
  $n = Norm $said
  if ($n -match "(proba|prueba|probar|verifica|chequea|diagnostic)\w*.*tiendas|tiendas.*(funcionan|responden|andan)") {
    $d = Cam-Diagnostico
    return @{ ok = $true; action = "say"; reply = $d.voz; display = $d.display }
  }
  if ($n -notmatch "camiseta") { return $null }
  if ($n -match "^(mia )?(acordate|recorda|guarda|anota que)") { return $null }
  $c = Cam-Load
  $m = [regex]::Match($n, "(?:agrega|suma|segui|anota)\w*\s+(?:la\s+)?(?:camiseta\s+)?(?:de\s+|del\s+)?(.+?)(?:\s+a\s+(?:las\s+)?camisetas)?$")
  if ($m.Success -and $n -match "agrega|suma|segui|anota") {
    $eq = (Get-Culture).TextInfo.ToTitleCase($m.Groups[1].Value.Trim())
    if ($eq -and -not (@($c.equipos) -contains $eq)) { $c.equipos = @(@($c.equipos) + $eq); Cam-Save $c }
    return @{ ok = $true; action = "say"; reply = "Listo, sumo $eq a tus camisetas." }
  }
  $m = [regex]::Match($n, "(?:saca|borra|elimina|quita)\w*\s+(?:la\s+)?(?:camiseta\s+)?(?:de\s+|del\s+)?(.+?)(?:\s+de\s+(?:las\s+)?camisetas)?$")
  if ($m.Success -and $n -match "saca|borra|elimina|quita") {
    $q = $m.Groups[1].Value.Trim()
    $c.equipos = @(@($c.equipos) | Where-Object { (Norm $_) -ne $q }); Cam-Save $c
    return @{ ok = $true; action = "say"; reply = "Listo, saque $q de tu lista." }
  }
  if ($n -match "que camisetas (sigo|tengo|miro)|lista de camisetas") {
    return @{ ok = $true; action = "say"; reply = "Sigo: " + ((@($c.equipos)) -join ", ") + ". Talle $($c.talle)." }
  }
  $m = [regex]::Match($n, "talle (xs|s|m|l|xl|xxl)\b")
  if ($m.Success -and $n -match "cambia|pone|usa") { $c.talle = $m.Groups[1].Value.ToUpper(); Cam-Save $c; return @{ ok = $true; action = "say"; reply = "Talle $($c.talle) anotado." } }
  $m = [regex]::Match($n, "(?:menos de|maximo|hasta)\s+(\d+)(?:\s*(mil))?")
  if ($m.Success -and $n -match "precio|maximo|hasta|menos") {
    $v = [double]$m.Groups[1].Value; if ($m.Groups[2].Success) { $v *= 1000 }; $c.maxPrecio = $v; Cam-Save $c
    return @{ ok = $true; action = "say"; reply = "Tope de precio: $([int]$v) pesos." }
  }
  $eq = @($c.equipos)
  $mx = [regex]::Match($n, "camisetas? (?:de |del |de la )(.+?)(?: en .*)?$")
  if ($mx.Success -and $mx.Groups[1].Value -notmatch "^(mis|mi|futbol)$") { $eq = @((Get-Culture).TextInfo.ToTitleCase($mx.Groups[1].Value.Trim())) }
  foreach ($e in @($c.equipos)) { if ($n -like "*$(Norm $e)*") { $eq = @($e); break } }
  $r = Cam-Reporte $eq
  return @{ ok = $true; action = "say"; reply = $r.voz; display = $r.display }
}
