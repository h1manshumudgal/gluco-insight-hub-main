import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card } from "@/components/PageBits";
import { aiInsights } from "@/lib/mock-data";
import { Sparkles, TrendingUp, AlertTriangle, Brain } from "lucide-react";

export const Route = createFileRoute("/app/insights")({ component: Insights });

function Insights() {
  return (
    <div>
      <PageHeader title="AI Insights" desc="Personalized intelligence from your data" />
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {[{l:"Patterns detected",v:12,i:Brain},{l:"Risk forecast",v:"Low",i:TrendingUp},{l:"Active alerts",v:2,i:AlertTriangle}].map(s=>(
          <Card key={s.l} className="p-5"><s.i className="w-5 h-5 text-primary mb-2" /><div className="text-2xl font-bold">{s.v}</div><div className="text-xs text-muted-foreground">{s.l}</div></Card>
        ))}
      </div>
      <div className="space-y-3">
        {[...aiInsights, ...aiInsights].map((i, idx) => (
          <Card key={idx} className="p-5 flex gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${i.level === "warning" ? "bg-warning/15 text-warning" : i.level === "success" ? "bg-success/15 text-success" : "bg-primary/15 text-primary"}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold">{i.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{i.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
