"use client";

import * as React from "react";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { CandidateRecruiter } from "@/types/candidate";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface RecruiterCardProps {
  recruiter: CandidateRecruiter;
  candidateId: string;
  candidateName: string;
}

export function RecruiterCard({
  recruiter,
  candidateId,
  candidateName,
}: RecruiterCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recruiter.email);
    setCopied(true);
    toast.success("Recruiter email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoSubject = encodeURIComponent(
    `Application Status Inquiry - ${candidateName} (${candidateId})`
  );
  const mailtoBody = encodeURIComponent(
    `Hi ${recruiter.name.split(" ")[0]},\n\nI am checking in on my application status for Candidate ID: ${candidateId}.\n\nBest regards,\n${candidateName}`
  );

  return (
    <Card className="border-slate-200/80 dark:border-slate-800/80 shadow-sm relative overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
            Dedicated Talent Partner
          </CardTitle>
          <Badge variant="success" className="text-[11px] py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Recruiter Identity */}
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div
              className="h-14 w-14 rounded-full bg-gradient-to-tr from-cynbit-600 via-cynbit-500 to-cyan-400 text-white flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white dark:border-slate-800"
              aria-label={recruiter.name}
            >
              {recruiter.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div
              className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"
              title="Online during office hours"
            />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {recruiter.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {recruiter.title}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
              <span>Jaipur Hub</span>
            </div>
          </div>
        </div>

        {/* Recruiter Quote / Bio */}
        {recruiter.bio && (
          <p className="text-xs italic text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
            &ldquo;{recruiter.bio}&rdquo;
          </p>
        )}

        {/* SLA Guarantee Box */}
        <div className="rounded-lg bg-emerald-50/70 border border-emerald-200/80 p-2.5 dark:bg-emerald-950/30 dark:border-emerald-900/60 flex items-start gap-2">
          <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-emerald-900 dark:text-emerald-200 block">
              Direct Contact SLA:
            </span>
            <span className="text-emerald-800 dark:text-emerald-300">
              {recruiter.sla}
            </span>
          </div>
        </div>

        {/* Contact CTA buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`mailto:${recruiter.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold bg-cynbit-600 hover:bg-cynbit-700 text-white py-2 px-3 shadow-sm transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email Direct</span>
          </a>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyEmail}
            className="text-xs gap-1.5"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

