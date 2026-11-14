package ar.casa.salud

import android.content.Context
import android.graphics.Color
import android.os.Bundle
import android.text.InputType
import android.view.Gravity
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import androidx.activity.ComponentActivity
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.ActiveCaloriesBurnedRecord
import androidx.health.connect.client.records.DistanceRecord
import androidx.health.connect.client.records.ExerciseSessionRecord
import androidx.health.connect.client.records.HeartRateRecord
import androidx.health.connect.client.records.SleepSessionRecord
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.records.WeightRecord
import androidx.health.connect.client.request.AggregateGroupByPeriodRequest
import androidx.health.connect.client.request.AggregateRequest
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.time.Duration
import java.time.Instant
import java.time.LocalDate
import java.time.Period
import java.time.ZoneId
import kotlin.math.roundToInt

/**
 * MIA Salud: lee de Health Connect (pasos, sueño, pulsaciones, entrenamientos, peso) y manda un resumen
 * a la PC (http://IP:5003/salud). Solo lectura. Los datos van por el wifi de casa, no a internet.
 */
class MainActivity : ComponentActivity() {

    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private val permisos = setOf(
        HealthPermission.getReadPermission(StepsRecord::class),
        HealthPermission.getReadPermission(SleepSessionRecord::class),
        HealthPermission.getReadPermission(HeartRateRecord::class),
        HealthPermission.getReadPermission(ExerciseSessionRecord::class),
        HealthPermission.getReadPermission(WeightRecord::class),
        HealthPermission.getReadPermission(DistanceRecord::class),
        HealthPermission.getReadPermission(ActiveCaloriesBurnedRecord::class),
    )

    private lateinit var estado: TextView
    private lateinit var campoPc: EditText
    private var client: HealthConnectClient? = null

    private val pedirPermisos = registerForActivityResult(PermissionController.createRequestPermissionResultContract()) {
        scope.launch { sincronizar() }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val prefs = getSharedPreferences("salud", Context.MODE_PRIVATE)
        val dp = resources.displayMetrics.density

        val raiz = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding((20 * dp).toInt(), (40 * dp).toInt(), (20 * dp).toInt(), (20 * dp).toInt())
            setBackgroundColor(Color.BLACK)
        }
        fun texto(t: String, size: Float, color: Int = Color.WHITE) = TextView(this).apply {
            text = t; textSize = size; setTextColor(color); setPadding(0, (8 * dp).toInt(), 0, (8 * dp).toInt())
        }
        raiz.addView(texto("MIA Salud", 26f))
        raiz.addView(texto("Lee tus datos de Health Connect y se los manda a MIA en la PC (solo lectura, por el wifi de casa).", 14f, Color.LTGRAY))
        raiz.addView(texto("Dirección de la PC (por ejemplo 192.168.0.15):", 14f))
        campoPc = EditText(this).apply {
            setText(prefs.getString("pc", "") ?: "")
            setTextColor(Color.WHITE); setHintTextColor(Color.GRAY)
            hint = "IP de la PC"
            inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_URI
        }
        raiz.addView(campoPc)

        val botonPermisos = Button(this).apply { text = "1. Dar permisos de lectura" }
        val botonEnviar = Button(this).apply { text = "2. Enviar a MIA ahora" }
        raiz.addView(botonPermisos)
        raiz.addView(botonEnviar)
        estado = texto("", 14f, Color.LTGRAY).apply { gravity = Gravity.START }
        raiz.addView(ScrollView(this).apply { addView(estado) })
        setContentView(raiz)

        botonPermisos.setOnClickListener { guardarPc(prefs); scope.launch { pedirSiFalta(true) } }
        botonEnviar.setOnClickListener { guardarPc(prefs); scope.launch { sincronizar() } }

        val st = HealthConnectClient.getSdkStatus(this)
        if (st == HealthConnectClient.SDK_AVAILABLE) {
            client = HealthConnectClient.getOrCreate(this)
            // Al abrir la app, si ya hay permisos y dirección, manda solo
            scope.launch { if (!campoPc.text.isNullOrBlank()) sincronizar() }
        } else if (st == HealthConnectClient.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED) {
            log("Health Connect necesita actualizarse (Play Store, 'Health Connect'). Después volvé a abrir esta app.")
        } else {
            log("Este celu no tiene Health Connect. Instalalo desde Play Store ('Health Connect by Android') y volvé a abrir esta app.")
        }
    }

    private fun guardarPc(prefs: android.content.SharedPreferences) {
        prefs.edit().putString("pc", campoPc.text.toString().trim()).apply()
    }

    private fun log(t: String) { runOnUiThread { estado.text = t } }

    private fun urlPc(): String? {
        val v = campoPc.text.toString().trim().trimEnd('/')
        if (v.isEmpty()) return null
        val base = if (v.startsWith("http")) v else "http://$v:5003"
        return "$base/salud"
    }

    /** Pide los permisos que falten. Devuelve true si ya estaban todos. */
    private suspend fun pedirSiFalta(forzar: Boolean): Boolean {
        val c = client ?: run { log("Health Connect no está disponible en este celu."); return false }
        val dados = c.permissionController.getGrantedPermissions()
        if (dados.containsAll(permisos)) { if (forzar) log("Los permisos ya están dados."); return true }
        pedirPermisos.launch(permisos)
        return false
    }

    private suspend fun sincronizar() {
        val c = client ?: run { log("Health Connect no está disponible en este celu."); return }
        val url = urlPc() ?: run { log("Escribí primero la dirección de la PC."); return }
        val dados = c.permissionController.getGrantedPermissions()
        if (dados.isEmpty()) { log("Faltan permisos. Tocá '1. Dar permisos de lectura'."); pedirPermisos.launch(permisos); return }
        log("Leyendo Health Connect...")
        try {
            val json = withContext(Dispatchers.IO) { armarResumen(c, dados) }
            log("Enviando a MIA...")
            val resp = withContext(Dispatchers.IO) { enviar(url, json) }
            val dias = json.getJSONArray("dias").length()
            val ej = json.getJSONArray("ejercicio").length()
            val pe = json.getJSONArray("peso").length()
            log("Listo. Mandé $dias días, $ej entrenamientos y $pe pesajes.\nRespuesta de la PC: $resp\n\nPermisos que faltan: " +
                (permisos - dados).map { it.substringAfterLast('.') }.ifEmpty { listOf("ninguno") }.joinToString(", "))
        } catch (e: Exception) {
            log("No pude completar: ${e.javaClass.simpleName}: ${e.message}\n\n¿La PC está prendida, con el cerebro abierto y en el mismo wifi?")
        }
    }

    private fun enviar(url: String, json: JSONObject): String {
        val conn = URL(url).openConnection() as HttpURLConnection
        conn.requestMethod = "POST"
        conn.connectTimeout = 8000
        conn.readTimeout = 20000
        conn.doOutput = true
        conn.setRequestProperty("Content-Type", "application/json; charset=utf-8")
        conn.outputStream.use { it.write(json.toString().toByteArray(Charsets.UTF_8)) }
        val code = conn.responseCode
        val txt = (if (code in 200..299) conn.inputStream else conn.errorStream)?.bufferedReader()?.readText() ?: ""
        conn.disconnect()
        return "$code $txt".trim()
    }

    private fun redondea1(d: Double) = (d * 10).roundToInt() / 10.0

    private suspend fun armarResumen(c: HealthConnectClient, dados: Set<String>): JSONObject {
        val zona = ZoneId.systemDefault()
        val hoy = LocalDate.now(zona)
        val desde = hoy.minusDays(29)
        val dias = sortedMapOf<String, JSONObject>()
        fun dia(d: LocalDate): JSONObject = dias.getOrPut(d.toString()) { JSONObject().put("dia", d.toString()) }
        val rango = TimeRangeFilter.between(desde.atStartOfDay(), hoy.plusDays(1).atStartOfDay())

        fun tiene(r: kotlin.reflect.KClass<out androidx.health.connect.client.records.Record>) = dados.contains(HealthPermission.getReadPermission(r))

        // Pasos
        if (tiene(StepsRecord::class)) runCatching {
            for (g in c.aggregateGroupByPeriod(AggregateGroupByPeriodRequest(setOf(StepsRecord.COUNT_TOTAL), rango, Period.ofDays(1)))) {
                g.result[StepsRecord.COUNT_TOTAL]?.let { dia(g.startTime.toLocalDate()).put("pasos", it) }
            }
        }
        // Pulsaciones
        if (tiene(HeartRateRecord::class)) runCatching {
            val ms = setOf(HeartRateRecord.BPM_AVG, HeartRateRecord.BPM_MIN, HeartRateRecord.BPM_MAX)
            for (g in c.aggregateGroupByPeriod(AggregateGroupByPeriodRequest(ms, rango, Period.ofDays(1)))) {
                val o = dia(g.startTime.toLocalDate())
                g.result[HeartRateRecord.BPM_AVG]?.let { o.put("fcProm", it) }
                g.result[HeartRateRecord.BPM_MIN]?.let { o.put("fcMin", it) }
                g.result[HeartRateRecord.BPM_MAX]?.let { o.put("fcMax", it) }
            }
        }
        // Distancia
        if (tiene(DistanceRecord::class)) runCatching {
            for (g in c.aggregateGroupByPeriod(AggregateGroupByPeriodRequest(setOf(DistanceRecord.DISTANCE_TOTAL), rango, Period.ofDays(1)))) {
                g.result[DistanceRecord.DISTANCE_TOTAL]?.let { dia(g.startTime.toLocalDate()).put("dist", redondea1(it.inKilometers)) }
            }
        }
        // Calorias activas
        if (tiene(ActiveCaloriesBurnedRecord::class)) runCatching {
            for (g in c.aggregateGroupByPeriod(AggregateGroupByPeriodRequest(setOf(ActiveCaloriesBurnedRecord.ACTIVE_CALORIES_TOTAL), rango, Period.ofDays(1)))) {
                g.result[ActiveCaloriesBurnedRecord.ACTIVE_CALORIES_TOTAL]?.let { dia(g.startTime.toLocalDate()).put("kcal", it.inKilocalories.roundToInt()) }
            }
        }
        // Sueño: minutos dormidos, asignados al día en que te despertaste
        if (tiene(SleepSessionRecord::class)) runCatching {
            val i0 = desde.minusDays(1).atStartOfDay(zona).toInstant()
            val rs = c.readRecords(ReadRecordsRequest(SleepSessionRecord::class, TimeRangeFilter.between(i0, Instant.now()))).records
            val porDia = HashMap<String, Long>()
            for (s in rs) {
                val min = if (s.stages.isEmpty()) Duration.between(s.startTime, s.endTime).toMinutes()
                else s.stages.filter { it.stage != SleepSessionRecord.STAGE_TYPE_AWAKE && it.stage != SleepSessionRecord.STAGE_TYPE_OUT_OF_BED }
                    .sumOf { Duration.between(it.startTime, it.endTime).toMinutes() }
                val d = s.endTime.atZone(zona).toLocalDate().toString()
                porDia[d] = (porDia[d] ?: 0L) + min
            }
            for ((d, m) in porDia) dias.getOrPut(d) { JSONObject().put("dia", d) }.put("sueno", m)
        }

        // Entrenamientos (últimos 60 días) con datos de cada sesión
        val ejercicio = JSONArray()
        if (tiene(ExerciseSessionRecord::class)) runCatching {
            val i0 = hoy.minusDays(59).atStartOfDay(zona).toInstant()
            val rs = c.readRecords(ReadRecordsRequest(ExerciseSessionRecord::class, TimeRangeFilter.between(i0, Instant.now()))).records
            for (s in rs) {
                val o = JSONObject()
                o.put("inicio", s.startTime.atZone(zona).toLocalDateTime().toString())
                o.put("fin", s.endTime.atZone(zona).toLocalDateTime().toString())
                o.put("min", Duration.between(s.startTime, s.endTime).toMinutes())
                o.put("tipo", nombreTipo(s.exerciseType))
                s.title?.let { o.put("titulo", it) }
                runCatching {
                    val ms = HashSet<androidx.health.connect.client.aggregate.AggregateMetric<*>>()
                    if (tiene(DistanceRecord::class)) ms.add(DistanceRecord.DISTANCE_TOTAL)
                    if (tiene(ActiveCaloriesBurnedRecord::class)) ms.add(ActiveCaloriesBurnedRecord.ACTIVE_CALORIES_TOTAL)
                    if (tiene(HeartRateRecord::class)) { ms.add(HeartRateRecord.BPM_AVG); ms.add(HeartRateRecord.BPM_MAX) }
                    if (ms.isNotEmpty()) {
                        val a = c.aggregate(AggregateRequest(ms, TimeRangeFilter.between(s.startTime, s.endTime)))
                        a[DistanceRecord.DISTANCE_TOTAL]?.let { o.put("dist", redondea1(it.inKilometers)) }
                        a[ActiveCaloriesBurnedRecord.ACTIVE_CALORIES_TOTAL]?.let { o.put("kcal", it.inKilocalories.roundToInt()) }
                        a[HeartRateRecord.BPM_AVG]?.let { o.put("fcProm", it) }
                        a[HeartRateRecord.BPM_MAX]?.let { o.put("fcMax", it) }
                    }
                }
                ejercicio.put(o)
            }
        }

        // Peso (últimos 120 días)
        val peso = JSONArray()
        if (tiene(WeightRecord::class)) runCatching {
            val i0 = hoy.minusDays(119).atStartOfDay(zona).toInstant()
            val rs = c.readRecords(ReadRecordsRequest(WeightRecord::class, TimeRangeFilter.between(i0, Instant.now()))).records
            for (w in rs) peso.put(JSONObject().put("fecha", w.time.atZone(zona).toLocalDateTime().toString()).put("kg", redondea1(w.weight.inKilograms)))
        }

        val arr = JSONArray()
        for (o in dias.values) arr.put(o)
        return JSONObject()
            .put("device", android.os.Build.MODEL ?: "celu")
            .put("enviado", java.time.LocalDateTime.now(zona).toString())
            .put("dias", arr)
            .put("ejercicio", ejercicio)
            .put("peso", peso)
    }

    private fun nombreTipo(t: Int): String = when (t) {
        ExerciseSessionRecord.EXERCISE_TYPE_RUNNING -> "correr"
        ExerciseSessionRecord.EXERCISE_TYPE_WALKING -> "caminata"
        ExerciseSessionRecord.EXERCISE_TYPE_BIKING -> "bicicleta"
        ExerciseSessionRecord.EXERCISE_TYPE_FOOTBALL_SOCCER -> "fútbol"
        ExerciseSessionRecord.EXERCISE_TYPE_HIKING -> "senderismo"
        ExerciseSessionRecord.EXERCISE_TYPE_STRENGTH_TRAINING -> "pesas"
        ExerciseSessionRecord.EXERCISE_TYPE_YOGA -> "yoga"
        ExerciseSessionRecord.EXERCISE_TYPE_SWIMMING_POOL -> "natación"
        else -> "otro"
    }
}
