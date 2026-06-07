import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Button, Badge } from "@/components/PageBits";
import { Pill, Plus, Check } from "lucide-react";

export const Route = createFileRoute("/app/medications")({ component: Meds });

const meds = [
  { n: "Metformin", dose: "500mg", freq: "Twice daily", next: "8:30 PM", adherence: 92 },
  { n: "Insulin Lispro", dose: "6 units", freq: "Before meals", next: "12:30 PM", adherence: 98 },
  { n: "Atorvastatin", dose: "20mg", freq: "Once daily", next: "10:00 PM", adherence: 88 },
];

function Meds() {
  return (
    <div>
      <PageHeader
        title="Medications"
        desc="Manage your medication schedule and adherence"
        action={
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add medication
          </Button>
        }
      />
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <div className="text-xs text-muted-foreground">Adherence (30d)</div>
          <div className="text-3xl font-bold mt-1 text-success">94%</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs text-muted-foreground">Doses today</div>
          <div className="text-3xl font-bold mt-1">5 / 6</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs text-muted-foreground">Next dose</div>
          <div className="text-3xl font-bold mt-1">12:30 PM</div>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {meds.map((m) => (
          <Card key={m.n} className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{m.n}</div>
                <div className="text-sm text-muted-foreground">
                  {m.dose} • {m.freq}
                </div>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline">Next: {m.next}</Badge>
                  <Badge className="bg-success/15 text-success hover:bg-success/15">
                    {m.adherence}% adherence
                  </Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Check className="w-4 h-4 mr-1" />
                Log
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
