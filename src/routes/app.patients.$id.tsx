import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { patients, glucoseToday, glucoseWeekly } from "@/lib/mock-data";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { ArrowLeft, Download, MessageSquare, Video } from "lucide-react";

export const Route = createFileRoute("/app/patients/$id")({ component: PatientDetail });

function PatientDetail() {
  const { id } = Route.useParams();
  const patient = patients.find(p => p.id === id) ?? patients[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Button asChild variant="ghost" size="sm"><Link to="/app/patients"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Link></Button>
        <div className="flex gap-2">
          <Button variant="outline"><MessageSquare className="w-4 h-4 mr-2" />Message</Button>
          <Button variant="outline"><Video className="w-4 h-4 mr-2" />Start call</Button>
          <Button className="bg-gradient-primary"><Download className="w-4 h-4 mr-2" />Download report</Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">{patient.name.split(" ").map(n => n[0]).join("")}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">Age {patient.age}</Badge>
              <Badge variant="outline">{patient.type}</Badge>
              <Badge className={patient.risk === "critical" ? "bg-destructive/15 text-destructive" : patient.risk === "attention" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}>{patient.risk}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Last sync: {patient.lastSync} • Patient ID: {patient.id}</p>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center w-full sm:w-auto">
            <div><div className="text-2xl font-bold">{patient.avg}</div><div className="text-xs text-muted-foreground">Avg mg/dL</div></div>
            <div><div className="text-2xl font-bold">{patient.tir}%</div><div className="text-xs text-muted-foreground">TIR</div></div>
            <div><div className="text-2xl font-bold">7.2%</div><div className="text-xs text-muted-foreground">GMI</div></div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="14">
        <TabsList><TabsTrigger value="14">14 days</TabsTrigger><TabsTrigger value="30">30 days</TabsTrigger><TabsTrigger value="90">90 days</TabsTrigger></TabsList>
        {["14","30","90"].map((d) => (
          <TabsContent key={d} value={d}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">{d}-day Glucose Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={glucoseToday}>
                  <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.58 0.17 230)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.58 0.17 230)" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 230 / 0.4)" />
                  <XAxis dataKey="time" stroke="currentColor" fontSize={11} />
                  <YAxis stroke="currentColor" fontSize={11} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="value" stroke="oklch(0.58 0.17 230)" fill="url(#pg)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Glucose Variability</h3>
          <div className="text-3xl font-bold">28%</div>
          <p className="text-xs text-muted-foreground mt-1">Coefficient of variation</p>
          <ResponsiveContainer width="100%" height={120} className="mt-3">
            <BarChart data={glucoseWeekly}><Bar dataKey="avg" fill="oklch(0.72 0.16 210)" radius={[3,3,0,0]} /></BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold mb-3">Doctor Notes & Care Plan</h3>
          <Textarea defaultValue="Patient showing improved TIR over the last 30 days. Continue current insulin regimen. Recommend post-meal walks. Follow-up in 4 weeks." className="min-h-32" />
          <Button className="mt-3 bg-gradient-primary">Save notes</Button>
        </Card>
      </div>
    </div>
  );
}
