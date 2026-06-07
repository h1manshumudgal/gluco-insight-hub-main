import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GlucoCare AI — Smart Diabetes & Glucose Monitoring Platform" },
      { name: "description", content: "AI-powered diabetes care for patients, doctors, and clinics. Real-time CGM monitoring, predictive insights, telemedicine, and family access." },
    ],
  }),
  component: Landing,
});
