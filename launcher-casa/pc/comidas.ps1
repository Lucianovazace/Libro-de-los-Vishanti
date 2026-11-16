# Skill "comidas" de MIA: registro simple de lo que come Luciano (por voz o cargado desde fotos). Solo Luciano.
# Datos: datos\comidas.json (solo en esta PC). Se carga desde cerebro.ps1 (dot-source).
$comF = Join-Path $data "comidas.json"
function Com-Load { if (Test-Path $comF) { try { $r = [System.IO.File]::ReadAllText($comF, $utf8) | ConvertFrom-Json; return @($r) } catch { } }; return @() }
function Com-Save($l) { [System.IO.File]::WriteAllText($comF, (ConvertTo-Json -InputObject @($l) -Depth 4), $utf8) }
function Com-Say([string]$t) { return @{ ok = $true; action = "say"; reply = $t } }
function Com-Momento([string]$v, [datetime]$ahora) {
  if ($v -match "desayun") { return "desayuno" }
  if ($v -match "almorz|almuerz") { return "almuerzo" }
  if ($v -match "meriend") { return "merienda" }
  if ($v -match "cen[eoa]") { return "cena" }
  $h = $ahora.Hour
  if ($h -lt 11) { return "desayuno" }; if ($h -lt 15) { return "almuerzo" }; if ($h -lt 19) { return "merienda" }; return "cena"
}
function Comidas-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  if (-not $n) { return $null }
  $anotar = [regex]::Match($n, "^(?:mia )?(?:hoy |recien |ayer )?(?:yo )?(comi|almorce|cene|desayune|meriende|me comi|me tome)\s+(.+)$")
  $consulta = $n -match "\bque (?:comi|almorce|cene|desayune|meriende)\b|\bque (?:vengo comiendo|comida anote)\b|\bmis comidas\b"
  $borrar = $n -match "^(?:mia )?(?:borra|saca|elimina)\w* (?:lo ultimo que comi|la ultima comida)"
  if (-not $anotar.Success -and -not $consulta -and -not $borrar) { return $null }
  if ($speaker -and $speaker -ne "Luciano") { return (Com-Say "El registro de comidas es privado: solo Luciano lo puede usar.") }
  $l = @(Com-Load)
  if ($borrar) {
    if ($l.Count -eq 0) { return (Com-Say "No hay comidas anotadas.") }
    $u = $l[$l.Count - 1]; $l = @($l | Select-Object -First ($l.Count - 1)); Com-Save $l
    return (Com-Say ("Listo, borré: " + $u.texto + "."))
  }
  if ($anotar.Success) {
    $ahora = Get-Date
    $dia = $ahora; if ($n -match "^(?:mia )?ayer ") { $dia = $ahora.AddDays(-1) }
    $txt = $anotar.Groups[2].Value.Trim()
    $mom = Com-Momento $anotar.Groups[1].Value $ahora
    $l += [pscustomobject]@{ fecha = $dia.ToString("yyyy-MM-dd"); hora = $ahora.ToString("HH:mm"); momento = $mom; texto = $txt; fuente = "voz" }
    Com-Save $l
    return (Com-Say ("Anotado en " + $mom + ": " + $txt + "."))
  }
  # consulta
  $desde = (Get-Date).Date; $hasta = $desde; $cuando = "hoy"
  if ($n -match "\bayer\b") { $desde = $desde.AddDays(-1); $hasta = $desde; $cuando = "ayer" }
  elseif ($n -match "semana") { $desde = $desde.AddDays(-6); $cuando = "en los últimos 7 días" }
  $sel = @($l | Where-Object { $d = [datetime]::ParseExact([string]$_.fecha, "yyyy-MM-dd", $null); $d -ge $desde -and $d -le $hasta })
  if ($sel.Count -eq 0) { return (Com-Say "No tengo comidas anotadas para $cuando.") }
  $partes = @(); foreach ($c in $sel) { $p = [string]$c.momento + ": " + [string]$c.texto; if ($cuando -like "en los*") { $p = ([datetime]::ParseExact([string]$c.fecha, "yyyy-MM-dd", $null)).ToString("dd/MM") + " " + $p }; $partes += $p }
  $r = Com-Say ("Anotado " + $cuando + " -> " + ($partes -join ". ") + ".")
  return $r
}
