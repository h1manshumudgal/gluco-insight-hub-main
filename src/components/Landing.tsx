import { Link } from "@tanstack/react-router";
import {
  Activity,
  Heart,
  Brain,
  Shield,
  Smartphone,
  Users,
  ArrowRight,
  Check,
  Star,
  Stethoscope,
  Bell,
  BarChart3,
  Sparkles,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useTheme } from "@/lib/theme";

export function Landing() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">
              GlucoCare<span className="text-primary"> AI</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition">
              Features
            </a>
            <a href="#how" className="hover:text-primary transition">
              How it works
            </a>
            <a href="#pricing" className="hover:text-primary transition">
              Pricing
            </a>
            <a href="#faq" className="hover:text-primary transition">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover:opacity-90 shadow-elegant">
              <Link to="/register">Get started</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-card px-4 py-4 flex flex-col gap-3">
            <a href="#features" onClick={() => setOpen(false)}>
              Features
            </a>
            <a href="#how" onClick={() => setOpen(false)}>
              How it works
            </a>
            <a href="#pricing" onClick={() => setOpen(false)}>
              Pricing
            </a>
            <a href="#faq" onClick={() => setOpen(false)}>
              FAQ
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10 dark:opacity-20" />
        <div className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 py-20 lg:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/40 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered Diabetes Care Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Smarter glucose monitoring,
              <br />
              <span className="text-gradient">healthier lives.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              GlucoCare AI brings patients, doctors, and clinics together on one platform — with
              real-time CGM data, predictive AI insights, and telemedicine built for diabetes care.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:opacity-90 shadow-elegant h-12 px-8"
              >
                <Link to="/register">
                  Start free trial <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8">
                <Link to="/login">View demo</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" /> HIPAA Compliant
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" /> FDA-aligned
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" /> SOC 2 Type II
              </div>
            </div>
          </div>

          {/* Hero stat card */}
          <div className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
            {[
              { v: "12k+", l: "Active patients" },
              { v: "98%", l: "TIR accuracy" },
              { v: "142", l: "Partner doctors" },
              { v: "24/7", l: "AI monitoring" },
            ].map((s) => (
              <Card
                key={s.l}
                className="p-6 text-center bg-gradient-card shadow-card border-border/50"
              >
                <div className="text-3xl font-bold text-gradient">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold">Everything you need for diabetes care</h2>
          <p className="mt-3 text-muted-foreground">
            One platform. Three roles. Endless possibilities.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              i: Activity,
              t: "Real-time CGM Sync",
              d: "Live glucose from Dexcom, Libre, Medtronic and Apple Health.",
            },
            {
              i: Brain,
              t: "Predictive AI",
              d: "Forecast highs and lows hours in advance with our trained models.",
            },
            {
              i: Stethoscope,
              t: "Doctor Dashboard",
              d: "Risk-scored patient queues with critical alerts and care notes.",
            },
            {
              i: Bell,
              t: "Smart Alerts",
              d: "Push, SMS, and email notifications with emergency escalation.",
            },
            {
              i: BarChart3,
              t: "Advanced Analytics",
              d: "TIR, GMI, glucose variability, and AGP reports built in.",
            },
            {
              i: Shield,
              t: "Family & Caregivers",
              d: "Loved ones stay informed with secure read-only access.",
            },
          ].map(({ i: Icon, t, d }) => (
            <Card
              key={t}
              className="p-6 hover:shadow-elegant transition-all hover:-translate-y-1 bg-gradient-card"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-elegant">
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold">How GlucoCare AI works</h2>
            <p className="mt-3 text-muted-foreground">From sensor to specialist in seconds.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: "01",
                t: "Connect your device",
                d: "Pair your CGM, meter, or wearable in under a minute.",
              },
              {
                n: "02",
                t: "AI analyzes patterns",
                d: "We crunch your trends and flag risk in real time.",
              },
              {
                n: "03",
                t: "Your care team acts",
                d: "Doctors review priorities, you get personalized guidance.",
              },
            ].map((s) => (
              <div key={s.n} className="relative">
                <div className="text-6xl font-bold text-primary/20">{s.n}</div>
                <h3 className="mt-2 font-semibold text-xl">{s.t}</h3>
                <p className="mt-2 text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section className="container mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/40 text-xs font-medium text-primary mb-4">
              <Brain className="w-3 h-3" /> AI Insights
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Predictive intelligence that learns you
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our models analyze meals, exercise, sleep, and medication to give you precise,
              personalized recommendations — and alert your care team when something needs
              attention.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Pattern detection across 90+ data points",
                "Meal & exercise impact analysis",
                "Weekly and monthly health summaries",
                "Predictive hypo/hyper risk forecasting",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-success mt-0.5" /> <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-6 bg-gradient-card shadow-elegant">
            <div className="space-y-4">
              {[
                {
                  t: "Post-meal spike detected",
                  d: "Your glucose rises 45 mg/dL after oatmeal. Try adding protein.",
                  c: "warning",
                },
                {
                  t: "Exercise impact: excellent",
                  d: "Walks reduce peak glucose by 22% on average.",
                  c: "success",
                },
                {
                  t: "Sleep correlation found",
                  d: "Poor sleep raises baseline by 12% the next morning.",
                  c: "primary",
                },
              ].map((i) => (
                <div key={i.t} className="flex gap-3 p-4 rounded-lg border border-border bg-card">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${i.c === "warning" ? "bg-warning/20 text-warning" : i.c === "success" ? "bg-success/20 text-success" : "bg-primary/20 text-primary"}`}
                  >
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium">{i.t}</div>
                    <div className="text-sm text-muted-foreground">{i.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Doctor section */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Card className="p-6 order-2 lg:order-1 bg-gradient-card shadow-elegant">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Priority Queue</div>
              <span className="text-xs text-muted-foreground">3 critical</span>
            </div>
            <div className="space-y-2">
              {[
                { n: "Emma Rodriguez", t: "TIR 38% • Avg 198", r: "critical" },
                { n: "Lisa Anderson", t: "TIR 44% • Avg 188", r: "critical" },
                { n: "Michael Chen", t: "TIR 52% • Avg 168", r: "attention" },
              ].map((p) => (
                <div
                  key={p.n}
                  className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
                >
                  <div>
                    <div className="font-medium">{p.n}</div>
                    <div className="text-xs text-muted-foreground">{p.t}</div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${p.r === "critical" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"}`}
                  >
                    {p.r}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/40 text-xs font-medium text-primary mb-4">
              <Stethoscope className="w-3 h-3" /> For Clinicians
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Monitor your panel at a glance</h2>
            <p className="mt-4 text-muted-foreground">
              A risk-scored priority queue surfaces patients who need you most. Drill into
              14/30/90-day analytics, leave care notes, and start video visits — all in one place.
            </p>
            <Button asChild className="mt-6 bg-gradient-primary">
              <Link to="/register">
                Join as a doctor <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Loved by patients and clinicians
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: "Dr. Anjali Patel",
              r: "Endocrinologist",
              q: "GlucoCare cut my pre-visit chart review time in half. The risk queue is invaluable.",
            },
            {
              n: "Marcus Lee",
              r: "Type 1 patient, 8 years",
              q: "Finally an app that explains my numbers in plain English. AI insights are scary good.",
            },
            {
              n: "Rachel Singh",
              r: "Clinic Director",
              q: "We onboarded 200 patients in two weeks. The admin tools are best-in-class.",
            },
          ].map((t) => (
            <Card key={t.n} className="p-6 bg-gradient-card">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm">"{t.q}"</p>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="font-medium text-sm">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Simple, transparent pricing</h2>
            <p className="mt-3 text-muted-foreground">
              Free for patients. Pay for what your clinic actually uses.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                n: "Patient",
                p: "Free",
                f: ["Unlimited CGM sync", "AI insights", "Family access", "Doctor messaging"],
              },
              {
                n: "Clinician",
                p: "$49",
                s: "/mo",
                f: ["Up to 100 patients", "Priority queue", "Telemedicine", "Custom reports"],
                pop: true,
              },
              {
                n: "Enterprise",
                p: "Custom",
                f: ["Unlimited everything", "Multi-clinic", "SSO/SAML", "Dedicated CSM"],
              },
            ].map((p) => (
              <Card
                key={p.n}
                className={`p-8 relative ${p.pop ? "border-primary shadow-elegant scale-105" : ""}`}
              >
                {p.pop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold">
                    Most popular
                  </div>
                )}
                <div className="text-sm font-medium text-muted-foreground">{p.n}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{p.p}</span>
                  {p.s && <span className="text-muted-foreground">{p.s}</span>}
                </div>
                <Button
                  asChild
                  className={`mt-6 w-full ${p.pop ? "bg-gradient-primary" : ""}`}
                  variant={p.pop ? "default" : "outline"}
                >
                  <Link to="/register">Get started</Link>
                </Button>
                <ul className="mt-6 space-y-2">
                  {p.f.map((x) => (
                    <li key={x} className="flex gap-2 text-sm">
                      <Check className="w-4 h-4 text-success mt-0.5" /> {x}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-4 sm:px-6 py-20 max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {[
            {
              q: "Is GlucoCare AI HIPAA compliant?",
              a: "Yes. All data is encrypted at rest and in transit. We are HIPAA compliant and SOC 2 Type II certified.",
            },
            {
              q: "Which devices are supported?",
              a: "Dexcom G6/G7, FreeStyle Libre 2/3, Medtronic Guardian, Apple Health, Google Fit, plus most Bluetooth glucometers.",
            },
            {
              q: "Do I need a doctor to use it?",
              a: "No — patients can use GlucoCare on their own, or invite their care team for shared monitoring.",
            },
            {
              q: "How does the AI work?",
              a: "Our models are trained on de-identified glucose patterns to forecast risk and detect trends. Recommendations are educational and complement medical advice.",
            },
            {
              q: "Can I export my data?",
              a: "Yes. Export PDF reports for visits or raw CSV for personal records — anytime.",
            },
          ].map((f, i) => (
            <AccordionItem
              key={i}
              value={`i${i}`}
              className="border border-border rounded-lg px-4 bg-card"
            >
              <AccordionTrigger className="hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Download / CTA */}
      <section className="container mx-auto px-4 sm:px-6 py-20">
        <Card className="p-10 sm:p-16 text-center bg-gradient-hero text-primary-foreground border-0 shadow-glow overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
          <div className="relative">
            <Smartphone className="w-10 h-10 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold">Take GlucoCare anywhere</h2>
            <p className="mt-3 text-primary-foreground/90 max-w-xl mx-auto">
              Available on iOS, Android, and web. Install as a PWA for instant access.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" variant="secondary" className="h-12 px-8">
                <Link to="/register">Get started free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 bg-transparent border-white/30 text-primary-foreground hover:bg-white/10"
              >
                Download app
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold">GlucoCare AI</span>
            </div>
            <p className="text-muted-foreground">Smarter diabetes care, powered by AI.</p>
          </div>
          {[
            { h: "Product", l: ["Features", "Pricing", "Security", "Mobile App"] },
            { h: "Company", l: ["About", "Blog", "Careers", "Press"] },
            { h: "Legal", l: ["Privacy", "Terms", "HIPAA", "Contact"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="font-semibold mb-3">{c.h}</div>
              <ul className="space-y-2 text-muted-foreground">
                {c.l.map((x) => (
                  <li key={x}>
                    <a className="hover:text-foreground" href="#">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-border text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <div>© 2026 GlucoCare AI. All rights reserved.</div>
          <div>Made with care for people living with diabetes.</div>
        </div>
      </footer>
    </div>
  );
}
