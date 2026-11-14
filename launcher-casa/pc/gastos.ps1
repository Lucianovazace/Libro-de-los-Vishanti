# ============================================================
# MIA - Gastos (gastos.ps1)
# Anota lo que compra Luciano (por voz o texto), lo categoriza, recuerda cada precio
# y avisa si esta vez pago de mas respecto de la ultima vez o del mejor precio.
# Datos: datos\gastos.json (se puede abrir con el Bloc de notas). Montos en pesos, sin decimales.
# Frases:
#   "me compre unas pepas terepin a 3000"   "gaste 5000 en el kiosco"   "pague 12000 de luz"
#   "compre 2 alfajores a 800 cada uno"     "ayer gaste 7000 en el super"
#   "cuanto gaste este mes / hoy / ayer / esta semana / el mes pasado (en kiosco)"
#   "en que gasto mas"   "resumen de gastos"   "ultimos gastos"   "borra el ultimo gasto"
#   "ponelo en kiosco"   "tope de kiosco 30000"   "como puedo ahorrar"
#   "cuanto pague la ultima vez las pepas terepin"   "pepas terepin a 3500, es caro?"
# Se carga desde cerebro.ps1 (dot-source). Usa Norm, $data, $utf8 y (opcional) Est-Llm.
# ============================================================

$gasF = Join-Path $data "gastos.json"
$script:gasInv = [Globalization.CultureInfo]::InvariantCulture
$script:gasPend = $null

# Categorias, en orden de prioridad (la primera que coincide gana). rx se aplica sobre texto sin tildes.
$script:gasCats = @(
  @{ n = "Kiosco";         alias = "kiosco|kiosko|golosinas?";                    rx = "\b(?:pepa|alfajor|chicle|caramelo|chocolate|galletit|gaseosa|coca cola|snack|papas fritas|chupet|turron|oblea|cigarrillo|helado|kiosco|kiosko|golosin)" },
  @{ n = "Comida afuera";  alias = "comida afuera|delivery|comida";               rx = "\b(?:delivery|pedidos ya|rappi|pizza|empanada|hamburguesa|burger|mcdonald|mostaza|cafe|cafeteria|panaderia|medialuna|sandwich|lomito|sushi|milanesa|restaurante|parrilla|almuerzo|comida)" },
  @{ n = "Transporte";     alias = "transporte|colectivo|nafta";                  rx = "\b(?:colectivo|sube|nafta|combustible|uber|taxi|remis|estacionamiento|peaje|bondi|tren|micro|pasaje|bici)\b" },
  @{ n = "Salud";          alias = "salud|farmacia";                              rx = "\b(?:farmacia|remedio|medicamento|ibuprofeno|dentista|medico|consulta|analisis|anteojos|vitamina)" },
  @{ n = "Servicios";      alias = "servicios?|facturas?";                        rx = "\b(?:luz|gas|agua|internet|wifi|celular|abono|netflix|spotify|suscripcion|expensas|alquiler|seguro|cablevision|flow|monotributo|patente|municipal)\b" },
  @{ n = "Deporte";        alias = "deporte|futbol";                              rx = "\b(?:cancha|botines|guantes|pelota|futbol|gimnasio|gym|suplemento|proteina|camiseta|canillera|beelup|torneo|club)" },
  @{ n = "Ropa";           alias = "ropa";                                        rx = "\b(?:remera|pantalon|zapatilla|campera|buzo|medias|jean|ropa|short|calzado)" },
  @{ n = "Estudio";        alias = "estudio|colegio";                             rx = "\b(?:fotocopia|libro|carpeta|cuaderno|lapicera|calculadora|birome|guardapolvo|reactivo|apunte|impresion|utiles)" },
  @{ n = "Salidas";        alias = "salidas?";                                    rx = "\b(?:cine|bar|boliche|cerveza|trago|birra|fernet|vino|recital|entrada|teatro|salida|regalo|cumple)\b" },
  @{ n = "Hogar";          alias = "hogar|casa";                                  rx = "\b(?:limpieza|lavandina|detergente|ferreteria|foco|lamparita|sarten|vaso|plato|herramienta|pintura|mueble|colchon|toalla|sabana|papel higienico|shampoo|jabon|desodorante)" },
  @{ n = "Supermercado";   alias = "supermercado|super";                          rx = "\b(?:super|supermercado|carrefour|coto|dia|changomas|jumbo|disco|verduleria|carniceria|almacen|fiambre|leche|pan|huevo|fideo|arroz|yerba|azucar|aceite|verdura|fruta|carne|pollo|queso)\b" }
)
$script:gasStop = @("de","del","la","el","los","las","un","una","unas","unos","y","con","para","mi","mis")

# ---------- Datos ----------
function Gas-Load {
  $d = $null
  if (Test-Path $gasF) { try { $d = ([System.IO.File]::ReadAllText($gasF, $utf8) | ConvertFrom-Json) } catch { $d = $null } }
  $items = @(); $topes = @(); $ap = @()
  if ($d) {
    if ($d.items) { $items = @($d.items) }
    if ($d.topes) { $topes = @($d.topes) }
    if ($d.aprendido) { $ap = @($d.aprendido) }
  }
  return @{ items = $items; topes = $topes; aprendido = $ap }
}
function Gas-Save($g) {
  $o = [pscustomobject]@{ items = @($g.items); topes = @($g.topes); aprendido = @($g.aprendido) }
  [System.IO.File]::WriteAllText($gasF, ($o | ConvertTo-Json -Depth 6), $utf8)
}
function Gas-Say([string]$t, [bool]$listen = $false) {
  $r = @{ ok = $true; action = "say"; reply = $t }
  if ($listen) { $r.listen = $true }
  return $r
}
function Gas-N($n) { return ([math]::Round([double]$n, 0)).ToString("0", $script:gasInv) }
function Gas-Cap([string]$s) { if ($s.Length -eq 0) { return $s }; return $s.Substring(0, 1).ToUpper() + $s.Substring(1) }

# ---------- Numeros ----------
# Devuelve los numeros del texto: @{ v; idx; len; suf; dollar }
function Gas-Numeros([string]$raw) {
  $s = $raw.ToLowerInvariant()
  $palabras = @{ "un" = 1; "una" = 1; "uno" = 1; "dos" = 2; "tres" = 3; "cuatro" = 4; "cinco" = 5; "seis" = 6; "siete" = 7; "ocho" = 8; "nueve" = 9; "diez" = 10; "quince" = 15; "veinte" = 20; "treinta" = 30; "cuarenta" = 40; "cincuenta" = 50 }
  $ev = [System.Text.RegularExpressions.MatchEvaluator]{ param($m) ($palabras[$m.Groups[1].Value].ToString() + " " + $m.Groups[2].Value) }
  $s = [regex]::Replace($s, "\b(un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|quince|veinte|treinta|cuarenta|cincuenta)\s+(mil|lucas?)\b", $ev)
  $out = @()
  foreach ($m in [regex]::Matches($s, "(?<![\w])(\$\s*)?(\d{1,3}(?:\.\d{3})+|\d+(?:[.,]\d+)?)(?:\s*(lucas?|mil|k)\b)?")) {
    $txt = $m.Groups[2].Value
    if ($txt -match "^\d{1,3}(\.\d{3})+$") { $txt = $txt.Replace(".", "") } else { $txt = $txt.Replace(",", ".") }
    $v = 0.0
    if (-not [double]::TryParse($txt, [Globalization.NumberStyles]::Float, $script:gasInv, [ref]$v)) { continue }
    $suf = $m.Groups[3].Value
    if ($suf) { $v = $v * 1000 }
    $out += [pscustomobject]@{ v = $v; idx = $m.Index; len = $m.Length; suf = [bool]$suf; dollar = [bool]$m.Groups[1].Success }
  }
  if ($out.Count -eq 0 -and $s -match "(?<![\w])mil\b") {
    $m = [regex]::Match($s, "(?<![\w])mil\b")
    $out += [pscustomobject]@{ v = 1000.0; idx = $m.Index; len = $m.Length; suf = $true; dollar = $false }
  }
  return $out
}

function Gas-CatDe([string]$n) {
  foreach ($c in $script:gasCats) { if ($n -match ("\b(?:" + $c.alias + ")\b")) { return $c.n } }
  if ($n -match "\botros?\b|\bvarios\b") { return "Otros" }
  return $null
}

function Gas-Key([string]$item) {
  $ws = @()
  foreach ($w in ((Norm $item) -split " ")) {
    if (-not $w -or ($script:gasStop -contains $w)) { continue }
    if ($w.Length -gt 3 -and $w.EndsWith("s")) { $w = $w.Substring(0, $w.Length - 1) }
    $ws += $w
  }
  return (($ws | Sort-Object -Unique) -join " ")
}

function Gas-Cat([string]$item, [string]$lugar, $g) {
  $k = Gas-Key $item
  foreach ($a in @($g.aprendido)) { if ($a.clave -eq $k) { return [string]$a.cat } }
  $t = Norm ($item + " " + $lugar)
  foreach ($c in $script:gasCats) { if ($t -match $c.rx) { return $c.n } }
  return "Otros"
}

# Saca de un texto lo que no es el producto. Devuelve @{ item; lugar }
function Gas-Limpia([string]$t) {
  $t = " " + (Norm $t) + " "
  $t = [regex]::Replace($t, "\b(?:me |nos )?(?:compre|compramos|gaste|gastamos|pague|pagamos|salio|salieron|costo|costaron|cuesta|cuestan|sale|saque|agrega|agregame|anota|anotame|registra|registrame|apunta|apuntame)\b", " ")
  $t = [regex]::Replace($t, "\b(?:cada uno|cada una|c u|por unidad|pesos|plata|lucas|luca|mil|el gasto de|un gasto de|gasto|ayer|anteayer|antes de ayer|hoy|mia|me|nos)\b", " ")
  $t = ($t -replace "\s+", " ").Trim()
  $lugar = ""
  $m = [regex]::Match($t, "(?:^| )en (?:el |la |los |las |un |una )?(.+)$")
  if ($m.Success) { $lugar = $m.Groups[1].Value.Trim(); $t = $t.Substring(0, $m.Index).Trim() }
  for ($i = 0; $i -lt 4; $i++) {
    $t = [regex]::Replace($t, "^(?:de |del |unas |unos |un |una |el |la |los |las |mi |mis |a |por |en |para |y )+", "")
    $t = [regex]::Replace($t, "( a| por| en| de| y| el| la)+$", "")
  }
  $t = $t.Trim()
  if (-not $t -and $lugar) { $t = $lugar }
  return @{ item = $t; lugar = $lugar }
}

# Interpreta "me compre 2 alfajores a 800 cada uno" -> monto, cantidad, item, lugar, fecha. $null si no hay monto.
function Gas-Parse([string]$raw) {
  $toks = @(Gas-Numeros $raw)
  if ($toks.Count -eq 0) { return $null }
  $best = -1; $bestScore = -1
  for ($i = 0; $i -lt $toks.Count; $i++) {
    $t = $toks[$i]
    $sc = 1
    if ($t.suf -or $t.dollar) { $sc = 3 }
    else {
      $pre = $raw.Substring(0, $t.idx).ToLowerInvariant()
      if ($pre -match "(?:\ba|\bpor|\ben|\bde|cuesta|costo|costó|salio|salió|salieron|sale|pague|pagué|gaste|gasté)\s*$") { $sc = 2 }
      elseif ($t.v -le 20) { $sc = 0 }
    }
    if ($sc -ge $bestScore) { $best = $i; $bestScore = $sc }
  }
  $p = $toks[$best]
  if ($p.v -le 0) { return $null }
  $cant = 1
  foreach ($t in $toks) {
    if ($t.idx -ne $p.idx -and -not $t.suf -and -not $t.dollar -and $t.v -ge 1 -and $t.v -le 99 -and $t.v -eq [math]::Floor($t.v)) { $cant = [int]$t.v; break }
  }
  $total = $p.v; $unit = $p.v
  if ($raw.ToLowerInvariant() -match "cada un|c/u|por unidad|la unidad|cada una") { $total = $p.v * $cant }
  else { $unit = $p.v / $cant }
  # texto sin los numeros
  $resto = $raw
  foreach ($t in ($toks | Sort-Object idx -Descending)) { $resto = $resto.Remove($t.idx, $t.len).Insert($t.idx, " ") }
  $l = Gas-Limpia $resto
  $nn = Norm $raw
  $fecha = [datetime]::Today
  if ($nn -match "\banteayer\b|\bantes de ayer\b") { $fecha = $fecha.AddDays(-2) } elseif ($nn -match "\bayer\b") { $fecha = $fecha.AddDays(-1) }
  return @{ monto = $total; unit = $unit; cant = $cant; item = $l.item; lugar = $l.lugar; fecha = $fecha }
}

# ---------- Fechas y rangos ----------
function Gas-Hace([string]$f) {
  $d = [datetime]::ParseExact($f, "yyyy-MM-dd", $script:gasInv)
  $n = ([datetime]::Today - $d).Days
  if ($n -le 0) { return "hoy" }
  if ($n -eq 1) { return "ayer" }
  if ($n -lt 14) { return "hace $n días" }
  if ($n -lt 60) { return "hace " + [math]::Floor($n / 7) + " semanas" }
  return "el " + $d.ToString("dd/MM/yyyy", $script:gasInv)
}
function Gas-Rango([string]$n) {
  $hoy = [datetime]::Today
  if ($n -match "\bhoy\b") { return @{ desde = $hoy; hasta = $hoy; nombre = "hoy" } }
  if ($n -match "\bayer\b") { return @{ desde = $hoy.AddDays(-1); hasta = $hoy.AddDays(-1); nombre = "ayer" } }
  $lunes = $hoy.AddDays(-(([int]$hoy.DayOfWeek + 6) % 7))
  if ($n -match "semana pasada") { return @{ desde = $lunes.AddDays(-7); hasta = $lunes.AddDays(-1); nombre = "la semana pasada" } }
  if ($n -match "esta semana|la semana") { return @{ desde = $lunes; hasta = $hoy; nombre = "esta semana" } }
  $m1 = $hoy.AddDays(1 - $hoy.Day)
  if ($n -match "mes pasado|ultimo mes") { return @{ desde = $m1.AddMonths(-1); hasta = $m1.AddDays(-1); nombre = "el mes pasado" } }
  if ($n -match "este ano|del ano|el ano") { return @{ desde = (Get-Date -Year $hoy.Year -Month 1 -Day 1).Date; hasta = $hoy; nombre = "este año" } }
  $m = [regex]::Match($n, "ultimos (\d+) dias")
  if ($m.Success) { $k = [int]$m.Groups[1].Value; return @{ desde = $hoy.AddDays(-$k); hasta = $hoy; nombre = "en los últimos $k días" } }
  return @{ desde = $m1; hasta = $hoy; nombre = "este mes" }
}
function Gas-Filtra($items, $desde, $hasta, [string]$cat = "") {
  $a = $desde.ToString("yyyy-MM-dd", $script:gasInv); $b = $hasta.ToString("yyyy-MM-dd", $script:gasInv)
  return @($items | Where-Object { ([string]$_.fecha) -ge $a -and ([string]$_.fecha) -le $b -and ((-not $cat) -or $_.cat -eq $cat) })
}
function Gas-Suma($items) { $s = 0.0; foreach ($i in @($items)) { $s += [double]$i.monto }; return $s }
function Gas-PorCat($items) {
  $h = @{}
  foreach ($i in @($items)) { $c = [string]$i.cat; if (-not $h.ContainsKey($c)) { $h[$c] = 0.0 }; $h[$c] += [double]$i.monto }
  return @($h.GetEnumerator() | Sort-Object Value -Descending | ForEach-Object { [pscustomobject]@{ cat = $_.Key; total = $_.Value } })
}

# ---------- Precios ----------
function Gas-Similares($items, [string]$key, $salvoId = $null) {
  $q = @($key -split " " | Where-Object { $_ })
  if ($q.Count -eq 0) { return @() }
  $res = @()
  foreach ($i in @($items)) {
    if ($null -ne $salvoId -and $i.id -eq $salvoId) { continue }
    if ([double]$i.unit -le 0) { continue }
    $w = @(([string]$i.key) -split " " | Where-Object { $_ })
    if ($w.Count -eq 0) { continue }
    $corto = $q; $largo = $w
    if ($w.Count -lt $q.Count) { $corto = $w; $largo = $q }
    $ok = $true
    foreach ($x in $corto) { if ($largo -notcontains $x) { $ok = $false; break } }
    if ($ok) { $res += $i }
  }
  return @($res | Sort-Object { [string]$_.fecha }, { [int]$_.id } -Descending)
}
function Gas-EnLugar($i) { if ([string]$i.lugar -and (Norm ([string]$i.lugar)) -ne (Norm ([string]$i.item))) { return " en " + $i.lugar }; return "" }

# Comentario sobre el precio de una compra recien anotada. "" si no hay nada que decir.
function Gas-NotaPrecio($g, $nuevo) {
  $prev = @(Gas-Similares $g.items $nuevo.key $nuevo.id)
  if ($prev.Count -eq 0) { return "" }
  $u = [double]$nuevo.unit
  $ult = $prev[0]; $lu = [double]$ult.unit
  $min = $prev | Sort-Object { [double]$_.unit } | Select-Object -First 1
  $mu = [double]$min.unit
  if ($u -gt $lu * 1.08) {
    $pct = [math]::Round(($u / $lu - 1) * 100)
    $t = "Ojo: la última vez lo pagaste " + (Gas-N $lu) + (Gas-EnLugar $ult) + " (" + (Gas-Hace $ult.fecha) + "), ahora $pct por ciento más."
    if ($mu -lt $lu * 0.97) { $t += " Lo más barato que pagaste fue " + (Gas-N $mu) + (Gas-EnLugar $min) + "." }
    return $t
  }
  if ($u -gt $mu * 1.08) { return "El mejor precio que tengo de eso es " + (Gas-N $mu) + (Gas-EnLugar $min) + " (" + (Gas-Hace $min.fecha) + ")." }
  if ($u -lt $mu * 0.97) { return "Es el precio más barato que tengo registrado de eso." }
  return ""
}
function Gas-NotaTope($g, [string]$cat) {
  foreach ($t in @($g.topes)) {
    if ($t.cat -ne $cat) { continue }
    $hoy = [datetime]::Today
    $tot = Gas-Suma (Gas-Filtra $g.items ($hoy.AddDays(1 - $hoy.Day)) $hoy $cat)
    $lim = [double]$t.tope
    if ($tot -gt $lim) { return "Te pasaste del tope de ${cat} este mes: " + (Gas-N $tot) + " de " + (Gas-N $lim) + "." }
    if ($tot -ge $lim * 0.8) { return "Llevás " + (Gas-N $tot) + " de " + (Gas-N $lim) + " en $cat este mes." }
  }
  return ""
}

# ---------- Alta de un gasto ----------
function Gas-Agregar($p, [string]$cat = "") {
  $g = Gas-Load
  $item = [string]$p.item
  if (-not $item) { $item = "Varios" }
  if (-not $cat) { $cat = Gas-Cat $item ([string]$p.lugar) $g }
  $id = 1; foreach ($i in @($g.items)) { if ([int]$i.id -ge $id) { $id = [int]$i.id + 1 } }
  $nuevo = [pscustomobject]@{
    id = $id; fecha = ([datetime]$p.fecha).ToString("yyyy-MM-dd", $script:gasInv); item = $item; key = (Gas-Key $item)
    monto = [math]::Round([double]$p.monto, 0); cant = [int]$p.cant; unit = [math]::Round([double]$p.unit, 0)
    cat = $cat; lugar = [string]$p.lugar; creado = (Get-Date).ToString("yyyy-MM-dd HH:mm", $script:gasInv)
  }
  $g.items = @($g.items) + $nuevo
  Gas-Save $g
  $txt = "Anotado: $item, " + (Gas-N $nuevo.monto) + " pesos, en $cat."
  if ([int]$nuevo.cant -gt 1) { $txt = "Anotado: " + $nuevo.cant + " $item, " + (Gas-N $nuevo.monto) + " pesos en total (" + (Gas-N $nuevo.unit) + " cada uno), en $cat." }
  $nota = Gas-NotaPrecio $g $nuevo
  if ($nota) { $txt += " " + $nota }
  $tope = Gas-NotaTope $g $cat
  if ($tope) { $txt += " " + $tope }
  if ($cat -eq "Otros") {
    $txt += " No sé en qué categoría va; decime cuál (por ejemplo kiosco o supermercado) y lo recuerdo para la próxima."
    $script:gasPend = @{ tipo = "cat"; id = $id; at = (Get-Date) }
    return (Gas-Say $txt $true)
  }
  return (Gas-Say $txt)
}

function Gas-Recategorizar([int]$id, [string]$cat) {
  $g = Gas-Load
  $it = @($g.items) | Where-Object { [int]$_.id -eq $id } | Select-Object -First 1
  if (-not $it) { return (Gas-Say "No encuentro ese gasto.") }
  $it.cat = $cat
  $ap = @($g.aprendido | Where-Object { $_.clave -ne $it.key })
  if ($it.key) { $ap += [pscustomobject]@{ clave = [string]$it.key; cat = $cat } }
  $g.aprendido = $ap
  Gas-Save $g
  return (Gas-Say ("Listo, " + $it.item + " queda en $cat y la próxima vez lo pongo ahí."))
}

# ---------- Consejos ----------
function Gas-Consejos($g) {
  $hoy = [datetime]::Today
  $m1 = $hoy.AddDays(1 - $hoy.Day)
  $mes = @(Gas-Filtra $g.items $m1 $hoy)
  $pas = @(Gas-Filtra $g.items $m1.AddMonths(-1) $m1.AddDays(-1))
  if ($mes.Count -eq 0 -and $pas.Count -eq 0) { return "Todavía no tengo gastos anotados para analizar. Contame lo que vas comprando y en unos días te muestro dónde se va la plata." }
  $l = @()
  $l += "Gastado este mes: " + (Gas-N (Gas-Suma $mes)) + " en " + $mes.Count + " compras. Mes pasado completo: " + (Gas-N (Gas-Suma $pas)) + " en " + $pas.Count + " compras."
  foreach ($c in (Gas-PorCat $mes | Select-Object -First 4)) {
    $antes = Gas-Suma (@($pas | Where-Object { $_.cat -eq $c.cat }))
    $l += "Categoría " + $c.cat + ": " + (Gas-N $c.total) + " este mes (mes pasado " + (Gas-N $antes) + ")."
  }
  $ult30 = @(Gas-Filtra $g.items $hoy.AddDays(-30) $hoy)
  $rep = @($ult30 | Group-Object key | Where-Object { $_.Count -ge 3 } | Sort-Object Count -Descending | Select-Object -First 3)
  foreach ($r in $rep) { $l += "Compra repetida: " + $r.Group[0].item + " " + $r.Count + " veces en 30 días, total " + (Gas-N (Gas-Suma $r.Group)) + "." }
  $sub = @()
  foreach ($grp in ($g.items | Group-Object key)) {
    $ord = @($grp.Group | Sort-Object { [string]$_.fecha })
    if ($ord.Count -ge 2) {
      $ant = [double]$ord[$ord.Count - 2].unit; $ul = [double]$ord[$ord.Count - 1].unit
      if ($ant -gt 0 -and $ul -gt $ant * 1.1) { $sub += ($ord[0].item + " subió de " + (Gas-N $ant) + " a " + (Gas-N $ul)) }
    }
  }
  if ($sub.Count -gt 0) { $l += "Precios que subieron: " + (($sub | Select-Object -First 3) -join "; ") + "." }
  $datos = $l -join "`n"
  if (Get-Command Est-Llm -ErrorAction SilentlyContinue) {
    try {
      $sys = "Sos MIA, asistente de Luciano (Mar del Plata, presupuesto ajustado, español rioplatense). Con los DATOS que se te dan, decile en voz natural dónde se le va la plata y 2 o 3 acciones concretas para gastar menos. Usá SOLO los números de los datos, no inventes precios ni productos. Máximo 5 oraciones, sin listas ni símbolos."
      $r = Est-Llm $sys ("DATOS:`n" + $datos) 300
      if ($r) { return $r }
    } catch { Write-Host ("Gastos consejos: " + $_.Exception.Message) }
  }
  return ($l[0] + " " + ($l[1..([math]::Min($l.Count - 1, 2))] -join " "))
}

# ---------- Decision ----------
function Gastos-Decide([string]$said, [string]$speaker) {
  $n = Norm $said
  if (-not $n) { return $null }

  # Respuesta a una pregunta pendiente (precio o categoria)
  $pe = $script:gasPend
  if ($pe -and ((Get-Date) - $pe.at).TotalMinutes -gt 3) { $script:gasPend = $null; $pe = $null }
  if ($pe) {
    $script:gasPend = $null
    if ($speaker -and $speaker -ne "Luciano") { return $null }
    if ($pe.tipo -eq "cat") {
      $c = Gas-CatDe $n
      if ($c) { return (Gas-Recategorizar $pe.id $c) }
    }
    elseif ($pe.tipo -eq "precio") {
      if ($n -match "^(no|nada|cancela|cancelalo|dejalo|olvidalo)\b") { return (Gas-Say "Listo, no lo anoto.") }
      $pp = Gas-Parse $said
      if ($pp) {
        if (-not $pp.item) { $pp.item = $pe.item }
        if ($pe.cant -gt 1 -and $pp.cant -eq 1) { $pp.cant = $pe.cant; $pp.unit = $pp.monto / $pe.cant }
        if (-not $pp.lugar) { $pp.lugar = $pe.lugar }
        return (Gas-Agregar $pp)
      }
    }
  }

  $esGasto = $false
  if ($n -match "^(?:mia )?(?:me |nos )?(?:compre|compramos|gaste|gastamos|pague|pagamos|me salio|me salieron|me costo|me costaron)\b") { $esGasto = $true }
  elseif ($n -match "^(?:mia )?(?:ayer |anteayer |hoy )?(?:me |nos )?(?:compre|gaste|pague)\b") { $esGasto = $true }
  elseif ($n -match "^(?:mia )?(?:anota|anotame|registra|registrame|agrega|agregame|apunta|apuntame)(?: un| el| mi)? gasto") { $esGasto = $true }
  $esConsulta = $n -match "\b(?:cuanto (?:gaste|gastamos|llevo gastado|llevamos gastado|pague|pagamos|me salio|salio|sale|costo|aumento|subio)|en que (?:gasto|gaste|se me va)|resumen de (?:gastos|plata)|mis gastos|gastos (?:de |del |en )|ultimos gastos|que (?:gastos )?anote|borra(?:me)? el ultimo gasto|borra el ultimo|ponelo en|ponela en|cambialo a|cambiale la categoria|tope|limite de gasto|como (?:puedo |podria )?(?:ahorrar|optimizar|recortar)|consejos? (?:de|para) (?:gastos|ahorrar|plata)|donde me sobra plata|esta caro|es caro|estoy pagando de mas|sobrepag|precio de |a cuanto compre|como voy con (?:los )?gastos)"
  if (-not $esGasto -and -not $esConsulta) { return $null }
  if ($speaker -and $speaker -ne "Luciano") { return (Gas-Say "Los gastos solo los maneja Luciano.") }

  # --- Anotar un gasto ---
  if ($esGasto -and -not ($n -match "cuanto (?:gaste|pague|me salio|me costo)")) {
    if ($n -match "\blista\b|\bpara comprar\b") { return $null }
    $p = Gas-Parse $said
    if (-not $p) {
      $l = Gas-Limpia $said
      if (-not $l.item) { return $null }
      $script:gasPend = @{ tipo = "precio"; item = $l.item; lugar = $l.lugar; cant = 1; at = (Get-Date) }
      return (Gas-Say ("¿A cuánto te salió " + $l.item + "?") $true)
    }
    return (Gas-Agregar $p)
  }

  $g = Gas-Load

  # --- Recategorizar el ultimo ---
  $m = [regex]::Match($n, "(?:ponelo|ponela|cambialo|cambiala|cambiale la categoria)(?: a| en| de)? (.+)$")
  if ($m.Success) {
    $c = Gas-CatDe $m.Groups[1].Value
    if (-not $c) { return (Gas-Say "No conozco esa categoría. Tengo kiosco, comida afuera, transporte, salud, servicios, deporte, ropa, estudio, salidas, hogar, supermercado y otros.") }
    if (@($g.items).Count -eq 0) { return (Gas-Say "Todavía no hay gastos anotados.") }
    $ult = @($g.items | Sort-Object { [int]$_.id } -Descending)[0]
    return (Gas-Recategorizar ([int]$ult.id) $c)
  }

  # --- Borrar ultimo ---
  if ($n -match "borra(?:me)? el ultimo( gasto)?") {
    if (@($g.items).Count -eq 0) { return (Gas-Say "No hay gastos anotados.") }
    $ult = @($g.items | Sort-Object { [int]$_.id } -Descending)[0]
    $g.items = @($g.items | Where-Object { [int]$_.id -ne [int]$ult.id })
    Gas-Save $g
    return (Gas-Say ("Borré el último gasto: " + $ult.item + ", " + (Gas-N $ult.monto) + " pesos."))
  }

  # --- Topes ---
  if ($n -match "\b(?:tope|limite)\b") {
    $c = Gas-CatDe $n
    $tok = @(Gas-Numeros $said)
    if ($c -and $tok.Count -gt 0) {
      $v = [double]$tok[$tok.Count - 1].v
      $g.topes = @($g.topes | Where-Object { $_.cat -ne $c }) + [pscustomobject]@{ cat = $c; tope = $v }
      Gas-Save $g
      return (Gas-Say ("Listo, tope mensual de ${c}: " + (Gas-N $v) + " pesos. Te aviso cuando llegues al 80 por ciento."))
    }
    if ($c) {
      $t = @($g.topes | Where-Object { $_.cat -eq $c })
      if ($t.Count -gt 0) { return (Gas-Say ("El tope de $c es " + (Gas-N $t[0].tope) + " pesos por mes.")) }
      return (Gas-Say "No tenés tope en ${c}. Decime por ejemplo: tope de ${c} 30000.")
    }
    if (@($g.topes).Count -gt 0) { return (Gas-Say ("Tus topes mensuales: " + ((@($g.topes) | ForEach-Object { $_.cat + " " + (Gas-N $_.tope) }) -join ", ") + ".")) }
    return (Gas-Say "Todavía no tenés topes. Decime por ejemplo: tope de kiosco 30000.")
  }

  # --- Consejos para ahorrar ---
  if ($n -match "como (?:puedo |podria )?(?:ahorrar|optimizar|recortar)|consejos? (?:de|para) (?:gastos|ahorrar|plata)|donde me sobra plata") {
    return (Gas-Say (Gas-Consejos $g))
  }

  # --- Ultimos gastos ---
  if ($n -match "ultimos gastos|que (?:gastos )?anote") {
    $u = @($g.items | Sort-Object { [int]$_.id } -Descending | Select-Object -First 5)
    if ($u.Count -eq 0) { return (Gas-Say "No hay gastos anotados todavía.") }
    return (Gas-Say ("Lo último que anoté: " + (($u | ForEach-Object { $_.item + " " + (Gas-N $_.monto) + " (" + (Gas-Hace $_.fecha) + ")" }) -join ", ") + "."))
  }

  # --- En que gasto mas / resumen ---
  if ($n -match "en que (?:gasto|gaste|se me va)|resumen de (?:gastos|plata)|como voy con (?:los )?gastos|mis gastos\b") {
    $r = Gas-Rango $n
    $its = @(Gas-Filtra $g.items $r.desde $r.hasta)
    if ($its.Count -eq 0) { return (Gas-Say ("No tengo gastos anotados " + $r.nombre + ".")) }
    $top = @(Gas-PorCat $its | Select-Object -First 3)
    $t = "Gastaste " + (Gas-N (Gas-Suma $its)) + " pesos " + $r.nombre + " en " + $its.Count + " compras. Lo que más pesa: " + (($top | ForEach-Object { $_.cat + " " + (Gas-N $_.total) }) -join ", ") + "."
    if ($r.nombre -eq "este mes") {
      $m1 = [datetime]::Today.AddDays(1 - [datetime]::Today.Day)
      $pas = Gas-Suma (Gas-Filtra $g.items $m1.AddMonths(-1) $m1.AddDays(-1))
      if ($pas -gt 0) { $t += " El mes pasado fueron " + (Gas-N $pas) + " en total." }
    }
    return (Gas-Say $t)
  }

  # --- Cuanto gaste (periodo y categoria) ---
  if ($n -match "cuanto (?:gaste|gastamos|llevo gastado|llevamos gastado)|gastos (?:de |del |en )") {
    $r = Gas-Rango $n
    $c = Gas-CatDe $n
    $its = @(Gas-Filtra $g.items $r.desde $r.hasta $c)
    $donde = ""; if ($c) { $donde = " en $c" }
    if ($its.Count -eq 0) { return (Gas-Say ("No tengo gastos anotados" + $donde + " " + $r.nombre + ".")) }
    $t = "Gastaste " + (Gas-N (Gas-Suma $its)) + " pesos" + $donde + " " + $r.nombre + ", en " + $its.Count + " compras."
    if (-not $c) { $top = @(Gas-PorCat $its)[0]; $t += " Lo mayor fue " + $top.cat + " con " + (Gas-N $top.total) + "." }
    return (Gas-Say $t)
  }

  # --- Historial / comparacion de precios ---
  $esComparar = $n -match "esta caro|es caro|estoy pagando de mas|sobrepag|\bconviene\b"
  $m = [regex]::Match($n, "(?:cuanto (?:pague|pagamos|me salio|salio|sale|costo)|a cuanto compre|precio de|cuanto (?:aumento|subio))(?: la ultima vez| ultima vez| antes| la vez pasada)?(?: por| el| la| los| las| un| una| unos| unas| de)* ?(.*)$")
  if ($esComparar -or $m.Success) {
    $p = $null
    if ($esComparar) { $p = Gas-Parse $said }
    $q = ""
    if ($p) { $q = [string]$p.item } elseif ($m.Success) { $q = $m.Groups[1].Value }
    $q = [regex]::Replace((Norm $q), "\b(?:la ultima vez|ultima vez|es caro|esta caro|caro|barato|estoy pagando de mas|de mas|conviene|me parece|precio|cuanto|aumento|subio|el|la|los|las|por|en|a)\b", " ")
    $q = ($q -replace "\s+", " ").Trim()
    $key = Gas-Key $q
    if (-not $key) { return (Gas-Say "¿De qué producto querés saber el precio?" $true) }
    $prev = @(Gas-Similares $g.items $key)
    if ($prev.Count -eq 0) { return (Gas-Say ("No tengo registrada ninguna compra de " + $q + ". Cuando la hagas decime el precio y la anoto para comparar la próxima.") ) }
    $ult = $prev[0]
    $min = $prev | Sort-Object { [double]$_.unit } | Select-Object -First 1
    $prom = ($prev | Measure-Object -Property unit -Average).Average
    if ($p) {
      $u = [double]$p.unit
      $v = ""
      if ($u -gt $prom * 1.1) { $v = "Sí, está más caro que tu promedio de " + (Gas-N $prom) + "." }
      elseif ($u -lt $prom * 0.95) { $v = "No, está por debajo de tu promedio de " + (Gas-N $prom) + "." }
      else { $v = "Está dentro de lo que venís pagando, promedio " + (Gas-N $prom) + "." }
      return (Gas-Say ($v + " La última vez pagaste " + (Gas-N $ult.unit) + (Gas-EnLugar $ult) + " (" + (Gas-Hace $ult.fecha) + ") y lo más barato fue " + (Gas-N $min.unit) + (Gas-EnLugar $min) + "."))
    }
    $t = "La última vez pagaste " + (Gas-N $ult.unit) + (Gas-EnLugar $ult) + " (" + (Gas-Hace $ult.fecha) + ")."
    if ($prev.Count -gt 1) { $t += " Lo más barato fue " + (Gas-N $min.unit) + (Gas-EnLugar $min) + " y el promedio de " + $prev.Count + " compras, " + (Gas-N $prom) + "." }
    return (Gas-Say $t)
  }

  return $null
}
