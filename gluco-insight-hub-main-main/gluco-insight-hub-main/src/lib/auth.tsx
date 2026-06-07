import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "patient" | "doctor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

interface AuthCtx {
  user: User | null;
  login: (email: string, password: string, role?: Role) => Promise<User>;
  register: (data: { name: string; email: string; phone: string; password: string; role: Exclude<Role, "admin"> }) => Promise<User>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "glucocare_user";

// Fixed demo accounts — the ONLY accepted credentials for mock auth.
// Admin accounts are provisioned here and cannot be self-registered.
const DEMO_ACCOUNTS: Record<string, { password: string; user: Omit<User, "id"> }> = {
  "patient@demo.com": { password: "demo", user: { name: "Sarah Johnson", email: "patient@demo.com", role: "patient" } },
  "doctor@demo.com":  { password: "demo", user: { name: "Dr. Anjali Patel", email: "doctor@demo.com",  role: "doctor"  } },
  "admin@demo.com":   { password: "demo", user: { name: "Admin User",      email: "admin@demo.com",   role: "admin"   } },
};

// Registered (non-admin) users persist in localStorage to allow re-login.
const REG_KEY = "glucocare_registered";
type Registered = Record<string, { password: string; user: Omit<User, "id"> }>;
const loadRegistered = (): Registered => {
  try { return JSON.parse(localStorage.getItem(REG_KEY) || "{}"); } catch { return {}; }
};
const saveRegistered = (r: Registered) => localStorage.setItem(REG_KEY, JSON.stringify(r));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(KEY, JSON.stringify(u));
    else localStorage.removeItem(KEY);
  };

  const login: AuthCtx["login"] = async (email, password, role) => {
    const key = email.trim().toLowerCase();
    const demo = DEMO_ACCOUNTS[key];
    const reg = loadRegistered()[key];
    const match = demo ?? reg;
    if (!match || match.password !== password) {
      throw new Error("Invalid email or password");
    }
    // Role parameter (from demo buttons) must match the account's actual role.
    if (role && role !== match.user.role) {
      throw new Error("Role mismatch for this account");
    }
    const u: User = { id: Date.now().toString(), ...match.user };
    persist(u);
    return u;
  };

  const register: AuthCtx["register"] = async (data) => {
    // SECURITY: never accept "admin" from public registration.
    if ((data.role as Role) === "admin") {
      throw new Error("Admin accounts cannot be self-registered");
    }
    const key = data.email.trim().toLowerCase();
    if (DEMO_ACCOUNTS[key]) throw new Error("Email already in use");
    const reg = loadRegistered();
    if (reg[key]) throw new Error("Email already in use");
    reg[key] = { password: data.password, user: { name: data.name, email: key, role: data.role } };
    saveRegistered(reg);
    const u: User = { id: Date.now().toString(), name: data.name, email: key, role: data.role };
    persist(u);
    return u;
  };

  const logout = () => persist(null);

  return <Ctx.Provider value={{ user, login, register, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be inside AuthProvider");
  return c;
}

// Route-level RBAC map: which paths are allowed for which role.
// Patterns: exact match, or prefix match for dynamic segments.
const ROLE_ROUTES: Record<Role, string[]> = {
  patient: ["/app", "/app/glucose", "/app/events", "/app/medications", "/app/insights", "/app/appointments", "/app/messages", "/app/alerts", "/app/settings"],
  doctor:  ["/app", "/app/patients", "/app/queue", "/app/appointments", "/app/messages", "/app/insights", "/app/settings"],
  admin:   ["/app", "/app/patients", "/app/users", "/app/clinics", "/app/analytics", "/app/audit", "/app/settings"],
};

export function canAccess(role: Role, pathname: string): boolean {
  const allowed = ROLE_ROUTES[role];
  return allowed.some((p) => pathname === p || pathname.startsWith(p + "/"));
}
