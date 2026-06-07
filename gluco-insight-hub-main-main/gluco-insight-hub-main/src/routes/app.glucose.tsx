import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { glucoseToday, glucoseWeekly, glucoseMonthly, tirData } from "@/lib/mock-data";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/app/glucose")({ component: Glucose });

function Glucose() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">My Glucose</h1>
          <p className="text-muted-foreground text-sm">
            Full glucose history with interactive charts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button className="bg-gradient-primary">
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Avg Glucose", v: "124 mg/dL" },
          { l: "TIR", v: "72%" },
          { l: "GMI", v: "6.4%" },
          { l: "Std Deviation", v: "34" },
        ].map((s) => (
          <Card key={s.l} className="p-5">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className="text-2xl font-bold mt-1">{s.v}</div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="day">
        <TabsList>
          <TabsTrigger value="day">Today</TabsTrigger>
          <TabsTrigger value="week">Weekly</TabsTrigger>
          <TabsTrigger value="month">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <Card className="p-6">
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={glucoseToday}>
                <defs>
                  <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.58 0.17 230)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.58 0.17 230)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 230 / 0.4)" />
                <XAxis dataKey="time" stroke="currentColor" fontSize={11} />
                <YAxis stroke="currentColor" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(0.58 0.17 230)"
                  fill="url(#dg)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="week">
          <Card className="p-6">
            <ResponsiveContainer width="100%" height={360}>
              <LineChart data={glucoseWeekly}>
                <CartesianGrid stroke="oklch(0.92 0.012 230 / 0.4)" />
                <XAxis dataKey="day" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Line dataKey="avg" stroke="oklch(0.58 0.17 230)" strokeWidth={2} />
                <Line dataKey="high" stroke="oklch(0.78 0.16 75)" strokeWidth={2} />
                <Line dataKey="low" stroke="oklch(0.60 0.22 25)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="month">
          <Card className="p-6">
            <ResponsiveContainer width="100%" height={360}>
              <LineChart data={glucoseMonthly}>
                <CartesianGrid stroke="oklch(0.92 0.012 230 / 0.4)" />
                <XAxis dataKey="day" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Line dataKey="avg" stroke="oklch(0.58 0.17 230)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Time In Range Distribution</h3>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={tirData}
                dataKey="value"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {tirData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {tirData.map((t) => (
              <div key={t.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                    {t.name}
                  </span>
                  <span className="font-medium">{t.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full"
                    style={{ background: t.color, width: `${t.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
