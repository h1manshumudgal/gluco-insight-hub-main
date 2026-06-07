import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Activity, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPassword });

function ForgotPassword() {
  const { sendPasswordReset } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err) {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-elegant">
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold">GlucoCare AI</span>
        </Link>

        <h1 className="text-2xl font-bold">Reset password</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {sent ? (
          <div className="mt-8 text-center">
            <div className="text-5xl mb-4">📧</div>
            <h3 className="text-lg font-semibold">Check your email</h3>
            <p className="text-sm text-muted-foreground mt-2">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <Button variant="outline" className="mt-6 w-full" onClick={() => nav({ to: "/login" })}>
              Return to login
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary shadow-elegant h-11"
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </Button>
          </form>
        )}

        <p className="text-sm text-center mt-6 text-muted-foreground">
          Remember your password?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
