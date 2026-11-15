# ============================================================
# MIA - Trato de usted (usted.ps1)
# Luciano pidio que MIA lo trate SIEMPRE de usted. Este filtro convierte el voseo de las respuestas
# (fijas y del modelo) a usted antes de enviarlas. Mili e invitados no se tocan.
# Se carga desde cerebro.ps1 (dot-source). Funcion: Usted-Texto, Usted-Aplica.
# ============================================================

$script:ustedMapa = @{
  # presente
  "tenés"="tiene"; "querés"="quiere"; "podés"="puede"; "sabés"="sabe"; "estás"="está"; "sos"="es"; "hacés"="hace"
  "ponés"="pone"; "decís"="dice"; "vas"="va"; "andás"="anda"; "llevás"="lleva"; "comprás"="compra"; "pagás"="paga"
  "necesitás"="necesita"; "preferís"="prefiere"; "elegís"="elige"; "vivís"="vive"; "salís"="sale"; "venís"="viene"
  "pedís"="pide"; "mirás"="mira"; "usás"="usa"; "pensás"="piensa"; "gastás"="gasta"; "dormís"="duerme"
  "caminás"="camina"; "jugás"="juega"; "entendés"="entiende"; "escuchás"="escucha"; "buscás"="busca"
  "contás"="cuenta"; "acordás"="acuerda"; "trabajás"="trabaja"; "estudiás"="estudia"; "cargás"="carga"
  "agregás"="agrega"; "anotás"="anota"; "te"="le"; "tenes"="tiene"; "queres"="quiere"; "podes"="puede"
  "sabes"="sabe"
  # pasado
  "gastaste"="gastó"; "pagaste"="pagó"; "compraste"="compró"; "dijiste"="dijo"; "anotaste"="anotó"; "pesaste"="pesó"
  "fuiste"="fue"; "hiciste"="hizo"; "dormiste"="durmió"; "caminaste"="caminó"; "jugaste"="jugó"; "comiste"="comió"
  "tuviste"="tuvo"; "pediste"="pidió"; "pusiste"="puso"; "mencionaste"="mencionó"; "preguntaste"="preguntó"
  "cargaste"="cargó"; "agregaste"="agregó"; "guardaste"="guardó"; "contaste"="contó"; "pasaste"="pasó"
  "usaste"="usó"; "viste"="vio"; "pensaste"="pensó"; "elegiste"="eligió"; "hablaste"="habló"; "mandaste"="mandó"
  "borraste"="borró"; "pedíste"="pidió"
  # imperativo
  "decime"="dígame"; "mandame"="mándeme"; "avisame"="avíseme"; "contame"="cuénteme"; "preguntame"="pregúnteme"
  "pedime"="pídame"; "fijate"="fíjese"; "acordate"="acuérdese"; "probá"="pruebe"; "mirá"="mire"; "usá"="use"
  "agregá"="agregue"; "abrí"="abra"; "elegí"="elija"; "decí"="diga"; "avisá"="avise"; "mandá"="mande"
  "tené"="tenga"; "recordá"="recuerde"; "esperá"="espere"; "revisá"="revise"; "cargá"="cargue"; "decilo"="dígalo"
  "probalo"="pruébelo"; "contale"="cuéntele"; "pedile"="pídale"; "tomá"="tome"; "anotá"="anote"; "confirmá"="confirme"
  "activá"="active"; "tocá"="toque"; "apretá"="apriete"; "entrá"="entre"; "andá"="vaya"; "buscá"="busque"; "escribí"="escriba"; "presioná"="presione"; "seleccioná"="seleccione"; "mantené"="mantenga"; "conectate"="conéctese"; "asegurate"="asegúrese"; "verificá"="verifique"; "copiá"="copie"; "pegá"="pegue"; "cerrá"="cierre"; "reiniciá"="reinicie"; "instalá"="instale"; "dame"="deme"
  "ponete"="póngase"; "pesate"="pésese"; "cuidate"="cuídese"; "descansá"="descanse"; "dormí"="duerma"
  "enviame"="envíeme"; "mostrame"="muéstreme"; "ayudame"="ayúdeme"
  "decile"="dígale"; "pasame"="páseme"; "dejame"="déjeme"; "indicame"="indíqueme"; "repetime"="repítame"
  # pronombres
  "vos"="usted"; "tu"="su"; "tus"="sus"; "tuyo"="suyo"; "tuya"="suya"; "tuyos"="suyos"; "tuyas"="suyas"
  "ti"="usted"; "contigo"="con usted"
}
$script:ustedMapa["recordame"] = "recuérdeme"
$script:ustedPat = $null

function Usted-Texto([string]$t) {
  if (-not $t) { return $t }
  if (-not $script:ustedPat) {
    $claves = @($script:ustedMapa.Keys | Sort-Object { $_.Length } -Descending | ForEach-Object { [regex]::Escape($_) })
    $script:ustedPat = New-Object System.Text.RegularExpressions.Regex(("(?<![\p{L}\p{N}])(" + ($claves -join "|") + ")(?![\p{L}\p{N}])"), [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  }
  $ev = [System.Text.RegularExpressions.MatchEvaluator]{
    param($m)
    $orig = $m.Value
    $dest = $script:ustedMapa[$orig.ToLower()]
    if (-not $dest) { return $orig }
    if ($orig.Length -gt 1 -and $orig -ceq $orig.ToUpper()) { return $dest.ToUpper() }
    if ($orig.Substring(0,1) -ceq $orig.Substring(0,1).ToUpper()) { return ($dest.Substring(0,1).ToUpper() + $dest.Substring(1)) }
    return $dest
  }
  # "te lo / te la / te los / te las" -> "se lo ..."
  $t = [regex]::Replace($t, "(?<![\p{L}\p{N}])([Tt])e (lo|la|los|las)(?![\p{L}\p{N}])", { param($m) if ($m.Groups[1].Value -ceq "T") { "Se " + $m.Groups[2].Value } else { "se " + $m.Groups[2].Value } })
  return $script:ustedPat.Replace($t, $ev)
}

# Aplica el trato de usted a una respuesta de cerebro (solo para Luciano).
function Usted-Aplica($res, [string]$speaker) {
  if (-not $res -or $speaker -ne "Luciano") { return $res }
  try {
    if ($res.reply) { $res.reply = Usted-Texto ([string]$res.reply) }
    if ($res.display) { $res.display = Usted-Texto ([string]$res.display) }
  } catch { Write-Host ("Usted: " + $_.Exception.Message) }
  return $res
}
