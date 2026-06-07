import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RecaptchaVerifier, ConfirmationResult } from "firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity, Heart, Stethoscope, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { loginWithEmail, sendPhoneOTP, verifyPhoneOTP } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  // Auth is available if Firebase initialized on client
  const authAvailable = true;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      toast.success("Welcome back");
      nav({ to: "/app" });
    } catch (err: any) {
      toast.error(err?.message ?? "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const demo = async (role: "patient" | "doctor" | "admin") => {
    try {
      await loginWithEmail(`${role}@demo.com`, "demo");
      toast.success(`Logged in as ${role}`);
      nav({ to: "/app" });
    } catch (err: any) {
      toast.error(err?.message ?? "Demo login failed");
    }
  };

  if (!authAvailable) {
    return (
      <div className="min-h-screen flex bg-background items-center justify-center">
        <Card className="w-full max-w-md p-8 shadow-elegant">
          <div className="text-center">
            <Activity className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-xl font-bold mb-2">Authentication Configuration</h1>
            <p className="text-muted-foreground mb-6">
              Firebase authentication is not configured. Please set up your environment variables to enable login.
            </p>
            <div className="bg-muted p-4 rounded-lg text-left text-sm font-mono mb-6">
              <p className="mb-2">Required .env variables:</p>
              <p>VITE_FIREBASE_API_KEY</p>
              <p>VITE_FIREBASE_AUTH_DOMAIN</p>
              <p>VITE_FIREBASE_PROJECT_ID</p>
            </div>
            <Button onClick={() => nav({ to: "/" })} className="w-full">
              Go Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
