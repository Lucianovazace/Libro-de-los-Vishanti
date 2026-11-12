using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Globalization;
using System.IO;
using System.Management;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Win32;

namespace MiaPanel
{
    enum Health { Off, Starting, Ok, Busy, Error }

    class Svc
    {
        public string Id, Title;
        public int Port;
        public Process Proc;
        public Health State = Health.Off;
        public DateTime StartedAt = DateTime.MinValue;
        public readonly List<string> Lines = new List<string>();
        public int Version;
        public StreamWriter Log;
        public DateTime LastLine = DateTime.MinValue;
        public string Detail = "";
        public Label Dot, Status;
        public Button Btn;
    }

    // ---------- Orbe de particulas ----------
    class OrbControl : Control
    {
        struct P { public float X, Y, Z; }
        readonly List<P> pts = new List<P>();
        public Color Target = Color.FromArgb(120, 120, 120);
        public double EnergyTarget = 0;
        Color cur = Color.FromArgb(120, 120, 120);
        double energy, angle, t;
        Brush[] brushes = new Brush[32];
        Color brushColor = Color.Empty;
        readonly System.Windows.Forms.Timer timer = new System.Windows.Forms.Timer();

        public OrbControl()
        {
            SetStyle(ControlStyles.OptimizedDoubleBuffer | ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint, true);
            BackColor = Color.FromArgb(8, 8, 12);
            int n = 430;
            double golden = Math.PI * (3 - Math.Sqrt(5));
            for (int i = 0; i < n; i++)
            {
                double y = 1 - (i / (double)(n - 1)) * 2;
                double r = Math.Sqrt(Math.Max(0, 1 - y * y));
                double th = golden * i;
                double k = (i % 5 == 0) ? 0.72 : 1.0;
                pts.Add(new P { X = (float)(Math.Cos(th) * r * k), Y = (float)(y * k), Z = (float)(Math.Sin(th) * r * k) });
            }
            for (int ring = 0; ring < 3; ring++)
            {
                double tilt = (ring - 1) * 0.55;
                for (int i = 0; i < 44; i++)
                {
                    double a = i / 44.0 * Math.PI * 2;
                    double x = Math.Cos(a) * 1.08, z = Math.Sin(a) * 1.08;
                    double y = z * Math.Sin(tilt);
                    z = z * Math.Cos(tilt);
                    pts.Add(new P { X = (float)x, Y = (float)y, Z = (float)z });
                }
            }
            timer.Interval = 33;
            timer.Tick += delegate
            {
                t += 0.033;
                energy += (EnergyTarget - energy) * 0.08;
                angle += 0.010 + 0.022 * energy;
                cur = Color.FromArgb(
                    cur.R + (Target.R - cur.R) / 8,
                    cur.G + (Target.G - cur.G) / 8,
                    cur.B + (Target.B - cur.B) / 8);
                Invalidate();
            };
            timer.Start();
        }

        void EnsureBrushes()
        {
            if (brushColor == cur) return;
            for (int i = 0; i < brushes.Length; i++)
            {
                if (brushes[i] != null) brushes[i].Dispose();
                int a = 20 + (int)(235.0 * i / (brushes.Length - 1));
                brushes[i] = new SolidBrush(Color.FromArgb(a, cur));
            }
            brushColor = cur;
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.Clear(BackColor);
            EnsureBrushes();
            float cx = Width / 2f, cy = Height / 2f;
            float R = Math.Min(Width, Height) * 0.34f * (1f + 0.025f * (float)Math.Sin(t * 1.5) + 0.05f * (float)energy * (float)Math.Sin(t * 8));
            using (GraphicsPath path = new GraphicsPath())
            {
                path.AddEllipse(cx - R * 1.6f, cy - R * 1.6f, R * 3.2f, R * 3.2f);
                using (PathGradientBrush pb = new PathGradientBrush(path))
                {
                    pb.CenterColor = Color.FromArgb(Math.Min(255, 55 + (int)(70 * energy)), cur);
                    pb.SurroundColors = new Color[] { Color.FromArgb(0, cur) };
                    g.FillPath(pb, path);
                }
            }
            float k = Width / 320f;
            float ca = (float)Math.Cos(angle), sa = (float)Math.Sin(angle);
            float ct = (float)Math.Cos(0.38), st = (float)Math.Sin(0.38);
            for (int i = 0; i < pts.Count; i++)
            {
                P p = pts[i];
                float wob = 1f + 0.05f * (float)energy * (float)Math.Sin(t * 7 + i * 0.37);
                float x = p.X * wob, y = p.Y * wob, z = p.Z * wob;
                float x1 = x * ca + z * sa;
                float z1 = -x * sa + z * ca;
                float y1 = y * ct - z1 * st;
                float z2 = y * st + z1 * ct;
                float d = (z2 + 1.1f) / 2.2f;
                if (d < 0) d = 0; if (d > 1) d = 1;
                float sc = 0.78f + 0.22f * d;
                float sx = cx + x1 * R * sc, sy = cy + y1 * R * sc;
                float tw = 0.75f + 0.25f * (float)Math.Sin(t * 2.2 + i);
                int bi = (int)(d * tw * (brushes.Length - 1));
                if (bi < 0) bi = 0; if (bi >= brushes.Length) bi = brushes.Length - 1;
                float size = (1.3f + 2.4f * d) * k;
                g.FillEllipse(brushes[bi], sx - size / 2, sy - size / 2, size, size);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) { timer.Stop(); timer.Dispose(); foreach (Brush b in brushes) if (b != null) b.Dispose(); }
            base.Dispose(disposing);
        }
    }

    // ---------- Ventana principal ----------
    class MainForm : Form
    {
        readonly string root = AppDomain.CurrentDomain.BaseDirectory.TrimEnd('\\');
        readonly string logs;
        readonly Encoding oem;
        readonly List<Svc> svcs = new List<Svc>();
        readonly OrbControl orb = new OrbControl();
        readonly Label lblMain = new Label();
        readonly Label lblAddr = new Label();
        readonly CheckBox chkStartup = new CheckBox();
        readonly ComboBox cmbLog = new ComboBox();
        readonly TextBox txtLog = new TextBox();
        readonly NotifyIcon tray = new NotifyIcon();
        readonly System.Windows.Forms.Timer logTimer = new System.Windows.Forms.Timer();
        bool exiting;
        int shownVersion = -1;
        string shownId = "";
        readonly bool startMinimized;

        const string RunKey = @"Software\Microsoft\Windows\CurrentVersion\Run";
        const string RunName = "MIA Panel";

        public MainForm(bool minimized)
        {
            startMinimized = minimized;
            logs = Path.Combine(root, "logs");
            try { oem = Encoding.GetEncoding(CultureInfo.CurrentCulture.TextInfo.OEMCodePage); } catch { oem = Encoding.UTF8; }

            svcs.Add(new Svc { Id = "modelo", Title = "Modelo (cerebro de lenguaje)", Port = 8080 });
            svcs.Add(new Svc { Id = "voz", Title = "Voz (Piper)", Port = 5002 });
            svcs.Add(new Svc { Id = "cerebro", Title = "Cerebro (memoria y reglas)", Port = 5003 });

            AutoScaleMode = AutoScaleMode.None;
            float dpi;
            using (Graphics g0 = Graphics.FromHwnd(IntPtr.Zero)) dpi = g0.DpiX / 96f;
            Rectangle wa = Screen.PrimaryScreen.WorkingArea;
            sc = Math.Max(dpi, wa.Height / 1000f);
            sc = Math.Min(sc, wa.Height * 0.92f / 700f);
            if (sc < 1f) sc = 1f;

            Text = "MIA";
            ClientSize = new Size(S(420), S(700));
            FormBorderStyle = FormBorderStyle.FixedSingle;
            MaximizeBox = false;
            StartPosition = FormStartPosition.CenterScreen;
            BackColor = Color.FromArgb(8, 8, 12);
            ForeColor = Color.FromArgb(225, 225, 230);
            Font = F("Segoe UI", 9.5f, FontStyle.Regular);
            Icon = MakeIcon();

            orb.SetBounds(S(50), S(6), S(320), S(300));
            Controls.Add(orb);

            lblMain.SetBounds(S(10), S(306), S(400), S(30));
            lblMain.TextAlign = ContentAlignment.MiddleCenter;
            lblMain.Font = F("Segoe UI Semibold", 13f, FontStyle.Regular);
            lblMain.Text = "Iniciando...";
            Controls.Add(lblMain);

            int y = 350;
            foreach (Svc s in svcs)
            {
                s.Dot = new Label { Text = "\u25CF", Font = F("Segoe UI", 16f, FontStyle.Regular), ForeColor = Color.Gray, AutoSize = false };
                s.Dot.SetBounds(S(18), S(y - 4), S(30), S(36));
                Label name = new Label { Text = s.Title, AutoSize = false };
                name.SetBounds(S(52), S(y), S(240), S(20));
                s.Status = new Label { Text = "Apagado", AutoSize = false, ForeColor = Color.FromArgb(150, 150, 160), Font = F("Segoe UI", 8.5f, FontStyle.Regular) };
                s.Status.SetBounds(S(52), S(y + 19), S(240), S(18));
                s.Btn = MakeButton("Reiniciar", 300, y + 2, 100, 30);
                Svc captured = s;
                s.Btn.Click += delegate { Task.Run(() => Restart(captured)); };
                Controls.Add(s.Dot); Controls.Add(name); Controls.Add(s.Status); Controls.Add(s.Btn);
                y += 50;
            }

            Button bAll = MakeButton("Iniciar todo", 18, y + 6, 190, 34);
            bAll.Click += delegate { Task.Run(() => StartAll()); };
            Button bStop = MakeButton("Detener todo", 212, y + 6, 190, 34);
            bStop.Click += delegate { Task.Run(() => StopAll()); };
            Controls.Add(bAll); Controls.Add(bStop);
            y += 52;

            chkStartup.Text = "Abrir MIA al prender la PC";
            chkStartup.AutoSize = true;
            chkStartup.Location = new Point(S(18), S(y));
            chkStartup.Checked = IsStartupOn();
            chkStartup.CheckedChanged += delegate { SetStartup(chkStartup.Checked); };
            Controls.Add(chkStartup);
            y += 28;

            lblAddr.SetBounds(S(18), S(y), S(390), S(20));
            lblAddr.ForeColor = Color.FromArgb(150, 150, 160);
            lblAddr.Font = F("Segoe UI", 8.5f, FontStyle.Regular);
            lblAddr.Text = "Direccion para el celu y el reloj: http://" + LocalIp() + ":8080";
            Controls.Add(lblAddr);
            y += 26;

            cmbLog.DropDownStyle = ComboBoxStyle.DropDownList;
            cmbLog.SetBounds(S(18), S(y), S(200), S(24));
            cmbLog.BackColor = Color.FromArgb(24, 24, 30);
            cmbLog.ForeColor = Color.FromArgb(225, 225, 230);
            cmbLog.FlatStyle = FlatStyle.Flat;
            foreach (Svc s in svcs) cmbLog.Items.Add(s.Id);
            cmbLog.SelectedIndex = 2;
            Controls.Add(cmbLog);
            y += 30;

            txtLog.Multiline = true;
            txtLog.ReadOnly = true;
            txtLog.ScrollBars = ScrollBars.Vertical;
            txtLog.Font = F("Consolas", 8.5f, FontStyle.Regular);
            txtLog.BackColor = Color.FromArgb(16, 16, 22);
            txtLog.ForeColor = Color.FromArgb(200, 200, 210);
            txtLog.BorderStyle = BorderStyle.FixedSingle;
            txtLog.SetBounds(S(18), S(y), S(384), S(700 - y - 14));
            Controls.Add(txtLog);

            // Bandeja del sistema
            tray.Icon = Icon;
            tray.Text = "MIA";
            ContextMenuStrip menu = new ContextMenuStrip();
            menu.Items.Add("Abrir MIA", null, delegate { ShowPanel(); });
            menu.Items.Add("Iniciar todo", null, delegate { Task.Run(() => StartAll()); });
            menu.Items.Add("Detener todo", null, delegate { Task.Run(() => StopAll()); });
            menu.Items.Add("-");
            menu.Items.Add("Salir (detiene todo)", null, delegate { ExitAll(); });
            tray.ContextMenuStrip = menu;
            tray.DoubleClick += delegate { ShowPanel(); };
            tray.Visible = true;

            logTimer.Interval = 800;
            logTimer.Tick += delegate { RefreshLog(); };
            logTimer.Start();

            FormClosing += delegate (object sender, FormClosingEventArgs e)
            {
                if (!exiting && e.CloseReason == CloseReason.UserClosing)
                {
                    e.Cancel = true;
                    Hide();
                    tray.ShowBalloonTip(2000, "MIA", "Sigo funcionando en segundo plano. Para cerrar todo: clic derecho en el icono, Salir.", ToolTipIcon.Info);
                }
            };

            Thread loop = new Thread(HealthLoop);
            loop.IsBackground = true;
            loop.Start();
        }

        protected override void SetVisibleCore(bool value)
        {
            if (startMinimized && !IsHandleCreated) { CreateHandle(); value = false; }
            base.SetVisibleCore(value);
        }

        void ShowPanel()
        {
            Show();
            WindowState = FormWindowState.Normal;
            Activate();
        }

        float sc = 1f;
        int S(double v) { return (int)Math.Round(v * sc); }
        Font F(string name, float pt, FontStyle style) { return new Font(name, pt * 96f / 72f * sc, style, GraphicsUnit.Pixel); }

        Button MakeButton(string text, int x, int y, int w, int h)
        {
            Button b = new Button();
            b.Text = text;
            b.SetBounds(S(x), S(y), S(w), S(h));
            b.FlatStyle = FlatStyle.Flat;
            b.FlatAppearance.BorderColor = Color.FromArgb(90, 80, 50);
            b.BackColor = Color.FromArgb(24, 24, 30);
            b.ForeColor = Color.FromArgb(240, 200, 110);
            b.Cursor = Cursors.Hand;
            return b;
        }

        static Icon MakeIcon()
        {
            using (Bitmap bmp = new Bitmap(32, 32))
            {
                using (Graphics g = Graphics.FromImage(bmp))
                {
                    g.SmoothingMode = SmoothingMode.AntiAlias;
                    g.Clear(Color.Transparent);
                    using (GraphicsPath p = new GraphicsPath())
                    {
                        p.AddEllipse(3, 3, 26, 26);
                        using (PathGradientBrush pb = new PathGradientBrush(p))
                        {
                            pb.CenterColor = Color.FromArgb(255, 245, 200);
                            pb.SurroundColors = new Color[] { Color.FromArgb(255, 190, 70) };
                            g.FillPath(pb, p);
                        }
                    }
                }
                return Icon.FromHandle(bmp.GetHicon());
            }
        }

        static string LocalIp()
        {
            try
            {
                string fallback = null;
                foreach (NetworkInterface ni in NetworkInterface.GetAllNetworkInterfaces())
                {
                    if (ni.OperationalStatus != OperationalStatus.Up) continue;
                    if (ni.NetworkInterfaceType == NetworkInterfaceType.Loopback) continue;
                    foreach (UnicastIPAddressInformation ua in ni.GetIPProperties().UnicastAddresses)
                    {
                        if (ua.Address.AddressFamily != AddressFamily.InterNetwork) continue;
                        string ip = ua.Address.ToString();
                        if (ip.StartsWith("192.168.")) return ip;
                        if (fallback == null && !ip.StartsWith("169.254.")) fallback = ip;
                    }
                }
                return fallback ?? "127.0.0.1";
            }
            catch { return "127.0.0.1"; }
        }

        // ---------- Inicio con Windows ----------
        bool IsStartupOn()
        {
            try { using (RegistryKey k = Registry.CurrentUser.OpenSubKey(RunKey)) return k != null && k.GetValue(RunName) != null; }
            catch { return false; }
        }

        void SetStartup(bool on)
        {
            try
            {
                using (RegistryKey k = Registry.CurrentUser.OpenSubKey(RunKey, true))
                {
                    if (k == null) return;
                    if (on) k.SetValue(RunName, "\"" + Application.ExecutablePath + "\" --min");
                    else k.DeleteValue(RunName, false);
                }
            }
            catch { }
        }

        // ---------- Archivos ----------
        string Find(string pattern)
        {
            try
            {
                string[] top = Directory.GetFiles(root, pattern, SearchOption.TopDirectoryOnly);
                if (top.Length > 0) return top[0];
                string[] all = Directory.GetFiles(root, pattern, SearchOption.AllDirectories);
                return all.Length > 0 ? all[0] : null;
            }
            catch { return null; }
        }

        void Add(Svc s, string line)
        {
            lock (s.Lines)
            {
                s.Lines.Add(line);
                if (s.Lines.Count > 400) s.Lines.RemoveRange(0, s.Lines.Count - 400);
                s.Version++;
                s.LastLine = DateTime.Now;
                try { if (s.Log != null) { s.Log.WriteLine(line); s.Log.Flush(); } } catch { }
            }
        }

        // ---------- Iniciar / detener ----------
        void StartSvc(Svc s)
        {
            try
            {
                if (s.Proc != null && !s.Proc.HasExited) return;
            }
            catch { }
            string file, args, wd = root;
            if (s.Id == "modelo")
            {
                string exe = Find("llama-server.exe");
                string gguf = Find("*.gguf");
                if (exe == null || gguf == null)
                {
                    Add(s, "No encuentro llama-server.exe o el modelo .gguf dentro de " + root);
                    s.State = Health.Error; s.Detail = "faltan archivos";
                    return;
                }
                file = exe;
                args = "-m \"" + gguf + "\" --host 0.0.0.0 --port 8080 -ngl 99 -c 4096";
                wd = Path.GetDirectoryName(exe);
            }
            else
            {
                string script = Path.Combine(root, s.Id == "voz" ? "voz-servidor.ps1" : "cerebro.ps1");
                if (!File.Exists(script))
                {
                    Add(s, "No encuentro " + script);
                    s.State = Health.Error; s.Detail = "falta el script";
                    return;
                }
                file = Path.Combine(Environment.SystemDirectory, @"WindowsPowerShell\v1.0\powershell.exe");
                args = "-NoProfile -ExecutionPolicy Bypass -File \"" + script + "\"";
            }
            try
            {
                Directory.CreateDirectory(logs);
                lock (s.Lines)
                {
                    if (s.Log != null) { try { s.Log.Dispose(); } catch { } }
                    s.Log = new StreamWriter(new FileStream(Path.Combine(logs, s.Id + ".log"), FileMode.Create, FileAccess.Write, FileShare.ReadWrite), Encoding.UTF8);
                    s.Lines.Clear();
                }
                ProcessStartInfo psi = new ProcessStartInfo(file, args);
                psi.WorkingDirectory = wd;
                psi.UseShellExecute = false;
                psi.CreateNoWindow = true;
                psi.WindowStyle = ProcessWindowStyle.Hidden;
                psi.RedirectStandardOutput = true;
                psi.RedirectStandardError = true;
                psi.RedirectStandardInput = true;
                psi.StandardOutputEncoding = oem;
                psi.StandardErrorEncoding = oem;
                Process p = new Process();
                p.StartInfo = psi;
                p.EnableRaisingEvents = true;
                p.OutputDataReceived += delegate (object o, DataReceivedEventArgs e) { if (e.Data != null) Add(s, e.Data); };
                p.ErrorDataReceived += delegate (object o, DataReceivedEventArgs e) { if (e.Data != null) Add(s, e.Data); };
                p.Exited += delegate
                {
                    int code = -1;
                    try { code = p.ExitCode; } catch { }
                    Add(s, "[el proceso termino, codigo " + code + "]");
                };
                p.Start();
                p.BeginOutputReadLine();
                p.BeginErrorReadLine();
                try { p.StandardInput.Close(); } catch { }
                s.Proc = p;
                s.StartedAt = DateTime.Now;
                s.State = Health.Starting;
                s.Detail = "";
                Add(s, "[iniciado " + DateTime.Now.ToString("HH:mm:ss") + "]");
            }
            catch (Exception ex)
            {
                Add(s, "No pude iniciar: " + ex.Message);
                s.State = Health.Error;
                s.Detail = "no pudo iniciar";
            }
        }

        static void KillTree(int pid)
        {
            try
            {
                ProcessStartInfo psi = new ProcessStartInfo("taskkill", "/PID " + pid + " /T /F");
                psi.CreateNoWindow = true;
                psi.UseShellExecute = false;
                psi.WindowStyle = ProcessWindowStyle.Hidden;
                Process k = Process.Start(psi);
                if (k != null) k.WaitForExit(4000);
            }
            catch { }
        }

        void StopSvc(Svc s)
        {
            try { if (s.Proc != null && !s.Proc.HasExited) KillTree(s.Proc.Id); } catch { }
            s.Proc = null;
            try
            {
                if (s.Id == "modelo")
                {
                    foreach (Process p in Process.GetProcessesByName("llama-server")) { try { p.Kill(); } catch { } }
                }
                else
                {
                    string script = s.Id == "voz" ? "voz-servidor.ps1" : "cerebro.ps1";
                    using (ManagementObjectSearcher q = new ManagementObjectSearcher("SELECT ProcessId, CommandLine FROM Win32_Process WHERE Name='powershell.exe'"))
                    {
                        foreach (ManagementObject mo in q.Get())
                        {
                            object cl = mo["CommandLine"];
                            if (cl != null && cl.ToString().IndexOf(script, StringComparison.OrdinalIgnoreCase) >= 0)
                                KillTree(Convert.ToInt32(mo["ProcessId"]));
                        }
                    }
                }
            }
            catch { }
            s.State = Health.Off;
            s.Detail = "";
        }

        void Restart(Svc s)
        {
            StopSvc(s);
            Thread.Sleep(900);
            StartSvc(s);
        }

        void StartAll()
        {
            foreach (Svc s in svcs)
            {
                if (s.State != Health.Ok && s.State != Health.Busy) StartSvc(s);
                Thread.Sleep(600);
            }
        }

        void StopAll()
        {
            for (int i = svcs.Count - 1; i >= 0; i--) StopSvc(svcs[i]);
        }

        void ExitAll()
        {
            exiting = true;
            tray.Visible = false;
            Task.Run(delegate
            {
                StopAll();
                BeginInvoke(new Action(delegate { Application.Exit(); }));
            });
        }

        // ---------- Estado ----------
        Health Probe(Svc s)
        {
            try
            {
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create("http://127.0.0.1:" + s.Port + "/health");
                req.Timeout = 1500;
                req.ReadWriteTimeout = 1500;
                req.Proxy = null;
                using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse()) { return Health.Ok; }
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.ProtocolError)
                {
                    HttpWebResponse r = ex.Response as HttpWebResponse;
                    if (r != null && (int)r.StatusCode == 503) return Health.Starting;
                    return Health.Error;
                }
                if (ex.Status == WebExceptionStatus.Timeout) return Health.Busy;
                return Health.Off;
            }
            catch { return Health.Off; }
        }

        void Tick(Svc s)
        {
            Health raw = Probe(s);
            bool owned = false, exited = false;
            try { if (s.Proc != null) { exited = s.Proc.HasExited; owned = !exited; } } catch { }
            Health nh;
            switch (raw)
            {
                case Health.Ok: nh = Health.Ok; break;
                case Health.Busy: nh = (s.State == Health.Ok || s.State == Health.Busy) ? Health.Busy : Health.Starting; break;
                case Health.Starting: nh = Health.Starting; break;
                case Health.Error: nh = Health.Error; break;
                default:
                    if (owned && (DateTime.Now - s.StartedAt).TotalSeconds < 150) nh = Health.Starting;
                    else if (exited) nh = Health.Error;
                    else nh = Health.Off;
                    break;
            }
            if (nh == Health.Error && exited && s.Detail == "") s.Detail = "se cerro";
            if (nh != Health.Error && raw != Health.Off) s.Detail = "";
            s.State = nh;
        }

        void HealthLoop()
        {
            bool first = true;
            while (true)
            {
                try
                {
                    List<Task> tasks = new List<Task>();
                    foreach (Svc s in svcs) { Svc c = s; tasks.Add(Task.Run(() => Tick(c))); }
                    Task.WaitAll(tasks.ToArray());
                    if (first)
                    {
                        first = false;
                        foreach (Svc s in svcs)
                        {
                            if (s.State == Health.Off) { StartSvc(s); Thread.Sleep(700); }
                        }
                    }
                    if (IsHandleCreated && !IsDisposed) BeginInvoke(new Action(RefreshUi));
                }
                catch { }
                Thread.Sleep(2000);
            }
        }

        static string StateText(Svc s)
        {
            switch (s.State)
            {
                case Health.Ok: return "Activo";
                case Health.Busy: return "Ocupado (pensando)";
                case Health.Starting: return s.Id == "modelo" ? "Iniciando (cargar el modelo tarda)..." : "Iniciando...";
                case Health.Error: return "Error: " + (s.Detail == "" ? "mirá el registro" : s.Detail);
                default: return "Apagado";
            }
        }

        static Color StateColor(Health h)
        {
            switch (h)
            {
                case Health.Ok: return Color.FromArgb(110, 220, 130);
                case Health.Busy: return Color.FromArgb(255, 215, 110);
                case Health.Starting: return Color.FromArgb(255, 170, 60);
                case Health.Error: return Color.FromArgb(240, 90, 80);
                default: return Color.FromArgb(110, 110, 120);
            }
        }

        void RefreshUi()
        {
            int ok = 0, err = 0, starting = 0;
            foreach (Svc s in svcs)
            {
                s.Dot.ForeColor = StateColor(s.State);
                s.Status.Text = StateText(s);
                if (s.State == Health.Ok || s.State == Health.Busy) ok++;
                else if (s.State == Health.Error) err++;
                else if (s.State == Health.Starting) starting++;
            }
            string main;
            Color col;
            if (ok == svcs.Count) { main = "MIA lista"; col = Color.FromArgb(255, 200, 90); }
            else if (err > 0) { main = "Hay algo con error"; col = Color.FromArgb(240, 90, 80); }
            else if (starting > 0) { main = "Iniciando..."; col = Color.FromArgb(255, 160, 60); }
            else if (ok > 0) { main = "MIA a medias"; col = Color.FromArgb(255, 160, 60); }
            else { main = "MIA apagada"; col = Color.FromArgb(120, 120, 120); }
            lblMain.Text = main;
            lblMain.ForeColor = col;
            orb.Target = col;
            tray.Text = "MIA - " + main;

            // El orbe se agita cuando el cerebro o la voz estan trabajando
            bool active = false;
            foreach (Svc s in svcs)
                if (s.Id != "modelo" && (DateTime.Now - s.LastLine).TotalSeconds < 3 && s.Version > 1) active = true;
            foreach (Svc s in svcs) if (s.State == Health.Busy) active = true;
            orb.EnergyTarget = active ? 1.0 : (ok == svcs.Count ? 0.12 : 0.0);
        }

        void RefreshLog()
        {
            if (!Visible) return;
            Svc s = svcs[Math.Max(0, cmbLog.SelectedIndex)];
            if (s.Id == shownId && s.Version == shownVersion) return;
            string[] copy;
            lock (s.Lines)
            {
                int from = Math.Max(0, s.Lines.Count - 120);
                copy = s.Lines.GetRange(from, s.Lines.Count - from).ToArray();
                shownVersion = s.Version;
            }
            shownId = s.Id;
            txtLog.Text = string.Join(Environment.NewLine, copy);
            txtLog.SelectionStart = txtLog.Text.Length;
            txtLog.ScrollToCaret();
        }
    }

    static class Program
    {
        [System.Runtime.InteropServices.DllImport("user32.dll")]
        static extern bool SetProcessDPIAware();

        [STAThread]
        static void Main(string[] args)
        {
            try { SetProcessDPIAware(); } catch { }
            bool createdNew;
            using (Mutex m = new Mutex(true, "MiaPanelSingleInstance", out createdNew))
            {
                if (!createdNew) return;
                bool min = false;
                foreach (string a in args) if (a == "--min") min = true;
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new MainForm(min));
            }
        }
    }
}
