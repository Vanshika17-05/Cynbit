"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  CircleDot,
  Calendar,
  ChevronDown,
  Video,
  Award,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { StageMilestone, StageKey } from "@/types/candidate";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";

interface ProgressTimelineProps {
  timeline: StageMilestone[];
  currentStage: StageKey;
  candidateName: string;
}

const STAGE_ORDER: StageKey[] = ["applied", "screening", "interview", "offer"];

export function ProgressTimeline({
  timeline,
  currentStage,
  candidateName,
}: ProgressTimelineProps) {
  const [selectedMilestone, setSelectedMilestone] = React.useState<string | null>(
    () => {
      // Default open the active milestone
      const active = timeline.find((m) => m.key === currentStage);
      return active ? active.id : timeline[0]?.id || null;
    }
  );

  const currentStageIndex = STAGE_ORDER.indexOf(currentStage);
  const progressPercent = Math.min(
    100,
    Math.round(((currentStageIndex + 0.5) / STAGE_ORDER.length) * 100)
  );

  return (
    <Card className="border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/60 bg-gradient-to-r from-slate-50/80 via-white to-cynbit-50/30 dark:from-slate-900/80 dark:via-slate-900 dark:to-cynbit-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Application Progress
              </CardTitle>
              <Badge variant="cyan" className="font-medium text-xs">
                Stage {currentStageIndex + 1} of 4
              </Badge>
            </div>
            <CardDescription className="text-xs sm:text-sm mt-0.5">
              Live recruitment pipeline for <span className="font-semibold text-slate-700 dark:text-slate-300">{candidateName}</span>
            </CardDescription>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Pipeline Completion:
            </span>
            <span className="text-xs font-bold text-cynbit-600 dark:text-cynbit-400 bg-cynbit-50 dark:bg-cynbit-950/50 px-2 py-0.5 rounded-full border border-cynbit-200/60 dark:border-cynbit-800/60">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Global Progress Track Bar */}
        <div className="w-full bg-slate-200/70 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-cynbit-500 to-emerald-500 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-6 pb-6">
        {/* Desktop Horizontal Stepper */}
        <div className="hidden md:block relative mb-4">
          <div className="grid grid-cols-4 relative" role="list" aria-label="Application milestones">
            {timeline.map((step, idx) => {
              const isCompleted = step.status === "completed";
              const isCurrent = step.key === currentStage;
              const isUpcoming = step.status === "upcoming";
              const isExpanded = selectedMilestone === step.id;

              return (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center text-center group"
                  role="listitem"
                >
                  {/* Step Connector Line */}
                  {idx < timeline.length - 1 && (
                    <div
                      className="absolute top-5 left-1/2 w-full h-[2px] -z-0"
                      aria-hidden="true"
                    >
                      <div
                        className={cn(
                          "h-full w-full transition-colors duration-500",
                          isCompleted
                            ? "bg-emerald-500"
                            : isCurrent
                            ? "bg-gradient-to-r from-emerald-500 to-slate-200 dark:to-slate-800"
                            : "bg-slate-200 dark:bg-slate-800"
                        )}
                      />
                    </div>
                  )}

                  {/* Step Circle Button */}
                  <button
                    onClick={() =>
                      setSelectedMilestone(isExpanded ? null : step.id)
                    }
                    className={cn(
                      "relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cynbit-500 focus:ring-offset-2",
                      isCompleted &&
                        "border-emerald-500 bg-emerald-500 text-white shadow-sm hover:scale-105",
                      isCurrent &&
                        "border-cynbit-500 bg-white text-cynbit-600 shadow-lg shadow-cynbit-500/20 ring-4 ring-cynbit-500/20 dark:bg-slate-900 dark:text-cynbit-400 hover:scale-105 animate-pulse-subtle",
                      isUpcoming &&
                        "border-slate-300 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 hover:border-slate-400"
                    )}
                    aria-label={`Milestone: ${step.title}. Status: ${step.status}`}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                    ) : isCurrent ? (
                      <CircleDot className="h-6 w-6 stroke-[2.5]" />
                    ) : (
                      <span className="text-xs font-semibold">{idx + 1}</span>
                    )}
                  </button>

                  {/* Label & Date */}
                  <div className="mt-3 space-y-1 px-2">
                    <button
                      onClick={() =>
                        setSelectedMilestone(isExpanded ? null : step.id)
                      }
                      className="group-hover:text-cynbit-600 dark:group-hover:text-cynbit-400 transition-colors"
                    >
                      <p
                        className={cn(
                          "text-sm font-semibold leading-tight",
                          isCurrent
                            ? "text-cynbit-600 dark:text-cynbit-400 font-bold"
                            : isCompleted
                            ? "text-slate-800 dark:text-slate-200"
                            : "text-slate-400 dark:text-slate-500"
                        )}
                      >
                        {step.shortTitle}
                      </p>
                    </button>

                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <Calendar className="h-3 w-3 shrink-0" />
                      <span>{formatDate(step.date)}</span>
                    </div>

                    {isCurrent && (
                      <Badge variant="cyan" className="text-[10px] py-0 px-2">
                        Active Stage
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge variant="success" className="text-[10px] py-0 px-2">
                        Completed
                      </Badge>
                    )}
                    {isUpcoming && (
                      <Badge variant="outline" className="text-[10px] py-0 px-2 opacity-70">
                        Upcoming
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="md:hidden space-y-6" role="list" aria-label="Application milestones">
          {timeline.map((step, idx) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.key === currentStage;
            const isUpcoming = step.status === "upcoming";
            const isExpanded = selectedMilestone === step.id;

            return (
              <div key={step.id} className="relative flex items-start gap-4" role="listitem">
                {/* Vertical Connector Line */}
                {idx < timeline.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-4 top-9 -bottom-6 w-0.5 -z-0",
                      isCompleted ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
                    )}
                    aria-hidden="true"
                  />
                )}

                {/* Circle Icon */}
                <button
                  onClick={() => setSelectedMilestone(isExpanded ? null : step.id)}
                  className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                    isCompleted && "border-emerald-500 bg-emerald-500 text-white",
                    isCurrent &&
                      "border-cynbit-500 bg-white text-cynbit-600 ring-4 ring-cynbit-500/20 dark:bg-slate-900 dark:text-cynbit-400",
                    isUpcoming && "border-slate-300 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800"
                  )}
                  aria-label={`Milestone: ${step.title}. Status: ${step.status}`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : isCurrent ? (
                    <CircleDot className="h-4 w-4" />
                  ) : (
                    <span className="text-[11px] font-semibold">{idx + 1}</span>
                  )}
                </button>

                {/* Details */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedMilestone(isExpanded ? null : step.id)}
                      className="font-semibold text-sm text-left hover:text-cynbit-600 transition-colors"
                    >
                      {step.title}
                    </button>
                    {isCurrent && (
                      <Badge variant="cyan" className="text-[10px]">
                        Active
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge variant="success" className="text-[10px]">
                        Done
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(step.date)}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Milestone Deep-Dive Box */}
        <AnimatePresence mode="wait">
          {selectedMilestone && (
            <motion.div
              key={selectedMilestone}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/60"
            >
              {(() => {
                const milestone = timeline.find((m) => m.id === selectedMilestone);
                if (!milestone) return null;

                return (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/60 pb-3 dark:border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                            {milestone.title}
                          </h4>
                          <span className="text-xs text-slate-500">
                            • {formatDate(milestone.date)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          {milestone.description}
                        </p>
                      </div>

                      {milestone.details?.score && (
                        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <Award className="h-4 w-4" />
                          <span>Screening Rating: {milestone.details.score}</span>
                        </div>
                      )}
                    </div>

                    {/* Milestone Highlights & Bullets */}
                    {milestone.details?.bullets && (
                      <div className="space-y-2 pt-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Key Focus & Outcomes
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                          {milestone.details.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cynbit-500 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Interview details if present */}
                    {milestone.details?.scheduledTime && (
                      <div className="rounded-lg bg-cynbit-50/60 dark:bg-cynbit-950/30 border border-cynbit-200/70 dark:border-cynbit-800/60 p-3 mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-semibold text-cynbit-900 dark:text-cynbit-200">
                            <Clock className="h-3.5 w-3.5 text-cynbit-600" />
                            <span>{milestone.details.scheduledTime}</span>
                          </div>
                          {milestone.details.meetingPlatform && (
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {milestone.details.meetingPlatform}
                            </p>
                          )}
                        </div>

                        {milestone.details.meetingLink && (
                          <a
                            href={milestone.details.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-cynbit-600 hover:bg-cynbit-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
                          >
                            <Video className="h-3.5 w-3.5" />
                            <span>Join Meeting</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Interviewers Profile preview */}
                    {milestone.details?.interviewers && milestone.details.interviewers.length > 0 && (
                      <div className="pt-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                          Your Interview Panel
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {milestone.details.interviewers.map((person, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2.5 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs shadow-2xs"
                            >
                              <img
                                src={person.avatar}
                                alt={person.name}
                                className="h-7 w-7 rounded-full object-cover border border-slate-200"
                              />
                              <div>
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                  {person.name}
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                  {person.role}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

