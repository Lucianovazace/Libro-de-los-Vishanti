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
import androidx.health.connect.client.feature.ExperimentalFeatureAvailabilityApi
import androidx.health.connect.client.feature.HealthConnectFeatures
import androidx.work.Constraints
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.NetworkType
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import java.util.concurrent.TimeUnit
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
    private val permisosBase = setOf(
        HealthPermission.getReadPermission(StepsRecord::class),
        HealthPermission.getReadPermission(SleepSessionRecord::class),
        HealthPermission.getReadPermission(HeartRateRecord::class),
        HealthPermission.getReadPermission(ExerciseSessionRecord::class),
        HealthPermission.getReadPermission(WeightRecord::class),
        HealthPermission.getReadPermission(DistanceRecord::class),
        HealthPermission.getReadPermission(ActiveCaloriesBurnedRecord::class),
    )

    private var permisos: Set<String> = permisosBase

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
            // Lectura en segundo plano (para la sincronizacion automatica), si este celu la soporta
            if (segundoPlanoDisponible(client!!)) permisos = permisosBase + HealthPermission.PERMISSION_READ_HEALTH_DATA_IN_BACKGROUND
            // Al abrir la app, si ya hay permisos y dirección, manda solo
            if (!campoPc.text.isNullOrBlank()) programarSync()
            scope.launch { if (!campoPc.text.isNullOrBlank()) sincronizar() }
        } else if (st == HealthConnectClient.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED) {
            log("Health Connect necesita actualizarse (Play Store, 'Health Connect'). Después volvé a abrir esta app.")
        } else {
            log("Este celu no tiene Health Connect. Instalalo desde Play Store ('Health Connect by Android') y volvé a abrir esta app.")
        }
    }

    @OptIn(ExperimentalFeatureAvailabilityApi::class)
    private fun segundoPlanoDisponible(c: HealthConnectClient): Boolean = try {
        c.features.getFeatureStatus(HealthConnectFeatures.FEATURE_READ_HEALTH_DATA_IN_BACKGROUND) == HealthConnectFeatures.FEATURE_STATUS_AVAILABLE
    } catch (e: Throwable) { false }

    private fun guardarPc(prefs: android.content.SharedPreferences) {
        prefs.edit().putString("pc", campoPc.text.toString().trim()).apply()
        if (campoPc.text.toString().isNotBlank()) programarSync()
    }

    /** Sincronizacion automatica: cada hora (el sistema decide el momento exacto), solo con red. */
    private fun programarSync() {
        val req = PeriodicWorkRequestBuilder<SyncWorker>(1, TimeUnit.HOURS)
            .setConstraints(Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build())
            .build()
        WorkManager.getInstance(this).enqueueUniquePeriodicWork("salud-sync", ExistingPeriodicWorkPolicy.UPDATE, req)
    }

    private fun log(t: String) { runOnUiThread { estado.text = t } }

    private fun urlPc(): String? = Sincronizador.urlDe(campoPc.text.toString())

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
            val json = withContext(Dispatchers.IO) { Sincronizador.armarResumen(c, dados) }
            log("Enviando a MIA...")
            val resp = withContext(Dispatchers.IO) { Sincronizador.enviar(url, json) }
            val dias = json.getJSONArray("dias").length()
            val ej = json.getJSONArray("ejercicio").length()
            val pe = json.getJSONArray("peso").length()
            log("Listo. Mandé $dias días, $ej entrenamientos y $pe pesajes.\nRespuesta de la PC: $resp\n\nPermisos que faltan: " +
                (permisos - dados).map { it.substringAfterLast('.') }.ifEmpty { listOf("ninguno") }.joinToString(", "))
        } catch (e: Exception) {
            log("No pude completar: ${e.javaClass.simpleName}: ${e.message}\n\n¿La PC está prendida, con el cerebro abierto y en el mismo wifi?")
        }
    }

}
