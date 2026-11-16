"use client";

import * as React from "react";
import {
  Calendar,
  MapPin,
  Briefcase,
  Copy,
  Check,
  Building2,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { CandidateProfile, OverallStatus } from "@/types/candidate";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface CandidateHeroProps {
  candidate: CandidateProfile;
}

export function CandidateHero({ candidate }: CandidateHeroProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(candidate.id);
    setCopied(true);
    toast.success(`Candidate ID "${candidate.id}" copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: OverallStatus) => {
    switch (status) {
      case "offer_extended":
        return {
          variant: "success" as const,
          label: candidate.overallStatusLabel || "Offer Extended 🎉",
        };
      case "action_required":
        return {
          variant: "warning" as const,
          label: candidate.overallStatusLabel || "Action Required",
        };
      case "interview_scheduled":
        return {
          variant: "cyan" as const,
          label: candidate.overallStatusLabel || "Interview Scheduled",
        };
      default:
        return {
          variant: "default" as const,
          label: candidate.overallStatusLabel || "Under Active Review",
        };
    }
  };

  const statusBadge = getStatusBadge(candidate.overallStatus);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/60 transition-colors">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-cynbit-400/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between relative z-10">
        <div className="space-y-3">
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={statusBadge.variant} className="text-xs py-0.5 px-2.5 font-semibold">
              <span className="h-2 w-2 rounded-full bg-current mr-1.5 animate-pulse" />
              {statusBadge.label}
            </Badge>

            <button
              onClick={handleCopyId}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80 px-2.5 py-0.5 text-xs font-mono text-slate-600 dark:text-slate-300 hover:border-cynbit-400 transition-colors"
              title="Click to copy Candidate ID"
            >
              <span>ID: {candidate.id}</span>
              {copied ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3 text-slate-400" />
              )}
            </button>
          </div>

          {/* Candidate Name & Role */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              {candidate.fullName}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-cynbit-600 dark:text-cynbit-400 mt-1 flex items-center gap-2">
              <span>{candidate.role}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-normal">
                {candidate.department}
              </span>
            </p>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Applied {formatDate(candidate.appliedDate)}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>{candidate.location}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-slate-400" />
              <span>{candidate.experienceLevel}</span>
            </div>
          </div>
        </div>

        {/* Tags or High-Level Pill */}
        <div className="flex flex-wrap md:flex-col items-start md:items-end gap-1.5 shrink-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Hiring Stream
          </span>
          <div className="flex flex-wrap gap-1.5 md:justify-end">
            {candidate.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

