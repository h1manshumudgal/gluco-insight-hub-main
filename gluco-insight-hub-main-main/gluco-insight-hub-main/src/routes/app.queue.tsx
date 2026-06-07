import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Card, Badge, Button } from "@/components/PageBits";
import { patients } from "@/lib/mock-data";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/app/queue")({ component: Queue });

function Queue() {
  const groups = [
    { label: "Critical", items: patients.filter(p => p.risk === "critical"), color: "bg-destructive/15 text-destructive border-destructive/30" },
    { label: "Attention Needed", items: patients.filter(p => p.risk === "attention"), color: "bg-warning/15 text-warning border-warning/30" },
    { label: "Stable", items: patients.filter(p => p.risk === "stable"), color: "bg-success/15 text-success border-success/30" },
  ];
  return (
    <div>
      <PageHeader title="Priority Queue" desc="Automatic risk scoring across your panel" />
      <div className="space-y-6">
        {groups.map(g => (
          <div key={g.label}>
            <div className="flex items-center gap-2 mb-3"><h2 className="font-semibold">{g.label}</h2><Badge className={g.color}>{g.items.length}</Badge></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {g.items.map(p => (
                <Card key={p.id} className={`p-4 border-l-4 ${g.label === "Critical" ? "border-l-destructive" : g.label === "Attention Needed" ? "border-l-warning" : "border-l-success"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">{p.name.split(" ").map(n => n[0]).join("")}</div>
                    <div className="flex-1 min-w-0"><div className="font-medium truncate">{p.name}</div><div className="text-xs text-muted-foreground">{p.type} • Avg {p.avg}</div></div>
                    {g.label === "Critical" && <AlertTriangle className="w-4 h-4 text-destructive" />}
                  </div>
                  <div className="flex justify-between items-center mt-3"><span className="text-xs">TIR <span className="font-semibold">{p.tir}%</span></span><Button asChild size="sm" variant="outline"><Link to="/app/patients/$id" params={{ id: p.id }}>Review</Link></Button></div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
