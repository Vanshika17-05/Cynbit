"use client";

import * as React from "react";
import { BookOpen, CheckCircle, Lightbulb, FileText, Download } from "lucide-react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ActionChecklistItem } from "@/types/candidate";
import { toast } from "sonner";

interface PrepGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ActionChecklistItem | null;
  candidateId: string;
  onMarkReviewed: (actionId: string) => void;
}

export function PrepGuideModal({
  open,
  onOpenChange,
  item,
  candidateId,
  onMarkReviewed,
}: PrepGuideModalProps) {
  const [marking, setMarking] = React.useState(false);

  if (!item) return null;

  const handleMarkComplete = async () => {
    setMarking(true);
    try {
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId,
          actionId: item.id,
          status: "completed",
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Prep guide marked as reviewed!");
        onMarkReviewed(item.id);
        onOpenChange(false);
      }
    } catch {
      toast.error("Failed to update status");
    } finally {
      setMarking(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-cynbit-600 dark:text-cynbit-400" />
          <DialogTitle>{item.title}</DialogTitle>
        </div>
        <DialogDescription>
          Cynbit Technologies Interview Rubric & Practical Architecture Guide
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <div className="rounded-xl bg-cynbit-50/70 dark:bg-cynbit-950/40 border border-cynbit-200/60 dark:border-cynbit-900/60 p-4">
          <h4 className="font-bold text-cynbit-950 dark:text-cynbit-200 flex items-center gap-1.5 mb-1">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Our Interview Philosophy
          </h4>
          <p className="leading-relaxed">
            At Cynbit, we do not quiz candidates on LeetCode trivia. Our goal is to simulate a realistic engineering day: how you reason about multi-agent tool calls, how you manage token overhead, and how you design reliable fallbacks when LLM APIs fail.
          </p>
        </div>

        {item.meta?.prepTopics && (
          <div className="space-y-2">
            <p className="font-bold uppercase tracking-wider text-[11px] text-slate-500">
              Core Technical Discussion Topics
            </p>
            <div className="space-y-2">
              {item.meta.prepTopics.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {topic}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3 space-y-1">
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Recommended Environment Setup
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <li>Have your favorite IDE / diagramming tool (Excalidraw, Figma, or pen-paper) open</li>
            <li>Stable internet connection and Google Meet permissions verified</li>
            <li>Feel free to have your personal GitHub or project notes handy for reference</li>
          </ul>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
        <Button
          onClick={handleMarkComplete}
          isLoading={marking}
          disabled={item.status === "completed"}
          variant={item.status === "completed" ? "secondary" : "default"}
        >
          {item.status === "completed" ? "Already Reviewed ✓" : "Mark as Reviewed"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
