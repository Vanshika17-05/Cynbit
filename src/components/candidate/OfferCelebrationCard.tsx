"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Award,
  CheckCircle2,
  Download,
  Calendar,
  Briefcase,
  MapPin,
  PartyPopper,
} from "lucide-react";
import { CandidateOfferDetails } from "@/types/candidate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface OfferCelebrationCardProps {
  offer: CandidateOfferDetails;
  candidateName: string;
}

export function OfferCelebrationCard({
  offer,
  candidateName,
}: OfferCelebrationCardProps) {
  // Fire confetti when component mounts
  React.useEffect(() => {
    try {
      const count = 200;
      const defaults = {
        origin: { y: 0.6 },
        zIndex: 9999,
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } catch {
      // Graceful fallback if canvas is restricted
    }
  }, []);

  const triggerManualConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    toast.success("🎉 Celebration reloaded!");
  };

  const handleDownloadOffer = () => {
    toast.success("Downloading official offer letter (PDF)...");
  };

  return (
    <Card className="border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-br from-emerald-50/70 via-white to-cynbit-50/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 shadow-md relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      <CardHeader className="pb-3 border-b border-emerald-100 dark:border-emerald-950/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <PartyPopper className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  Congratulations, {candidateName.split(" ")[0]}! 🎉
                </CardTitle>
                <Badge variant="success" className="text-xs">
                  Offer Extended
                </Badge>
              </div>
              <CardDescription className="text-xs sm:text-sm mt-0.5">
                The Cynbit hiring committee is delighted to extend this formal offer to you.
              </CardDescription>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={triggerManualConfetti}
            className="text-xs gap-1 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100/50 self-start sm:self-auto"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Celebrate Again</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-5 space-y-5">
        {/* Key Offer Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Offered Role
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 block">
              {offer.roleTitle}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Compensation / CTC
            </span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
              {offer.annualCTC}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Joining Date & Work Mode
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 block">
              {offer.joiningDate} • {offer.workMode}
            </span>
          </div>
        </div>

        {/* Benefits & Perks */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Included Perks & Cynbit Culture Benefits
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            {offer.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-emerald-100 dark:border-emerald-950/80">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <span>Offer Acceptance Deadline: </span>
            <strong className="text-slate-900 dark:text-slate-100">
              {offer.validTill}
            </strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              onClick={handleDownloadOffer}
              variant="default"
              size="sm"
              className="w-full sm:w-auto text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Official Letter (PDF)</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
