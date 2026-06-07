import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { patients } from "@/lib/mock-data";
import { Search, Filter, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/patients")({ component: PatientsPage });

function PatientsPage() {
  const [q, setQ] = useState("");
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">My Patients</h1>
          <p className="text-muted-foreground text-sm">Manage and monitor your patient panel</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="relative max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search patients..."
            className="pl-9"
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Avg Glucose</TableHead>
                <TableHead>TIR</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">Age {p.age}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{p.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{p.avg} mg/dL</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-success"
                          style={{ width: `${p.tir}%` }}
                        />
                      </div>
                      {p.tir}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        p.risk === "critical"
                          ? "bg-destructive/15 text-destructive hover:bg-destructive/15"
                          : p.risk === "attention"
                            ? "bg-warning/15 text-warning hover:bg-warning/15"
                            : "bg-success/15 text-success hover:bg-success/15"
                      }
                    >
                      {p.risk}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.lastSync}</TableCell>
                  <TableCell>
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/app/patients/$id" params={{ id: p.id }}>
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
