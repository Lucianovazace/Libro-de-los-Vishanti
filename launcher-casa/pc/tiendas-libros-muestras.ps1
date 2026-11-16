# ============================================================
# MIA - Muestras de busqueda de tiendas de libros y comics (tiendas-libros-muestras.ps1)
# Guarda en datos\tiendas-muestras\ la pagina de resultados de una busqueda ("batman") de cada tienda,
# para que Claude arme el lector de precios. Solo lee paginas publicas; no modifica nada.
# ============================================================
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dir = Join-Path $root "datos\tiendas-muestras"
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
$q = "batman"
$lista = @(
  @("ml-listado", "https://listado.mercadolibre.com.ar/batman-comic"),
  @("larevisteria-search", "https://www.larevisteria.com/search/?q=$q"),
  @("larevisteria-ar", "https://www.larevisteria.com.ar/search/?q=$q"),
  @("clubdelcomic-search", "https://www.clubdelcomic.com.ar/search/?q=$q"),
  @("tematika-search", "https://www.tematika.com/search/?q=$q"),
  @("tematika-home", "https://www.tematika.com/"),
  @("librosdelaarena-s", "https://www.librosdelaarena.com.ar/?s=$q&post_type=product"),
  @("entelequia-s", "https://entelequia.com.ar/?s=$q&post_type=product"),
  @("entelequia-busqueda", "https://entelequia.com.ar/busqueda?q=$q"),
  @("entelequia-home", "https://entelequia.com.ar/"),
  @("cuspide-woo", "https://www.cuspide.com/wp-json/wc/store/v1/products?search=$q&per_page=5"),
  @("cuspide-search", "https://www.cuspide.com/search/?q=$q"),
  @("buscalibre-s", "https://www.buscalibre.com.ar/libros/search?q=$q"),
  @("panini-suggest", "https://www.tiendapanini.com.ar/search/suggest.json?q=$q&resources[type]=product&resources[limit]=5"),
  @("panini-search", "https://www.tiendapanini.com.ar/search?q=$q&type=product"),
  @("ovnipress-home", "https://ovnipress.com/"),
  @("ovnipress-tiendanube", "https://www.ovnipress.com.ar/"),
  @("palito-home", "https://www.palitolibreria.com/"),
  @("palito-tiendanube", "https://palitolibreria.mitiendanube.com/")
)
$res = New-Object System.Text.StringBuilder
foreach ($it in $lista) {
  $n = $it[0]; $u = $it[1]
  try {
    $r = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 20 -UserAgent $ua -Headers @{ "Accept-Language" = "es-AR,es;q=0.9" }
    $txt = [string]$r.Content
    if ($txt.Length -gt 900000) { $txt = $txt.Substring(0, 900000) }
    [System.IO.File]::WriteAllText((Join-Path $dir ($n + ".txt")), $txt, (New-Object System.Text.UTF8Encoding($false)))
    $hd = ""; try { $hd = (($r.Headers.GetEnumerator() | Where-Object { $_.Key -match "^(Server|X-Powered-By|X-Shopify|X-VTEX|Via|Set-Cookie)" } | ForEach-Object { $_.Key + "=" + ([string]$_.Value).Substring(0, [Math]::Min(60, ([string]$_.Value).Length)) }) -join " | ") } catch { }
    [void]$res.AppendLine("[OK ] $n  $u  ->  " + $r.StatusCode + ", " + $txt.Length + " caracteres  " + $hd)
  } catch {
    [void]$res.AppendLine("[NO ] $n  $u  ->  " + $_.Exception.Message)
  }
}
[System.IO.File]::WriteAllText((Join-Path $dir "_resumen.txt"), $res.ToString(), (New-Object System.Text.UTF8Encoding($true)))
Write-Host "Listo. Resumen en: $dir\_resumen.txt"
