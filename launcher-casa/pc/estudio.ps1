# ============================================================
# MIA - Modo estudio (estudio.ps1)
# Responde SOLO con el material de la carpeta datos\estudio\*.json
# (indices generados con herramientas\build_estudio.py), citando documento y pagina.
# Frases: "que dice el material sobre X", "estudio sobre X", "resumime el tema X",
#         "preguntame sobre X" (quiz), "modo estudio".
# ============================================================

$script:estDir   = Join-Path $root "datos\estudio"
$script:estDocs  = @()
$script:estIdf   = @{}
$script:estSig   = ""
$script:estQuiz  = $null
$estStop = @{}
foreach ($w in ("de la el los las un una unos unas y o u e en a al del lo que se su sus por con para como es son fue ser ha han hay mas pero sin sobre entre este esta estos estas ese esa eso asi si no ni le les me te nos muy tambien cuando donde cual cuales segun cada todo toda todos todas otro otra otros otras gano ganado ganaron tiene tienen cuantos cuantas quien quienes contame conta decime hablame sabes sabe mia" -split " ")) { $estStop[$w] = $true }

function Est-Stems([string]$s) {
  $out = New-Object System.Collections.ArrayList
  foreach ($w in ((Norm $s) -split " ")) {
    if ($w.Length -lt 2 -or $estStop.ContainsKey($w)) { continue }
    if ($w.Length -gt 3 -and $w.EndsWith("s")) { $w = $w.Substring(0, $w.Length - 1) }
    [void]$out.Add($w)
  }
  return ,@($out | Select-Object -Unique)
}

function Est-Load {
  if (-not (Test-Path $script:estDir)) { return }
  $files = @(Get-ChildItem $script:estDir -Filter *.json -ErrorAction SilentlyContinue)
  $sig = (($files | ForEach-Object { $_.Name + $_.LastWriteTimeUtc.Ticks }) -join "|")
  if ($sig -eq $script:estSig -and $script:estDocs.Count -gt 0) { return }
  $docs = @(); $df = @{}; $total = 0
  foreach ($f in $files) {
    try {
      $d = [System.IO.File]::ReadAllText($f.FullName, (New-Object System.Text.UTF8Encoding($false))) | ConvertFrom-Json
      foreach ($c in $d.chunks) {
        $set = New-Object 'System.Collections.Generic.HashSet[string]'
        foreach ($k in ([string]$c.k -split " ")) { if ($k) { [void]$set.Add($k) } }
        $c | Add-Member -NotePropertyName set -NotePropertyValue $set -Force
        $tset = New-Object 'System.Collections.Generic.HashSet[string]'
        if ($c.s) { foreach ($w in (Est-Stems ([string]$c.s))) { [void]$tset.Add($w) } }
        $c | Add-Member -NotePropertyName tset -NotePropertyValue $tset -Force
        foreach ($k in $set) { if ($df.ContainsKey($k)) { $df[$k]++ } else { $df[$k] = 1 } }
        $total++
      }
      $docs += $d
    } catch { Write-Host ("Estudio: no pude leer " + $f.Name + ": " + $_.Exception.Message) }
  }
  $idf = @{}
  foreach ($k in $df.Keys) { $idf[$k] = [Math]::Log(1 + ($total / $df[$k])) }
  $script:estDocs = $docs; $script:estIdf = $idf; $script:estSig = $sig
}

function Est-Search([string]$q, [int]$n = 4, [string]$tema = "") {
  Est-Load
  if ($script:estDocs.Count -eq 0) { return @() }
  $qs = Est-Stems $q
  if ($qs.Count -eq 0) { return @() }
  $phrase = Norm $q
  $res = New-Object System.Collections.ArrayList
  foreach ($d in $script:estDocs) {
    $dt = [string]$d.tema
    if ($tema) { if ($dt -ne $tema) { continue } } elseif ($dt) { continue }
    foreach ($c in $d.chunks) {
      $s = 0.0; $m = 0
      foreach ($w in $qs) { if ($c.set.Contains($w)) { $s += $script:estIdf[$w]; $m++ } }
      if ($m -eq 0) { continue }
      $s = $s * (0.5 + 0.5 * $m / $qs.Count)
      foreach ($w in $qs) { if ($c.tset -and $c.tset.Contains($w)) { $s += 1.5 } }
      if ($qs.Count -ge 2 -and (Norm $c.t).Contains($phrase)) { $s += 3 }
      [void]$res.Add([pscustomobject]@{ score = $s; doc = [string]$d.titulo; p = [int]$c.p; sec = [string]$c.s; t = [string]$c.t })
    }
  }
  return @($res | Sort-Object score -Descending | Select-Object -First $n)
}

function Est-Contexto($hits) {
  $sb = New-Object System.Text.StringBuilder
  foreach ($h in $hits) {
    $t = $h.t; if ($t.Length -gt 1300) { $t = $t.Substring(0, 1300) }
    if ($sb.Length + $t.Length -gt 5200) { break }
    $lugar = ", página " + $h.p; if ($h.sec) { $lugar = ", sección " + $h.sec }
    [void]$sb.AppendLine("[" + $h.doc + $lugar + "] " + $t)
    [void]$sb.AppendLine("")
  }
  return $sb.ToString()
}

function Est-Fuentes($hits) {
  $l = @(); foreach ($h in $hits) { $x = $h.doc + " p." + $h.p; if ($h.sec) { $x = $h.doc + ": " + $h.sec }; if ($l -notcontains $x) { $l += $x } }
  return ($l -join "; ")
}

function Est-Llm([string]$system, [string]$user, [int]$max = 350) {
  $msgs = @(@{ role = "system"; content = $system }, @{ role = "user"; content = ($user + " /no_think") })
  $body = @{ model = "local"; messages = $msgs; temperature = 0.3; max_tokens = $max; stream = $false } | ConvertTo-Json -Depth 6 -Compress
  $txt = Get-Text "$llm/v1/chat/completions" "POST" $body 150000
  $r = $txt | ConvertFrom-Json
  $c = [string]$r.choices[0].message.content
  $c = [regex]::Replace($c, "(?s)<think>.*?</think>", "")
  return ([regex]::Replace($c, '[*_#`]+', "")).Trim()
}

$script:estSys = "Sos MIA, asistente de estudio de Luciano (técnico químico, Mar del Plata, español rioplatense). Respondé SOLO con la información de los FRAGMENTOS que se te dan. Reglas: 1) No inventes datos, fórmulas, cantidades ni procedimientos que no estén en los fragmentos. 2) Citá siempre de dónde sale, por ejemplo: según Química Analítica, página 12. 3) Si los fragmentos no alcanzan para responder, decilo claramente y sugerí qué buscar. 4) Respuesta corta y fácil de escuchar: máximo 5 oraciones, sin listas ni símbolos raros."

function Est-Responder([string]$tema, [string]$modo) {
  $hits = Est-Search $tema 4
  if ($hits.Count -eq 0) {
    return @{ ok = $true; action = "say"; reply = "No encontré nada sobre eso en el material cargado. Probá con otras palabras, o revisá que estén copiados los índices en la carpeta datos estudio." }
  }
  $ctx = Est-Contexto $hits
  $pedido = "Explicá qué dice el material sobre: $tema"
  if ($modo -eq "resumen") { $pedido = "Hacé un resumen ordenado del tema: $tema" }
  try {
    $a = Est-Llm $script:estSys ("FRAGMENTOS:`n" + $ctx + "`nPEDIDO: " + $pedido)
  } catch {
    Write-Host ("Estudio: " + $_.Exception.Message)
    return @{ ok = $false; action = "say"; reply = "No pude hablar con el modelo para armar la respuesta. ¿Está abierta la ventana del modelo?" }
  }
  if (-not $a) { $a = "No pude armar una respuesta con ese material." }
  return @{ ok = $true; action = "say"; reply = $a; display = ($a + "`n`nFuentes: " + (Est-Fuentes $hits)) }
}

function Est-Quiz([string]$tema) {
  $script:estTema = $tema
  $hits = Est-Search $tema 6
  if ($hits.Count -eq 0) { return @{ ok = $true; action = "say"; reply = "No encontré material sobre ese tema para preguntarte." } }
  $h = $hits[(Get-Random -Maximum $hits.Count)]
  $frag = "[" + $h.doc + ", página " + $h.p + "] " + $h.t
  try {
    $q = Est-Llm "Sos un profesor de química. Con el FRAGMENTO que te doy, hacé UNA sola pregunta corta de estudio, que se pueda responder con ese fragmento. Devolvé solo la pregunta, sin respuesta." ("FRAGMENTO:`n" + $frag) 120
  } catch { return @{ ok = $false; action = "say"; reply = "No pude hablar con el modelo para armar la pregunta." } }
  if (-not $q) { return @{ ok = $true; action = "say"; reply = "No pude armar la pregunta, probá de nuevo." } }
  $script:estQuiz = @{ frag = $frag; q = $q; at = Get-Date; fuente = ($h.doc + " p." + $h.p) }
  return @{ ok = $true; action = "say"; reply = $q; display = ($q + "`n(decime tu respuesta o 'no sé')"); listen = $true }
}

function Est-Corregir([string]$resp) {
  $z = $script:estQuiz; $script:estQuiz = $null
  $sys = "Sos un profesor de química amable, español rioplatense. Corregí la respuesta del alumno usando SOLO el FRAGMENTO. Decí si está bien, parcialmente bien o mal, y explicá la respuesta correcta en máximo 4 oraciones, citando la página. Sin listas."
  try { $a = Est-Llm $sys ("FRAGMENTO:`n" + $z.frag + "`nPREGUNTA: " + $z.q + "`nRESPUESTA DEL ALUMNO: " + $resp) 300 } catch { return @{ ok = $false; action = "say"; reply = "No pude corregirte, falló el modelo." } }
  return @{ ok = $true; action = "say"; reply = $a; display = ($a + "`n`nFuente: " + $z.fuente) }
}

# ---------- Bases de conocimiento (datos\conocimiento.json + datos\estudio\<tema>.json) ----------
# Cada tema (Boca, Seleccion, ...) se responde con el motor de estudio, solo con sus fragmentos.
$script:conPath = Join-Path $root "datos\conocimiento.json"
$script:conTemas = @()
$script:conSig = ""
$script:conGenerico = "historia|historico|historica|fundo|fundacion|fundaron|fundador|nacio|origen|apodo|estadio|idolo|idolos|titulos|copas|copa|estrellas|record|goleador|colores|hinchada|presidente|cuantos|cuantas|que sabes|contame|conta|hablame|final|finales|campeon|campeonato|invicto|torneo|entrenador|tecnico|quien|quienes|cuando|donde|como|mundial|mundiales|ganaron|ganado|gano|perdio|perdieron"

function Con-Cargar {
  if (-not (Test-Path $script:conPath)) { return }
  $fi = Get-Item $script:conPath
  $sig = [string]$fi.LastWriteTimeUtc.Ticks
  if ($sig -eq $script:conSig) { return }
  try {
    $j = Get-Content $script:conPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $script:conTemas = @($j.temas)
    $script:conSig = $sig
  } catch { Write-Host ("Conocimiento: no pude leer conocimiento.json: " + $_.Exception.Message) }
}

function Est-Secciones([string]$tema, [string[]]$prefijos) {
  Est-Load
  $out = @()
  foreach ($d in $script:estDocs) {
    if ([string]$d.tema -ne $tema) { continue }
    foreach ($p in $prefijos) {
      foreach ($c in $d.chunks) { if (([string]$c.s).StartsWith($p)) { $out += [pscustomobject]@{ score = 1; doc = [string]$d.titulo; p = [int]$c.p; sec = [string]$c.s; t = [string]$c.t }; break } }
    }
  }
  return $out
}

function Conocimiento-Decide([string]$said) {
  Con-Cargar
  if ($script:conTemas.Count -eq 0) { return $null }
  $n = Norm $said
  foreach ($t in $script:conTemas) {
    $claves = [string]$t.claves
    if (-not $claves) { continue }
    if ($n -notmatch ("\b(" + $claves + ")\b")) { continue }
    if ([string]$t.excluye -and $n -match ([string]$t.excluye)) { continue }
    $inten = $script:conGenerico
    if ([string]$t.intencion) { $inten = $inten + "|" + [string]$t.intencion }
    if ($n -notmatch ("\b(" + $inten + ")\b")) { continue }
    $tema = [string]$t.tema
    $hits = Est-Search $said 3 $tema
    if ($n -match "historia" -and (Est-Stems $said).Count -le 4 -and $t.resumen) {
      $h2 = @(Est-Secciones $tema ([string[]]@($t.resumen)))
      if ($h2.Count -gt 0) { $hits = $h2 }
    }
    if ($hits.Count -eq 0) { return @{ ok = $true; action = "say"; reply = ("Eso de " + [string]$t.nombre + " todavía no lo tengo cargado. Decime qué te gustaría saber y lo sumo a mi base.") } }
    $sys = "Sos MIA, el asistente de Luciano, en español rioplatense. " + [string]$t.perfil + ". Respondé SOLO con la información de los FRAGMENTOS sobre " + [string]$t.nombre + ". Reglas: 1) No inventes fechas, resultados ni cifras que no estén en los fragmentos. 2) Si los fragmentos no alcanzan, decí que eso no lo tenés cargado todavía, sin inventar. 3) Respuesta corta y fácil de escuchar: máximo 5 oraciones, sin listas ni símbolos. 4) " + [string]$t.nota
    $ctx = Est-Contexto $hits
    try { $a = Est-Llm $sys ("FRAGMENTOS:`n" + $ctx + "`nPREGUNTA: " + $said) 300 }
    catch { Write-Host ("Conocimiento " + $tema + ": " + $_.Exception.Message); return @{ ok = $false; action = "say"; reply = ("No pude hablar con el modelo para contestarte eso de " + [string]$t.nombre + ".") } }
    if (-not $a) { $a = "No pude armar una respuesta sobre eso." }
    return @{ ok = $true; action = "say"; reply = $a; display = ($a + "`n`nBase: " + (Est-Fuentes $hits)) }
  }
  return $null
}

function Estudio-Decide([string]$said) {
  $t = Norm $said
  # Quiz pendiente: la proxima frase es la respuesta (vence a los 10 minutos)
  if ($script:estQuiz) {
    if (((Get-Date) - $script:estQuiz.at).TotalMinutes -gt 10) { $script:estQuiz = $null }
    elseif ($t -match "^(?:mia )?(?:cancelar|dejemos|basta|no quiero mas|terminemos)") { $script:estQuiz = $null; return @{ ok = $true; action = "say"; reply = "Listo, dejamos el repaso." } }
    elseif ($t -match "^(?:mia )?(?:otra pregunta|siguiente)") { $script:estQuiz = $null; $tt = $script:estTema; if (-not $tt) { $tt = "titulacion" }; return (Est-Quiz $tt) }
    else { return (Est-Corregir $said) }
  }
  if ($t -match "^(?:mia )?modo estudio\s*$") {
    return @{ ok = $true; action = "say"; reply = "Modo estudio listo. Decime: qué dice el material sobre un tema, resumime el tema tal, o preguntame sobre tal tema para repasar." }
  }
  $m = [regex]::Match($t, "^(?:mia )?(?:preguntame|tomame|haceme una pregunta|haceme preguntas|repasemos|repasame)(?: (?:sobre|de|acerca de))? ?(.*)$")
  if ($m.Success) {
    $tema = $m.Groups[1].Value.Trim(); if (-not $tema) { $tema = "titulacion" }
    return (Est-Quiz $tema)
  }
  $m = [regex]::Match($t, "^(?:mia )?(?:resumime|resumi|resumen de|haceme un resumen de)(?: (?:el|la|los|las))? ?(?:tema|modulo|capitulo|apunte|material|practico|tp)? ?(?:de |del |sobre )?(.+)$")
  if ($m.Success -and $t -match "(tema|modulo|capitulo|apunte|material|practico|tp)") { return (Est-Responder $m.Groups[1].Value.Trim() "resumen") }
  $m = [regex]::Match($t, "^(?:mia )?(?:que dice|que dicen|que explica|que dice mi|que hay en|que tengo en|busca en) (?:el|la|los|las|mi|mis)? ?(?:material|apuntes?|carpeta|libro|guia|modulo|teoria)s? (?:de laboratorio |de quimica )?(?:sobre|de|acerca de|del) (.+)$")
  if ($m.Success) { return (Est-Responder $m.Groups[1].Value.Trim() "explicar") }
  $m = [regex]::Match($t, "^(?:mia )?(?:estudio|estudiemos|estudiar|a estudiar)(?: (?:sobre|de|acerca de|el tema de|el tema))? (.+)$")
  if ($m.Success) { return (Est-Responder $m.Groups[1].Value.Trim() "explicar") }
  $m = [regex]::Match($t, "^(?:mia )?(?:segun|en) (?:el|la|mi|mis)? ?(?:material|apuntes?|carpeta|libro|guia)s? (?:de laboratorio |de quimica )?(?:que|como|cual|cuando|para que|por que) (.+)$")
  if ($m.Success) { return (Est-Responder $m.Groups[1].Value.Trim() "explicar") }
  return $null
}
