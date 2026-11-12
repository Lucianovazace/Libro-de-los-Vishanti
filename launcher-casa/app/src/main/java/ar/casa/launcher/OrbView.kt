package ar.casa.launcher

import android.content.Context
import android.graphics.BlendMode
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RadialGradient
import android.graphics.RectF
import android.graphics.Shader
import android.os.SystemClock
import android.view.View
import kotlin.math.PI
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.max
import kotlin.math.min
import kotlin.math.pow
import kotlin.math.roundToInt
import kotlin.math.sin
import kotlin.math.sqrt
import kotlin.random.Random

/** El orbe de MIA: una esfera de particulas con anillos que cambia de movimiento segun el estado. */
class OrbView(context: Context) : View(context) {

    enum class Mode { IDLE, LISTENING, THINKING, SPEAKING, AMBIENT }

    class Pal(val name: String, val c: IntArray, val hot: IntArray)

    private class Ring(val tx: Float, val tz: Float, val r: Float, val dir: Float, val sp: Float, val start: Float, val arc: Float) {
        val cx = cos(tx)
        val sx = sin(tx)
        val cz = cos(tz)
        val sz = sin(tz)
    }

    companion object {
        val PALETTES = arrayOf(
            Pal("Dorado", intArrayOf(255, 172, 40), intArrayOf(255, 236, 175)),
            Pal("Cian", intArrayOf(60, 212, 255), intArrayOf(205, 248, 255)),
            Pal("Violeta", intArrayOf(160, 112, 255), intArrayOf(232, 216, 255)),
            Pal("Blanco", intArrayOf(206, 220, 255), intArrayOf(255, 255, 255))
        )
        private val RINGS = arrayOf(
            Ring(0.5f, 0.0f, 1.05f, 1f, 1.0f, 0.2f, 2.6f),
            Ring(1.2f, 0.6f, 0.95f, -1f, 0.7f, 2.8f, 2.2f),
            Ring(-0.7f, 1.1f, 0.8f, 1f, 1.4f, 4.1f, 3.0f),
            Ring(0.1f, -1.0f, 1.0f, -1f, 0.5f, 1.4f, 2.0f),
            Ring(1.5f, 0.2f, 0.66f, 1f, 1.9f, 5.0f, 3.4f)
        )
        // spin, amp, bright, frac, radius, ring, halo, think
        private val TARGETS = mapOf(
            Mode.IDLE to floatArrayOf(0.28f, 0.025f, 0.9f, 1f, 1.0f, 0.6f, 0f, 0f),
            Mode.LISTENING to floatArrayOf(0.4f, 0.10f, 1.05f, 1f, 1.03f, 0.9f, 1f, 0f),
            Mode.THINKING to floatArrayOf(1.7f, 0.05f, 1.1f, 1f, 0.86f, 3.2f, 0f, 1f),
            Mode.SPEAKING to floatArrayOf(0.5f, 0.13f, 1.12f, 1f, 1.0f, 1.1f, 0.6f, 0f),
            Mode.AMBIENT to floatArrayOf(0.04f, 0f, 0.38f, 0.34f, 0.9f, 0.1f, 0f, 0f)
        )
    }

    var mode = Mode.IDLE
    var colorIndex = 0
    var particleCount = 700
    /** Volumen real (0..1) de quien este hablando; negativo = usar uno simulado. */
    var externalLevel = -1f
    /** Si hay un proveedor (por ejemplo el audio de MIA), manda sobre todo lo demas. */
    var levelProvider: (() -> Float)? = null

    fun hotColor(): Int {
        val h = PALETTES[colorIndex].hot
        return Color.rgb(h[0], h[1], h[2])
    }

    private val p = TARGETS[Mode.IDLE]!!.clone()
    private val cc = floatArrayOf(255f, 172f, 40f)
    private val ch = floatArrayOf(255f, 236f, 175f)
    private var angle = 0f
    private var ringA = 0f
    private var arcA = 0f
    private var level = 0f
    private val t0 = SystemClock.uptimeMillis()
    private var last = t0

    private var n = 0
    private var builtFor = -1
    private var pk = IntArray(0)
    private var px = FloatArray(0)
    private var py = FloatArray(0)
    private var pz = FloatArray(0)
    private var pring = IntArray(0)
    private var pth = FloatArray(0)
    private var pa = FloatArray(0)
    private var ps = FloatArray(0)

    private val rnd = Random(7)
    private val glow = Paint(Paint.ANTI_ALIAS_FLAG)
    private val dot = Paint().apply { blendMode = BlendMode.PLUS }
    private val stroke = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        style = Paint.Style.STROKE
        blendMode = BlendMode.PLUS
        strokeCap = Paint.Cap.ROUND
    }
    private val oval = RectF()

    private fun build(total: Int) {
        val shells = arrayOf(floatArrayOf(1.0f, 0.52f), floatArrayOf(0.8f, 0.2f), floatArrayOf(0.58f, 0.1f))
        val ringCount = (total * 0.18f).roundToInt()
        var cap = ringCount
        for (sh in shells) cap += max(2, (total * sh[1]).roundToInt())
        pk = IntArray(cap); px = FloatArray(cap); py = FloatArray(cap); pz = FloatArray(cap)
        pring = IntArray(cap); pth = FloatArray(cap); pa = FloatArray(cap); ps = FloatArray(cap)
        val golden = (PI * (3.0 - sqrt(5.0))).toFloat()
        var id = 0
        for (sh in shells) {
            val r = sh[0]
            val m = max(2, (total * sh[1]).roundToInt())
            for (i in 0 until m) {
                val y = 1f - (i / (m - 1).toFloat()) * 2f
                val rad = sqrt(max(0f, 1f - y * y))
                val th = golden * i
                val j = 1f + (rnd.nextFloat() - 0.5f) * 0.05f
                pk[id] = 0
                px[id] = cos(th) * rad * r * j
                py[id] = y * r * j
                pz[id] = sin(th) * rad * r * j
                pa[id] = 0.5f + rnd.nextFloat() * 0.5f
                ps[id] = 0.6f + rnd.nextFloat() * 0.8f
                id++
            }
        }
        for (i in 0 until ringCount) {
            val ri = i % RINGS.size
            val g = RINGS[ri]
            pk[id] = 1
            pring[id] = ri
            pth[id] = g.start + rnd.nextFloat() * g.arc
            pa[id] = 0.6f + rnd.nextFloat() * 0.4f
            ps[id] = 0.8f + rnd.nextFloat() * 0.9f
            id++
        }
        n = id
        builtFor = total
    }

    private fun levelFor(m: Mode, t: Float): Float = when (m) {
        Mode.LISTENING -> {
            val b = max(0f, sin(t * 1.7f)).pow(1.5f)
            b * (0.55f + 0.45f * abs(sin(t * 8.9f)))
        }
        Mode.SPEAKING -> {
            val gate = if (sin(t * 0.8f) > -0.5f) 1f else 0.15f
            gate * (0.3f + 0.7f * abs(sin(t * 7.7f + sin(t * 2.1f) * 2.0f)))
        }
        Mode.THINKING -> 0.25f + 0.15f * sin(t * 3f)
        Mode.AMBIENT -> 0f
        else -> 0.06f + 0.05f * sin(t * 1.2f)
    }

    override fun onWindowVisibilityChanged(visibility: Int) {
        super.onWindowVisibilityChanged(visibility)
        if (visibility == VISIBLE) invalidate()
    }

    override fun onDraw(canvas: Canvas) {
        val w = width.toFloat()
        val h = height.toFloat()
        if (w <= 0f || h <= 0f) return
        if (builtFor != particleCount) build(particleCount)

        val now = SystemClock.uptimeMillis()
        var dt = (now - last) / 1000f
        if (dt > 0.05f) dt = 0.05f
        last = now
        val t = (now - t0) / 1000f

        val tg = TARGETS[mode]!!
        val k = min(1f, dt * 4f)
        for (i in 0 until 8) p[i] += (tg[i] - p[i]) * k
        val pal = PALETTES[colorIndex]
        val kc = min(1f, dt * 5f)
        for (i in 0 until 3) {
            cc[i] += (pal.c[i] - cc[i]) * kc
            ch[i] += (pal.hot[i] - ch[i]) * kc
        }
        val prov = levelProvider
        val lt = when {
            prov != null -> prov()
            externalLevel >= 0f -> externalLevel
            else -> levelFor(mode, t)
        }
        level += (lt - level) * min(1f, dt * 12f)
        val lvl = level.coerceIn(0f, 1f)

        angle += dt * p[0]
        ringA += dt * p[5]
        arcA += dt * (1.5f + 3f * p[7])

        val size = min(w, h)
        val unit = size / 400f
        val cx = w / 2f
        val cy = h / 2f
        val bright = p[2]
        val radius = size * 0.4f * p[4] * (1f + 0.06f * lvl)

        canvas.drawColor(Color.BLACK)

        val c0 = Color.argb((255 * 0.34f * bright).toInt().coerceIn(0, 255), ch[0].toInt(), ch[1].toInt(), ch[2].toInt())
        val c1 = Color.argb((255 * 0.10f * bright).toInt().coerceIn(0, 255), cc[0].toInt(), cc[1].toInt(), cc[2].toInt())
        val c2 = Color.argb(0, cc[0].toInt(), cc[1].toInt(), cc[2].toInt())
        glow.shader = RadialGradient(cx, cy, radius * 1.3f, intArrayOf(c0, c1, c2), floatArrayOf(0f, 0.45f, 1f), Shader.TileMode.CLAMP)
        canvas.drawRect(0f, 0f, w, h, glow)

        val ca = cos(angle)
        val sa = sin(angle)
        val tilt = 0.35f
        val ct = cos(tilt)
        val st = sin(tilt)
        val amp = p[1] * (0.3f + 1.6f * lvl)
        val stride = if (p[3] >= 0.99f) 1 else max(1, (1f / p[3]).roundToInt())

        for (i in 0 until n) {
            if (stride > 1 && i % stride != 0) continue
            var x: Float
            var y: Float
            var z: Float
            if (pk[i] == 0) {
                x = px[i]; y = py[i]; z = pz[i]
            } else {
                val g = RINGS[pring[i]]
                val th = pth[i] + ringA * g.dir * g.sp
                val lx = g.r * cos(th)
                val lz = g.r * sin(th)
                val y1 = -lz * g.sx
                val z1 = lz * g.cx
                x = lx * g.cz - y1 * g.sz
                y = lx * g.sz + y1 * g.cz
                z = z1
            }
            val wob = 1f + amp * sin(5f * y + 3f * t + 2f * x)
            x *= wob; y *= wob; z *= wob
            val x1 = x * ca + z * sa
            val z1b = -x * sa + z * ca
            val y2 = y * ct - z1b * st
            val z2 = y * st + z1b * ct
            val persp = 1f / (1f - z2 * 0.35f)
            val sx = cx + x1 * radius * persp
            val sy = cy + y2 * radius * persp
            val depth = (z2 + 1f) / 2f
            val alpha = min(1f, (0.2f + 0.8f * depth) * bright * pa[i])
            val s = (0.7f + 1.7f * depth * ps[i]) * unit * persp * 1.6f
            val mix = depth * depth * 0.65f
            val r = cc[0] + (ch[0] - cc[0]) * mix
            val gg = cc[1] + (ch[1] - cc[1]) * mix
            val b = cc[2] + (ch[2] - cc[2]) * mix
            dot.color = Color.argb((alpha * 255f).toInt(), r.toInt(), gg.toInt(), b.toInt())
            canvas.drawRect(sx - s / 2f, sy - s / 2f, sx + s / 2f, sy + s / 2f, dot)
        }

        if (p[6] > 0.02f) {
            stroke.strokeWidth = 2f * unit
            stroke.color = Color.argb((255 * 0.22f * p[6] * (0.4f + lvl)).toInt().coerceIn(0, 255), cc[0].toInt(), cc[1].toInt(), cc[2].toInt())
            canvas.drawCircle(cx, cy, radius * (1.1f + 0.1f * lvl), stroke)
        }
        if (p[7] > 0.02f) {
            stroke.strokeWidth = 2.5f * unit
            stroke.color = Color.argb((255 * 0.55f * p[7]).toInt().coerceIn(0, 255), ch[0].toInt(), ch[1].toInt(), ch[2].toInt())
            val rr = radius * 1.16f
            oval.set(cx - rr, cy - rr, cx + rr, cy + rr)
            val deg = (arcA * 180f / PI.toFloat())
            canvas.drawArc(oval, deg, 74f, false, stroke)
            canvas.drawArc(oval, deg + 180f, 74f, false, stroke)
        }

        if (mode == Mode.AMBIENT) postInvalidateDelayed(120) else postInvalidateOnAnimation()
    }
}
