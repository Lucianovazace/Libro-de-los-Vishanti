package ar.casa.launcher

import android.Manifest
import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.media.MediaPlayer
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.text.InputType
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.widget.CheckBox
import android.widget.EditText
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast
import org.json.JSONArray
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.text.Normalizer
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * MIA (Mi Inteligencia Artificial): conversacion por voz.
 * 1) Reglas locales e instantaneas (ordenes de la casa, hora, "acordate que ...").
 * 2) Si no coincide ninguna, pregunta al modelo que corre en la PC (llama.cpp, API compatible OpenAI)
 *    mandandole el perfil y las cosas que MIA anoto.
 */
class MiaActivity : Activity() {

    private val prefs by lazy { getSharedPreferences("casa", Context.MODE_PRIVATE) }
    private val ui = Handler(Looper.getMainLooper())
    private val density by lazy { resources.displayMetrics.density }
    private fun dp(v: Int): Int = (v * density).toInt()

    private lateinit var chat: LinearLayout
    private lateinit var scroll: ScrollView
    private lateinit var status: TextView
    private lateinit var micBtn: TextView
    private lateinit var input: EditText
    private lateinit var contBtn: TextView

    private var tts: TextToSpeech? = null
    private var ttsReady = false
    private var player: MediaPlayer? = null
    private var speakToken = 0
    private var recognizer: SpeechRecognizer? = null
    private var listening = false
    private var busy = false
    private var continuous = false
    private val history = mutableListOf<Pair<String, String>>() // role, content

    companion object {
        private const val REQ_MIC = 71
        const val DEFAULT_PROFILE = """Luciano vive en un departamento alquilado en un piso 12 de Mar del Plata, Argentina, con su pareja Mili. Hay vecinos abajo, asi que importa el ruido. No puede hacer agujeros en la pared.
Le gusta la tecnologia, armar cosas por su cuenta, el futbol (tiene camisetas de Inter Miami, Argentina y Manchester City), los comics (sobre todo Marvel) y la musica en vinilo.
Su casa inteligente gira alrededor de Alexa (Echo Dot 5 en la sala). Tiene 4 luces Macroled (entrada, sala, cocina, pieza), un backlight Govee TV, un televisor Samsung QLED de 50 pulgadas, un Fire TV Stick 4K Max, lavarropas Samsung EcoBubble, termotanque y una PC gamer. Usa SmartThings para lo de Samsung y Govee Home para el Govee.
Rutinas de Alexa que existen: modo cine, modo testamentos, modo alien, modo navidad, luz normal.
Celular Samsung A24, tablet Samsung S9 FE+ (el panel de la casa) y reloj Galaxy Watch 7. Mili tiene iPhone 12.
El ano que viene empieza un curso virtual de preparados magistrales de tres cuatrimestres. Cuando eso llegue, tiene que ayudarlo con los modulos que el cargue, y en temas de dosis o formulas jamas inventar: solo lo que diga el material."""
    }

    // ---------- Ciclo de vida ----------

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(buildUi())
        tts = TextToSpeech(this) { st ->
            if (st == TextToSpeech.SUCCESS) {
                val r = tts?.setLanguage(Locale("es", "AR"))
                if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) {
                    tts?.setLanguage(Locale("es"))
                }
                tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                    override fun onStart(id: String?) {}
                    override fun onError(id: String?) { ui.post { afterSpeech() } }
                    override fun onDone(id: String?) { if (id == "mia") ui.post { afterSpeech() } }
                })
                ttsReady = true
            }
        }
        addBubble("Hola, soy MIA. Tocá el micrófono y hablame, o escribime abajo.", false)
        if (prefs.getString("mia_url", "").isNullOrBlank()) {
            addBubble("Todavía no me conecté a la PC. Cuando la tengas lista, tocá Ajustes y pegá la dirección. Mientras tanto entiendo las órdenes de la casa.", false)
        }
    }

    override fun onDestroy() {
        recognizer?.destroy()
        stopSpeaking()
        tts?.shutdown()
        super.onDestroy()
    }

    override fun onStop() {
        stopListening()
        stopSpeaking()
        super.onStop()
    }

    // ---------- Interfaz ----------

    private fun buildUi(): View {
        val root = LinearLayout(this)
        root.orientation = LinearLayout.VERTICAL
        root.setBackgroundColor(Color.BLACK)
        root.fitsSystemWindows = true
        root.setPadding(dp(16), dp(20), dp(16), dp(10))

        val top = LinearLayout(this)
        top.orientation = LinearLayout.HORIZONTAL
        top.gravity = Gravity.TOP
        val titles = LinearLayout(this)
        titles.orientation = LinearLayout.VERTICAL
        val k = tv("CASA INTELIGENTE", 12f, Color.parseColor("#A6A6A6"), Typeface.create("sans-serif-medium", Typeface.NORMAL))
        k.letterSpacing = 0.2f
        titles.addView(k)
        titles.addView(tv("mia", 56f, Color.WHITE, Typeface.create("sans-serif-light", Typeface.NORMAL)))
        top.addView(titles, LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f))
        val settings = flatBtn("Ajustes") { openSettings() }
        top.addView(settings)
        root.addView(top)

        scroll = ScrollView(this)
        scroll.isVerticalScrollBarEnabled = false
        chat = LinearLayout(this)
        chat.orientation = LinearLayout.VERTICAL
        scroll.addView(chat, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        root.addView(scroll, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f))

        status = tv("", 12f, Color.parseColor("#A6A6A6"), Typeface.DEFAULT)
        status.setPadding(0, dp(6), 0, dp(6))
        root.addView(status)

        val row = LinearLayout(this)
        row.orientation = LinearLayout.HORIZONTAL
        row.gravity = Gravity.CENTER_VERTICAL
        input = EditText(this)
        input.hint = "Escribile a MIA"
        input.setHintTextColor(Color.parseColor("#A6A6A6"))
        input.setTextColor(Color.WHITE)
        input.setBackgroundColor(Color.parseColor("#2B2B2E"))
        input.setPadding(dp(12), 0, dp(12), 0)
        input.imeOptions = EditorInfo.IME_ACTION_SEND
        input.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
        input.maxLines = 1
        input.setOnEditorActionListener { _, _, _ -> sendTyped(); true }
        row.addView(input, LinearLayout.LayoutParams(0, dp(48), 1f))
        val send = flatBtn("Enviar") { sendTyped() }
        row.addView(send, LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, dp(48)))
        root.addView(row)

        val bar = LinearLayout(this)
        bar.orientation = LinearLayout.HORIZONTAL
        bar.gravity = Gravity.CENTER_VERTICAL
        bar.setPadding(0, dp(10), 0, 0)
        micBtn = tv("Hablar", 18f, Color.WHITE, Typeface.create("sans-serif-medium", Typeface.NORMAL))
        micBtn.gravity = Gravity.CENTER
        micBtn.setBackgroundColor(Color.parseColor("#006CC1"))
        micBtn.isClickable = true
        micBtn.setOnClickListener { onMicClick() }
        bar.addView(micBtn, LinearLayout.LayoutParams(0, dp(64), 1f))
        contBtn = tv("Conversación: no", 13f, Color.WHITE, Typeface.DEFAULT)
        contBtn.gravity = Gravity.CENTER
        contBtn.setBackgroundColor(Color.parseColor("#4A4A4F"))
        contBtn.isClickable = true
        contBtn.setOnClickListener {
            continuous = !continuous
            contBtn.text = if (continuous) "Conversación: sí" else "Conversación: no"
            contBtn.setBackgroundColor(Color.parseColor(if (continuous) "#187A3E" else "#4A4A4F"))
        }
        val lp = LinearLayout.LayoutParams(dp(120), dp(64))
        lp.leftMargin = dp(6)
        bar.addView(contBtn, lp)
        root.addView(bar)
        return root
    }

    private fun tv(s: String, sp: Float, color: Int, face: Typeface): TextView {
        val t = TextView(this)
        t.text = s
        t.setTextSize(TypedValue.COMPLEX_UNIT_SP, sp)
        t.setTextColor(color)
        t.typeface = face
        t.includeFontPadding = false
        return t
    }

    private fun flatBtn(label: String, onClick: () -> Unit): TextView {
        val b = tv(label, 14f, Color.WHITE, Typeface.create("sans-serif-medium", Typeface.NORMAL))
        b.gravity = Gravity.CENTER
        b.setPadding(dp(14), 0, dp(14), 0)
        b.minHeight = dp(44)
        b.setBackgroundColor(Color.parseColor("#2B2B2E"))
        b.isClickable = true
        b.setOnClickListener { onClick() }
        return b
    }

    private fun addBubble(text: String, mine: Boolean) {
        val b = tv(text, 16f, Color.WHITE, Typeface.DEFAULT)
        b.setLineSpacing(0f, 1.15f)
        b.setPadding(dp(12), dp(8), dp(12), dp(8))
        val bg = GradientDrawable()
        bg.setColor(Color.parseColor(if (mine) "#2B2B2E" else "#006CC1"))
        b.background = bg
        val lp = LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        lp.topMargin = dp(8)
        lp.gravity = if (mine) Gravity.END else Gravity.START
        lp.leftMargin = if (mine) dp(48) else 0
        lp.rightMargin = if (mine) 0 else dp(48)
        chat.addView(b, lp)
        scroll.post { scroll.fullScroll(View.FOCUS_DOWN) }
    }

    private fun setStatus(s: String) { status.text = s }

    // ---------- Voz: escuchar ----------

    private fun onMicClick() {
        if (listening) { stopListening(); return }
        stopSpeaking()
        startListening()
    }

    private fun startListening() {
        if (busy) return
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(arrayOf(Manifest.permission.RECORD_AUDIO), REQ_MIC)
            return
        }
        if (!SpeechRecognizer.isRecognitionAvailable(this)) {
            addBubble("Este celular no tiene reconocimiento de voz disponible. Podés escribirme.", false)
            return
        }
        val allowOnline = prefs.getBoolean("mia_online_stt", false)
        recognizer?.destroy()
        recognizer = SpeechRecognizer.createSpeechRecognizer(this)
        recognizer?.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(p: android.os.Bundle?) { setStatus("Escuchando...") }
            override fun onBeginningOfSpeech() {}
            override fun onRmsChanged(v: Float) {}
            override fun onBufferReceived(b: ByteArray?) {}
            override fun onEndOfSpeech() { setStatus("") }
            override fun onPartialResults(p: android.os.Bundle?) {}
            override fun onEvent(t: Int, p: android.os.Bundle?) {}
            override fun onResults(r: android.os.Bundle?) {
                listening = false; micBtn.text = "Hablar"
                val list = r?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                val said = list?.firstOrNull()?.trim().orEmpty()
                if (said.isNotEmpty()) handle(said) else setStatus("No te escuché.")
            }
            override fun onError(code: Int) {
                listening = false; micBtn.text = "Hablar"; setStatus("")
                when (code) {
                    SpeechRecognizer.ERROR_NO_MATCH, SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> {
                        setStatus("No te escuché."); continuous = false; resetContBtn()
                    }
                    12, 13 -> addBubble("Falta el paquete de español para escuchar sin internet. Bajalo en Ajustes de Android > Idioma > Voz (Google), o activá \"permitir internet\" en Ajustes de MIA. Con eso el audio lo procesa Google.", false)
                    SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> addBubble("Me falta el permiso del micrófono.", false)
                    else -> setStatus("Error de voz ($code). Probá de nuevo.")
                }
            }
        })
        val i = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "es-AR")
        i.putExtra(RecognizerIntent.EXTRA_PREFER_OFFLINE, !allowOnline)
        i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
        listening = true
        micBtn.text = "Escuchando... (tocá para cancelar)"
        recognizer?.startListening(i)
    }

    private fun stopListening() {
        if (listening) { recognizer?.cancel(); listening = false; micBtn.text = "Hablar"; setStatus("") }
    }

    private fun resetContBtn() {
        contBtn.text = "Conversación: no"
        contBtn.setBackgroundColor(Color.parseColor("#4A4A4F"))
    }

    override fun onRequestPermissionsResult(code: Int, perms: Array<out String>, res: IntArray) {
        super.onRequestPermissionsResult(code, perms, res)
        if (code == REQ_MIC) {
            if (res.isNotEmpty() && res[0] == PackageManager.PERMISSION_GRANTED) startListening()
            else addBubble("Sin permiso de micrófono no puedo escucharte, pero podés escribirme.", false)
        }
    }

    private fun sendTyped() {
        val s = input.text.toString().trim()
        if (s.isEmpty()) return
        input.setText("")
        handle(s)
    }

    // ---------- Voz: hablar ----------

    /** Dirección del servidor de voz (Piper) en la PC: mismo equipo que el modelo, puerto 5002. */
    private fun voiceBase(): String? {
        if (!prefs.getBoolean("mia_pc_voice", true)) return null
        val u = (prefs.getString("mia_url", "") ?: "").trim()
        if (u.isBlank()) return null
        return try {
            val host = java.net.URI(if (u.contains("://")) u else "http://$u").host ?: return null
            "http://$host:5002"
        } catch (e: Exception) { null }
    }

    private fun stopSpeaking() {
        speakToken++
        try { player?.stop() } catch (e: Exception) { }
        try { player?.release() } catch (e: Exception) { }
        player = null
        tts?.stop()
    }

    private fun say(text: String, onlySpeak: Boolean = false) {
        if (!onlySpeak) addBubble(text, false)
        // onlySpeak = frases para Alexa: siempre con la voz del celu, para que Alexa las entienda igual que siempre.
        val base = if (onlySpeak) null else voiceBase()
        if (base != null) speakPc(text, base) else speakPhone(text)
    }

    private fun speakPhone(text: String) {
        val e = tts
        if (e == null || !ttsReady) { afterSpeech(); return }
        e.playSilentUtterance(300, TextToSpeech.QUEUE_FLUSH, "pre")
        e.speak(text, TextToSpeech.QUEUE_ADD, null, "mia")
    }

    /** Pide el audio a Piper en la PC y lo reproduce. Si algo falla, habla el celu como antes. */
    private fun speakPc(text: String, base: String) {
        val token = ++speakToken
        setStatus("Preparando la voz...")
        Thread {
            var wav: ByteArray? = null
            try {
                val c = URL("$base/tts").openConnection() as HttpURLConnection
                c.connectTimeout = 3000
                c.readTimeout = 30000
                c.requestMethod = "POST"
                c.doOutput = true
                c.setRequestProperty("Content-Type", "text/plain; charset=utf-8")
                c.outputStream.use { it.write(text.toByteArray(Charsets.UTF_8)) }
                if (c.responseCode in 200..299) wav = c.inputStream.use { it.readBytes() }
                c.disconnect()
            } catch (e: Exception) { wav = null }
            val data = wav
            ui.post {
                if (token != speakToken) return@post
                if (data == null || data.size < 100) { speakPhone(text); return@post }
                try {
                    val f = java.io.File(cacheDir, "mia-voz.wav")
                    f.writeBytes(data)
                    val mp = MediaPlayer()
                    mp.setDataSource(f.absolutePath)
                    mp.setOnCompletionListener {
                        if (token == speakToken) { it.release(); player = null; afterSpeech() }
                    }
                    mp.setOnErrorListener { _, _, _ ->
                        if (token == speakToken) { player = null; speakPhone(text) }
                        true
                    }
                    mp.prepare()
                    player = mp
                    setStatus("")
                    mp.start()
                } catch (e: Exception) { speakPhone(text) }
            }
        }.start()
    }

    private fun afterSpeech() {
        setStatus("")
        if (continuous && !busy && !listening) startListening()
    }

    // ---------- Cerebro ----------

    private fun norm(s: String): String {
        val d = Normalizer.normalize(s.lowercase(Locale.ROOT), Normalizer.Form.NFD).replace(Regex("\\p{M}+"), "")
        return d.replace(Regex("[^a-z0-9 ]"), " ").replace(Regex("\\s+"), " ").trim()
    }

    private val alexaRules = listOf(
        Triple("Modo cine", listOf("modo cine"), "modo cine"),
        Triple("Modo testamentos", listOf("modo testamentos", "modo testamento"), "modo testamentos"),
        Triple("Alien", listOf("modo alien"), "modo alien"),
        Triple("Navidad", listOf("modo navidad"), "modo navidad"),
        Triple("Luz normal", listOf("luz normal"), "luz normal")
    )

    private fun alexaPhrase(label: String, def: String): String {
        val key = "phrase_$label"
        return if (prefs.contains(key)) (prefs.getString(key, "") ?: "") else def
    }

    private fun handle(said: String) {
        addBubble(said, true)
        val n = norm(said)

        // 1) Ordenes de la casa
        for ((label, triggers, def) in alexaRules) {
            if (triggers.any { n.contains(it) }) {
                val phrase = alexaPhrase(label, def)
                if (phrase.isBlank()) { say("Ese modo no tiene frase para Alexa configurada."); return }
                addBubble("→ Alexa: \"$phrase\"", false)
                say("Alexa, $phrase", onlySpeak = true)
                return
            }
        }

        // 2) Memoria: "acordate que ..."
        val rem = Regex("(?i)^\\s*(?:mia[,\\s]+)?(?:acordate|record[aá]|anot[aá]|guard[aá])(?:\\s+que|\\s+de)?\\s+(.+)$").find(said.trim())
        if (rem != null) {
            val fact = rem.groupValues[1].trim().trimEnd('.')
            val old = prefs.getString("mia_memory", "") ?: ""
            prefs.edit().putString("mia_memory", if (old.isBlank()) fact else old + "\n" + fact).apply()
            say("Anotado: $fact.")
            return
        }

        // 2b) Relevo a Alexa: "preguntale a Alexa ...", "decile a Alexa ..."
        val relay = Regex("(?i)^\\s*(?:mia[,\\s]+)?(?:preguntale|pregúntale|decile|dile|pedile)\\s+a\\s+alexa\\s+(?:que\\s+)?(.+)$").find(said.trim())
        if (relay != null) {
            val phrase = relay.groupValues[1].trim().trimEnd('.', '?', '!')
            addBubble("→ Alexa: \"$phrase\"", false)
            say("Alexa, $phrase", onlySpeak = true)
            return
        }

        // 3) Hora y fecha, sin IA
        if (n.contains("que hora es")) {
            say("Son las " + SimpleDateFormat("H:mm", Locale("es", "AR")).format(Date()) + ".")
            return
        }
        if (n.contains("que dia es") || n.contains("que fecha es")) {
            say("Hoy es " + SimpleDateFormat("EEEE d 'de' MMMM", Locale("es", "AR")).format(Date()) + ".")
            return
        }

        // 4) Clima de Mar del Plata
        if (isWeatherQuestion(n)) { askWithWeather(said); return }

        // 5) Todo lo demas: el modelo de la PC
        askModel(said)
    }

    private fun systemPrompt(): String {
        val profile = prefs.getString("mia_profile", null)?.takeIf { it.isNotBlank() } ?: DEFAULT_PROFILE
        val mem = prefs.getString("mia_memory", "") ?: ""
        val now = SimpleDateFormat("EEEE d 'de' MMMM 'de' yyyy, H:mm", Locale("es", "AR")).format(Date())
        return "/no_think Sos MIA (Mi Inteligencia Artificial), la asistente personal de Luciano. Hablás en español rioplatense (voseo). Tu estilo es el de JARVIS: sereno, elegante, eficiente y atento, con un humor seco y sutil de vez en cuando, nunca exagerado ni infantil. Anticipás lo que Luciano pueda necesitar. Ocasionalmente podés llamarlo \"señor\", sin abusar. " +
            "Tus respuestas se leen en voz alta: máximo 3 oraciones cortas, sin listas, sin markdown, sin emojis. " +
            "Si no sabés algo o no lo tenés en lo que te contaron, decilo en vez de inventar. No inventes datos de Mar del Plata ni de dispositivos.\n\n" +
            "Lo que sabés de Luciano y su casa:\n" + profile +
            (if (mem.isNotBlank()) "\n\nCosas que Luciano te pidió recordar:\n" + mem else "") +
            "\n\nAhora es: " + now + "."
    }

    // ---------- Clima (Open-Meteo, sin clave) ----------

    private fun isWeatherQuestion(n: String): Boolean {
        val keys = listOf("clima", "pronostico", "va a llover", "llover", "llueve", "lluvia", "temperatura",
            "cuantos grados", "hace frio", "hace calor", "como esta el tiempo", "como va a estar el tiempo",
            "que tiempo hace", "tiempo hace", "viento", "paraguas")
        return keys.any { n.contains(it) }
    }

    private fun wmo(code: Int): String = when (code) {
        0 -> "despejado"
        1 -> "mayormente despejado"
        2 -> "parcialmente nublado"
        3 -> "nublado"
        45, 48 -> "con niebla"
        51, 53, 55 -> "con llovizna"
        56, 57 -> "con llovizna helada"
        61 -> "con lluvia débil"
        63 -> "con lluvia"
        65 -> "con lluvia fuerte"
        66, 67 -> "con lluvia helada"
        71, 73, 75, 77, 85, 86 -> "con nieve"
        80 -> "con chubascos leves"
        81 -> "con chubascos"
        82 -> "con chubascos fuertes"
        95 -> "con tormenta"
        96, 99 -> "con tormenta y granizo"
        else -> "sin datos del cielo"
    }

    /** Devuelve un resumen en castellano del clima de Mar del Plata, o null si falla. Llamar fuera del hilo principal. */
    private var weatherError = ""

    private fun dayPartName(h: Int): String = when (h) {
        in 6..11 -> "a la mañana"
        in 12..17 -> "a la tarde"
        else -> "a la noche"
    }

    /** Resumen hablado: cielo, máxima/mínima, lluvia y cómo se pone a la noche. El viento solo si se pidió. */
    private fun weatherSummary(scope: Int, wind: Boolean): String? {
        weatherError = ""
        return try {
            val url = "https://api.open-meteo.com/v1/forecast?latitude=-38.0055&longitude=-57.5426" +
                "&current=temperature_2m,weather_code,wind_speed_10m,wind_gusts_10m" +
                "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max" +
                "&hourly=temperature_2m,precipitation_probability" +
                "&forecast_days=3&timezone=America%2FArgentina%2FBuenos_Aires"
            val c = URL(url).openConnection() as HttpURLConnection
            c.connectTimeout = 6000
            c.readTimeout = 8000
            val code = c.responseCode
            if (code !in 200..299) {
                val body = try { c.errorStream?.bufferedReader()?.use { it.readText() }?.take(160) ?: "" } catch (e: Exception) { "" }
                weatherError = "el servicio respondió $code $body"
                c.disconnect(); return null
            }
            val txt = c.inputStream.bufferedReader().use { it.readText() }
            c.disconnect()
            val j = JSONObject(txt)
            val cur = j.getJSONObject("current")
            val d = j.getJSONObject("daily")
            val hr = j.getJSONObject("hourly")
            val hT = hr.optJSONArray("temperature_2m")
            val hP = hr.optJSONArray("precipitation_probability")
            val wc = d.optJSONArray("weather_code")
            val mx = d.optJSONArray("temperature_2m_max")
            val mn = d.optJSONArray("temperature_2m_min")
            val pp = d.optJSONArray("precipitation_probability_max")
            val ws = d.optJSONArray("wind_speed_10m_max")
            val day = when (scope) { 2 -> 1; 3 -> 2; else -> 0 }
            if (mx == null || mx.length() <= day) { weatherError = "el servicio no mandó el pronóstico por día"; return null }
            val nowH = java.util.Calendar.getInstance(java.util.TimeZone.getTimeZone("America/Argentina/Buenos_Aires")).get(java.util.Calendar.HOUR_OF_DAY)
            val tmax = Math.round(mx.optDouble(day, 0.0)).toInt()
            val tmin = Math.round(mn?.optDouble(day, 0.0) ?: 0.0).toInt()

            val sb = StringBuilder()
            if (day == 0) {
                sb.append("Ahora hay ").append(Math.round(cur.optDouble("temperature_2m", 0.0)))
                    .append(" grados, ").append(wmo(cur.optInt("weather_code", -1)))
                    .append(". Hoy la máxima es de ").append(tmax).append(" y la mínima de ").append(tmin).append(".")
            } else {
                sb.append(if (day == 1) "Mañana" else "Pasado mañana").append(": ")
                    .append(wmo(wc?.optInt(day, -1) ?: -1)).append(", máxima de ").append(tmax)
                    .append(" y mínima de ").append(tmin).append(".")
            }

            // Lluvia: para hoy solo cuenta lo que falta del día
            val startH = if (day == 0) nowH else 0
            var rainP = 0
            val parts = LinkedHashSet<String>()
            for (h in startH..23) {
                val p = hP?.optInt(day * 24 + h, 0) ?: 0
                if (p > rainP) rainP = p
                if (p >= 40 && h >= 6) parts.add(dayPartName(h))
            }
            if (hP == null) rainP = pp?.optInt(day, 0) ?: 0
            val whenS = if (parts.isEmpty()) "" else ", sobre todo " + parts.joinToString(" y ")
            sb.append(when {
                rainP >= 60 -> " Va a llover: $rainP% de probabilidad$whenS."
                rainP >= 30 -> " Podría llover, $rainP% de probabilidad$whenS."
                rainP >= 15 -> " Hay poca probabilidad de lluvia, $rainP%."
                else -> " No se espera lluvia."
            })

            // Noche: temperatura a las 22 comparada con la máxima
            if (hT != null && (day > 0 || nowH < 21)) {
                val tn = Math.round(hT.optDouble(day * 24 + 22, 0.0)).toInt()
                val drop = tmax - tn
                sb.append(when {
                    drop >= 6 -> " A la noche refresca bastante: unos $tn grados a las 22."
                    drop >= 3 -> " A la noche refresca un poco, unos $tn grados."
                    else -> " A la noche se mantiene parecido, unos $tn grados."
                })
            }

            // Viento: solo si lo pidieron
            if (wind) {
                if (day == 0) {
                    sb.append(" Viento de ").append(Math.round(cur.optDouble("wind_speed_10m", 0.0)))
                        .append(" km/h con ráfagas de ").append(Math.round(cur.optDouble("wind_gusts_10m", 0.0))).append(".")
                } else {
                    sb.append(" Viento de hasta ").append(Math.round(ws?.optDouble(day, 0.0) ?: 0.0)).append(" km/h.")
                }
            }
            sb.toString().trim()
        } catch (e: Exception) {
            weatherError = e.javaClass.simpleName + ": " + (e.message ?: "")
            null
        }
    }

    private fun weatherScope(n: String): Int = when {
        n.contains("pasado manana") -> 3
        n.contains("manana") -> 2
        n.contains("hoy") || n.contains("ahora") || n.contains("esta noche") || n.contains("esta tarde") -> 1
        else -> 0
    }

    private fun askWithWeather(said: String) {
        val nn = norm(said)
        val scope = weatherScope(nn)
        val wantWind = nn.contains("viento") || nn.contains("ventoso") || nn.contains("rafaga")
        busy = true
        setStatus("Consultando el clima...")
        Thread {
            val summary = weatherSummary(scope, wantWind)
            ui.post {
                busy = false
                if (summary == null) {
                    say("No pude consultar el pronóstico (" + weatherError + "). Revisá que el celular tenga internet.")
                } else {
                    say(summary)
                }
            }
        }.start()
    }

    private fun askModel(said: String, extra: String? = null) {
        val base = (prefs.getString("mia_url", "") ?: "").trim().trimEnd('/')
        if (base.isBlank()) {
            say("Todavía no me conecté a la PC, así que no puedo charlar libremente. Las órdenes de la casa sí las entiendo.")
            return
        }
        history.add("user" to said)
        while (history.size > 8) history.removeAt(0)
        busy = true
        setStatus("Pensando...")
        val msgs = JSONArray()
        msgs.put(JSONObject().put("role", "system").put("content", systemPrompt() + (if (extra != null) "\n\nDatos actuales del clima en Mar del Plata (fuente: Open-Meteo). Para preguntas del clima usá solamente estos datos y no inventes otros:\n" + extra else "")))
        history.forEach { msgs.put(JSONObject().put("role", it.first).put("content", it.second)) }
        val body = JSONObject()
            .put("model", "local")
            .put("messages", msgs)
            .put("temperature", 0.6)
            .put("max_tokens", 300)
            .put("stream", false)
            .toString()
        Thread {
            var reply: String? = null
            var err: String? = null
            try {
                val c = URL("$base/v1/chat/completions").openConnection() as HttpURLConnection
                c.connectTimeout = 5000
                c.readTimeout = 90000
                c.requestMethod = "POST"
                c.doOutput = true
                c.setRequestProperty("Content-Type", "application/json")
                c.outputStream.use { it.write(body.toByteArray(Charsets.UTF_8)) }
                val code = c.responseCode
                val txt = (if (code in 200..299) c.inputStream else c.errorStream)?.bufferedReader()?.use { it.readText() } ?: ""
                if (code in 200..299) {
                    reply = JSONObject(txt).getJSONArray("choices").getJSONObject(0)
                        .getJSONObject("message").getString("content")
                } else err = "La PC respondió con error $code."
                c.disconnect()
            } catch (e: java.net.SocketTimeoutException) {
                err = "La PC tardó demasiado en contestar."
            } catch (e: Exception) {
                err = "No pude hablar con la PC. ¿Está prendida y en el mismo Wi-Fi?"
            }
            val finalReply = reply
            val finalErr = err
            ui.post {
                busy = false
                if (finalReply != null) {
                    val clean = finalReply.replace(Regex("(?s)<think>.*?</think>"), "").replace(Regex("[*_#`]+"), "").trim().ifEmpty { "No supe qué contestarte, probá de nuevo." }
                    history.add("assistant" to clean)
                    say(clean)
                } else {
                    if (history.isNotEmpty()) history.removeAt(history.size - 1)
                    continuous = false; resetContBtn()
                    say(finalErr ?: "Algo falló.")
                }
            }
        }.start()
    }

    // ---------- Ajustes ----------

    private fun field(hint: String, value: String, lines: Int): EditText {
        val e = EditText(this)
        e.hint = hint
        e.setText(value)
        e.inputType = if (lines > 1) InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_FLAG_MULTI_LINE else InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_URI
        if (lines > 1) { e.minLines = lines; e.gravity = Gravity.TOP or Gravity.START }
        return e
    }

    private fun label(s: String): TextView {
        val t = TextView(this)
        t.text = s
        t.setTextSize(TypedValue.COMPLEX_UNIT_SP, 12f)
        t.setPadding(0, dp(12), 0, 0)
        return t
    }

    private fun openSettings() {
        val box = LinearLayout(this)
        box.orientation = LinearLayout.VERTICAL
        box.setPadding(dp(20), dp(8), dp(20), dp(8))

        val url = field("http://192.168.0.15:8080", prefs.getString("mia_url", "") ?: "", 1)
        val online = CheckBox(this)
        online.text = "Permitir reconocimiento de voz con internet (el audio lo procesa Google)"
        online.isChecked = prefs.getBoolean("mia_online_stt", false)
        val pcVoice = CheckBox(this)
        pcVoice.text = "Usar la voz de MIA desde la PC (Piper). Si no responde, habla el celu."
        pcVoice.isChecked = prefs.getBoolean("mia_pc_voice", true)
        val profile = field("Perfil", prefs.getString("mia_profile", null)?.takeIf { it.isNotBlank() } ?: DEFAULT_PROFILE, 8)
        val mem = field("Nada anotado todavía", prefs.getString("mia_memory", "") ?: "", 4)

        box.addView(label("Dirección de la PC (ej: http://192.168.0.15:8080)"))
        box.addView(url)
        box.addView(online)
        box.addView(pcVoice)
        box.addView(label("Lo que MIA sabe de vos (editalo a gusto)"))
        box.addView(profile)
        box.addView(label("Lo que le pediste que recuerde (una cosa por línea)"))
        box.addView(mem)

        val sv = ScrollView(this)
        sv.addView(box)

        val dlg = AlertDialog.Builder(this)
            .setTitle("Ajustes de MIA (v" + packageManager.getPackageInfo(packageName, 0).versionName + ")")
            .setView(sv)
            .setPositiveButton("Guardar") { _, _ ->
                prefs.edit()
                    .putString("mia_url", url.text.toString().trim())
                    .putBoolean("mia_online_stt", online.isChecked)
                    .putBoolean("mia_pc_voice", pcVoice.isChecked)
                    .putString("mia_profile", profile.text.toString().trim())
                    .putString("mia_memory", mem.text.toString().trim())
                    .apply()
            }
            .setNeutralButton("Probar conexión", null)
            .setNegativeButton("Cancelar", null)
            .create()
        dlg.show()
        dlg.getButton(AlertDialog.BUTTON_NEUTRAL).setOnClickListener {
            val base = url.text.toString().trim().trimEnd('/')
            if (base.isBlank()) { Toast.makeText(this, "Pegá primero la dirección.", Toast.LENGTH_SHORT).show(); return@setOnClickListener }
            Toast.makeText(this, "Probando...", Toast.LENGTH_SHORT).show()
            Thread {
                val msg = try {
                    val c = URL("$base/health").openConnection() as HttpURLConnection
                    c.connectTimeout = 4000; c.readTimeout = 4000
                    val code = c.responseCode; c.disconnect()
                    if (code in 200..299) "Conectado a la PC." else "La PC respondió con $code (puede estar cargando el modelo)."
                } catch (e: Exception) { "No hay conexión. Revisá la dirección, el Wi-Fi y que el programa esté abierto." }
                val vmsg = try {
                    val host = java.net.URI(if (base.contains("://")) base else "http://$base").host
                    val c = URL("http://$host:5002/health").openConnection() as HttpURLConnection
                    c.connectTimeout = 3000; c.readTimeout = 3000
                    val code = c.responseCode; c.disconnect()
                    if (code in 200..299) "Voz de la PC: lista." else "Voz de la PC: respondió $code."
                } catch (e: Exception) { "Voz de la PC: sin conexión (hablará el celu)." }
                ui.post { Toast.makeText(this, msg + "\n" + vmsg, Toast.LENGTH_LONG).show() }
            }.start()
        }
    }
}
