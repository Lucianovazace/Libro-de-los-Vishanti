# Skill "libros" de MIA: busca libros y comics para COMPRAR en varias tiendas y compara precios.
# Se carga desde cerebro.ps1 (dot-source). Usa Norm, $data y $utf8 del cerebro.
# Config editable: datos\libros.json (lista de busquedas, tiendas). Historial de precios: datos\libros-historial.json
$libF = Join-Path $data "libros.json"
$libHist = Join-Path $data "libros-historial.json"
$libOut = Join-Path $data "libros-ultimo.txt"
$libUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
$script:libDefault = @{
  lista = @()
  tiendas = @(
    @{ nombre = "La Revisteria"; tipo = "tn"; base = "https://www.larevisteria.com"; busq = "/search/?q="; activa = $true },
    @{ nombre = "Club del Comic"; tipo = "tn"; base = "https://www.clubdelcomic.com.ar"; busq = "/search/?q="; activa = $true },
    @{ nombre = "Tematika"; tipo = "tn"; base = "https://www.tematika.com"; busq = "/search/?q="; activa = $true },
    @{ nombre = "Palito Libreria"; tipo = "tn"; base = "https://palitolibreria.mitiendanube.com"; busq = "/search/?q="; activa = $true },
    @{ nombre = "Libros de la Arena"; tipo = "magento"; base = "https://www.librosdelaarena.com.ar"; busq = "/catalogsearch/result/?q="; activa = $true },
    @{ nombre = "Cuspide"; tipo = "woo"; base = "https://www.cuspide.com"; busq = ""; activa = $true },
    @{ nombre = "Buscalibre"; tipo = "buscalibre"; base = "https://www.buscalibre.com.ar"; busq = "/libros/search?q="; activa = $true }
  )
}
function Lib-Load {
  if (-not (Test-Path $libF)) { [System.IO.File]::WriteAllText($libF, ($script:libDefault | ConvertTo-Json -Depth 6), $utf8) }
  try { return ([System.IO.File]::ReadAllText($libF, $utf8) | ConvertFrom-Json) } catch { return ($script:libDefault | ConvertTo-Json -Depth 6 | ConvertFrom-Json) }
}
function Lib-Save($c) { [System.IO.File]::WriteAllText($libF, ($c | ConvertTo-Json -Depth 6), $utf8) }
function Lib-Get([string]$url) {
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20 -UserAgent $libUA -Headers @{ "Accept-Language" = "es-AR,es;q=0.9" }
  return [string]$r.Content
}
function Lib-Txt([string]$s) { return [System.Net.WebUtility]::HtmlDecode(($s -replace "\s+", " ").Trim()) }
function Lib-Num([string]$s) { $d = ($s -replace "[^\d,\.]", ""); if ($d -match ",\d{1,2}$") { $d = ($d -replace "\.", "") -replace ",", "." } else { $d = $d -replace "[\.,]", "" }; try { return [double]::Parse($d, [Globalization.CultureInfo]::InvariantCulture) } catch { return 0 } }
function Lib-Parse($t, [string]$q) {
  $out = @(); $base = $t.base; $html = $t.html
  switch ($t.tipo) {
    "tn" {
      $parts = [regex]::Split($html, 'data-product-id="\d+"\s+data-store="product-item-') | Select-Object -Skip 1
      foreach ($b in $parts) {
        if ($b.Length -gt 12000) { $b = $b.Substring(0, 12000) }
        $pm = [regex]::Match($b, 'price_number&quot;:(\d+(?:\.\d+)?)'); if (-not $pm.Success) { continue }
        $nm = [regex]::Match($b, 'product-item-name-\d+"[^>]*>([^<]+)<'); if (-not $nm.Success) { $nm = [regex]::Match($b, 'title="([^"]{4,160})"') }
        $lm = [regex]::Match($b, 'href="([^"]*/productos/[^"]*)"')
        if (-not $nm.Success) { continue }
        $disp = $true; $am = [regex]::Match($b, 'available&quot;:(true|false)'); if ($am.Success -and $am.Groups[1].Value -eq 'false') { $disp = $false }
        $out += @{ nombre = (Lib-Txt $nm.Groups[1].Value); precio = [double]$pm.Groups[1].Value; link = $lm.Groups[1].Value; disp = $disp }
      }
    }
    "magento" {
      $parts = [regex]::Split($html, 'class="product-item[ "]') | Select-Object -Skip 1
      foreach ($b in $parts) {
        $nm = [regex]::Match($b, 'class="product name product-item-name">\s*<a title="([^"]+)" href="([^"]+)"'); if (-not $nm.Success) { continue }
        $pm = [regex]::Match($b, 'data-price-amount="(\d+(?:\.\d+)?)"'); if (-not $pm.Success) { continue }
        $out += @{ nombre = (Lib-Txt $nm.Groups[1].Value); precio = [double]$pm.Groups[1].Value; link = $nm.Groups[2].Value; disp = $true }
      }
    }
    "buscalibre" {
      $parts = [regex]::Split($html, 'class="box-producto producto') | Select-Object -Skip 1
      foreach ($b in $parts) {
        $lm = [regex]::Match($b, 'href="(/libro-[^"]+)"[^>]*title="([^"]+)"'); if (-not $lm.Success) { continue }
        $pm = [regex]::Match($b, '</p>\s*<strong>\s*\$\s*([\d\.,]+)\s*</strong>'); if (-not $pm.Success) { $pm = [regex]::Match($b, '<strong>\s*\$\s*([\d\.,]+)\s*</strong>') }
        if (-not $pm.Success) { continue }
        $out += @{ nombre = (Lib-Txt $lm.Groups[2].Value); precio = (Lib-Num $pm.Groups[1].Value); link = ($base + $lm.Groups[1].Value); disp = $true }
      }
    }
    "woo" {
      $j = $html | ConvertFrom-Json
      foreach ($p in @($j)) {
        $dec = 2; try { $dec = [int]$p.prices.currency_minor_unit } catch { }
        $pr = ([double]$p.prices.price) / [Math]::Pow(10, $dec)
        $disp = $true; try { if ($p.is_in_stock -eq $false) { $disp = $false } } catch { }
        $out += @{ nombre = (Lib-Txt ([string]$p.name)); precio = $pr; link = [string]$p.permalink; disp = $disp }
      }
    }
  }
  return $out
}
function Lib-Tokens([string]$q) { return @((Norm $q) -split "\s+" | Where-Object { $_.Length -gt 1 -and $_ -notmatch "^(el|la|los|las|de|del|y|un|una|en)$" }) }
function Lib-Buscar($c, [string]$q) {
  $res = @(); $fallas = @(); $tok = Lib-Tokens $q
  $enc = [uri]::EscapeDataString($q)
  foreach ($t in @($c.tiendas)) {
    if ($t.activa -eq $false) { continue }
    try {
      $url = $t.base + $t.busq + $enc
      if ($t.tipo -eq "woo") { $url = $t.base + "/wp-json/wc/store/v1/products?per_page=20&search=" + $enc }
      $tt = @{ tipo = $t.tipo; base = $t.base; html = (Lib-Get $url) }
      foreach ($i in (Lib-Parse $tt $q)) {
        $nn = Norm $i.nombre; $ok = $true
        foreach ($k in $tok) { if ($nn -notlike "*$k*") { $ok = $false; break } }
        if ($ok -and $i.precio -gt 0) { $i.tienda = $t.nombre; $res += $i }
      }
    } catch { $fallas += $t.nombre }
  }
  return @{ items = @($res | Where-Object { $_.disp } | Sort-Object { $_.precio }); fallas = $fallas }
}
function Lib-Hist-Load { if (Test-Path $libHist) { try { return ([System.IO.File]::ReadAllText($libHist, $utf8) | ConvertFrom-Json) } catch { } }; return ([pscustomobject]@{}) }
function Lib-Reporte([string[]]$qs) {
  $c = Lib-Load; $h = Lib-Hist-Load; $lines = @("Libros y comics $(Get-Date -Format 'dd/MM HH:mm')"); $voz = @(); $fall = @{}; $bajas = @()
  foreach ($q in $qs) {
    $r = Lib-Buscar $c $q
    foreach ($f in $r.fallas) { $fall[$f] = $true }
    if ($r.items.Count -eq 0) { $lines += "$q : no lo encontre en las tiendas"; continue }
    $b = $r.items[0]
    $voz += "$q desde $('$' + ([int]$b.precio).ToString('N0', [Globalization.CultureInfo]::GetCultureInfo('es-AR'))) en $($b.tienda)"
    foreach ($i in ($r.items | Select-Object -First 4)) { $lines += "$q | $($i.tienda) | `$$([int]$i.precio) | $($i.nombre) | $($i.link)" }
    $key = Norm $q; $prev = $null; try { $prev = [double]$h.$key } catch { }
    if ($prev -and $b.precio -lt $prev) { $bajas += "$q bajo de $([int]$prev) a $([int]$b.precio) en $($b.tienda)" }
    $h | Add-Member -NotePropertyName $key -NotePropertyValue ([double]$(if ($prev -and $prev -lt $b.precio) { $prev } else { $b.precio })) -Force
  }
  try { [System.IO.File]::WriteAllText($libHist, ($h | ConvertTo-Json), $utf8) } catch { }
  if ($fall.Count -gt 0) { $lines += "No pude consultar: " + (($fall.Keys) -join ", ") }
  [System.IO.File]::WriteAllText($libOut, ($lines -join "`r`n"), $utf8)
  $txt = "No encontre nada."; if ($voz.Count -gt 0) { $txt = ($voz | Select-Object -First 3) -join ". " }
  if ($bajas.Count -gt 0) { $txt += ". Atencion, bajo de precio: " + ($bajas -join ". ") }
  if ($fall.Count -gt 0) { $txt += ". No pude consultar " + (($fall.Keys) -join " ni ") }
  $txt += ". Mercado Libre todavia no esta incluido."
  return @{ voz = $txt; display = ($lines -join "`n") }
}
function Libros-Decide([string]$said) {
  $n = Norm $said
  if ($n -notmatch "\b(libros?|comics?|historietas?|mangas?|novelas? graficas?|tomos?)\b") { return $null }
  if ($n -match "^(mia )?(acordate|recorda|guarda|anota que)") { return $null }
  $c = Lib-Load
  $m = [regex]::Match($n, "(?:agrega|suma|segui|anota)\w*\s+(?:el\s+|la\s+)?(?:libro|comic|manga|tomo)?\s*(.+?)\s+(?:a|en)\s+(?:mi\s+)?(?:lista|libros|comics)(?:\s+de\s+\w+)?$")
  if ($m.Success) {
    $t = (Get-Culture).TextInfo.ToTitleCase($m.Groups[1].Value.Trim())
    if ($t -and -not (@($c.lista) -contains $t)) { $c.lista = @(@($c.lista) + $t); Lib-Save $c }
    return @{ ok = $true; action = "say"; reply = "Listo, sigo el precio de $t." }
  }
  $m = [regex]::Match($n, "(?:saca|borra|elimina|quita)\w*\s+(?:el\s+|la\s+)?(?:libro|comic|manga|tomo)?\s*(.+?)(?:\s+de\s+(?:mi\s+)?(?:lista|libros|comics))?$")
  if ($m.Success -and $n -match "saca|borra|elimina|quita") {
    $q = $m.Groups[1].Value.Trim(); $c.lista = @(@($c.lista) | Where-Object { (Norm $_) -ne $q }); Lib-Save $c
    return @{ ok = $true; action = "say"; reply = "Listo, saque $q de la lista." }
  }
  if ($n -match "que (libros|comics) (sigo|tengo|miro|quiero)|lista de (libros|comics)") {
    $l = @($c.lista); if ($l.Count -eq 0) { return @{ ok = $true; action = "say"; reply = "Todavia no tiene libros en la lista." } }
    return @{ ok = $true; action = "say"; reply = "Sigo: " + ($l -join ", ") + "." }
  }
  $m = [regex]::Match($n, "(?:busca|buscame|cuanto (?:sale|cuesta)|precio de|mira|fijate)\w*\s+(?:el\s+|la\s+|los\s+|las\s+)?(?:libro|libros|comic|comics|manga|tomo|novela grafica)?\s*(?:de\s+|del\s+)?(.+)$")
  if ($m.Success -and $m.Groups[1].Value.Trim().Length -gt 1) {
    $r = Lib-Reporte @((Get-Culture).TextInfo.ToTitleCase($m.Groups[1].Value.Trim()))
    return @{ ok = $true; action = "say"; reply = $r.voz; display = $r.display }
  }
  if ($n -match "(revisa|controla|chequea|mira).*(mis )?(libros|comics|lista)") {
    $l = @($c.lista); if ($l.Count -eq 0) { return @{ ok = $true; action = "say"; reply = "Todavia no tiene libros en la lista." } }
    $r = Lib-Reporte $l; return @{ ok = $true; action = "say"; reply = $r.voz; display = $r.display }
  }
  return $null
}
