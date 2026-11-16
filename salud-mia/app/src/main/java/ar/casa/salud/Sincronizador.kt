package ar.casa.salud

import androidx.health.connect.client.HealthConnectClient
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

/** Lectura de Health Connect y envio a la PC. Lo usan la pantalla y el trabajo automatico (SyncWorker). */
object Sincronizador {

    fun urlDe(texto: String): String? {
        val v = texto.trim().trimEnd('/')
        if (v.isEmpty()) return null
        val base = if (v.startsWith("http")) v else "http://$v:5003"
        return "$base/salud"
    }

    fun enviar(url: String, json: JSONObject): String {
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

    suspend fun armarResumen(c: HealthConnectClient, dados: Set<String>): JSONObject {
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
        ExerciseSessionRecord.EXERCISE_TYPE_SOCCER -> "fútbol"
        ExerciseSessionRecord.EXERCISE_TYPE_HIKING -> "senderismo"
        ExerciseSessionRecord.EXERCISE_TYPE_STRENGTH_TRAINING -> "pesas"
        ExerciseSessionRecord.EXERCISE_TYPE_YOGA -> "yoga"
        ExerciseSessionRecord.EXERCISE_TYPE_SWIMMING_POOL -> "natación"
        else -> "otro"
    }
}
