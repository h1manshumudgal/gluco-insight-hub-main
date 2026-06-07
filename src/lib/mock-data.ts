// Mock medical data
export const glucoseToday = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, "0")}:00`,
  value: Math.round(90 + Math.sin(i / 3) * 30 + Math.random() * 25 + (i > 7 && i < 9 ? 40 : 0) + (i > 12 && i < 14 ? 35 : 0)),
}));

export const glucoseWeekly = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({
  day: d,
  avg: Math.round(110 + Math.random() * 30),
  high: Math.round(160 + Math.random() * 40),
  low: Math.round(70 + Math.random() * 15),
}));

export const glucoseMonthly = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  avg: Math.round(115 + Math.sin(i / 4) * 18 + Math.random() * 10),
}));

export const tirData = [
  { name: "In Range", value: 72, color: "oklch(0.65 0.16 155)" },
  { name: "High", value: 18, color: "oklch(0.78 0.16 75)" },
  { name: "Low", value: 6, color: "oklch(0.60 0.22 25)" },
  { name: "Very High", value: 4, color: "oklch(0.55 0.20 30)" },
];

export const patients = [
  { id: "p1", name: "Sarah Johnson", age: 54, type: "Type 2", tir: 78, risk: "stable", lastSync: "2 min ago", avg: 118 },
  { id: "p2", name: "Michael Chen", age: 42, type: "Type 1", tir: 52, risk: "attention", lastSync: "15 min ago", avg: 168 },
  { id: "p3", name: "Emma Rodriguez", age: 38, type: "Type 1", tir: 38, risk: "critical", lastSync: "1 hr ago", avg: 198 },
  { id: "p4", name: "James Wilson", age: 61, type: "Type 2", tir: 82, risk: "stable", lastSync: "5 min ago", avg: 112 },
  { id: "p5", name: "Olivia Brown", age: 29, type: "Type 1", tir: 65, risk: "attention", lastSync: "30 min ago", avg: 142 },
  { id: "p6", name: "David Kim", age: 47, type: "Type 2", tir: 88, risk: "stable", lastSync: "8 min ago", avg: 108 },
  { id: "p7", name: "Lisa Anderson", age: 55, type: "Type 2", tir: 44, risk: "critical", lastSync: "3 hr ago", avg: 188 },
];

export const events = [
  { id: 1, type: "meal", title: "Breakfast - Oatmeal", time: "08:15", impact: "+45 mg/dL" },
  { id: 2, type: "medication", title: "Metformin 500mg", time: "08:30", impact: "—" },
  { id: 3, type: "exercise", title: "30min walk", time: "12:00", impact: "-22 mg/dL" },
  { id: 4, type: "meal", title: "Lunch - Salad bowl", time: "13:00", impact: "+28 mg/dL" },
  { id: 5, type: "symptoms", title: "Mild headache", time: "16:00", impact: "—" },
];

export const aiInsights = [
  { title: "Post-breakfast spike pattern", desc: "Your glucose rises 40+ mg/dL after oatmeal. Try adding protein.", level: "warning" },
  { title: "Excellent exercise impact", desc: "Walking after meals reduces peak by 22%. Keep it up!", level: "success" },
  { title: "Sleep affecting baseline", desc: "Late-night readings are 12% higher on poor sleep nights.", level: "info" },
];

export const appointments = [
  { id: 1, patient: "Sarah Johnson", doctor: "Dr. Patel", date: "Today, 3:00 PM", type: "Video" },
  { id: 2, patient: "Michael Chen", doctor: "Dr. Patel", date: "Tomorrow, 10:30 AM", type: "In-person" },
  { id: 3, patient: "Emma Rodriguez", doctor: "Dr. Patel", date: "Fri, 2:00 PM", type: "Video" },
];

export const adminStats = {
  totalUsers: 12480,
  totalPatients: 11320,
  totalDoctors: 142,
  totalAdmins: 18,
  dailyUploads: 8932,
  activeNow: 1240,
};

export const userActivity = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  users: Math.round(800 + i * 95 + Math.random() * 200),
  uploads: Math.round(2000 + i * 250 + Math.random() * 500),
}));
