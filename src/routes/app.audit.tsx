import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Badge } from "@/components/PageBits";

export const Route = createFileRoute("/app/audit")({ component: Audit });

const logs = [
  {
    u: "admin@glucocare.io",
    a: "User role changed",
    t: "patient → doctor",
    time: "2 min ago",
    level: "info",
  },
  {
    u: "dr.patel@clinic.com",
    a: "Patient record accessed",
    t: "Sarah Johnson",
    time: "10 min ago",
    level: "info",
  },
  {
    u: "admin@glucocare.io",
    a: "User suspended",
    t: "spammer@x.com",
    time: "1 hr ago",
    level: "warning",
  },
  {
    u: "admin@glucocare.io",
    a: "Clinic created",
    t: "Riverside Endocrine",
    time: "2 hr ago",
    level: "info",
  },
  {
    u: "system",
    a: "Failed login attempt",
    t: "unknown@x.com (5x)",
    time: "3 hr ago",
    level: "critical",
  },
  {
    u: "admin@glucocare.io",
    a: "Settings updated",
    t: "Email provider",
    time: "Yesterday",
    level: "info",
  },
];

function Audit() {
  return (
    <div>
      <PageHeader title="Audit Logs" desc="Login history, role changes, and system activity" />
      <Card className="divide-y divide-border">
        {logs.map((l, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <div
              className={`w-2 h-12 rounded-full ${l.level === "critical" ? "bg-destructive" : l.level === "warning" ? "bg-warning" : "bg-primary"}`}
            />
            <div className="flex-1">
              <div className="font-medium">{l.a}</div>
              <div className="text-sm text-muted-foreground">
                {l.t} • {l.u}
              </div>
            </div>
            <Badge variant="outline" className="capitalize">
              {l.level}
            </Badge>
            <div className="text-xs text-muted-foreground hidden sm:block w-24 text-right">
              {l.time}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
