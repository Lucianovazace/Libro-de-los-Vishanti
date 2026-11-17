# Skill "instagram" de MIA: seguidores y seguidos desde la EXPORTACION OFICIAL de Instagram (sin usuario ni contrasena). Solo Luciano.
# Uso: Instagram > Configuracion > Centro de cuentas > Tu informacion y permisos > Exportar tu informacion > solo "Seguidores y seguidos", JSON.
# Dejar followers_1.json y following.json en datos\instagram\importar y decir "importa mis seguidores".
# Cada importacion guarda una foto datos\instagram\AAAA-MM-DD.json; comparando dos fotos se ve quien dejo de seguirte.
# Se carga desde cerebro.ps1 (dot-source). Usa Norm, $data y $utf8.
$igDir = Join-Path $data "instagram"
$igIn = Join-Path $igDir "importar"
function Ig-Say([string]$t, [string]$disp = "") { if (-not $disp) { $disp = $t }; return @{ ok = $true; action = "say"; reply = $t; display = $disp } }
function Ig-Users($j) {
  $arr = @()
  if ($j -is [array]) { $arr = @($j) } else { foreach ($p in $j.PSObject.Properties) { if ($p.Value -is [array]) { $arr += @($p.Value) } } }
  $out = New-Object System.Collections.Generic.HashSet[string]
  foreach ($it in $arr) {
    $u = ""
    if ($it.string_list_data -and @($it.string_list_data).Count -gt 0) { $u = [string]@($it.string_list_data)[0].value }
    if (-not $u -and $it.title) { $u = [string]$it.title }
    $u = $u.Trim().ToLower(); if ($u) { [void]$out.Add($u) }
  }
  return @($out | Sort-Object)
}
function Ig-Snaps {
  if (-not (Test-Path $igDir)) { return @() }
  return @(Get-ChildItem -Path $igDir -Filter "*.json" -File | Where-Object { $_.Name -match "^\d{4}-\d{2}-\d{2}\.json$" } | Sort-Object Name)
}
function Ig-Load($f) { $d = [System.IO.File]::ReadAllText($f.FullName, $utf8) | ConvertFrom-Json; return @{ fecha = $f.BaseName; followers = @($d.followers); following = @($d.following) } }
function Ig-Importar {
  if (-not (Test-Path $igIn)) { New-Item -ItemType Directory -Force $igIn | Out-Null }
  $fo = @(); $fi = @()
  foreach ($f in @(Get-ChildItem -Path $igIn -Filter "*.json" -File)) {
    try { $j = [System.IO.File]::ReadAllText($f.FullName, $utf8) | ConvertFrom-Json } catch { continue }
    if ($f.Name -match "(?i)following") { $fi += @(Ig-Users $j) } elseif ($f.Name -match "(?i)follower") { $fo += @(Ig-Users $j) }
  }
  if ($fo.Count -eq 0 -and $fi.Count -eq 0) { return $null }
  $hoy = (Get-Date).ToString("yyyy-MM-dd")
  $o = [pscustomobject]@{ followers = @($fo | Sort-Object -Unique); following = @($fi | Sort-Object -Unique) }
  [System.IO.File]::WriteAllText((Join-Path $igDir ($hoy + ".json")), ($o | ConvertTo-Json -Depth 4), $utf8)
  $ok = Join-Path $igIn "hecho"; if (-not (Test-Path $ok)) { New-Item -ItemType Directory -Force $ok | Out-Null }
  foreach ($f in @(Get-ChildItem -Path $igIn -Filter "*.json" -File)) { Move-Item -Path $f.FullName -Destination (Join-Path $ok ($hoy + "-" + $f.Name)) -Force }
  return $o
}
function Ig-Lista($l, [string]$vacio, [string]$cabeza) {
  $l = @($l)
  if ($l.Count -eq 0) { return (Ig-Say $vacio) }
  $v = @($l | Select-Object -First 8) -join ", "
  $t = $cabeza + " " + $l.Count + ": " + $v
  if ($l.Count -gt 8) { $t += " y " + ($l.Count - 8) + " más" }
  return (Ig-Say ($t + ".") ($cabeza + " " + $l.Count + ":`n" + (($l | ForEach-Object { "@" + $_ }) -join "`n")))
}
function Ig-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  $importar = $n -match "\b(importa|importar|actualiza|actualizar|carga|cargar)\w* (mis )?(seguidores|instagram|seguidos)"
  $cuantos = $n -match "cuantos (seguidores|seguidos)|cuantos sigo|cuanta gente (me sigue|sigo)"
  $nomesig = $n -match "(quien|quienes|a quien|a quienes) (no me (sigue|siguen)|sigo y no me)|no me (siguen|sigue) de vuelta|no me siguen"
  $nosigo = $n -match "(quien|quienes) me (sigue|siguen) y (yo )?no|(quien|quienes) no sigo de vuelta"
  $dejaron = $n -match "(quien|quienes) (me )?(dejo|dejaron|deja) de seguir|me (dejo|dejaron) de seguir|dejaron de seguirme|unfollow"
  $nuevos = $n -match "nuevos seguidores|(quien|quienes) (empezo|empezaron) a seguirme"
  if (-not ($importar -or $cuantos -or $nomesig -or $nosigo -or $dejaron -or $nuevos)) { return $null }
  if ($speaker -and $speaker -ne "Luciano") { return (Ig-Say "Lo de Instagram es privado: solo Luciano lo puede consultar.") }
  if ($importar) {
    $o = $null; try { $o = Ig-Importar } catch { }
    if (-not $o) { return (Ig-Say "No encontré archivos nuevos. Dejá followers_1.json y following.json en la carpeta datos, instagram, importar, y volvé a pedírmelo.") }
    return (Ig-Say ("Listo. Guardé la foto de hoy: " + @($o.followers).Count + " seguidores y " + @($o.following).Count + " seguidos."))
  }
  $sn = @(Ig-Snaps)
  if ($sn.Count -eq 0) { return (Ig-Say "Todavía no tengo tus seguidores. Pedí la exportación de Instagram con seguidores y seguidos en JSON y dejá los archivos en la carpeta datos, instagram, importar.") }
  $c = Ig-Load $sn[$sn.Count - 1]
  $cuando = ([datetime]::ParseExact($c.fecha, "yyyy-MM-dd", [Globalization.CultureInfo]::InvariantCulture)).ToString("dd/MM")
  if ($cuantos) { return (Ig-Say ("Según la exportación del " + $cuando + ", tenés " + $c.followers.Count + " seguidores y seguís a " + $c.following.Count + ".")) }
  if ($nomesig) { $l = @($c.following | Where-Object { $c.followers -notcontains $_ }); return (Ig-Lista $l "Todos los que seguís te siguen de vuelta." "No te siguen de vuelta") }
  if ($nosigo) { $l = @($c.followers | Where-Object { $c.following -notcontains $_ }); return (Ig-Lista $l "Seguís a todos tus seguidores." "Te siguen y no seguís a") }
  if ($sn.Count -lt 2) { return (Ig-Say "Para comparar necesito dos exportaciones de fechas distintas. Cuando hagas la próxima, ya puedo decirte quién dejó de seguirte.") }
  $p = Ig-Load $sn[$sn.Count - 2]
  $desde = ([datetime]::ParseExact($p.fecha, "yyyy-MM-dd", [Globalization.CultureInfo]::InvariantCulture)).ToString("dd/MM")
  if ($dejaron) { $l = @($p.followers | Where-Object { $c.followers -notcontains $_ }); return (Ig-Lista $l ("Nadie dejó de seguirte desde el " + $desde + ".") ("Desde el " + $desde + " dejaron de seguirte")) }
  $l = @($c.followers | Where-Object { $p.followers -notcontains $_ }); return (Ig-Lista $l ("No hay seguidores nuevos desde el " + $desde + ".") ("Desde el " + $desde + " empezaron a seguirte"))
}
