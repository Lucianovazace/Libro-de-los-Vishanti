package ar.casa.launcher

import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.text.InputType
import android.widget.EditText
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder
import android.content.Intent
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.Drawable
import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.speech.tts.TextToSpeech
import java.util.Locale
import android.util.TypedValue
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.GridLayout
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast

private const val ALEXA = "com.amazon.dee.app"
private const val GOVEE = "com.govee.home"
private const val SMARTTHINGS = "com.samsung.android.oneconnect"

class Tile(
    val label: String,
    val sub: String?,
    val color: Int,
    val icon: Int,
    val darkText: Boolean,
    val row: Int,
    val col: Int,
    val colSpan: Int,
    val rowSpan: Int,
    val detail: String,
    val packages: List<String>,
    val labelHint: String? = null,
    val big: Boolean = false,
    val mia: Boolean = false
)

class AppEntry(val label: String, val icon: Drawable, val intent: Intent)

class MainActivity : Activity() {

    private lateinit var home: LinearLayout
    private lateinit var apps: LinearLayout
    private lateinit var appsList: LinearLayout
    private lateinit var detailTitle: TextView
    private lateinit var detailText: TextView

    private val tiles = listOf(
        Tile(
            "Modo cine", "\"Alexa, modo cine\"", 0xFF006CC1.toInt(), R.drawable.ic_cine, false,
            0, 0, 2, 2,
            "Sala tenue y calida al 15%. Entrada, cocina y luces de hadas apagadas. Govee en modo video. Por ahora abre Alexa.",
            listOf(ALEXA), big = true
        ),
        Tile(
            "Modo testamentos", null, 0xFF8E5BD6.toInt(), R.drawable.ic_moon, false,
            0, 2, 2, 1,
            "Sala en violeta al 30%. Entrada y cocina apagadas. Por ahora abre Alexa.",
            listOf(ALEXA)
        ),
        Tile(
            "Alien", null, 0xFF187A3E.toInt(), R.drawable.ic_alien, false,
            1, 2, 1, 1,
            "Sala en verde oscuro, brillo bajo. Por ahora abre Alexa.",
            listOf(ALEXA)
        ),
        Tile(
            "Navidad", null, 0xFF9E1B32.toInt(), R.drawable.ic_tree, false,
            1, 3, 1, 1,
            "Sala en rojo, entrada en verde, cocina en blanco calido. Govee en rojo y musica navidena. Por ahora abre Alexa.",
            listOf(ALEXA)
        ),
        Tile(
            "Luz normal", null, 0xFFE8B04A.toInt(), R.drawable.ic_bulb, true,
            2, 0, 2, 1,
            "Todas las Macroled en blanco calido al 60%. Govee apagado. Por ahora abre Alexa.",
            listOf(ALEXA)
        ),
        Tile(
            "Govee TV", "Sincronizado con la imagen", 0xFF4A4A4F.toInt(), R.drawable.ic_govee, false,
            2, 2, 2, 1,
            "El backlight copia los colores de la pantalla. Abre Govee Home.",
            listOf(GOVEE)
        ),
        Tile(
            "Entrada", null, 0xFF007A72.toInt(), R.drawable.ic_bulb, false,
            3, 0, 1, 1,
            "Macroled de la entrada. Abre la app de Macroled.",
            emptyList(), labelHint = "macroled"
        ),
        Tile(
            "Sala", null, 0xFF007A72.toInt(), R.drawable.ic_bulb, false,
            3, 1, 1, 1,
            "Macroled de la sala. Abre la app de Macroled.",
            emptyList(), labelHint = "macroled"
        ),
        Tile(
            "Cocina", null, 0xFF007A72.toInt(), R.drawable.ic_bulb, false,
            3, 2, 1, 1,
            "Macroled de la cocina. Abre la app de Macroled.",
            emptyList(), labelHint = "macroled"
        ),
        Tile(
            "Pieza", null, 0xFF007A72.toInt(), R.drawable.ic_bulb, false,
            3, 3, 1, 1,
            "Macroled de la pieza. Abre la app de Macroled.",
            emptyList(), labelHint = "macroled"
        ),
        Tile(
            "Apagar todo", null, 0xFFB3262E.toInt(), R.drawable.ic_power, false,
            4, 0, 2, 1,
            "Apaga las cuatro Macroled, el Govee y el televisor. Por ahora abre Alexa.",
            listOf(ALEXA)
        ),
        Tile(
            "Televisor", null, 0xFF4A4A4F.toInt(), R.drawable.ic_tv, false,
            4, 2, 2, 1,
            "Prende o apaga el Samsung. Abre SmartThings.",
            listOf(SMARTTHINGS)
        ),
        Tile(
            "MIA", "Hablá con tu asistente", 0xFF3B3B8F.toInt(), R.drawable.ic_mia, false,
            5, 0, 4, 1,
            "Tu asistente personal. Entiende las órdenes de la casa y charla usando la PC. Se configura adentro, en Ajustes.",
            emptyList(), mia = true
        )
    )

    private var tts: TextToSpeech? = null
    private var ttsReady = false

    private val defaultPhrases = mapOf(
        "Modo cine" to "modo cine",
        "Modo testamentos" to "modo testamentos",
        "Alien" to "modo alien",
        "Navidad" to "modo navidad",
        "Luz normal" to "luz normal"
    )

    private fun phraseFor(t: Tile): String {
        val key = "phrase_" + t.label
        return if (prefs.contains(key)) (prefs.getString(key, "") ?: "") else (defaultPhrases[t.label] ?: "")
    }

    private val prefs by lazy { getSharedPreferences("casa", Context.MODE_PRIVATE) }

    private val density by lazy { resources.displayMetrics.density }
    private fun dp(v: Int): Int = (v * density).toInt()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val root = FrameLayout(this)
        root.setBackgroundColor(Color.BLACK)
        root.fitsSystemWindows = true

        home = buildHome()
        apps = buildApps()
        apps.visibility = View.GONE

        root.addView(home, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
        root.addView(apps, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
        setContentView(root)
        select(0)

        tts = TextToSpeech(this) { status ->
            if (status == TextToSpeech.SUCCESS) {
                val r = tts?.setLanguage(Locale("es", "AR"))
                if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) {
                    tts?.setLanguage(Locale("es"))
                }
                ttsReady = true
            }
        }
    }

    override fun onDestroy() {
        tts?.shutdown()
        super.onDestroy()
    }

    override fun onResume() {
        super.onResume()
        refreshApps()
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        showHome()
    }

    @Suppress("DEPRECATION")
    override fun onBackPressed() {
        if (apps.visibility == View.VISIBLE) showHome()
        // En el inicio no se hace nada: es un launcher.
    }

    private fun showHome() {
        apps.visibility = View.GONE
        home.visibility = View.VISIBLE
    }

    private fun showApps() {
        home.visibility = View.GONE
        apps.visibility = View.VISIBLE
    }

    // ---------- Inicio ----------

    private fun buildHome(): LinearLayout {
        val screenW = resources.displayMetrics.widthPixels
        val pad = dp(16)
        val gap = dp(6)
        val unitW = (screenW - 2 * pad) / 4
        val unitH = dp(78) + gap

        val col = LinearLayout(this)
        col.orientation = LinearLayout.VERTICAL
        col.setPadding(pad, dp(24), pad, dp(12))

        col.addView(header("inicio"))

        val grid = GridLayout(this)
        grid.columnCount = 4
        grid.rowCount = 6
        tiles.forEachIndexed { i, t ->
            grid.addView(tileView(t, i, unitW, unitH, gap))
        }
        col.addView(grid, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT))

        val detail = LinearLayout(this)
        detail.orientation = LinearLayout.VERTICAL
        detail.gravity = Gravity.BOTTOM
        detail.setPadding(0, dp(12), 0, 0)

        val tag = text("SELECCIONADO", 12f, Color.parseColor("#A6A6A6"), Typeface.create("sans-serif-medium", Typeface.NORMAL))
        tag.letterSpacing = 0.2f
        detailTitle = text("", 26f, Color.WHITE, Typeface.create("sans-serif-light", Typeface.NORMAL))
        detailText = text("", 14f, Color.parseColor("#D0D0D0"), Typeface.DEFAULT)
        detailText.setLineSpacing(0f, 1.2f)
        detail.addView(tag)
        detail.addView(detailTitle)
        detail.addView(detailText)
        col.addView(detail, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f))

        val bottom = LinearLayout(this)
        bottom.gravity = Gravity.END
        bottom.setPadding(0, dp(8), 0, 0)
        bottom.addView(circleButton(R.drawable.ic_arrow_right, "Ir a la lista de apps") { showApps() })
        col.addView(bottom, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT))

        return col
    }

    private fun tileView(t: Tile, index: Int, unitW: Int, unitH: Int, gap: Int): View {
        val fg = if (t.darkText) Color.parseColor("#141413") else Color.WHITE

        val box = FrameLayout(this)
        box.setBackgroundColor(t.color)
        box.setPadding(dp(10), dp(8), dp(10), dp(8))
        box.isClickable = true

        val iconSize = if (t.big) dp(40) else dp(26)
        val ic = ImageView(this)
        ic.setImageResource(t.icon)
        ic.setColorFilter(fg)
        box.addView(ic, FrameLayout.LayoutParams(iconSize, iconSize, Gravity.TOP or Gravity.START))

        val texts = LinearLayout(this)
        texts.orientation = LinearLayout.VERTICAL
        val small = t.colSpan == 1
        val labelSp = if (t.big) 18f else if (small) 12f else 14f
        texts.addView(text(t.label, labelSp, fg, Typeface.create("sans-serif-medium", Typeface.NORMAL)))
        if (t.sub != null) {
            texts.addView(text(t.sub, if (t.big) 12f else 11f, fg, Typeface.DEFAULT))
        }
        box.addView(texts, FrameLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.BOTTOM or Gravity.START))

        box.setOnTouchListener { v, e ->
            when (e.actionMasked) {
                MotionEvent.ACTION_DOWN -> v.animate().scaleX(0.95f).scaleY(0.95f).setDuration(80).start()
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> v.animate().scaleX(1f).scaleY(1f).setDuration(120).start()
            }
            false
        }
        box.setOnClickListener {
            select(index)
            openTile(t)
        }
        box.setOnLongClickListener {
            select(index)
            configure(t)
            true
        }

        val lp = GridLayout.LayoutParams(GridLayout.spec(t.row, t.rowSpan), GridLayout.spec(t.col, t.colSpan))
        lp.width = unitW * t.colSpan - gap
        lp.height = unitH * t.rowSpan - gap
        lp.setMargins(0, 0, gap, gap)
        box.layoutParams = lp
        return box
    }

    private fun select(index: Int) {
        val t = tiles[index]
        detailTitle.text = t.label
        if (t.mia) { detailText.text = t.detail; return }
        val linked = !prefs.getString("dev_" + t.label, "").isNullOrBlank() &&
            !prefs.getString("vm_token", "").isNullOrBlank()
        val phrase = phraseFor(t)
        val hint = when {
            linked -> "Al tocar activa la rutina por Voice Monkey. Mantene apretado para cambiarlo."
            phrase.isNotBlank() -> "Al tocar le dice a Alexa: \"" + phrase + "\". Mantene apretado para cambiarlo."
            else -> "Al tocar abre la app. Mantene apretado para conectarlo con una rutina."
        }
        detailText.text = t.detail + "\n\n" + hint
    }

    private fun openTile(t: Tile) {
        if (t.mia) { startActivity(Intent(this, OrbActivity::class.java)); return }
        val token = prefs.getString("vm_token", "") ?: ""
        val device = prefs.getString("dev_" + t.label, "") ?: ""
        if (token.isNotBlank() && device.isNotBlank()) {
            trigger(t, token, device)
            return
        }
        val phrase = phraseFor(t)
        if (phrase.isNotBlank()) {
            speakToAlexa(phrase)
            return
        }
        for (p in t.packages) {
            val i = packageManager.getLaunchIntentForPackage(p)
            if (i != null) {
                startActivity(i)
                return
            }
        }
        val hint = t.labelHint
        if (hint != null) {
            val found = launchables().firstOrNull { it.label.contains(hint, ignoreCase = true) }
            if (found != null) {
                startActivity(found.intent)
                return
            }
        }
        Toast.makeText(this, "No encontre la app para \"${t.label}\"", Toast.LENGTH_SHORT).show()
    }

    private fun speakToAlexa(phrase: String) {
        val engine = tts
        if (engine == null || !ttsReady) {
            Toast.makeText(this, "La voz del celular todavia no esta lista. Proba de nuevo.", Toast.LENGTH_SHORT).show()
            return
        }
        Toast.makeText(this, "Le digo a Alexa: " + phrase, Toast.LENGTH_SHORT).show()
        engine.playSilentUtterance(500, TextToSpeech.QUEUE_FLUSH, "pre")
        engine.speak("Alexa, " + phrase, TextToSpeech.QUEUE_ADD, null, "casa")
    }

    private fun trigger(t: Tile, token: String, device: String) {
        Toast.makeText(this, "Activando " + t.label + "...", Toast.LENGTH_SHORT).show()
        Thread {
            var msg: String
            try {
                val q = "token=" + URLEncoder.encode(token, "UTF-8") + "&device=" + URLEncoder.encode(device, "UTF-8")
                val conn = URL("https://api-v3.voicemonkey.io/trigger?" + q).openConnection() as HttpURLConnection
                conn.connectTimeout = 8000
                conn.readTimeout = 8000
                val code = conn.responseCode
                msg = if (code in 200..299) t.label + ": listo" else "Error " + code + " al activar " + t.label
                conn.disconnect()
            } catch (e: Exception) {
                msg = "No pude conectar. Revisa internet."
            }
            runOnUiThread { Toast.makeText(this, msg, Toast.LENGTH_LONG).show() }
        }.start()
    }

    private fun configure(t: Tile) {
        if (t.mia) { startActivity(Intent(this, MiaActivity::class.java)); return }
        val box = LinearLayout(this)
        box.orientation = LinearLayout.VERTICAL
        box.setPadding(dp(20), dp(8), dp(20), 0)

        val token = EditText(this)
        token.hint = "Token de Voice Monkey (queda solo en este celular)"
        token.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
        token.setText(prefs.getString("vm_token", ""))

        val device = EditText(this)
        device.hint = "ID del disparador para \"" + t.label + "\""
        device.inputType = InputType.TYPE_CLASS_TEXT
        device.setText(prefs.getString("dev_" + t.label, ""))

        val phrase = EditText(this)
        phrase.hint = "Frase para decirle a Alexa (ej: modo cine)"
        phrase.inputType = InputType.TYPE_CLASS_TEXT
        phrase.setText(phraseFor(t))

        box.addView(phrase)
        box.addView(token)
        box.addView(device)

        AlertDialog.Builder(this)
            .setTitle(t.label)
            .setMessage("Al tocar, el celular le dice la frase a Alexa en voz alta (tiene que estar cerca del Echo). Si cargas Voice Monkey, usa eso. Sin frase ni ID, abre la app.")
            .setView(box)
            .setPositiveButton("Guardar") { _, _ ->
                prefs.edit()
                    .putString("vm_token", token.text.toString().trim())
                    .putString("dev_" + t.label, device.text.toString().trim())
                    .putString("phrase_" + t.label, phrase.text.toString().trim())
                    .apply()
                val idx = tiles.indexOf(t)
                if (idx >= 0) select(idx)
            }
            .setNegativeButton("Cancelar", null)
            .show()
    }

    // ---------- Lista de apps ----------

    private fun buildApps(): LinearLayout {
        val col = LinearLayout(this)
        col.orientation = LinearLayout.VERTICAL
        col.setPadding(dp(16), dp(24), dp(16), dp(12))

        col.addView(header("apps"))

        val scroll = ScrollView(this)
        scroll.isVerticalScrollBarEnabled = false
        appsList = LinearLayout(this)
        appsList.orientation = LinearLayout.VERTICAL
        scroll.addView(appsList, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        col.addView(scroll, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f))

        val bottom = LinearLayout(this)
        bottom.gravity = Gravity.START
        bottom.setPadding(0, dp(8), 0, 0)
        bottom.addView(circleButton(R.drawable.ic_arrow_left, "Volver al inicio") { showHome() })
        col.addView(bottom, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT))

        return col
    }

    private fun refreshApps() {
        appsList.removeAllViews()
        for (app in launchables()) {
            val row = LinearLayout(this)
            row.orientation = LinearLayout.HORIZONTAL
            row.gravity = Gravity.CENTER_VERTICAL
            row.minimumHeight = dp(56)
            row.isClickable = true

            val iconBox = FrameLayout(this)
            iconBox.setBackgroundColor(Color.parseColor("#2B2B2E"))
            val img = ImageView(this)
            img.setImageDrawable(app.icon)
            iconBox.addView(img, FrameLayout.LayoutParams(dp(32), dp(32), Gravity.CENTER))
            row.addView(iconBox, LinearLayout.LayoutParams(dp(44), dp(44)))

            val name = text(app.label, 20f, Color.WHITE, Typeface.create("sans-serif-light", Typeface.NORMAL))
            name.setPadding(dp(14), 0, 0, 0)
            row.addView(name)

            row.setOnClickListener { startActivity(app.intent) }
            appsList.addView(row, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT))
        }
    }

    private fun launchables(): List<AppEntry> {
        val query = Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER)
        return packageManager.queryIntentActivities(query, 0)
            .filter { it.activityInfo.packageName != packageName }
            .map { ri ->
                AppEntry(
                    ri.loadLabel(packageManager).toString(),
                    ri.loadIcon(packageManager),
                    Intent(Intent.ACTION_MAIN)
                        .addCategory(Intent.CATEGORY_LAUNCHER)
                        .setClassName(ri.activityInfo.packageName, ri.activityInfo.name)
                        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                )
            }
            .sortedBy { it.label.lowercase() }
    }

    // ---------- Utilidades ----------

    private fun header(title: String): LinearLayout {
        val h = LinearLayout(this)
        h.orientation = LinearLayout.VERTICAL
        h.setPadding(0, 0, 0, dp(16))
        val top = text("CASA INTELIGENTE", 12f, Color.parseColor("#A6A6A6"), Typeface.create("sans-serif-medium", Typeface.NORMAL))
        top.letterSpacing = 0.2f
        h.addView(top)
        h.addView(text(title, 56f, Color.WHITE, Typeface.create("sans-serif-light", Typeface.NORMAL)))
        return h
    }

    private fun text(s: String, sp: Float, color: Int, face: Typeface): TextView {
        val tv = TextView(this)
        tv.text = s
        tv.setTextSize(TypedValue.COMPLEX_UNIT_SP, sp)
        tv.setTextColor(color)
        tv.typeface = face
        tv.includeFontPadding = false
        return tv
    }

    private fun circleButton(icon: Int, desc: String, onClick: () -> Unit): View {
        val bg = GradientDrawable()
        bg.shape = GradientDrawable.OVAL
        bg.setColor(Color.TRANSPARENT)
        bg.setStroke(dp(2), Color.WHITE)

        val fl = FrameLayout(this)
        fl.background = bg
        fl.isClickable = true
        fl.contentDescription = desc
        val img = ImageView(this)
        img.setImageResource(icon)
        fl.addView(img, FrameLayout.LayoutParams(dp(20), dp(20), Gravity.CENTER))
        fl.setOnClickListener { onClick() }
        fl.layoutParams = LinearLayout.LayoutParams(dp(48), dp(48))
        return fl
    }
}
