import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity, Heart, Stethoscope, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}`);
      nav({ to: "/app" });
    } catch (err: any) {
      toast.error(err?.message ?? "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const demo = async (role: "patient" | "doctor" | "admin") => {
    try {
      const u = await login(`${role}@demo.com`, "demo", role);
      toast.success(`Logged in as ${u.role}`);
      nav({ to: "/app" });
    } catch (err: any) {
      toast.error(err?.message ?? "Demo login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex flex-1 relative bg-gradient-hero items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
        <div className="relative max-w-md text-primary-foreground">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl">GlucoCare AI</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight">Care that adapts to every reading.</h2>
          <p className="mt-4 text-primary-foreground/85">
            One portal for patients, doctors, and clinics — with AI built in.
          </p>
          <div className="mt-10 space-y-3">
            {[Heart, Stethoscope, ShieldCheck].map((I, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <I className="w-4 h-4" />
                </div>
                {
                  ["Real-time CGM monitoring", "Doctor priority queue", "HIPAA & SOC 2 compliant"][
                    i
                  ]
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 shadow-elegant">
          <Link to="/" className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold">GlucoCare AI</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to access your dashboard.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="e">Email or phone</Label>
              <Input
                id="e"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="p">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="p"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="r" />
              <Label htmlFor="r" className="text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary shadow-elegant h-11"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground mb-3">Try a demo account</p>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => demo("patient")}>
                <Heart className="w-3 h-3 mr-1" />
                Patient
              </Button>
              <Button variant="outline" size="sm" onClick={() => demo("doctor")}>
                <Stethoscope className="w-3 h-3 mr-1" />
                Doctor
              </Button>
              <Button variant="outline" size="sm" onClick={() => demo("admin")}>
                <ShieldCheck className="w-3 h-3 mr-1" />
                Admin
              </Button>
            </div>
          </div>

          <p className="text-sm text-center mt-6 text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
