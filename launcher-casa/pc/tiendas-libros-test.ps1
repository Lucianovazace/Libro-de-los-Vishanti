# ============================================================
# MIA - Diagnostico de tiendas de libros y comics (tiendas-libros-test.ps1)
# Prueba, desde esta PC, que tiendas contestan y que plataforma usan (Tiendanube, Shopify, VTEX, WooCommerce, Mercado Libre).
# Escribe el resultado en datos\tiendas-libros-diagnostico.txt. No modifica nada.
# ============================================================
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dataDir = Join-Path $root "datos"
if (-not (Test-Path $dataDir)) { New-Item -ItemType Directory -Path $dataDir | Out-Null }
$outF = Join-Path $dataDir "tiendas-libros-diagnostico.txt"
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

# Tiendas (dominios candidatos; si uno no responde se prueba el siguiente)
$tiendas = @(
  @{ n = "La Revisteria Comics"; d = @("www.larevisteria.com.ar", "larevisteria.com.ar", "www.larevisteria.com") },
  @{ n = "Ovni Press"; d = @("www.ovnipress.com", "ovnipress.com", "www.ovnipress.com.ar") },
  @{ n = "Club del Comic"; d = @("www.clubdelcomic.com.ar", "clubdelcomic.com.ar", "www.clubdelcomic.com") },
  @{ n = "Tematika"; d = @("www.tematika.com", "tematika.com") },
  @{ n = "Palito Libreria"; d = @("www.palitolibreria.com.ar", "palitolibreria.com.ar", "www.palitolibreria.com") },
  @{ n = "Libros de la Arena"; d = @("www.librosdelaarena.com.ar", "librosdelaarena.com.ar", "www.librosdelaarena.com") },
  @{ n = "Entelequia"; d = @("www.entelequia.com.ar", "entelequia.com.ar") },
  @{ n = "Cuspide"; d = @("www.cuspide.com", "cuspide.com") },
  @{ n = "Buscalibre"; d = @("www.buscalibre.com.ar", "buscalibre.com.ar") },
  @{ n = "Casassa y Lorenzo"; d = @("www.casassaylorenzo.com.ar", "casassaylorenzo.com.ar") },
  @{ n = "El Ateneo"; d = @("www.elateneo.com", "elateneo.com") },
  @{ n = "Panini Argentina"; d = @("www.tiendapanini.com.ar", "tiendapanini.com.ar", "www.paniniargentina.com.ar") },
  @{ n = "UBIK Libros"; d = @("www.ubiklibros.com", "ubiklibros.com") }
)
$busq = "batman"

function Get-Web([string]$url, [int]$seg = 12) {
  try {
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec $seg -UserAgent $ua -Headers @{ "Accept-Language" = "es-AR,es;q=0.9" }
    return @{ ok = $true; code = [int]$r.StatusCode; texto = [string]$r.Content; final = [string]$r.BaseResponse.ResponseUri }
  } catch {
    $c = 0; try { $c = [int]$_.Exception.Response.StatusCode } catch { }
    return @{ ok = $false; code = $c; texto = ""; final = ""; err = $_.Exception.Message }
  }
}

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("=== Diagnostico de tiendas de libros y comics - " + (Get-Date -Format "yyyy-MM-dd HH:mm") + " ===")
[void]$sb.AppendLine("PowerShell: " + $PSVersionTable.PSVersion)
[void]$sb.AppendLine("")

# 0) API de Mercado Libre (referencia de precios de marketplace)
[void]$sb.AppendLine("--- Mercado Libre (API publica) ---")
$ml = Get-Web ("https://api.mercadolibre.com/sites/MLA/search?q=" + [uri]::EscapeDataString("batman comic") + "&limit=3")
if ($ml.ok) {
  try { $j = $ml.texto | ConvertFrom-Json; [void]$sb.AppendLine("[OK ] API ML responde. Resultados: " + $j.paging.total); foreach ($it in @($j.results | Select-Object -First 3)) { [void]$sb.AppendLine("      " + $it.title + " - $" + $it.price) } }
  catch { [void]$sb.AppendLine("[?  ] API ML respondio pero no pude leerla") }
} else { [void]$sb.AppendLine("[NO ] API ML: codigo " + $ml.code + " " + $ml.err + "  (si es 403 hace falta token; se puede usar el buscador web de listado.mercadolibre.com.ar)") }
$ml2 = Get-Web ("https://listado.mercadolibre.com.ar/" + $busq + "-comic")
[void]$sb.AppendLine("      pagina de listado ML: " + $(if ($ml2.ok) { "responde (" + $ml2.code + ")" } else { "no responde (" + $ml2.code + ")" }))
[void]$sb.AppendLine("")

foreach ($t in $tiendas) {
  [void]$sb.AppendLine("--- " + $t.n + " ---")
  $dom = $null; $home = $null
  foreach ($d in $t.d) {
    $h = Get-Web ("https://" + $d + "/")
    if ($h.ok) { $dom = $d; $home = $h; break }
  }
  if (-not $dom) { [void]$sb.AppendLine("[NO ] ningun dominio responde (" + ($t.d -join ", ") + ")"); [void]$sb.AppendLine(""); continue }
  $base = "https://" + $dom
  [void]$sb.AppendLine("[OK ] dominio: $dom  (final: " + $home.final + ")")
  $tx = $home.texto
  $plat = @()
  if ($tx -match "tiendanube|nuvemshop|mitiendanube") { $plat += "Tiendanube" }
  if ($tx -match "cdn\.shopify|Shopify\.theme|myshopify") { $plat += "Shopify" }
  if ($tx -match "vtex|vteximg|vtexassets") { $plat += "VTEX" }
  if ($tx -match "wp-content|woocommerce") { $plat += "WordPress/WooCommerce" }
  if ($tx -match "Magento|mage-") { $plat += "Magento" }
  if ($tx -match "prestashop") { $plat += "PrestaShop" }
  [void]$sb.AppendLine("      plataforma segun el HTML: " + $(if ($plat.Count) { $plat -join ", " } else { "no se detecta" }))

  $q = [uri]::EscapeDataString($busq)
  # Shopify
  $s = Get-Web ($base + "/search/suggest.json?q=" + $q + "&resources[type]=product&resources[limit]=3")
  if ($s.ok -and $s.texto -match "resources") { [void]$sb.AppendLine("[OK ] Shopify suggest.json responde") } else { [void]$sb.AppendLine("[no ] Shopify suggest.json") }
  # VTEX
  $v = Get-Web ($base + "/api/catalog_system/pub/products/search?ft=" + $q + "&_from=0&_to=2")
  if ($v.ok -and $v.texto.TrimStart().StartsWith("[")) { [void]$sb.AppendLine("[OK ] VTEX products/search responde") } else { [void]$sb.AppendLine("[no ] VTEX products/search") }
  # WooCommerce
  $w = Get-Web ($base + "/wp-json/wc/store/v1/products?search=" + $q + "&per_page=3")
  if ($w.ok -and $w.texto.TrimStart().StartsWith("[")) { [void]$sb.AppendLine("[OK ] WooCommerce Store API responde") } else { [void]$sb.AppendLine("[no ] WooCommerce Store API") }
  # Busqueda HTML generica (Tiendanube y otras)
  foreach ($pat in @("/search/?q=", "/search?q=", "/?s=", "/buscar?q=")) {
    $g = Get-Web ($base + $pat + $q)
    if ($g.ok) { [void]$sb.AppendLine("[OK ] busqueda HTML: " + $pat + "  (" + $g.texto.Length + " caracteres, aparece 'batman': " + ($g.texto -match "(?i)batman") + ")"); break }
  }
  [void]$sb.AppendLine("")
}
[void]$sb.AppendLine("=== FIN. Mandame este archivo (datos\tiendas-libros-diagnostico.txt) y armo el buscador con las tiendas que funcionan. ===")
[System.IO.File]::WriteAllText($outF, $sb.ToString(), (New-Object System.Text.UTF8Encoding($true)))
Write-Host "Listo. Resultado en: $outF"
