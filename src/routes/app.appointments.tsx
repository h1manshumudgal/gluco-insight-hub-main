import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Button, Badge } from "@/components/PageBits";
import { appointments } from "@/lib/mock-data";
import { Calendar, Video, Plus } from "lucide-react";

export const Route = createFileRoute("/app/appointments")({ component: Apts });

function Apts() {
  return (
    <div>
      <PageHeader title="Appointments" desc="Book and manage consultations" action={<Button className="bg-gradient-primary"><Plus className="w-4 h-4 mr-2" />Book appointment</Button>} />
      <div className="grid md:grid-cols-2 gap-4">
        {appointments.map(a => (
          <Card key={a.id} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline">{a.type}</Badge>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="font-semibold">{a.patient}</div>
            <div className="text-sm text-muted-foreground">with {a.doctor}</div>
            <div className="text-sm font-medium mt-3">{a.date}</div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="bg-gradient-primary"><Video className="w-4 h-4 mr-1" />Join</Button>
              <Button size="sm" variant="outline">Reschedule</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
