import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  Bot,
  UserCheck,
  FileText,
  AlertTriangle,
  Cpu,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const PERSONAS = [
  {
    id: "cyn-aarav-892",
    name: "Aarav Sharma",
    role: "Senior AI Automation Engineer",
    stage: "Interview (Round 2 Scheduled)",
    tag: "Primary Showcase",
    badgeVariant: "cyan" as const,
    highlights: [
      "Technical Architecture session with Dev Malhotra (Lead AI Architect)",
      "Actionable document upload: Architecture portfolio diagram",
      "Interactive technical prep sheet & reschedule modal",
    ],
  },
  {
    id: "cyn-rohan-731",
    name: "Rohan Verma",
    role: "Machine Learning Intern (GenAI)",
    stage: "Offer Extended 🎉",
    tag: "Celebration State",
    badgeVariant: "success" as const,
    highlights: [
      "Automatic celebratory confetti animation on load",
      "CTC breakdown: ₹45,000/mo stipend + ₹14.5 LPA PPO conversion",
      "Perks: Apple M3 Pro, compute cluster access, and joining Dec 01",
    ],
  },
  {
    id: "cyn-priya-412",
    name: "Priya Patel",
    role: "Full Stack Engineer (Next.js & Cloud)",
    stage: "Screening Review",
    tag: "Under Review",
    badgeVariant: "warning" as const,
    highlights: [
      "Hiring Manager code evaluation in progress",
      "Next step SLA: Feedback within 48 hours",
      "Async engineering calibration survey pending",
    ],
  },
  {
    id: "cyn-ananya-105",
    name: "Ananya Iyer",
    role: "Lead Product Designer (AI UX)",
    stage: "Application Received",
    tag: "Initial Stage",
    badgeVariant: "purple" as const,
    highlights: [
      "Application acknowledged instantly",
      "Portfolio in queue with Design Director",
      "Clear guidance on what happens during screening",
    ],
  },
];

const COMPARISON = [
  {
    feature: "Initial Page Load",
    v1: "Plain unstyled text: 'Loading Application Status Hub...'",
    v2: "High-fidelity skeleton matching 100% of final UI layout + toggle",
  },
  {
    feature: "Stage Progression",
    v1: "No timeline or visual indication of current stage",
    v2: "Animated 4-step stepper (Applied > Screening > Interview > Offer)",
  },
  {
    feature: "Expectation Clarity",
    v1: "Candidate has no idea when they will hear back",
    v2: "'What Happens Next' card with date, team SLA, and .ics calendar sync",
  },
  {
    feature: "Candidate Actions",
    v1: "Candidates email HR repeatedly to upload files or reschedule",
    v2: "Self-serve checklist: document upload dropzone, prep guide & reschedule",
  },
  {
    feature: "Alert Preferences",
    v1: "No candidate alert controls",
    v2: "Instant opt-in for WhatsApp, Email, and SMS with API persistence",
  },
  {
    feature: "Candidate Q&A",
    v1: "Candidates wait days for basic email answers",
    v2: "24/7 AI Assistant grounded strictly on candidate dossier",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12 sm:py-16 space-y-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cynbit-100 dark:bg-cynbit-950/80 border border-cynbit-200 dark:border-cynbit-800 text-cynbit-700 dark:text-cynbit-300 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Cynbit Technologies • Jaipur AI Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
            Application Status Hub <span className="text-cynbit-600 dark:text-cynbit-400">2.0</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Making application status easier to understand with layout-mirroring skeletons, interactive timelines, actionable next steps, and a grounded assistant.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/candidate/cyn-aarav-892">
              <Button size="lg" className="gap-2 text-sm">
                <span>Launch Primary Showcase (Aarav)</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/candidate/cyn-rohan-731">
              <Button variant="outline" size="lg" className="gap-2 text-sm border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950">
                <span>View Offer Celebration State 🎉</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Candidate Personas Showcase Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Test Any Candidate Lifecycle in Under 2 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Select any candidate persona below to review specific milestones, actions, and UI states:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERSONAS.map((p) => (
              <Card
                key={p.id}
                className="border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between hover:border-cynbit-400 dark:hover:border-cynbit-600 transition-all shadow-sm hover:shadow-md group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={p.badgeVariant} className="text-[10px]">
                      {p.tag}
                    </Badge>
                    <span className="font-mono text-[10px] text-slate-400">
                      {p.id}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold group-hover:text-cynbit-600 dark:group-hover:text-cynbit-400 transition-colors">
                    {p.name}
                  </CardTitle>
                  <CardDescription className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {p.role}
                  </CardDescription>
                  <p className="text-xs font-semibold text-cynbit-600 dark:text-cynbit-400 pt-1">
                    {p.stage}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 space-y-3">
                  <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                    {p.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cynbit-500 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/candidate/${p.id}`} className="block pt-2">
                    <Button variant="secondary" size="sm" className="w-full text-xs gap-1 group-hover:bg-cynbit-600 group-hover:text-white transition-all">
                      <span>Open Candidate Hub</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Test Error 404 Button */}
          <div className="flex justify-center pt-2">
            <Link href="/candidate/invalid-id-demo">
              <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:text-rose-600 gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Test 404 Error State & Recovery Page</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Before vs After Comparison */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Before vs. After: The Cynbit 2.0 Transformation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              How Application Status Hub 2.0 clarifies each candidate touchpoint
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                <tr>
                  <th className="p-3.5">Experience Touchpoint</th>
                  <th className="p-3.5 text-rose-600 dark:text-rose-400">Previous Version 1.0</th>
                  <th className="p-3.5 text-emerald-600 dark:text-emerald-400">Hub 2.0 (New)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-600 dark:text-slate-300">
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-slate-100">
                      {row.feature}
                    </td>
                    <td className="p-3.5 text-rose-700 dark:text-rose-400/90 bg-rose-50/30 dark:bg-rose-950/10">
                      {row.v1}
                    </td>
                    <td className="p-3.5 text-emerald-700 dark:text-emerald-400/90 bg-emerald-50/30 dark:bg-emerald-950/10 font-medium">
                      {row.v2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
