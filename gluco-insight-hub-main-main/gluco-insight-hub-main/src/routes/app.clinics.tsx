import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Button, Badge } from "@/components/PageBits";
import { Building2, Plus, Users } from "lucide-react";

export const Route = createFileRoute("/app/clinics")({ component: Clinics });

const clinics = [
  { n: "Riverside Endocrine", loc: "San Francisco, CA", p: 482, d: 12, tir: 78 },
  { n: "Metro Diabetes Center", loc: "Chicago, IL", p: 312, d: 8, tir: 72 },
  { n: "Cedar Health Group", loc: "Austin, TX", p: 264, d: 6, tir: 81 },
  { n: "Coastal Care Clinic", loc: "Miami, FL", p: 198, d: 5, tir: 69 },
];

function Clinics() {
  return (
    <div>
      <PageHeader
        title="Clinic Management"
        desc="Multi-clinic analytics & assignments"
        action={
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create clinic
          </Button>
        }
      />
      <div className="grid md:grid-cols-2 gap-4">
        {clinics.map((c) => (
          <Card key={c.n} className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{c.n}</div>
                <div className="text-sm text-muted-foreground">{c.loc}</div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <Badge variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    {c.p} patients
                  </Badge>
                  <Badge variant="outline">{c.d} doctors</Badge>
                  <Badge className="bg-success/15 text-success hover:bg-success/15">
                    TIR {c.tir}%
                  </Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Manage
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
