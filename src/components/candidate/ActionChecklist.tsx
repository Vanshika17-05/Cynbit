"use client";

import * as React from "react";
import {
  CheckCircle2,
  Circle,
  Upload,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  FileCheck,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { ActionChecklistItem } from "@/types/candidate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocumentUploadModal } from "./DocumentUploadModal";
import { PrepGuideModal } from "./PrepGuideModal";
import { cn } from "@/lib/utils";

interface ActionChecklistProps {
  checklist: ActionChecklistItem[];
  candidateId: string;
  onRequestReschedule: () => void;
  onChecklistUpdate: (actionId: string, status: "completed" | "pending", fileName?: string) => void;
}

export function ActionChecklist({
  checklist,
  candidateId,
  onRequestReschedule,
  onChecklistUpdate,
}: ActionChecklistProps) {
  const [activeUploadItem, setActiveUploadItem] = React.useState<ActionChecklistItem | null>(null);
  const [activePrepItem, setActivePrepItem] = React.useState<ActionChecklistItem | null>(null);

  const completedCount = checklist.filter((i) => i.status === "completed").length;
  const totalCount = checklist.length;
  const allDone = totalCount > 0 && completedCount === totalCount;

  if (totalCount === 0) {
    return (
      <Card className="border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg font-bold">Action Checklist</CardTitle>
          <CardDescription className="text-xs">
            Tasks, document requests, and interview milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <p className="font-semibold">No pending actions required right now</p>
              <p className="text-emerald-700/80 dark:text-emerald-400 mt-0.5">
                Sit tight! Our hiring team is reviewing your profile and will update this hub as soon as the next step opens.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleActionClick = (item: ActionChecklistItem) => {
    if (item.type === "document_upload") {
      setActiveUploadItem(item);
    } else if (item.type === "prep_guide") {
      setActivePrepItem(item);
    } else if (item.type === "reschedule") {
      onRequestReschedule();
    }
  };

  return (
    <>
      <Card className="border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  Action Checklist
                </CardTitle>
                <Badge
                  variant={allDone ? "success" : "warning"}
                  className="text-xs font-semibold"
                >
                  {completedCount} of {totalCount} Completed
                </Badge>
              </div>
              <CardDescription className="text-xs mt-0.5">
                Complete these items to keep your candidacy moving forward without delays
              </CardDescription>
            </div>

            {allDone && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 self-start sm:self-auto">
                <CheckCircle2 className="h-3.5 w-3.5" />
                All set for now!
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {checklist.map((item) => {
            const isCompleted = item.status === "completed";
            const isOptional = item.status === "optional";

            return (
              <div
                key={item.id}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-150",
                  isCompleted
                    ? "border-emerald-200/80 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/15"
                    : "border-slate-200 bg-white hover:border-cynbit-300 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700"
                )}
              >
                {/* Item Info */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : isOptional ? (
                      <Clock className="h-5 w-5 text-slate-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-amber-500 stroke-[2.5]" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={cn(
                          "text-sm font-semibold text-slate-900 dark:text-slate-100",
                          isCompleted && "line-through text-slate-500 dark:text-slate-400"
                        )}
                      >
                        {item.title}
                      </h4>
                      {item.dueDate && !isCompleted && (
                        <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-900 px-2 py-0.5 rounded-full">
                          Due {item.dueDate}
                        </span>
                      )}
                      {isOptional && !isCompleted && (
                        <span className="text-[11px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                          Flexible / Optional
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>

                    {item.meta?.uploadedFileName && (
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-medium pt-0.5">
                        <FileCheck className="h-3 w-3" />
                        Uploaded: {item.meta.uploadedFileName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="self-end sm:self-center shrink-0">
                  <Button
                    variant={isCompleted ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleActionClick(item)}
                    className={cn(
                      "text-xs gap-1.5",
                      isCompleted &&
                        "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    {item.type === "document_upload" && (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    {item.type === "prep_guide" && (
                      <BookOpen className="h-3.5 w-3.5" />
                    )}
                    {item.type === "reschedule" && (
                      <Calendar className="h-3.5 w-3.5" />
                    )}
                    <span>
                      {isCompleted ? "View / Update" : item.actionLabel}
                    </span>
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Document Upload Modal */}
      <DocumentUploadModal
        open={!!activeUploadItem}
        onOpenChange={(open) => !open && setActiveUploadItem(null)}
        item={activeUploadItem}
        candidateId={candidateId}
        onSuccess={(actionId, fileName) => {
          onChecklistUpdate(actionId, "completed", fileName);
        }}
      />

      {/* Prep Guide Modal */}
      <PrepGuideModal
        open={!!activePrepItem}
        onOpenChange={(open) => !open && setActivePrepItem(null)}
        item={activePrepItem}
        candidateId={candidateId}
        onMarkReviewed={(actionId) => {
          onChecklistUpdate(actionId, "completed");
        }}
      />
    </>
  );
}

