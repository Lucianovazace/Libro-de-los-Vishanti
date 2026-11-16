# Prueba el correo: escribe datos\mail-prueba.txt (no muestra la contrasena)
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$data = Join-Path $root "datos"; $utf8 = New-Object System.Text.UTF8Encoding($true)
function Norm([string]$s) { return $s.ToLower() }
. (Join-Path $root "mail.ps1")
$out = ""
try { $r = Mail-Leer 5; $out = "OK. Sin leer en la principal: " + $r.total + "`r`n"; foreach ($m in $r.mails) { $out += "- " + $m.de + " | " + $m.asunto + "`r`n" } }
catch { $out = "ERROR: " + $_.Exception.Message }
[System.IO.File]::WriteAllText((Join-Path $data "mail-prueba.txt"), $out, $utf8)
Write-Host $out
