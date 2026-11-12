# Skill "resumen de la mañana" de MIA: "resumen del día", "qué hay para hoy", "poneme al día".
# Junta fecha, clima (Get-Weather del cerebro), fútbol de hoy (Fut-Hoy de futbol.ps1) y la última búsqueda de camisetas.
# Se carga desde cerebro.ps1 (dot-source). Usa Norm, Get-Weather, $data, $utf8, $es e $inv del cerebro.
$camVozF = Join-Path $data "camisetas-voz.txt"

function Res-Franja {
  $h = (Get-Date).Hour
  if ($h -ge 6 -and $h -lt 13) { return "Buen día" } elseif ($h -ge 13 -and $h -lt 20) { return "Buenas tardes" } else { return "Buenas noches" }
}
function Res-Camisetas {
  if (-not (Test-Path $camVozF)) { return "" }
  try {
    $raw = [System.IO.File]::ReadAllText($camVozF, $utf8).Trim()
    $i = $raw.IndexOf("|"); if ($i -lt 0) { return "" }
    $cuando = [datetime]::ParseExact($raw.Substring(0, $i), "yyyy-MM-dd HH:mm", $inv)
    $txt = $raw.Substring($i + 1).Trim()
    $horas = ((Get-Date) - $cuando).TotalHours
    if ($horas -gt 72) { return "" }
    $hace = if ($horas -lt 20) { "de hoy" } elseif ($horas -lt 44) { "de ayer" } else { "de hace unos días" }
    return "Camisetas, según la última búsqueda $hace`: $txt. Decime camisetas para actualizarla"
  } catch { return "" }
}

function Resumen-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  if ($n -notmatch "resumen (de la manana|del dia|de hoy|matutino|diario)|que (hay|tengo) para hoy|como (arranca|viene|empieza) (el dia|hoy)|(poneme|ponme) al (dia|tanto)|novedades de hoy") { return $null }
  if (-not $speaker) { $speaker = "Luciano" }
  $partes = @(); $display = @()
  $partes += "$(Res-Franja), $speaker. Hoy es " + (Get-Date).ToString("dddd d 'de' MMMM", $es)

  # Clima
  $w = $null
  try { $w = Get-Weather 1 $false } catch { }
  if ($w) { $partes += $w; $display += "Clima: $w" } else { $partes += "No pude consultar el clima ahora"; $display += "Clima: sin datos" }

  # Fútbol de hoy (Boca, Champions)
  if (Get-Command Fut-Hoy -ErrorAction SilentlyContinue) {
    $f = $null
    try { $f = Fut-Hoy } catch { }
    if ($f -and $f.voz) { $partes += $f.voz; $display += "Fútbol: $($f.voz)"; if ($f.display) { $display += $f.display } }
  }

  # Calendario de Google: solo para Luciano
  if ($speaker -eq "Luciano" -and (Get-Command Cal-ResumenHoy -ErrorAction SilentlyContinue)) { $ch = $null; try { $ch = Cal-ResumenHoy } catch { }; if ($ch) { $partes += $ch.voz; $display += $ch.display } }

  # Recordatorios de hoy y lista de compras
  if (Get-Command Rec-Hoy -ErrorAction SilentlyContinue) { $rh = ""; try { $rh = Rec-Hoy } catch { }; if ($rh) { $partes += $rh; $display += $rh } }
  if (Get-Command Compras-Resumen -ErrorAction SilentlyContinue) { $cr = ""; try { $cr = Compras-Resumen } catch { }; if ($cr) { $partes += $cr; $display += $cr } }

  # Camisetas: solo para Luciano, desde la última búsqueda guardada (no consulta las tiendas para que el resumen sea rápido)
  if ($speaker -eq "Luciano") {
    $c = Res-Camisetas
    if ($c) { $partes += $c; $display += $c }
  }
  $voz = (($partes | ForEach-Object { $_.Trim().TrimEnd(".") }) -join ". ") + "."
  return @{ ok = $true; action = "say"; reply = $voz; display = ($display -join "`n") }
}
