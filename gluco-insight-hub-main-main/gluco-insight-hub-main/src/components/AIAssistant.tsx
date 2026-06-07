import { useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ role: "user" | "ai"; text: string }[]>([
    {
      role: "ai",
      text: "Hi! I'm your GlucoCare AI assistant. Ask me about your glucose trends, medications, or diabetes care.",
    },
  ]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    const userMsg = text;
    setMsgs((m) => [...m, { role: "user", text: userMsg }]);
    setText("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          role: "ai",
          text: "Based on your recent readings, your time-in-range is trending up 4% this week — great job! Want me to suggest meal adjustments to push it higher?",
        },
      ]);
    }, 700);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-gradient-primary shadow-glow animate-pulse-glow"
        size="icon"
      >
        <Bot className="w-6 h-6" />
      </Button>
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] sm:w-96 h-[500px] bg-card border border-border rounded-2xl shadow-elegant flex flex-col overflow-hidden animate-slide-up">
          <div className="p-4 border-b border-border bg-gradient-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <div>
                <div className="font-semibold text-sm">GlucoCare AI</div>
                <div className="text-xs opacity-80">Always here to help</div>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-primary-foreground hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask anything..."
            />
            <Button size="icon" onClick={send} className="bg-gradient-primary">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
