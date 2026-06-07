import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Activity, Heart, Stethoscope } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({ component: Register });

type PublicRole = "patient" | "doctor";

function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [data, setData] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [role, setRole] = useState<PublicRole>("patient");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.password !== data.confirm) {
      toast.error("Passwords don't match");
      return;
    }
    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role,
      });
      toast.success("Account created!");
      nav({ to: "/app" });
    } catch (err: any) {
      toast.error(err?.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const roles: { v: PublicRole; l: string; d: string; i: any }[] = [
    { v: "patient", l: "Patient", d: "Track your glucose & care", i: Heart },
    { v: "doctor", l: "Doctor", d: "Monitor your patients", i: Stethoscope },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-background">
      <Card className="w-full max-w-2xl p-6 sm:p-10 shadow-elegant">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold">GlucoCare AI</span>
        </Link>
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Join thousands managing diabetes with AI.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>I am a...</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  type="button"
                  key={r.v}
                  onClick={() => setRole(r.v)}
                  className={`p-3 rounded-lg border text-left transition ${role === r.v ? "border-primary bg-primary/5 shadow-elegant" : "border-border hover:border-primary/50"}`}
                >
                  <r.i
                    className={`w-5 h-5 mb-1 ${role === r.v ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <div className="font-medium text-sm">{r.l}</div>
                  <div className="text-xs text-muted-foreground">{r.d}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Admin accounts are provisioned internally and cannot be self-registered.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full name</Label>
              <Input
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                required
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="+1 555 123 4567"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Confirm</Label>
              <Input
                type="password"
                required
                value={data.confirm}
                onChange={(e) => setData({ ...data, confirm: e.target.value })}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-primary shadow-elegant h-11"
          >
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>

        <p className="text-sm text-center mt-6 text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
