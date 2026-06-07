import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import {
  glucoseToday,
  glucoseWeekly,
  glucoseMonthly,
  tirData,
  patients,
  events,
  aiInsights,
  appointments,
  adminStats,
  userActivity,
} from "@/lib/mock-data";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Calendar,
  Droplet,
  Heart,
  Pill,
  Sparkles,
  TrendingUp,
  Users,
  Stethoscope,
  ShieldCheck,
  Upload,
  Building2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

type StatColor = "primary" | "success" | "warning" | "destructive";

type StatProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  trend?: string;
  color?: StatColor;
};

const statColorClasses: Record<StatColor, string> = {
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  destructive: "bg-destructive/15 text-destructive",
};

function Stat({ icon: Icon, label, value, sub, trend, color = "primary" }: StatProps) {
  return (
    <Card className="p-5 bg-gradient-card hover:shadow-elegant transition">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${statColorClasses[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        {trend ? (
          <Badge variant="secondary" className="text-xs">
            <ArrowUpRight className="mr-0.5 h-3 w-3" />
            {trend}
          </Badge>
        ) : null}
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
      {sub && <div className="text-xs text-muted-foreground mt-2">{sub}</div>}
    </Card>
  );
}

const chartTheme = {
  stroke: "oklch(0.58 0.17 230)",
  fill: "oklch(0.72 0.16 210)",
  grid: "oklch(0.92 0.012 230 / 0.4)",
};

function SegmentDot({ color }: { color: string }) {
  return (
    <svg className="h-2.5 w-2.5 shrink-0" viewBox="0 0 10 10" aria-hidden="true">
      <circle cx="5" cy="5" r="5" fill={color} />
    </svg>
  );
}

function PatientDashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Good day, {user?.name.split(" ")[0]} 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's your glucose overview for today.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-5 bg-gradient-primary text-primary-foreground shadow-elegant col-span-2 lg:col-span-1">
          <Droplet className="mb-2 h-5 w-5" />
          <div className="text-3xl font-bold">
            142 <span className="text-base font-normal opacity-80">mg/dL</span>
          </div>
          <div className="mt-1 text-xs opacity-80">Current glucose</div>
          <Badge className="mt-3 border-0 bg-white/20 text-primary-foreground hover:bg-white/30">
            In range
          </Badge>
        </Card>
        <Stat
          icon={TrendingUp}
          label="Avg glucose (7d)"
          value="124"
          sub="mg/dL"
          trend="-4%"
          color="success"
        />
        <Stat
          icon={Activity}
          label="Time in range"
          value="72%"
          sub="↑ 4% vs last week"
          color="success"
        />
        <Stat icon={ArrowUpRight} label="Time high" value="18%" color="warning" />
        <Stat icon={AlertTriangle} label="Time low" value="6%" color="destructive" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Today's Glucose</h3>
              <p className="text-xs text-muted-foreground">24-hour continuous reading</p>
            </div>
            <Badge variant="outline">Live</Badge>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={glucoseToday}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartTheme.stroke} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={chartTheme.stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="time" stroke="currentColor" fontSize={11} interval={3} />
              <YAxis stroke="currentColor" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartTheme.stroke}
                strokeWidth={2}
                fill="url(#g)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-1">Time in Range</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 7 days</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={tirData}
                dataKey="value"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {tirData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-3">
            {tirData.map((t) => (
              <div key={t.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <SegmentDot color={t.color} />
                  <span>{t.name}</span>
                </div>
                <span className="font-medium">{t.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Weekly Trends</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={glucoseWeekly}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="day" stroke="currentColor" fontSize={11} />
              <YAxis stroke="currentColor" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="avg" fill={chartTheme.stroke} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Monthly View</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={glucoseMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="day" stroke="currentColor" fontSize={11} />
              <YAxis stroke="currentColor" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                }}
              />
              <Line
                type="monotone"
                dataKey="avg"
                stroke={chartTheme.stroke}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Events</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/app/events">View all</Link>
            </Button>
          </div>
          <div className="space-y-2">
            {events.slice(0, 4).map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary/50"
              >
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  {e.type === "meal" ? (
                    <Heart className="h-4 w-4 text-primary" />
                  ) : e.type === "medication" ? (
                    <Pill className="h-4 w-4 text-success" />
                  ) : e.type === "exercise" ? (
                    <Activity className="h-4 w-4 text-warning" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{e.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {e.time} • {e.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Pill className="h-4 w-4 text-success" /> Medications
            </h3>
            <Badge variant="outline">3 today</Badge>
          </div>
          <div className="space-y-3">
            {[
              { n: "Metformin 500mg", t: "08:30 AM", taken: true },
              { n: "Insulin Lispro 6u", t: "12:30 PM", taken: true },
              { n: "Metformin 500mg", t: "08:30 PM", taken: false },
            ].map((m) => (
              <div key={m.n + m.t} className="flex items-center gap-3">
                <div className={`w-2 h-10 rounded-full ${m.taken ? "bg-success" : "bg-muted"}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{m.n}</div>
                  <div className="text-xs text-muted-foreground">{m.t}</div>
                </div>
                {m.taken ? (
                  <Badge variant="secondary" className="text-success">
                    Taken
                  </Badge>
                ) : (
                  <Button size="sm" variant="outline">
                    Log
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2 font-semibold">
            <Sparkles className="h-4 w-4 text-primary" /> AI Recommendations
          </h3>
          <div className="space-y-3">
            {aiInsights.map((i) => (
              <div key={i.title} className="p-3 rounded-lg border border-border bg-secondary/30">
                <div className="text-sm font-medium">{i.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{i.desc}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function DoctorDashboard() {
  const { user } = useAuth();
  const critical = patients.filter((p) => p.risk === "critical");
  const attention = patients.filter((p) => p.risk === "attention");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Dr. {user?.name.split(" ").pop()} — Clinical Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Today's priorities and alerts across your patient panel.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          icon={Users}
          label="Assigned patients"
          value={patients.length}
          sub="+2 this week"
          color="primary"
        />
        <Stat
          icon={AlertTriangle}
          label="High-risk patients"
          value={critical.length + attention.length}
          color="warning"
        />
        <Stat icon={Bell} label="Critical alerts (24h)" value="7" color="destructive" />
        <Stat icon={Calendar} label="Upcoming visits" value={appointments.length} color="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-4 w-4 text-destructive" /> Priority Queue
              </h3>
              <p className="text-xs text-muted-foreground">
                Patients requiring immediate attention
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/app/queue">Full queue</Link>
            </Button>
          </div>
          <div className="space-y-2">
            {[...critical, ...attention].slice(0, 5).map((p) => (
              <Link
                key={p.id}
                to="/app/patients/$id"
                params={{ id: p.id }}
                className="flex items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-secondary/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.type} • Avg {p.avg} mg/dL • TIR {p.tir}%
                  </div>
                </div>
                <Badge
                  className={
                    p.risk === "critical"
                      ? "bg-destructive/15 text-destructive hover:bg-destructive/15"
                      : "bg-warning/15 text-warning hover:bg-warning/15"
                  }
                >
                  {p.risk}
                </Badge>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2 font-semibold">
            <Calendar className="h-4 w-4 text-primary" /> Upcoming Appointments
          </h3>
          <div className="space-y-3">
            {appointments.map((a) => (
              <div key={a.id} className="p-3 rounded-lg border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-sm">{a.patient}</div>
                    <div className="text-xs text-muted-foreground">{a.date}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {a.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Risk Classification (Last 30 days)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={[
              { week: "W1", stable: 28, attention: 8, critical: 2 },
              { week: "W2", stable: 30, attention: 7, critical: 3 },
              { week: "W3", stable: 27, attention: 10, critical: 4 },
              { week: "W4", stable: 31, attention: 6, critical: 2 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
            <XAxis dataKey="week" stroke="currentColor" fontSize={11} />
            <YAxis stroke="currentColor" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
              }}
            />
            <Legend />
            <Bar dataKey="stable" stackId="a" fill="oklch(0.65 0.16 155)" />
            <Bar dataKey="attention" stackId="a" fill="oklch(0.78 0.16 75)" />
            <Bar dataKey="critical" stackId="a" fill="oklch(0.60 0.22 25)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Platform Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          System-wide analytics, users, and activity.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          icon={Users}
          label="Total users"
          value={adminStats.totalUsers.toLocaleString()}
          trend="+12%"
          color="primary"
        />
        <Stat
          icon={Heart}
          label="Patients"
          value={adminStats.totalPatients.toLocaleString()}
          color="success"
        />
        <Stat icon={Stethoscope} label="Doctors" value={adminStats.totalDoctors} color="primary" />
        <Stat
          icon={Upload}
          label="Daily uploads"
          value={adminStats.dailyUploads.toLocaleString()}
          trend="+8%"
          color="warning"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">User Growth & Uploads</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={userActivity}>
              <defs>
                <linearGradient id="u1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartTheme.stroke} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={chartTheme.stroke} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="u2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.16 155)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.65 0.16 155)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="month" stroke="currentColor" fontSize={11} />
              <YAxis stroke="currentColor" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="users"
                stroke={chartTheme.stroke}
                fill="url(#u1)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="uploads"
                stroke="oklch(0.65 0.16 155)"
                fill="url(#u2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Platform Health</h3>
          <div className="space-y-4">
            {[
              { l: "Active users now", v: adminStats.activeNow, max: 2000, c: "bg-success" },
              { l: "API uptime", v: 99.98, max: 100, c: "bg-primary", suffix: "%" },
              { l: "Avg response", v: 142, max: 500, c: "bg-warning", suffix: "ms" },
              { l: "Storage used", v: 68, max: 100, c: "bg-accent-foreground", suffix: "%" },
            ].map((m) => (
              <div key={m.l}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-muted-foreground">{m.l}</span>
                  <span className="font-medium">
                    {m.v}
                    {m.suffix ?? ""}
                  </span>
                </div>
                <Progress value={(m.v / m.max) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-primary" /> Recent Admin Actions
          </h3>
          <div className="space-y-2 text-sm">
            {[
              { u: "admin@glucocare.io", a: "Role changed: jane@x.com → doctor", t: "2 min ago" },
              { u: "admin@glucocare.io", a: "Created clinic: Riverside Endocrine", t: "1 hr ago" },
              { u: "admin@glucocare.io", a: "Suspended user: spammer@x.com", t: "3 hr ago" },
              { u: "admin@glucocare.io", a: "Updated email settings", t: "Yesterday" },
            ].map((l, i) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <div className="font-medium">{l.a}</div>
                  <div className="text-xs text-muted-foreground">{l.u}</div>
                </div>
                <div className="text-xs text-muted-foreground">{l.t}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-primary" /> Top Clinics
          </h3>
          <div className="space-y-3">
            {[
              { n: "Riverside Endocrine", p: 482, t: 78 },
              { n: "Metro Diabetes Center", p: 312, t: 72 },
              { n: "Cedar Health Group", p: 264, t: 81 },
              { n: "Coastal Care Clinic", p: 198, t: 69 },
            ].map((c) => (
              <div
                key={c.n}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/40"
              >
                <div>
                  <div className="font-medium text-sm">{c.n}</div>
                  <div className="text-xs text-muted-foreground">{c.p} patients</div>
                </div>
                <Badge variant="outline">TIR {c.t}%</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;
  if (user.role === "doctor") return <DoctorDashboard />;
  if (user.role === "admin") return <AdminDashboard />;
  return <PatientDashboard />;
}
