package ar.casa.reloj

import android.Manifest
import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Color
import android.media.AudioManager
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
import android.view.Gravity
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import java.text.Normalizer
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import kotlin.math.max
import kotlin.math.min
import kotlin.math.pow
import kotlin.math.sqrt

class MainActivity : Activity() {

    companion object {
        const val DEFAULT_URL = "http://192.168.0.196:8080"
        const val REQ_MIC = 7
        const val DEFAULT_PROFILE = """Luciano vive en un departamento alquilado en un piso 12 de Mar del Plata, Argentina, con su pareja Mili. Hay vecinos abajo, asi que importa el ruido. No puede hacer agujeros en la pared.
Le gusta la tecnologia, armar cosas por su cuenta, el futbol (tiene camisetas de Inter Miami, Argentina y Manchester City), los comics (sobre todo Marvel) y la musica en vinilo.
Su casa inteligente gira alrededor de Alexa (Echo Dot 5 en la sala). Tiene 4 luces Macroled (entrada, sala, cocina, pieza), un backlight Govee TV, un televisor Samsung QLED de 50 pulgadas, un Fire TV Stick 4K Max, lavarropas Samsung EcoBubble, termotanque y una PC gamer. Usa SmartThings para lo de Samsung y Govee Home para el Govee.
Rutinas de Alexa que existen: modo cine, modo testamentos, modo alien, modo navidad, luz normal.
Celular Samsung A24, tablet Samsung S9 FE+ (el panel de la casa) y reloj Galaxy Watch 7. Mili tiene iPhone 12.
El ano que viene empieza un curso virtual de preparados magistrales de tres cuatrimestres. Cuando eso llegue, tiene que ayudarlo con los modulos que el cargue, y en temas de dosis o formulas jamas inventar: solo lo que diga el material."""
    }

    private lateinit var orb: OrbView
    private lateinit var label: TextView
    private val ui = Handler(Looper.getMainLooper())
    private val prefs by lazy { getSharedPreferences("reloj", Context.MODE_PRIVATE) }
    private var recognizer: SpeechRecognizer? = null
    private var player: MediaPlayer? = null
    private var tts: TextToSpeech? = null
    private var ttsReady = false
    private var state = 0 // 0 reposo, 1 escuchando, 2 pensando, 3 hablando
    private var token = 0
    private val history = ArrayList<Pair<String, String>>()

    private val sleepTask = Runnable {
        if (state == 0) {
            orb.mode = OrbView.Mode.AMBIENT
            orb.keepScreenOn = false
            setLabel("")
        }
    }

    // ---------- Ciclo de vida ----------

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val d = resources.displayMetrics.density
        val root = FrameLayout(this)
        root.setBackgroundColor(Color.BLACK)

        orb = OrbView(this)
        orb.particleCount = prefs.getInt("particles", 700)
        orb.colorIndex = prefs.getInt("color", 0).coerceIn(0, OrbView.PALETTES.size - 1)
        orb.contentDescription = "MIA. Tocá para hablar. Mantené apretado para los ajustes."
        orb.isClickable = true
        orb.setOnClickListener { onTap() }
        orb.setOnLongClickListener { openMenu(); true }
        root.addView(orb, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))

        label = TextView(this)
        label.textSize = 12f
        label.gravity = Gravity.CENTER
        label.letterSpacing = 0.12f
        label.isAllCaps = true
        label.setPadding((28 * d).toInt(), 0, (28 * d).toInt(), 0)
        label.isClickable = false
        val lp = FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.BOTTOM or Gravity.CENTER_HORIZONTAL)
        lp.bottomMargin = (40 * d).toInt()
        root.addView(label, lp)
        setContentView(root)

        tts = TextToSpeech(this) { st ->
            if (st == TextToSpeech.SUCCESS) {
                val r = tts?.setLanguage(Locale("es", "AR"))
                if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) tts?.setLanguage(Locale("es"))
                tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                    override fun onStart(id: String?) {}
                    override fun onDone(id: String?) { ui.post { finishSpeaking() } }
                    @Deprecated("Deprecated in Java")
                    override fun onError(id: String?) { ui.post { finishSpeaking() } }
                })
                ttsReady = true
            }
        }
        setVolumeControlStream(AudioManager.STREAM_MUSIC)
        setState(0)
    }

    private var autoListen = true
    private var listenAfter = false
    private var resumed = false

    // Modo "siempre atenta": escucha en bucle y solo se activa al oír "Mia...". Una vez activa sigue
    // escuchando hasta que pasan QUIET_MS sin que le hables, y vuelve a quedar atenta.
    private val QUIET_MS = 12_000L
    private var active = false
    private var errCount = 0
    private var lastActive = 0L
    private val atenta: Boolean get() = prefs.getBoolean("atenta", false)

    private fun muteBeep(on: Boolean) {
        try {
            val am = getSystemService(Context.AUDIO_SERVICE) as AudioManager
            val d = if (on) AudioManager.ADJUST_MUTE else AudioManager.ADJUST_UNMUTE
            am.adjustStreamVolume(AudioManager.STREAM_NOTIFICATION, d, 0)
            am.adjustStreamVolume(AudioManager.STREAM_SYSTEM, d, 0)
        } catch (e: Exception) { }
    }

    private fun passiveLoop(delayMs: Long) {
        ui.postDelayed({ if (atenta && resumed && state == 0) startListening() }, delayMs)
    }

    override fun onResume() {
        super.onResume()
        resumed = true
        setState(0)
        if (atenta) {
            muteBeep(true)
            active = false
            passiveLoop(600)
        } else maybeAutoListen()
    }

    override fun onPause() {
        resumed = false
        super.onPause()
    }

    /** Doble toque del botón del reloj con MIA asignada: si ya estaba abierta llega acá. */
    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        setIntent(intent)
        autoListen = true
        if (resumed) maybeAutoListen()
    }

    /** Al abrir MIA empieza a escuchar sola (se puede apagar en el menú). */
    private fun maybeAutoListen() {
        if (!autoListen) return
        autoListen = false
        if (!prefs.getBoolean("auto_listen", true)) return
        ui.postDelayed({
            if (!resumed) return@postDelayed
            if (state == 3) { stopSpeaking(); setState(0) }
            if (state == 0) startListening()
        }, 400)
    }

    override fun onStop() {
        muteBeep(false)
        try { recognizer?.cancel() } catch (e: Exception) { }
        stopSpeaking()
        super.onStop()
    }

    override fun onDestroy() {
        muteBeep(false)
        ui.removeCallbacks(sleepTask)
        recognizer?.destroy()
        releasePlayer()
        tts?.shutdown()
        super.onDestroy()
    }

    private fun dp(v: Int) = (v * resources.displayMetrics.density).toInt()

    private fun setLabel(s: String) {
        label.text = s
        label.setTextColor(orb.hotColor())
    }

    private fun setState(s: Int) {
        state = s
        orb.mode = when (s) {
            1 -> OrbView.Mode.LISTENING
            2 -> OrbView.Mode.THINKING
            3 -> OrbView.Mode.SPEAKING
            else -> OrbView.Mode.IDLE
        }
        if (s != 1) orb.externalLevel = -1f
        orb.keepScreenOn = true
        ui.removeCallbacks(sleepTask)
        if (s == 0 && !atenta) ui.postDelayed(sleepTask, 45_000)
        orb.invalidate()
    }

    private fun norm(s: String): String {
        val dd = Normalizer.normalize(s.lowercase(Locale.ROOT), Normalizer.Form.NFD).replace(Regex("\\p{M}+"), "")
        return dd.replace(Regex("[^a-z0-9 ]"), " ").replace(Regex("\\s+"), " ").trim()
    }

    // ---------- Toque ----------

    private fun onTap() {
        when (state) {
            0 -> startListening()
            1 -> { try { recognizer?.cancel() } catch (e: Exception) { }; setLabel(""); setState(0) }
            3 -> { stopSpeaking(); setLabel(""); setState(0) }
            else -> { }
        }
    }

    // ---------- Escuchar ----------

    private fun startListening() {
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(arrayOf(Manifest.permission.RECORD_AUDIO), REQ_MIC)
            return
        }
        if (!SpeechRecognizer.isRecognitionAvailable(this)) {
            setLabel("Sin reconocimiento de voz")
            return
        }
        try { recognizer?.destroy() } catch (e: Exception) { }
        val r = SpeechRecognizer.createSpeechRecognizer(this)
        r.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(params: Bundle?) {}
            override fun onBeginningOfSpeech() {}
            override fun onRmsChanged(rmsdB: Float) {
                if (state == 1) orb.externalLevel = ((rmsdB + 2f) / 12f).coerceIn(0f, 1f)
            }
            override fun onBufferReceived(buffer: ByteArray?) {}
            override fun onEndOfSpeech() {}
            override fun onError(error: Int) {
                orb.externalLevel = -1f
                setState(0)
                if (atenta && resumed && error != SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS && error != 12 && error != 13) {
                    if (active && System.currentTimeMillis() - lastActive > QUIET_MS) active = false
                    val calm = error == SpeechRecognizer.ERROR_NO_MATCH || error == SpeechRecognizer.ERROR_SPEECH_TIMEOUT
                    if (calm) errCount = 0 else errCount++
                    if (errCount > 12) {
                        setLabel("Error de voz ($error). Tocá para reintentar")
                        errCount = 0
                        return
                    }
                    setLabel(if (calm) (if (active) "" else "Atenta") else "Atenta (reintento, código $error)")
                    val wait = when {
                        calm -> 150L
                        error == 11 || error == 10 || error == SpeechRecognizer.ERROR_CLIENT || error == SpeechRecognizer.ERROR_RECOGNIZER_BUSY -> 1500L
                        error == SpeechRecognizer.ERROR_NETWORK || error == SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> 3000L
                        else -> 1200L
                    }
                    try { r.destroy() } catch (e: Exception) { }
                    passiveLoop(wait)
                    return
                }
                setLabel(when (error) {
                    SpeechRecognizer.ERROR_NO_MATCH, SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> "No te escuché"
                    12, 13 -> "Falta el paquete de español"
                    SpeechRecognizer.ERROR_NETWORK, SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> "Sin internet para escuchar"
                    SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> "Falta permiso del micrófono"
                    else -> "Error de voz ($error)"
                })
            }
            override fun onResults(results: Bundle?) {
                val said = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)?.firstOrNull()?.trim().orEmpty()
                orb.externalLevel = -1f
                if (said.isEmpty()) {
                    setState(0)
                    if (atenta && resumed) { passiveLoop(150L) } else setLabel("No te escuché")
                    return
                }
                errCount = 0
                if (atenta) {
                    val now = System.currentTimeMillis()
                    if (active && now - lastActive > QUIET_MS) active = false
                    if (!active) {
                        if (!Regex("(^| )(mia|mi a)( |$)").containsMatchIn(norm(said))) { setState(0); passiveLoop(100L); return }
                        active = true
                    }
                    lastActive = now
                }
                handle(said)
            }
            override fun onPartialResults(partialResults: Bundle?) {}
            override fun onEvent(eventType: Int, params: Bundle?) {}
        })
        recognizer = r
        val i = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE, "es-AR")
            .putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, false)
            .putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, packageName)
        setState(1)
        setLabel(if (atenta && !active) "Atenta" else "Te escucho")
        r.startListening(i)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQ_MIC) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) startListening()
            else setLabel("Sin permiso de micrófono")
        }
    }

    // ---------- Cerebro ----------

    /** Primero le pregunta al cerebro de la PC (memoria, Alexa y clima compartidos con el celu). Si no responde, usa la lógica local. */
    private fun handle(said: String) {
        setState(2)
        setLabel("Pensando")
        val bb = brainBase()
        if (bb == null) { handleLocal(said); return }
        Thread {
            var res: JSONObject? = null
            try {
                val c = URL("$bb/mia").openConnection() as HttpURLConnection
                c.connectTimeout = 2500
                c.readTimeout = 130000
                c.requestMethod = "POST"
                c.doOutput = true
                c.setRequestProperty("Content-Type", "application/json")
                c.outputStream.use { it.write(JSONObject().put("text", said).put("device", "reloj").toString().toByteArray(Charsets.UTF_8)) }
                if (c.responseCode in 200..299) res = JSONObject(c.inputStream.bufferedReader().use { it.readText() })
                c.disconnect()
            } catch (e: Exception) { res = null }
            val r = res
            ui.post {
                if (state != 2) return@post
                if (r == null || r.optString("reply").isBlank()) {
                    handleLocal(said)
                } else {
                    val reply = r.optString("reply")
                    listenAfter = r.optBoolean("listen", false)
                    if (r.optString("action") == "alexa") {
                        setLabel("Alexa")
                        speakFallback(reply)
                    } else speak(reply)
                }
            }
        }.start()
    }

    private fun handleLocal(said: String) {
        val n = norm(said)
        if (n.contains("que hora es")) {
            speak("Son las " + SimpleDateFormat("H:mm", Locale("es", "AR")).format(Date()) + ".")
            return
        }
        if (n.contains("que dia es") || n.contains("que fecha es")) {
            speak("Hoy es " + SimpleDateFormat("EEEE d 'de' MMMM", Locale("es", "AR")).format(Date()) + ".")
            return
        }
        if (Weather.isWeatherQuestion(n)) {
            val scope = Weather.weatherScope(n)
            val wind = n.contains("viento") || n.contains("ventoso") || n.contains("rafaga")
            Thread {
                val summary = Weather.weatherSummary(scope, wind)
                val err = Weather.weatherError
                ui.post {
                    speak(summary ?: ("No pude consultar el pronóstico. " + err.take(60)))
                }
            }.start()
            return
        }
        askModel(said)
    }

    private fun systemPrompt(): String {
        val now = SimpleDateFormat("EEEE d 'de' MMMM 'de' yyyy, H:mm", Locale("es", "AR")).format(Date())
        return "/no_think Sos MIA (Mi Inteligencia Artificial), la asistente personal de Luciano. Hablás en español rioplatense (voseo). Tu estilo es sereno, elegante, eficiente y atento, con un humor seco y sutil de vez en cuando, nunca exagerado ni infantil. Anticipás lo que Luciano pueda necesitar. Ocasionalmente podés llamarlo \"señor\", sin abusar. " +
            "Tus respuestas se leen en voz alta desde un reloj: máximo 2 oraciones cortas, sin listas, sin markdown, sin emojis. " +
            "Si no sabés algo o no lo tenés en lo que te contaron, decilo en vez de inventar. No inventes datos de Mar del Plata ni de dispositivos.\n\n" +
            "Lo que sabés de Luciano y su casa:\n" + DEFAULT_PROFILE +
            "\n\nAhora es: " + now + "."
    }

    private fun pcUrl(): String = (prefs.getString("pc_url", DEFAULT_URL) ?: DEFAULT_URL).trim().trimEnd('/')

    private fun voiceBase(): String? = try {
        val u = pcUrl()
        val host = java.net.URI(if (u.contains("://")) u else "http://$u").host
        if (host.isNullOrBlank()) null else "http://$host:5002"
    } catch (e: Exception) { null }

    private fun brainBase(): String? {
        if (!prefs.getBoolean("brain", true)) return null
        return try {
            val u = pcUrl()
            val host = java.net.URI(if (u.contains("://")) u else "http://$u").host
            if (host.isNullOrBlank()) null else "http://$host:5003"
        } catch (e: Exception) { null }
    }

    private fun askModel(said: String) {
        val base = pcUrl()
        history.add("user" to said)
        while (history.size > 6) history.removeAt(0)
        val msgs = JSONArray()
        msgs.put(JSONObject().put("role", "system").put("content", systemPrompt()))
        history.forEach { msgs.put(JSONObject().put("role", it.first).put("content", it.second)) }
        val body = JSONObject()
            .put("model", "local")
            .put("messages", msgs)
            .put("temperature", 0.6)
            .put("max_tokens", 200)
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
                    reply = JSONObject(txt).getJSONArray("choices").getJSONObject(0).getJSONObject("message").getString("content")
                } else err = "La PC respondió con error $code."
                c.disconnect()
            } catch (e: java.net.SocketTimeoutException) {
                err = "La PC tardó demasiado en contestar."
            } catch (e: Exception) {
                err = "No pude hablar con la PC. ¿Está prendida y en el mismo Wi-Fi?"
            }
            val r = reply
            val e = err
            ui.post {
                if (r != null) {
                    val clean = r.replace(Regex("(?s)<think>.*?</think>"), "").replace(Regex("[*_#`]+"), "").trim()
                        .ifEmpty { "No supe qué contestarte, probá de nuevo." }
                    history.add("assistant" to clean)
                    speak(clean)
                } else {
                    if (history.isNotEmpty()) history.removeAt(history.size - 1)
                    setLabel("Sin conexión con la PC")
                    speak(e ?: "Algo falló.")
                }
            }
        }.start()
    }

    // ---------- Hablar (voz Piper de la PC, con respaldo del reloj) ----------

    private val wavQueue = java.util.ArrayDeque<ByteArray>()
    private var feedDone = true
    private var fullText = ""
    private var tailText = ""

    /** Parte la respuesta en frases: la primera sale sola y rápido, el resto se agrupa. */
    private fun pieces(text: String): List<String> {
        val ss = Regex("(?<=[.!?\u2026])\\s+|\n+").split(text.trim()).map { it.trim() }.filter { it.isNotEmpty() }
        if (ss.size <= 1) return listOf(text.trim())
        val out = ArrayList<String>()
        var cur = ""
        for (s in ss) {
            cur = if (cur.isEmpty()) s else "$cur $s"
            val minLen = if (out.isEmpty()) 25 else 90
            if (cur.length >= minLen) { out.add(cur); cur = "" }
        }
        if (cur.isNotEmpty()) {
            if (out.isNotEmpty() && cur.length < 25) out[out.size - 1] = out[out.size - 1] + " " + cur else out.add(cur)
        }
        return out
    }

    /** Habla por partes: pide a Piper la primera frase y la reproduce mientras prepara las siguientes. */
    private fun speak(text: String) {
        val my = ++token
        releasePlayer()
        wavQueue.clear()
        feedDone = false
        tailText = ""
        fullText = text
        val base = voiceBase()
        val parts = pieces(text)
        Thread {
            for ((i, p) in parts.withIndex()) {
                var wav: ByteArray? = null
                if (base != null) {
                    try {
                        val c = URL("$base/tts").openConnection() as HttpURLConnection
                        c.connectTimeout = 3000
                        c.readTimeout = 30000
                        c.requestMethod = "POST"
                        c.doOutput = true
                        c.setRequestProperty("Content-Type", "text/plain; charset=utf-8")
                        c.outputStream.use { it.write(p.toByteArray(Charsets.UTF_8)) }
                        if (c.responseCode in 200..299) wav = c.inputStream.use { it.readBytes() }
                        c.disconnect()
                    } catch (e: Exception) { wav = null }
                }
                val data = wav
                if (data == null || data.size <= 100) {
                    val rest = parts.drop(i).joinToString(" ")
                    ui.post {
                        if (my != token) return@post
                        feedDone = true
                        if (i == 0) speakFallback(text) else {
                            tailText = rest
                            if (player == null && wavQueue.isEmpty()) endOfSpeech()
                        }
                    }
                    return@Thread
                }
                ui.post {
                    if (my != token) return@post
                    wavQueue.addLast(data)
                    if (player == null) playNextPiece()
                }
            }
            ui.post {
                if (my != token) return@post
                feedDone = true
                if (player == null && wavQueue.isEmpty()) endOfSpeech()
            }
        }.start()
    }

    private fun playNextPiece() {
        val d = wavQueue.pollFirst()
        if (d != null) playWav(d, fullText) else if (feedDone) endOfSpeech()
    }

    private fun endOfSpeech() {
        val t = tailText
        tailText = ""
        if (t.isNotBlank()) speakFallback(t) else finishSpeaking()
    }

    private fun playWav(data: ByteArray, text: String) {
        try {
            val f = File(cacheDir, "mia-voz.wav")
            boost(data)
            f.writeBytes(data)
            val env = envelope(data)
            releasePlayer()
            val mp = MediaPlayer()
            mp.setDataSource(f.absolutePath)
            mp.setOnCompletionListener { releasePlayer(); playNextPiece() }
            mp.setOnErrorListener { _, _, _ -> speakFallback(text); true }
            mp.prepare()
            player = mp
            orb.levelProvider = {
                val pos = player?.currentPosition ?: 0
                if (env.isEmpty()) 0.4f else env[(pos / 40).coerceIn(0, env.size - 1)]
            }
            setState(3)
            setLabel("")
            mp.start()
        } catch (e: Exception) {
            speakFallback(text)
        }
    }

    private fun speakFallback(text: String) {
        releasePlayer()
        orb.levelProvider = null
        val e = tts
        if (e != null && ttsReady) {
            setState(3)
            setLabel("")
            e.speak(text, TextToSpeech.QUEUE_FLUSH, null, "mia")
        } else {
            setLabel(text.take(60))
            setState(0)
        }
    }

    private fun finishSpeaking() {
        releasePlayer()
        orb.levelProvider = null
        setState(0)
        val again = listenAfter
        listenAfter = false
        setLabel("")
        if (atenta) {
            if (active) lastActive = System.currentTimeMillis()
            passiveLoop(400L)
        } else if (again) ui.postDelayed({ if (state == 0) startListening() }, 350)
    }

    private fun stopSpeaking() {
        token++
        wavQueue.clear()
        feedDone = true
        tailText = ""
        releasePlayer()
        try { tts?.stop() } catch (e: Exception) { }
        orb.levelProvider = null
    }

    private fun releasePlayer() {
        val mp = player
        player = null
        if (mp != null) {
            try { mp.stop() } catch (e: Exception) { }
            try { mp.release() } catch (e: Exception) { }
        }
    }

    private fun le16(b: ByteArray, o: Int): Int = (b[o].toInt() and 0xff) or ((b[o + 1].toInt() and 0xff) shl 8)
    private fun le32(b: ByteArray, o: Int): Int = le16(b, o) or (le16(b, o + 2) shl 16)

    /** Sube la ganancia del WAV hasta casi el máximo (el parlante del reloj es débil). Modifica el arreglo en el lugar. */
    private fun boost(b: ByteArray) {
        try {
            var off = 12
            var start = -1
            var len = 0
            while (off + 8 <= b.size) {
                val id = String(b, off, 4, Charsets.US_ASCII)
                val sz = le32(b, off + 4)
                if (id == "data") {
                    start = off + 8
                    len = if (sz <= 0 || start + sz > b.size) b.size - start else sz
                    break
                }
                off += 8 + sz
            }
            if (start < 0) return
            var peak = 1
            var i = 0
            while (i + 1 < len) {
                val o = start + i
                val v = ((b[o].toInt() and 0xff) or (b[o + 1].toInt() shl 8)).toShort().toInt()
                val a = if (v < 0) -v else v
                if (a > peak) peak = a
                i += 2
            }
            val gain = min(30000f / peak, 3f)
            if (gain < 1.05f) return
            i = 0
            while (i + 1 < len) {
                val o = start + i
                val v = ((b[o].toInt() and 0xff) or (b[o + 1].toInt() shl 8)).toShort().toInt()
                val n = (v * gain).toInt().coerceIn(-32768, 32767)
                b[o] = (n and 0xff).toByte()
                b[o + 1] = ((n shr 8) and 0xff).toByte()
                i += 2
            }
        } catch (e: Exception) { }
    }

    /** Volumen del audio cada 40 ms, para que el orbe ondule al ritmo de la voz de MIA. */
    private fun envelope(b: ByteArray): FloatArray {
        try {
            var off = 12
            var start = -1
            var len = 0
            while (off + 8 <= b.size) {
                val id = String(b, off, 4, Charsets.US_ASCII)
                val sz = le32(b, off + 4)
                if (id == "data") {
                    start = off + 8
                    len = if (sz <= 0 || start + sz > b.size) b.size - start else sz
                    break
                }
                off += 8 + sz
            }
            if (start < 0) return FloatArray(0)
            val ch = max(1, le16(b, 22))
            val sr = le32(b, 24)
            val win = max(1, (sr * ch * 0.04f).toInt())
            val total = len / 2
            val count = total / win + 1
            val out = FloatArray(count)
            var mx = 0.0001f
            for (w in 0 until count) {
                var sum = 0.0
                var c = 0
                var i = w * win
                val end = min(total, i + win)
                while (i < end) {
                    val o = start + i * 2
                    val v = ((b[o].toInt() and 0xff) or (b[o + 1].toInt() shl 8)).toShort().toInt()
                    sum += v.toDouble() * v.toDouble()
                    c++
                    i++
                }
                val rms = if (c > 0) sqrt(sum / c).toFloat() else 0f
                out[w] = rms
                if (rms > mx) mx = rms
            }
            for (w in 0 until count) out[w] = (out[w] / mx).pow(0.8f)
            return out
        } catch (e: Exception) {
            return FloatArray(0)
        }
    }

    // ---------- Ajustes (mantener apretado el orbe) ----------

    private fun openMenu() {
        val items = arrayOf(
            "Color: " + OrbView.PALETTES[orb.colorIndex].name,
            "Dirección de la PC",
            "Partículas: " + orb.particleCount,
            "Probar conexión",
            "Cerebro de la PC: " + (if (prefs.getBoolean("brain", true)) "sí" else "no"),
            "Volumen",
            "Escuchar al abrir: " + (if (prefs.getBoolean("auto_listen", true)) "sí" else "no"),
            "Siempre atenta (decí \"Mia...\"): " + (if (prefs.getBoolean("atenta", false)) "sí" else "no")
        )
        AlertDialog.Builder(this).setItems(items) { _, which ->
            when (which) {
                0 -> {
                    orb.colorIndex = (orb.colorIndex + 1) % OrbView.PALETTES.size
                    prefs.edit().putInt("color", orb.colorIndex).apply()
                    setLabel(OrbView.PALETTES[orb.colorIndex].name)
                }
                1 -> editUrl()
                2 -> {
                    val opts = intArrayOf(400, 700, 1000)
                    val i = opts.indexOf(orb.particleCount)
                    orb.particleCount = opts[(i + 1) % opts.size]
                    prefs.edit().putInt("particles", orb.particleCount).apply()
                    setLabel("" + orb.particleCount + " partículas")
                }
                3 -> testConnection()
                4 -> {
                    val on = !prefs.getBoolean("brain", true)
                    prefs.edit().putBoolean("brain", on).apply()
                    setLabel(if (on) "Cerebro de la PC" else "Cerebro del reloj")
                }
                5 -> volumeDialog()
                6 -> {
                    val on = !prefs.getBoolean("auto_listen", true)
                    prefs.edit().putBoolean("auto_listen", on).apply()
                    setLabel(if (on) "Escucha al abrir" else "Espera un toque")
                }
                7 -> {
                    val on = !prefs.getBoolean("atenta", false)
                    prefs.edit().putBoolean("atenta", on).apply()
                    active = false
                    muteBeep(on)
                    if (on) {
                        setLabel("Atenta")
                        if (state == 0) passiveLoop(300L)
                    } else {
                        try { recognizer?.cancel() } catch (e: Exception) { }
                        setState(0)
                        setLabel("Espera un toque")
                    }
                }
            }
        }.show()
    }

    private fun volumeDialog() {
        val am = getSystemService(Context.AUDIO_SERVICE) as AudioManager
        val maxV = am.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
        val row = LinearLayout(this)
        row.orientation = LinearLayout.HORIZONTAL
        row.gravity = Gravity.CENTER
        row.setPadding(dp(8), dp(8), dp(8), dp(8))
        val txt = TextView(this)
        txt.textSize = 20f
        txt.gravity = Gravity.CENTER
        txt.setTextColor(Color.WHITE)
        fun refresh() { txt.text = "" + am.getStreamVolume(AudioManager.STREAM_MUSIC) + " / " + maxV }
        val minus = Button(this)
        minus.text = "−"
        minus.setOnClickListener { am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_LOWER, 0); refresh() }
        val plus = Button(this)
        plus.text = "+"
        plus.setOnClickListener { am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_RAISE, 0); refresh() }
        row.addView(minus, LinearLayout.LayoutParams(dp(60), ViewGroup.LayoutParams.WRAP_CONTENT))
        row.addView(txt, LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f))
        row.addView(plus, LinearLayout.LayoutParams(dp(60), ViewGroup.LayoutParams.WRAP_CONTENT))
        refresh()
        AlertDialog.Builder(this).setTitle("Volumen").setView(row).setPositiveButton("Listo", null).show()
    }

    private fun editUrl() {
        val e = EditText(this)
        e.setText(pcUrl())
        e.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_URI
        AlertDialog.Builder(this)
            .setTitle("Dirección de la PC")
            .setView(e)
            .setPositiveButton("Guardar") { _, _ -> prefs.edit().putString("pc_url", e.text.toString().trim()).apply() }
            .setNegativeButton("Cancelar", null)
            .show()
    }

    private fun testConnection() {
        setLabel("Probando")
        val base = pcUrl()
        val vbase = voiceBase()
        val bbase = brainBase()
        Thread {
            fun ping(u: String): Boolean = try {
                val c = URL("$u/health").openConnection() as HttpURLConnection
                c.connectTimeout = 3000
                c.readTimeout = 3000
                val ok = c.responseCode in 200..299
                c.disconnect()
                ok
            } catch (e: Exception) { false }
            val a = ping(base)
            val v = vbase != null && ping(vbase)
            val b = bbase != null && ping(bbase)
            ui.post { setLabel("PC " + (if (a) "ok" else "no") + " · Voz " + (if (v) "ok" else "no") + " · Cerebro " + (if (b) "ok" else "no")) }
        }.start()
    }
}
