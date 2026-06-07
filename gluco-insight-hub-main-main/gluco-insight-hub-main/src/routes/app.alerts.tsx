import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Button, Badge } from "@/components/PageBits";
import { Bell, AlertTriangle, TrendingDown, TrendingUp, Phone } from "lucide-react";

export const Route = createFileRoute("/app/alerts")({ component: Alerts });

const alerts = [
  {
    t: "Critical low",
    d: "Glucose dropped to 58 mg/dL",
    time: "2 min ago",
    level: "critical",
    icon: TrendingDown,
  },
  {
    t: "High glucose",
    d: "Reading above 250 mg/dL for 30+ min",
    time: "1 hr ago",
    level: "warning",
    icon: TrendingUp,
  },
  {
    t: "Missed medication",
    d: "Metformin evening dose not logged",
    time: "3 hr ago",
    level: "info",
    icon: Bell,
  },
  {
    t: "Sensor expiring",
    d: "CGM sensor expires in 2 days",
    time: "Yesterday",
    level: "info",
    icon: Bell,
  },
];

function Alerts() {
  const colorMap: Record<string, string> = {
    critical: "bg-destructive/15 text-destructive",
    warning: "bg-warning/15 text-warning",
    info: "bg-primary/15 text-primary",
  };
  return (
    <div>
      <PageHeader
        title="Alerts & Notifications"
        desc="Real-time monitoring & emergency escalation"
        action={
          <Button variant="destructive" className="animate-pulse-glow">
            <Phone className="w-4 h-4 mr-2" />
            SOS
          </Button>
        }
      />
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-5 border-destructive/30">
          <AlertTriangle className="w-5 h-5 text-destructive mb-2" />
          <div className="text-2xl font-bold text-destructive">2</div>
          <div className="text-xs text-muted-foreground">Critical</div>
        </Card>
        <Card className="p-5">
          <Bell className="w-5 h-5 text-warning mb-2" />
          <div className="text-2xl font-bold">5</div>
          <div className="text-xs text-muted-foreground">Warnings (24h)</div>
        </Card>
        <Card className="p-5">
          <Bell className="w-5 h-5 text-primary mb-2" />
          <div className="text-2xl font-bold">12</div>
          <div className="text-xs text-muted-foreground">Total (7d)</div>
        </Card>
      </div>
      <div className="space-y-3">
        {alerts.map((a, i) => (
          <Card
            key={i}
            className={`p-4 flex items-center gap-4 ${a.level === "critical" ? "border-destructive/40" : ""}`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[a.level]}`}
            >
              <a.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{a.t}</div>
              <div className="text-sm text-muted-foreground">{a.d}</div>
            </div>
            <Badge className={colorMap[a.level]}>{a.level}</Badge>
            <div className="text-xs text-muted-foreground hidden sm:block">{a.time}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
