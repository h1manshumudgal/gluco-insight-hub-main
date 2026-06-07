import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card } from "@/components/PageBits";
import { userActivity } from "@/lib/mock-data";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/app/analytics")({ component: Analytics });

function Analytics() {
  return (
    <div>
      <PageHeader title="Platform Analytics" desc="System-wide metrics & insights" />
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Monthly Active Users</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={userActivity}>
              <defs>
                <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.58 0.17 230)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.58 0.17 230)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(0.92 0.012 230 / 0.4)" />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Area dataKey="users" stroke="oklch(0.58 0.17 230)" fill="url(#a1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Data Uploads</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={userActivity}>
              <CartesianGrid stroke="oklch(0.92 0.012 230 / 0.4)" />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Bar dataKey="uploads" fill="oklch(0.72 0.16 210)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={[
                  { n: "Patients", v: 11320, c: "oklch(0.58 0.17 230)" },
                  { n: "Doctors", v: 142, c: "oklch(0.72 0.16 210)" },
                  { n: "Admins", v: 18, c: "oklch(0.78 0.16 75)" },
                ]}
                dataKey="v"
                nameKey="n"
                outerRadius={90}
              >
                {[0, 1, 2].map((i) => (
                  <Cell
                    key={i}
                    fill={
                      ["oklch(0.58 0.17 230)", "oklch(0.72 0.16 210)", "oklch(0.78 0.16 75)"][i]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Device Integrations</h3>
          <div className="space-y-3">
            {[
              { n: "Dexcom G7", v: 48 },
              { n: "FreeStyle Libre 3", v: 32 },
              { n: "Apple Health", v: 12 },
              { n: "Other", v: 8 },
            ].map((d) => (
              <div key={d.n}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{d.n}</span>
                  <span className="font-medium">{d.v}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-primary"
                    style={{ width: `${d.v}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
