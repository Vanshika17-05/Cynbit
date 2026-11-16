"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Clock,
  User,
  AlertTriangle,
  FileCode2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReviewerDemoBarProps {
  currentCandidateId: string;
  forceSkeleton: boolean;
  onToggleForceSkeleton: (val: boolean) => void;
  forceError: boolean;
  onToggleForceError: (val: boolean) => void;
  simulatedDelay: number;
  onDelayChange: (delay: number) => void;
  onRefreshData: () => void;
}

const PERSONAS = [
  { id: "cyn-aarav-892", label: "Aarav (Interview • Action Required)" },
  { id: "cyn-priya-412", label: "Priya (Screening Review)" },
  { id: "cyn-rohan-731", label: "Rohan (Offer Extended 🎉)" },
  { id: "cyn-ananya-105", label: "Ananya (Applied Stage)" },
  { id: "cyn-invalid-999", label: "Invalid ID (Test 404)" },
];

const DELAYS = [
  { value: 0, label: "0ms (Instant)" },
  { value: 800, label: "800ms (Fast 3G)" },
  { value: 2000, label: "2.0s (Realistic)" },
  { value: 3500, label: "3.5s (Slow)" },
];

export function ReviewerDemoBar({
  currentCandidateId,
  forceSkeleton,
  onToggleForceSkeleton,
  forceError,
  onToggleForceError,
  simulatedDelay,
  onDelayChange,
  onRefreshData,
}: ReviewerDemoBarProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handlePersonaSelect = (id: string) => {
    router.push(`/candidate/${id}`);
  };

  return (
    <div className="sticky top-0 z-40 w-full border-b border-cynbit-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 transition-all shadow-2xs">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-2">
          {/* Left Title & Status */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>Reviewer Toolbar</span>
              <Badge variant="cyan" className="text-[10px] py-0 px-1.5 font-normal">
                v2.0 Prototype
              </Badge>
            </span>
          </div>

          {/* Quick Stats & Toggle Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 font-medium transition-colors p-1"
              aria-expanded={isExpanded}
              aria-label="Toggle Reviewer Tools"
            >
              <span>{isExpanded ? "Hide Controls" : "Test Controls (Skeleton, Personas, Delay)"}</span>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Controls Row */}
        {isExpanded && (
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Persona Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium shrink-0 flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>Persona:</span>
              </span>
              <select
                value={currentCandidateId}
                onChange={(e) => handlePersonaSelect(e.target.value)}
                className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-1 focus:ring-cynbit-500"
              >
                {PERSONAS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Delay Selector */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium shrink-0 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Simulated Latency:</span>
              </span>
              <select
                value={simulatedDelay}
                onChange={(e) => onDelayChange(Number(e.target.value))}
                className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-1 focus:ring-cynbit-500"
              >
                {DELAYS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Feature 1 & 6 Toggles */}
            <div className="flex items-center gap-2">
              {/* Force Skeleton Toggle */}
              <button
                type="button"
                onClick={() => onToggleForceSkeleton(!forceSkeleton)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs border transition-colors ${
                  forceSkeleton
                    ? "bg-cynbit-600 text-white border-cynbit-600 shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
                }`}
                aria-pressed={forceSkeleton}
                title="Freeze page in skeleton state to review layout match"
              >
                <Eye className="h-3 w-3" />
                <span>{forceSkeleton ? "Skeleton: Active" : "Inspect Skeleton"}</span>
              </button>

              {/* Force Error Toggle */}
              <button
                type="button"
                onClick={() => onToggleForceError(!forceError)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs border transition-colors ${
                  forceError
                    ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
                }`}
                aria-pressed={forceError}
                title="Test 500 error boundary and recovery retry"
              >
                <AlertTriangle className="h-3 w-3" />
                <span>{forceError ? "500 Error: Active" : "Test Error 500"}</span>
              </button>

              {/* Refresh / Re-fetch */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefreshData}
                className="h-7 px-2 text-xs text-slate-600 dark:text-slate-400 gap-1"
                title="Refetch candidate data from server"
              >
                <RefreshCw className="h-3 w-3" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
