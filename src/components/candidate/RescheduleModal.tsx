"use client";

import * as React from "react";
import { Calendar, Clock, AlertCircle, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RescheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
  onSuccess: (newDate: string, newSlot: string) => void;
}

const TIME_SLOTS = [
  "10:30 AM – 11:30 AM IST (Morning)",
  "02:00 PM – 03:00 PM IST (Afternoon)",
  "04:00 PM – 05:00 PM IST (Late Afternoon)",
  "06:00 PM – 07:00 PM IST (Evening)",
  "Flexible / Any available slot",
];

const REASONS = [
  "Current workplace / project deliverable conflict",
  "College / University semester exams",
  "Medical or personal emergency",
  "Need 1-2 additional days to prepare technical architecture",
  "Other reason (specified in note)",
];

export function RescheduleModal({
  open,
  onOpenChange,
  candidateId,
  onSuccess,
}: RescheduleModalProps) {
  const [preferredDate, setPreferredDate] = React.useState("");
  const [preferredSlot, setPreferredSlot] = React.useState(TIME_SLOTS[1]);
  const [reason, setReason] = React.useState(REASONS[0]);
  const [note, setNote] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  // Set default date to 3 days from now
  React.useEffect(() => {
    if (open) {
      const target = new Date();
      target.setDate(target.getDate() + 3);
      setPreferredDate(target.toISOString().split("T")[0]);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferredDate) {
      toast.error("Please pick your preferred alternative date.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId,
          preferredDate,
          preferredTimeSlot: preferredSlot,
          reason,
          note,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Reschedule request submitted successfully!");
        onSuccess(preferredDate, preferredSlot);
        onOpenChange(false);
      } else {
        toast.error(data.error || "Failed to submit reschedule request.");
      }
    } catch {
      toast.error("Network error while submitting reschedule request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-cynbit-600 dark:text-cynbit-400" />
          <DialogTitle>Request Interview Reschedule</DialogTitle>
        </div>
        <DialogDescription>
          We know unexpected conflicts happen. Pick your preferred slot below.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        {/* Psychological safety banner */}
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 p-3 flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold">Candidate Guarantee:</span> Rescheduling never penalizes or disadvantages your application. We want you to interview when you feel at your best!
          </p>
        </div>

        {/* Date Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Preferred Date
          </label>
          <input
            type="date"
            required
            value={preferredDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-xs focus:border-cynbit-500 focus:outline-none focus:ring-2 focus:ring-cynbit-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        {/* Preferred Slot */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Preferred Time Window (IST)
          </label>
          <select
            value={preferredSlot}
            onChange={(e) => setPreferredSlot(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-xs focus:border-cynbit-500 focus:outline-none focus:ring-2 focus:ring-cynbit-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Reason Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Primary Reason
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-xs focus:border-cynbit-500 focus:outline-none focus:ring-2 focus:ring-cynbit-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Note */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Additional Note for Recruiter (Optional)
          </label>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Wednesday afternoon or Friday morning also works well for me..."
            className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-900 shadow-xs focus:border-cynbit-500 focus:outline-none focus:ring-2 focus:ring-cynbit-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={submitting}>
            Send Reschedule Request
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
