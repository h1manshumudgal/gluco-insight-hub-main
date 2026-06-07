import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useAuth, canAccess, type Role } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import {
  Activity,
  LayoutDashboard,
  LineChart,
  Users,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Stethoscope,
  ShieldCheck,
  Heart,
  Pill,
  Sparkles,
  BarChart3,
  Building2,
  AlertTriangle,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AIAssistant } from "./AIAssistant";

type NavItem = { to: string; label: string; icon: any };

const NAV: Record<Role, NavItem[]> = {
  patient: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/glucose", label: "My Glucose", icon: LineChart },
    { to: "/app/events", label: "Events & Logs", icon: Heart },
    { to: "/app/medications", label: "Medications", icon: Pill },
    { to: "/app/insights", label: "AI Insights", icon: Sparkles },
    { to: "/app/appointments", label: "Appointments", icon: Calendar },
    { to: "/app/messages", label: "Messages", icon: MessageSquare },
    { to: "/app/alerts", label: "Alerts", icon: Bell },
    { to: "/app/settings", label: "Settings", icon: Settings },
  ],
  doctor: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/patients", label: "My Patients", icon: Users },
    { to: "/app/queue", label: "Priority Queue", icon: AlertTriangle },
    { to: "/app/appointments", label: "Appointments", icon: Calendar },
    { to: "/app/messages", label: "Messages", icon: MessageSquare },
    { to: "/app/insights", label: "AI Insights", icon: Sparkles },
    { to: "/app/settings", label: "Settings", icon: Settings },
  ],
  admin: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/patients", label: "All Patients", icon: Users },
    { to: "/app/users", label: "User Management", icon: ShieldCheck },
    { to: "/app/clinics", label: "Clinics", icon: Building2 },
    { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/app/audit", label: "Audit Logs", icon: Activity },
    { to: "/app/settings", label: "Settings", icon: Settings },
  ],
};

const ROLE_META: Record<Role, { label: string; icon: any; color: string }> = {
  patient: { label: "Patient", icon: Heart, color: "bg-success/15 text-success" },
  doctor: { label: "Doctor", icon: Stethoscope, color: "bg-primary/15 text-primary" },
  admin: { label: "Admin", icon: ShieldCheck, color: "bg-warning/15 text-warning" },
};

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (!user) {
    if (typeof window !== "undefined") navigate({ to: "/login" });
    return null;
  }

  const items = NAV[user.role];
  const meta = ROLE_META[user.role];

  // RBAC: block cross-role deep links by redirecting to the role's dashboard.
  if (!canAccess(user.role, location.pathname)) {
    if (typeof window !== "undefined") navigate({ to: "/app" });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-40 transform transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">GlucoCare</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <nav className="p-3 space-y-0.5 overflow-y-auto h-[calc(100vh-4rem-5rem)]">
          {items.map((it) => {
            const active =
              location.pathname === it.to ||
              (it.to !== "/app" && location.pathname.startsWith(it.to));
            return (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-elegant" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}
              >
                <it.icon className="w-4 h-4" /> {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border bg-sidebar">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div
                className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${meta.color}`}
              >
                <meta.icon className="w-2.5 h-2.5" />
                {meta.label}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Sign out">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 glass border-b border-border flex items-center justify-between px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="hidden lg:block text-sm text-muted-foreground">
            Welcome back,{" "}
            <span className="font-medium text-foreground">{user.name.split(" ")[0]}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" onClick={toggle}>
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 animate-fade-in">{children}</main>
      </div>

      <AIAssistant />
    </div>
  );
}
