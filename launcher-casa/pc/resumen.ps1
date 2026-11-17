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

# Lo personal de Luciano: sueño, pasos de ayer, último peso, comidas y gastos de ayer. Cada dato aparece solo si existe.
function Res-Personal {
  $voz = @(); $disp = @()
  $ayer = [datetime]::Today.AddDays(-1).ToString("yyyy-MM-dd", $inv); $hoy = [datetime]::Today.ToString("yyyy-MM-dd", $inv)
  if (Get-Command Sal-Load -ErrorAction SilentlyContinue) {
    $s = $null; try { $s = Sal-Load } catch { }
    if ($s) {
      $dh = @($s.dias | Where-Object { [string]$_.dia -eq $hoy })[0]
      $da = @($s.dias | Where-Object { [string]$_.dia -eq $ayer })[0]
      if ($dh -and $dh.sueno -and [double]$dh.sueno -gt 0) { $voz += ("Anoche dormiste " + (Sal-Horas ([double]$dh.sueno))) }
      if ($da -and $da.pasos -and [double]$da.pasos -gt 0) { $voz += ("Ayer hiciste " + (Sal-N $da.pasos) + " pasos") }
      $p = @($s.peso | Sort-Object { [string]$_.fecha })
      if ($p.Count -gt 0) {
        $u = $p[$p.Count - 1]
        $t = "Tu último peso fue " + (Sal-Kg ([double]$u.kg)) + " kilos"
        if ($p.Count -gt 1) { $dif = [double]$u.kg - [double]$p[$p.Count - 2].kg; if ([math]::Abs($dif) -ge 0.05) { $t += $(if ($dif -gt 0) { ", " + (Sal-Kg $dif) + " más que antes" } else { ", " + (Sal-Kg (-$dif)) + " menos que antes" }) } }
        $voz += $t
      }
    }
  }
  if (Get-Command Com-Load -ErrorAction SilentlyContinue) {
    $c = @(); try { $c = @(Com-Load | Where-Object { [string]$_.fecha -eq $ayer }) } catch { }
    if ($c.Count -gt 0) {
      $k = 0.0; $con = 0; foreach ($x in $c) { if ($x.kcal) { $k += [double]$x.kcal; $con++ } }
      $t = "Ayer anotaste " + $c.Count + " comida" + $(if ($c.Count -ne 1) { "s" })
      if ($con -gt 0) { $t += ", unas " + ([math]::Round($k / 10) * 10).ToString("0", $inv) + " calorías aproximadas" }
      $voz += $t
    }
  }
  if (Get-Command Gas-Load -ErrorAction SilentlyContinue) {
    $g = $null; try { $g = Gas-Load } catch { }
    if ($g) {
      $gi = @($g.items | Where-Object { [string]$_.fecha -eq $ayer })
      if ($gi.Count -gt 0) { $m = 0.0; foreach ($x in $gi) { $m += [double]$x.monto }; $voz += ("Ayer gastaste " + (Gas-N $m) + " pesos en " + $gi.Count + " compra" + $(if ($gi.Count -ne 1) { "s" })) }
    }
  }
  if ($voz.Count -eq 0) { return $null }
  return @{ voz = ($voz -join ". "); display = ($voz | ForEach-Object { $_.Trim() }) -join "`n" }
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

  # Salud, comidas y gastos de Luciano (privado)
  if ($speaker -eq "Luciano") { $pe = $null; try { $pe = Res-Personal } catch { }; if ($pe) { $partes += $pe.voz; $display += $pe.display } }

  # Camisetas: solo para Luciano, desde la última búsqueda guardada (no consulta las tiendas para que el resumen sea rápido)
  if ($speaker -eq "Luciano") {
    $c = Res-Camisetas
    if ($c) { $partes += $c; $display += $c }
  }
  $voz = (($partes | ForEach-Object { $_.Trim().TrimEnd(".") }) -join ". ") + "."
  return @{ ok = $true; action = "say"; reply = $voz; display = ($display -join "`n") }
}
