"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, UserX, ArrowRight, HelpCircle, Mail, RotateCcw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CandidateNotFoundProps {
  attemptedId: string;
}

const DEMO_PERSONAS = [
  {
    id: "cyn-aarav-892",
    name: "Aarav Sharma",
    role: "Senior AI Automation Engineer",
    stage: "Interview (Round 2 Scheduled)",
    badge: "Most Comprehensive",
  },
  {
    id: "cyn-rohan-731",
    name: "Rohan Verma",
    role: "ML Intern (GenAI)",
    stage: "Offer Extended 🎉",
    badge: "Celebration State",
  },
  {
    id: "cyn-priya-412",
    name: "Priya Patel",
    role: "Full Stack Engineer",
    stage: "Screening Review",
    badge: "Under Review",
  },
  {
    id: "cyn-ananya-105",
    name: "Ananya Iyer",
    role: "Lead Product Designer",
    stage: "Application Received",
    badge: "Initial Stage",
  },
];

export function CandidateNotFound({ attemptedId }: CandidateNotFoundProps) {
  const router = useRouter();
  const [searchId, setSearchId] = React.useState(attemptedId || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      router.push(`/candidate/${encodeURIComponent(searchId.trim())}`);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <Card className="max-w-xl w-full border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Top Accent Warning Bar */}
        <div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

        <CardHeader className="text-center pb-4 pt-8">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3 shadow-inner">
            <UserX className="h-8 w-8" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Candidate Application Not Found
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm max-w-md mx-auto mt-1">
            We couldn&apos;t locate an active candidate record for identifier{" "}
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              &quot;{attemptedId}&quot;
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Quick Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter valid Candidate ID (e.g. cyn-aarav-892)"
                className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 shadow-xs focus:border-cynbit-500 focus:outline-none focus:ring-2 focus:ring-cynbit-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>

          {/* Quick Reviewer Demo Personas */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
              Or Try One of Our Verified Demo Personas
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DEMO_PERSONAS.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => router.push(`/candidate/${persona.id}`)}
                  className="p-3 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 hover:bg-cynbit-50/60 dark:bg-slate-900/40 dark:hover:bg-slate-800/80 hover:border-cynbit-300 dark:hover:border-cynbit-700 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 group-hover:text-cynbit-600 dark:group-hover:text-cynbit-400">
                      {persona.name}
                    </span>
                    <span className="text-[10px] font-medium bg-cynbit-100 dark:bg-cynbit-950 text-cynbit-700 dark:text-cynbit-300 px-1.5 py-0.5 rounded">
                      {persona.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                    {persona.role}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-cynbit-600 dark:text-cynbit-400 font-medium mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-800">
                    <span>{persona.stage}</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-500">
            Think this is an error? Reach out to HR:
          </span>
          <a
            href="mailto:careers@cynbit.in?subject=Missing%20Candidate%20Record"
            className="inline-flex items-center gap-1.5 font-semibold text-cynbit-600 dark:text-cynbit-400 hover:underline"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>careers@cynbit.in</span>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

