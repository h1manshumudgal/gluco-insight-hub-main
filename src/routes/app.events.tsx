import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ListCard, Button, Card, Badge } from "@/components/PageBits";
import { events } from "@/lib/mock-data";
import { Heart, Pill, Activity, AlertTriangle, Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/app/events")({ component: Events });

function Events() {
  const { user } = useAuth();
  const readOnly = user?.role === "doctor";
  const tint = (t: string) =>
    t === "meal"
      ? "bg-primary/15 text-primary"
      : t === "medication"
        ? "bg-success/15 text-success"
        : t === "exercise"
          ? "bg-warning/15 text-warning"
          : "bg-destructive/15 text-destructive";
  const icon = (t: string) =>
    t === "meal" ? Heart : t === "medication" ? Pill : t === "exercise" ? Activity : AlertTriangle;

  return (
    <div>
      <PageHeader
        title="Events & Logs"
        desc={
          readOnly
            ? "Read-only patient timeline"
            : "Track meals, medications, exercise, and symptoms"
        }
        action={
          !readOnly && (
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add event
            </Button>
          )
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { l: "Meals", v: 8, i: Heart },
          { l: "Medications", v: 3, i: Pill },
          { l: "Exercise", v: 2, i: Activity },
          { l: "Symptoms", v: 1, i: AlertTriangle },
        ].map((s) => (
          <Card key={s.l} className="p-4">
            <s.i className="w-4 h-4 text-muted-foreground mb-2" />
            <div className="text-2xl font-bold">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </Card>
        ))}
      </div>
      <ListCard
        items={events.map((e) => ({
          title: e.title,
          sub: `${e.time} • ${e.impact}`,
          icon: icon(e.type),
          tint: tint(e.type),
          right: readOnly ? (
            <Badge variant="outline" className="capitalize">
              {e.type}
            </Badge>
          ) : (
            <div className="flex gap-1">
              <Button size="icon" variant="ghost">
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ),
        }))}
      />
    </div>
  );
}
