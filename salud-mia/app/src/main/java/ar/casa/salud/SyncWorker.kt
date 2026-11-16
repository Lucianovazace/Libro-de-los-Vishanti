package ar.casa.salud

import android.content.Context
import androidx.health.connect.client.HealthConnectClient
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters

/** Trabajo automatico: lee Health Connect y manda el resumen a la PC. Si la PC no esta al alcance, reintenta mas tarde. */
class SyncWorker(ctx: Context, params: WorkerParameters) : CoroutineWorker(ctx, params) {
    override suspend fun doWork(): Result {
        val pc = applicationContext.getSharedPreferences("salud", Context.MODE_PRIVATE).getString("pc", "") ?: ""
        val url = Sincronizador.urlDe(pc) ?: return Result.success()
        if (HealthConnectClient.getSdkStatus(applicationContext) != HealthConnectClient.SDK_AVAILABLE) return Result.success()
        return try {
            val c = HealthConnectClient.getOrCreate(applicationContext)
            val dados = c.permissionController.getGrantedPermissions()
            if (dados.isEmpty()) return Result.success()
            val json = Sincronizador.armarResumen(c, dados)
            val resp = Sincronizador.enviar(url, json)
            if (resp.startsWith("2")) Result.success() else Result.retry()
        } catch (e: Exception) {
            Result.retry()
        }
    }
}
