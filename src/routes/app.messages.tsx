import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Button } from "@/components/PageBits";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/messages")({ component: Messages });

const threads = [
  { n: "Dr. Anjali Patel", last: "Your readings look great this week", time: "2m", unread: true },
  { n: "Sarah Johnson", last: "Thank you doctor!", time: "1h" },
  { n: "Michael Chen", last: "I have a question about my dosage", time: "3h", unread: true },
  { n: "Care Team", last: "Reminder: appointment tomorrow", time: "1d" },
];

function Messages() {
  const [active, setActive] = useState(0);
  return (
    <div>
      <PageHeader title="Messages" desc="Secure chat with your care team" />
      <Card className="grid md:grid-cols-3 h-[600px] overflow-hidden">
        <div className="border-r border-border divide-y divide-border overflow-y-auto">
          {threads.map((t, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-full text-left p-4 hover:bg-secondary/40 ${active === i ? "bg-secondary/60" : ""}`}>
              <div className="flex justify-between"><div className="font-medium text-sm">{t.n}</div><div className="text-xs text-muted-foreground">{t.time}</div></div>
              <div className="text-xs text-muted-foreground truncate mt-1">{t.last}</div>
              {t.unread && <span className="inline-block w-2 h-2 rounded-full bg-primary mt-1" />}
            </button>
          ))}
        </div>
        <div className="md:col-span-2 flex flex-col">
          <div className="p-4 border-b border-border font-semibold">{threads[active].n}</div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex"><div className="bg-secondary px-3 py-2 rounded-2xl text-sm max-w-[70%]">Hello! How are you feeling today?</div></div>
            <div className="flex justify-end"><div className="bg-primary text-primary-foreground px-3 py-2 rounded-2xl text-sm max-w-[70%]">Doing well, glucose has been stable.</div></div>
            <div className="flex"><div className="bg-secondary px-3 py-2 rounded-2xl text-sm max-w-[70%]">{threads[active].last}</div></div>
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <Input placeholder="Type a message..." />
            <Button className="bg-gradient-primary"><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
