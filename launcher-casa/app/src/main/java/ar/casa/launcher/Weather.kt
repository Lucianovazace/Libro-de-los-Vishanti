package ar.casa.launcher

import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

/** Clima de Mar del Plata (Open-Meteo, sin clave). Mismo codigo que el launcher del celu. */
object Weather {

    fun isWeatherQuestion(n: String): Boolean {
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
    var weatherError = ""

    private fun dayPartName(h: Int): String = when (h) {
        in 6..11 -> "a la mañana"
        in 12..17 -> "a la tarde"
        else -> "a la noche"
    }

    /** Resumen hablado: cielo, máxima/mínima, lluvia y cómo se pone a la noche. El viento solo si se pidió. */
    fun weatherSummary(scope: Int, wind: Boolean): String? {
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

    fun weatherScope(n: String): Int = when {
        n.contains("pasado manana") -> 3
        n.contains("manana") -> 2
        n.contains("hoy") || n.contains("ahora") || n.contains("esta noche") || n.contains("esta tarde") -> 1
        else -> 0
    }
}
