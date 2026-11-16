"use client";

import * as React from "react";
import {
  Clock,
  Sparkles,
  CalendarCheck2,
  CheckCircle,
  HelpCircle,
  Download,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import { CandidateNextStep, OverallStatus } from "@/types/candidate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WhatHappensNextCardProps {
  nextStep: CandidateNextStep;
  overallStatus: OverallStatus;
  candidateName: string;
  candidateId: string;
}

export function WhatHappensNextCard({
  nextStep,
  overallStatus,
  candidateName,
  candidateId,
}: WhatHappensNextCardProps) {
  // Generate downloadable .ics calendar invite for the candidate
  const handleAddToCalendar = () => {
    try {
      const calendarContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Cynbit Technologies//Application Hub 2.0//EN",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        `SUMMARY:Cynbit Technologies - ${nextStep.title}`,
        `DESCRIPTION:${nextStep.description.replace(/\n/g, " ")}\\n\\nCandidate: ${candidateName} (${candidateId})`,
        "LOCATION:Google Meet / Cynbit Jaipur",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([calendarContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Cynbit_${candidateId}_Next_Step.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Calendar invite (.ics) downloaded. Open it to sync with Google / Outlook!");
    } catch {
      toast.error("Failed to generate calendar invite.");
    }
  };

  return (
    <Card className="border-cynbit-200/80 dark:border-cynbit-900/50 shadow-sm relative overflow-hidden">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cynbit-500 via-cyan-400 to-indigo-500" />

      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-cynbit-100 dark:bg-cynbit-950/80 flex items-center justify-center text-cynbit-600 dark:text-cynbit-400">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                What Happens Next?
              </CardTitle>
              <CardDescription className="text-xs">
                Clear expectations & timeline so you never have to wonder
              </CardDescription>
            </div>
          </div>

          <Badge variant="cyan" className="self-start sm:self-auto text-xs py-1 px-2.5">
            <Sparkles className="h-3 w-3 mr-1" />
            Next Milestone
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Core Next Step Highlight Box */}
        <div className="rounded-xl border border-cynbit-100 bg-cynbit-50/50 p-4 dark:border-cynbit-950/80 dark:bg-cynbit-950/30">
          <h4 className="text-sm sm:text-base font-bold text-cynbit-950 dark:text-cynbit-100">
            {nextStep.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
            {nextStep.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-cynbit-200/50 dark:border-cynbit-900/50 text-xs">
            <div className="flex items-center gap-2">
              <CalendarCheck2 className="h-4 w-4 text-cynbit-600 dark:text-cynbit-400 shrink-0" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                  Expected Timeframe
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {nextStep.expectedTimeframe}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-cynbit-600 dark:text-cynbit-400 shrink-0" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                  Responsible Team
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {nextStep.responsibleParty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preparation Tips */}
        {nextStep.tips && nextStep.tips.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pro-Tips For Success
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {nextStep.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Need to add this to your personal schedule?
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCalendar}
            className="text-xs gap-1.5 border-cynbit-200 dark:border-cynbit-800 hover:bg-cynbit-50 dark:hover:bg-cynbit-950"
          >
            <Download className="h-3.5 w-3.5 text-cynbit-600 dark:text-cynbit-400" />
            <span>Save to Calendar (.ics)</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

