import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  desc,
  action,
}: {
  title: string;
  desc?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {desc && <p className="text-muted-foreground text-sm mt-1">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export function ListCard({
  items,
}: {
  items: { title: string; sub?: string; right?: ReactNode; icon?: any; tint?: string }[];
}) {
  return (
    <Card className="divide-y divide-border">
      {items.map((it, i) => (
        <div key={i} className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition">
          {it.icon && (
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${it.tint ?? "bg-primary/15 text-primary"}`}
            >
              <it.icon className="w-5 h-5" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{it.title}</div>
            {it.sub && <div className="text-xs text-muted-foreground">{it.sub}</div>}
          </div>
          {it.right}
        </div>
      ))}
    </Card>
  );
}

export { Card, Button, Badge };
