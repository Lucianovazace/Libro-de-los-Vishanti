# ============================================================
# MIA - Obras sociales de la farmacia (obrassociales.ps1)
# Responde desde datos\obrassociales.json (se arma con las fichas de la pagina de la farmacia).
# NO usa el modelo: lee los campos tal cual, asi no inventa. Sin datos de clientes ni de afiliados.
# Frases:
#   "AMFFA cubre genericos?"  "AMTTA pide diagnostico?"  "se puede modificar el numero de afiliado en AMFFA?"
#   "que validador usa APRES"  "cuanto vence la receta de AMTTA"  "el recetario de AMFFA"  "ficha de APRES"
#   "que obras sociales no cubren genericos"  "cuales usan el validador IMED"  "cuantas obras sociales tengo cargadas"
# Se carga desde cerebro.ps1 (dot-source). Usa Norm y $data.
# ============================================================

$osF = Join-Path $data "obrassociales.json"
$script:osSig = ""
$script:osDatos = $null
$script:osStop = @("de","del","la","el","los","las","y","e","en","sa","srl","obra","social","plan","planes")

function Os-Load {
  if (-not (Test-Path $osF)) { $script:osDatos = $null; return }
  $sig = [string](Get-Item $osF).LastWriteTimeUtc.Ticks
  if ($sig -eq $script:osSig -and $script:osDatos) { return }
  try {
    $d = [System.IO.File]::ReadAllText($osF, (New-Object System.Text.UTF8Encoding($false))) | ConvertFrom-Json
    $script:osDatos = $d
    $script:osSig = $sig
  } catch { Write-Host ("Obras sociales: no pude leer obrassociales.json: " + $_.Exception.Message); $script:osDatos = $null }
}
function Os-Say([string]$t) { return @{ ok = $true; action = "say"; reply = $t } }

# Alias de una obra social: el nombre completo y sus palabras (sin las genericas), todo normalizado.
function Os-Alias($o) {
  $out = @()
  $full = Norm ([string]$o.nombre)
  if ($full) { $out += $full }
  foreach ($a in @($o.alias)) { $x = Norm ([string]$a); if ($x) { $out += $x } }
  foreach ($w in ($full -split " ")) { if ($w.Length -ge 4 -and ($script:osStop -notcontains $w)) { $out += $w } }
  return @($out | Select-Object -Unique)
}

# Obras sociales nombradas en la frase (ya normalizada). Si hay coincidencia con el nombre completo, gana.
function Os-Buscar([string]$n) {
  $completo = @(); $parcial = @()
  foreach ($o in @($script:osDatos.obras)) {
    $full = Norm ([string]$o.nombre)
    if ($full -and $n -match ("\b" + [regex]::Escape($full) + "\b")) { $completo += $o; continue }
    foreach ($a in (Os-Alias $o)) { if ($n -match ("\b" + [regex]::Escape($a) + "\b")) { $parcial += $o; break } }
  }
  if ($completo.Count -gt 0) {
    # si una coincide y es parte del nombre de otra mas larga, nos quedamos con la mas larga
    $mejor = @($completo | Sort-Object { ([string]$_.nombre).Length } -Descending | Select-Object -First 1)
    return $mejor
  }
  return $parcial
}

# Texto hablable de un valor (abreviaturas del glosario, minusculas).
function Os-Hablar([string]$v) {
  if (-not $v) { return "" }
  $t = $v.Trim()
  if ($script:osDatos.glosario) {
    foreach ($p in $script:osDatos.glosario.PSObject.Properties) { if ($t -ieq $p.Name) { return [string]$p.Value } }
  }
  if ($t.Contains("/") -and $script:osDatos.glosario) {
    $partes = @()
    foreach ($tk in ($t -split "/")) { $tk = $tk.Trim(); if (-not $tk) { continue }; $partes += (Os-Hablar $tk) }
    return ($partes -join ", ")
  }
  if ($t -cmatch "^[A-ZÁÉÍÓÚÑ0-9 .\-/]+$" -and $t.Length -gt 4) { $t = $t.ToLower() }
  return $t
}
function Os-SiNo($v) {
  if ($null -eq $v -or "$v" -eq "") { return $null }
  if ($v -is [bool]) { return $v }
  $s = (Norm ([string]$v))
  if ($s -match "^(si|true|1)$") { return $true }
  if ($s -match "^(no|false|0)$") { return $false }
  return $null
}
function Os-Nombre($o) { return ([string]$o.nombre).Trim() }

# Respuesta de un campo para una obra social
function Os-Campo($o, [string]$campo) {
  $nom = Os-Nombre $o
  $sd = "De $nom no tengo cargado ese dato."
  switch ($campo) {
    "genericos" {
      $v = Os-SiNo $o.genericos; if ($null -eq $v) { return $sd }
      if ($v) { return "$nom sí cubre genéricos en reemplazo de la marca recetada." }
      return "$nom no cubre genéricos en reemplazo de la marca recetada."
    }
    "recetaGenerico" {
      $v = Os-SiNo $o.recetaGenerico; if ($null -eq $v) { return $sd }
      if ($v) { return "$nom exige que el médico recete por nombre genérico." }
      return "$nom no exige que el médico recete por nombre genérico."
    }
    "afiliado" {
      $v = Os-SiNo $o.modificarAfiliado; if ($null -eq $v) { return $sd }
      if ($v) { return "En $nom sí se puede modificar el número de afiliado." }
      return "En $nom no se puede modificar el número de afiliado."
    }
    "diagnostico" {
      $v = Os-SiNo $o.diagnostico; if ($null -eq $v) { return $sd }
      if ($v) { return "$nom sí requiere diagnóstico." }
      return "$nom no requiere diagnóstico."
    }
    "notasAfiliado" { if (-not [string]$o.notasAfiliado) { return "De $nom no hay notas sobre el número de afiliado cargadas." }; return ("Sobre el número de afiliado de ${nom}: " + ([string]$o.notasAfiliado).Trim().TrimEnd(".") + ".") }
    "recetario" { if (-not [string]$o.recetario) { return $sd }; return ("El recetario de ${nom} es: " + (Os-Hablar ([string]$o.recetario)) + ".") }
    "recElectronicas" { if (-not [string]$o.recElectronicas) { return $sd }; return ("Para las recetas electrónicas de ${nom}: " + (Os-Hablar ([string]$o.recElectronicas)) + ".") }
    "vencimiento" { if (-not [string]$o.vencimiento) { return $sd }; return ("Las recetas de $nom vencen a los " + (Os-Hablar ([string]$o.vencimiento)) + ".") }
    "validador" { if (-not [string]$o.validador) { return $sd }; return ("El validador de $nom es " + (Os-Hablar ([string]$o.validador)) + ".") }
    "particularidades" { if (-not [string]$o.particularidades) { return "De $nom no hay particularidades cargadas." }; return ("Particularidades de ${nom}: " + ((Os-Hablar ([string]$o.particularidades)).TrimEnd(".")) + ".") }
    "atencion" { if (-not [string]$o.atencion) { return "No tengo cargado si atendemos $nom ni en qué horarios." }; return ("Atención de ${nom}: " + [string]$o.atencion + ".") }
  }
  return $sd
}

function Os-Ficha($o) {
  $nom = Os-Nombre $o
  $p = @()
  $v = Os-SiNo $o.genericos; if ($null -ne $v) { if ($v) { $p += "cubre genéricos" } else { $p += "no cubre genéricos" } }
  $v = Os-SiNo $o.recetaGenerico; if ($null -ne $v) { if ($v) { $p += "exige receta por nombre genérico" } else { $p += "no exige receta por nombre genérico" } }
  $v = Os-SiNo $o.modificarAfiliado; if ($null -ne $v) { if ($v) { $p += "se puede modificar el número de afiliado" } else { $p += "no se puede modificar el número de afiliado" } }
  $v = Os-SiNo $o.diagnostico; if ($null -ne $v) { if ($v) { $p += "requiere diagnóstico" } else { $p += "no requiere diagnóstico" } }
  if ([string]$o.recetario) { $p += ("recetario " + (Os-Hablar ([string]$o.recetario))) }
  if ([string]$o.recElectronicas) { $p += ("recetas electrónicas: " + (Os-Hablar ([string]$o.recElectronicas))) }
  if ([string]$o.vencimiento) { $p += ("vencimiento " + (Os-Hablar ([string]$o.vencimiento))) }
  if ([string]$o.validador) { $p += ("validador: " + (Os-Hablar ([string]$o.validador))) }
  if ([string]$o.particularidades) { $p += ("particularidades: " + (Os-Hablar ([string]$o.particularidades))) }
  if ([string]$o.notasAfiliado) { $p += ("nota sobre el número de afiliado: " + ([string]$o.notasAfiliado).Trim().TrimEnd(".")) }
  if ([string]$o.atencion) { $p += ("atención: " + [string]$o.atencion) }
  if ($p.Count -eq 0) { return "De $nom no tengo datos cargados todavía." }
  return ("${nom}: " + ($p -join "; ") + ".")
}

function Os-Frescura {
  if ($script:osDatos.actualizado) { return " (datos cargados el " + [string]$script:osDatos.actualizado + ")" }
  return ""
}

function Obrassociales-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  if (-not $n) { return $null }
  Os-Load
  if (-not $script:osDatos -or @($script:osDatos.obras).Count -eq 0) { return $null }
  if ($speaker -eq "invitado") { return $null }

  $campo = ""
  if ($n -match "token|notas? (del? )?(nro |numero )?(de )?afiliado|como (va|se carga|se pone|se ingresa|se escribe) (el )?(nro|numero) de afiliado") { $campo = "notasAfiliado" }
  elseif ($n -match "receta(s)? electronica|rec electronica|electronicas") { $campo = "recElectronicas" }
  elseif ($n -match "(receta|recete|recetar|prescri)\w* (por )?(el )?(nombre )?generico|por (el )?nombre generico|nombre generico") { $campo = "recetaGenerico" }
  elseif ($n -match "generico|reemplazo|marca recetada") { $campo = "genericos" }
  elseif ($n -match "(modific|cambi|cambio|editar|corregir)\w* .*afiliado|afiliado.*(modific|cambi)|nro afiliado|numero de afiliado") { $campo = "afiliado" }
  elseif ($n -match "diagnostico") { $campo = "diagnostico" }
  elseif ($n -match "vencimiento|vence|vencen|cuanto dura|cuantos dias") { $campo = "vencimiento" }
  elseif ($n -match "validador|valida |validan|validar|valid ") { $campo = "validador" }
  elseif ($n -match "recetario") { $campo = "recetario" }
  elseif ($n -match "particularidad|observacion|aclaracion|nota de") { $campo = "particularidades" }
  elseif ($n -match "atendemos|atienden|atiende|atencion|manana|horario|dias de atencion") { $campo = "atencion" }

  if (-not $campo -and $n -match "\b(colfarma|colegio)\b") { $campo = "validador" }
  $plural = $n -match "obras sociales|cuales obras|que obras|^(cuales|que|quienes) (usan|tienen|trabajan con)\b"
  $obras = @(Os-Buscar $n)

  # --- Una obra social concreta ---
  if ($obras.Count -ge 1 -and -not $plural) {
    $o = $obras[0]
    if ($campo) { return (Os-Say ((Os-Campo $o $campo) + (Os-Frescura))) }
    if ($n -match "ficha|que sabes|info|datos|contame|decime|como es|particular|resumen|todo" -or $n.Split(" ").Count -le 4) { return (Os-Say ((Os-Ficha $o) + (Os-Frescura))) }
    return $null
  }
  if ($obras.Count -ge 2 -and $campo) {
    return (Os-Say (($obras | Select-Object -First 4 | ForEach-Object { Os-Campo $_ $campo }) -join " "))
  }

  # --- Preguntas sobre todas ---
  if ($plural) {
    $todas = @($script:osDatos.obras)
    if ($n -match "cuantas") { return (Os-Say ("Tengo cargadas " + $todas.Count + " obras sociales." + (Os-Frescura))) }
    $neg = $n -match "\bno (cubren|exigen|piden|requieren|permiten|dejan|aceptan)\b|\bsin\b"
    $lista = @()
    $desc = ""
    switch ($campo) {
      "genericos"      { $lista = @($todas | Where-Object { (Os-SiNo $_.genericos) -eq (-not $neg) -and $null -ne (Os-SiNo $_.genericos) }); $desc = $(if ($neg) { "no cubren genéricos" } else { "cubren genéricos" }) }
      "recetaGenerico" { $lista = @($todas | Where-Object { (Os-SiNo $_.recetaGenerico) -eq (-not $neg) -and $null -ne (Os-SiNo $_.recetaGenerico) }); $desc = $(if ($neg) { "no exigen receta por nombre genérico" } else { "exigen receta por nombre genérico" }) }
      "afiliado"       { $lista = @($todas | Where-Object { (Os-SiNo $_.modificarAfiliado) -eq (-not $neg) -and $null -ne (Os-SiNo $_.modificarAfiliado) }); $desc = $(if ($neg) { "no permiten modificar el número de afiliado" } else { "permiten modificar el número de afiliado" }) }
      "diagnostico"    { $lista = @($todas | Where-Object { (Os-SiNo $_.diagnostico) -eq (-not $neg) -and $null -ne (Os-SiNo $_.diagnostico) }); $desc = $(if ($neg) { "no requieren diagnóstico" } else { "requieren diagnóstico" }) }
      "validador" {
        $m = [regex]::Match($n, "validador (?:es |de |usa |usan )?(?:el |la )?([a-z0-9]+)$|(?:usan|con|que usan) (?:el )?(?:validador )?([a-z0-9]+)$")
        if (-not $m.Success -and $n -match "colfarma|colegio") { $m = [regex]::Match("validador colfarma", "validador (?:es |de |usa |usan )?(?:el |la )?([a-z0-9]+)$") }
        $q = ""; if ($m.Success) { $q = $m.Groups[1].Value + $m.Groups[2].Value }
        if ($q -match "^(colfarma|colegio|colegio de farmaceuticos)$") { $q = "col" }
        if ($q) { $lista = @($todas | Where-Object { (Norm ([string]$_.validador)) -eq $q }); $desc = $(if ($q -eq "col") { "validan con el Colegio" } else { "usan el validador " + $q.ToUpper() }) }
      }
      "recetario" {
        $m = [regex]::Match($n, "recetario (?:es |de |tipo )?([a-z0-9 ]+)$")
        $q = ""; if ($m.Success) { $q = $m.Groups[1].Value.Trim() }
        if ($q) { $lista = @($todas | Where-Object { (Norm ([string]$_.recetario)) -eq $q }); $desc = "tienen recetario " + $q }
      }
    }
    if ($desc) {
      if ($lista.Count -eq 0) { return (Os-Say ("No encuentro obras sociales que $desc entre las que tengo cargadas." + (Os-Frescura))) }
      $nombres = @($lista | ForEach-Object { Os-Nombre $_ })
      if ($nombres.Count -eq 1) { return (Os-Say ("La única que $desc es " + $nombres[0] + "." + (Os-Frescura))) }
      if ($nombres.Count -le 12) { return (Os-Say ("Las que $desc son " + $nombres.Count + ": " + ($nombres -join ", ") + "." + (Os-Frescura))) }
      return (Os-Say ("Son " + $nombres.Count + " las que $desc. Algunas: " + (($nombres | Select-Object -First 10) -join ", ") + ". Te las dejo todas en pantalla."))
    }
    return $null
  }
  return $null
}
