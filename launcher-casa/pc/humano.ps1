# Trato humano de MIA: presencia ("¿estás ahí?"), saludos, charla corta, despedidas, chistes.
# Se carga desde cerebro.ps1. Usa Norm. Cada respuesta se elige al azar para que no suene robótica.
# "listen = $true" le dice a la app que vuelva a escuchar sola después de hablar (como si MIA se hubiera "encendido").
# Para sumar frases propias, copiá el patrón de una entrada de $script:humanoReglas.
$script:humanoSpeaker = "Luciano"
function Hn { if ($script:humanoSpeaker -and $script:humanoSpeaker -ne "invitado") { return ", " + $script:humanoSpeaker } else { return "" } }
function Pick($arr) { return ($arr | Get-Random) }
function Franja {
  $h = (Get-Date).Hour
  if ($h -ge 6 -and $h -lt 13) { return "dia" } elseif ($h -ge 13 -and $h -lt 20) { return "tarde" } else { return "noche" }
}
$script:chistes = @(
  "¿Qué le dice un átomo a otro? Creo que perdí un electrón. ¿Seguro? Sí, estoy positivo.",
  "¿Por qué los químicos son malos en las discusiones? Porque siempre terminan precipitando las cosas.",
  "Un ácido y una base entraron a un bar. Se neutralizaron y quedaron en paz. Y con algo de sal.",
  "¿Cuál es el colmo de un químico? Que su novia le diga: entre nosotros hay mucha química, pero no hay reacción.",
  "¿Cómo se llama el hijo de dos átomos de helio? Un He-He. Perdoname, tenía que decirlo.",
  "Yo tengo una gran capacidad de memoria. Lástima que se me olvidó cuál era el chiste.",
  "¿Sabés por qué las computadoras no pasan frío? Porque tienen Windows. Aunque a veces se les cuelga alguno."
)
# Cada regla: patrón sobre texto normalizado, máximo de palabras, función que arma la respuesta, si vuelve a escuchar.
$script:humanoReglas = @(
  @{ re = "(estas|andas) (ahi|por ahi|alli|aca|despierta|atenta|presente|lista)|me (escuchas|oyes|sentis|copias|prestas atencion)|podes (escucharme|oirme)|hay alguien|^(hola |hey |ey |che )?mia$|mia (estas|me)"; max = 8
     resp = { Pick @("Acá estoy$(Hn). ¿Qué necesitás?", "Sí, te escucho$(Hn). Decime.", "Presente. ¿En qué te ayudo?", "Fuerte y claro$(Hn). Te escucho.", "Acá, atenta. Contame.", "Sí, acá estoy. Cuando quieras.") }; listen = $true },
  @{ re = "^(hola|buenas|hey|ey|che|buen dia|buenos dias|buenas tardes|buenas noches|que tal)( mia)?$"; max = 4
     resp = { switch (Franja) {
         "dia" { Pick @("Buen día$(Hn). ¿Cómo amaneciste?", "Buen día$(Hn). Acá estoy para lo que necesites.", "Buenos días$(Hn). ¿Arrancamos?", "Buen día$(Hn). Si querés, decime resumen del día y te pongo al tanto.") }
         "tarde" { Pick @("Buenas tardes$(Hn). ¿Qué necesitás?", "Hola$(Hn). ¿Cómo viene la tarde?", "Buenas$(Hn). Te escucho.") }
         default { Pick @("Buenas noches$(Hn). ¿Todo bien?", "Hola$(Hn). ¿Cómo estuvo el día?", "Buenas$(Hn). Te escucho.") } } }; listen = $true },
  @{ re = "^(mia )?(como (estas|andas|te va|te sentis)|que (haces|onda|contas|cuentas)|todo bien)( mia| hoy| vos)?$"; max = 7
     resp = { Pick @("Muy bien, gracias por preguntar$(Hn). ¿Y vos, cómo andás?", "Todo en orden por acá. ¿Y por tu lado?", "Bien, atenta y sin novedades. ¿Qué contás?") }; listen = $true },
  @{ re = "(quien sos|como te llamas|que sos|presentate|cual es tu nombre)"; max = 7
     resp = { Pick @("Soy MIA, Mi Inteligencia Artificial. Vivo en la computadora de la casa y estoy para ayudarte con el día a día.", "Me llamo MIA, tu asistente de la casa. Pensame como un Jarvis, pero rioplatense.") }; listen = $false },
  @{ re = "^(muchas )?gracias( mia| por todo| che)?$|te agradezco|mil gracias"; max = 6
     resp = { Pick @("De nada$(Hn). Para eso estoy.", "Un placer.", "No hay de qué$(Hn).", "Cuando quieras.") }; listen = $false },
  @{ re = "(buen trabajo|bien hecho|sos (genial|la mejor|increible|un genio)|me encantas|que bueno que estas)"; max = 8
     resp = { Pick @("Gracias$(Hn), me alegra servirte.", "Qué lindo escucharlo. Seguimos.", "Me alegra mucho$(Hn). Para eso estoy.") }; listen = $false },
  @{ re = "te quiero|te amo|sos mi amiga"; max = 5
     resp = { Pick @("Qué amable$(Hn). Me alegra poder ayudarte todos los días.", "Gracias$(Hn). Yo estoy acá para lo que necesites.") }; listen = $false },
  @{ re = "(contame|decime|dime|conta) un chiste|chiste|hacime reir|haceme reir"; max = 7
     resp = { Pick $script:chistes }; listen = $false },
  @{ re = "no (me )?(escuchaste|entendiste|agarraste|captaste)|no me copiaste"; max = 6
     resp = { Pick @("Perdón, repetime que no te agarré.", "Disculpá. Decímelo de nuevo, por favor.", "Ahí no te capté. Probemos otra vez.") }; listen = $true },
  @{ re = "(hablame|charlemos|hablemos|conversemos|tengo ganas de charlar|estoy aburrido|estoy aburrida)"; max = 8
     resp = { Pick @("Dale, charlemos. ¿De qué querés hablar?", "Con gusto. Contame, ¿qué tenés en la cabeza?", "Acá estoy. Elegí vos el tema.") }; listen = $true },
  @{ re = "(chau|adios|hasta luego|hasta manana|nos vemos|me voy|descansa|buenas noches mia|me voy a dormir|me voy a acostar)"; max = 8
     resp = { switch (Franja) {
         "noche" { Pick @("Buenas noches$(Hn). Que descanses.", "Descansá$(Hn). Yo me ocupo de que todo quede tranquilo.", "Hasta mañana$(Hn). Dulces sueños.") }
         default { Pick @("Chau$(Hn). Cualquier cosa, me llamás.", "Hasta luego$(Hn). Acá voy a estar.", "Nos vemos$(Hn). Que te vaya bien.") } } }; listen = $false }
)
function Humano-Decide([string]$said, [string]$speaker) {
  if ($speaker) { $script:humanoSpeaker = $speaker } else { $script:humanoSpeaker = "Luciano" }
  $n = Norm $said
  $words = @($n.Split(" ") | Where-Object { $_ }).Count
  foreach ($r in $script:humanoReglas) {
    if ($words -le $r.max -and $n -match $r.re) {
      $reply = [string](& $r.resp)
      $res = @{ ok = $true; action = "say"; reply = $reply }
      if ($r.listen) { $res.listen = $true }
      return $res
    }
  }
  return $null
}
