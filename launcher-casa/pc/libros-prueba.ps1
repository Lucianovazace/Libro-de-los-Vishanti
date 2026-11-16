# Prueba el buscador de libros desde la PC: escribe datos\libros-prueba.txt
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$data = Join-Path $root "datos"; $utf8 = New-Object System.Text.UTF8Encoding($true)
function Norm([string]$s) { $x = $s.ToLower().Normalize([Text.NormalizationForm]::FormD); $r = (($x.ToCharArray() | Where-Object { [Globalization.CharUnicodeInfo]::GetUnicodeCategory($_) -ne 'NonSpacingMark' }) -join ''); return (($r -replace '[^a-z0-9 ]', ' ') -replace '\s+', ' ').Trim() }
. (Join-Path $root "libros.ps1")
$sb = New-Object System.Text.StringBuilder
foreach ($q in @("Batman", "Maus", "Sandman")) {
  $c = Lib-Load
  [void]$sb.AppendLine("=== $q ===")
  foreach ($t in @($c.tiendas)) {
    $one = [pscustomobject]@{ tiendas = @($t) }
    $r = Lib-Buscar $one $q
    if ($r.fallas.Count -gt 0) { [void]$sb.AppendLine("[FALLA] " + $t.nombre) } else { [void]$sb.AppendLine("[OK] " + $t.nombre + ": " + $r.items.Count + " resultados" + $(if ($r.items.Count) { " | " + $r.items[0].nombre + " | " + $r.items[0].precio })) }
  }
}
[System.IO.File]::WriteAllText((Join-Path $data "libros-prueba.txt"), $sb.ToString(), $utf8)
Write-Host "Listo: datos\libros-prueba.txt"
