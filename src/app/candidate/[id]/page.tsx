"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, RotateCcw } from "lucide-react";
import { CandidateProfile, NotificationPreferences } from "@/types/candidate";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CandidateHero } from "@/components/candidate/CandidateHero";
import { CandidateSkeleton } from "@/components/candidate/CandidateSkeleton";
import { CandidateNotFound } from "@/components/candidate/CandidateNotFound";
import { ProgressTimeline } from "@/components/candidate/ProgressTimeline";
import { WhatHappensNextCard } from "@/components/candidate/WhatHappensNextCard";
import { RecruiterCard } from "@/components/candidate/RecruiterCard";
import { ActionChecklist } from "@/components/candidate/ActionChecklist";
import { RescheduleModal } from "@/components/candidate/RescheduleModal";
import { NotificationPreferencesCard } from "@/components/candidate/NotificationPreferencesCard";
import { AiApplicationAssistant } from "@/components/candidate/AiApplicationAssistant";
import { OfferCelebrationCard } from "@/components/candidate/OfferCelebrationCard";
import { ReviewerDemoBar } from "@/components/candidate/ReviewerDemoBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function CandidateHubPage() {
  const params = useParams();
  const router = useRouter();
  const candidateId = typeof params.id === "string" ? params.id : "cyn-aarav-892";

  const [candidate, setCandidate] = React.useState<CandidateProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [errorStatus, setErrorStatus] = React.useState<number | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Reviewer testing controls
  const [forceSkeleton, setForceSkeleton] = React.useState(false);
  const [forceError, setForceError] = React.useState(false);
  const [simulatedDelay, setSimulatedDelay] = React.useState(0);
  const [isRescheduleOpen, setIsRescheduleOpen] = React.useState(false);

  const fetchCandidate = React.useCallback(async () => {
    setLoading(true);
    setErrorStatus(null);
    setErrorMessage(null);

    try {
      const url = `/api/candidate/${encodeURIComponent(candidateId)}?delay=${simulatedDelay}${
        forceError ? "&forceError=true" : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (res.status === 404) {
        setErrorStatus(404);
        setErrorMessage(data.error || "Candidate not found");
        setCandidate(null);
      } else if (!res.ok || !data.success) {
        setErrorStatus(res.status || 500);
        setErrorMessage(data.error || "Failed to load candidate application details");
        setCandidate(null);
      } else {
        setCandidate(data.candidate);
        setErrorStatus(null);
        setErrorMessage(null);
      }
    } catch (err: any) {
      setErrorStatus(500);
      setErrorMessage(err.message || "Network error while connecting to Cynbit servers.");
    } finally {
      setLoading(false);
    }
  }, [candidateId, simulatedDelay, forceError]);

  React.useEffect(() => {
    fetchCandidate();
  }, [fetchCandidate]);

  const handlePreferencesUpdated = (prefs: NotificationPreferences) => {
    if (candidate) {
      setCandidate({
        ...candidate,
        notificationPreferences: prefs,
      });
    }
  };

  const handleChecklistUpdate = (
    actionId: string,
    status: "completed" | "pending",
    fileName?: string
  ) => {
    if (candidate) {
      const updatedChecklist = candidate.checklist.map((item) => {
        if (item.id === actionId) {
          return {
            ...item,
            status,
            meta: fileName
              ? { ...item.meta, uploadedFileName: fileName, uploadedAt: new Date().toISOString() }
              : item.meta,
          };
        }
        return item;
      });
      setCandidate({ ...candidate, checklist: updatedChecklist });
    }
  };

  const handleRescheduleSuccess = (newDate: string, newSlot: string) => {
    if (candidate) {
      setCandidate({
        ...candidate,
        overallStatus: "in_review",
        overallStatusLabel: `Reschedule Requested (${newDate})`,
        nextStep: {
          ...candidate.nextStep,
          title: "Reschedule Request Under Review",
          description: `You requested to reschedule to ${newDate} (${newSlot}). Pooja Rathore is syncing with the interview panel and will issue updated Google Meet invites shortly.`,
          expectedTimeframe: "Within ~4 hours",
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Reviewer Demo Bar */}
      <ReviewerDemoBar
        currentCandidateId={candidateId}
        forceSkeleton={forceSkeleton}
        onToggleForceSkeleton={setForceSkeleton}
        forceError={forceError}
        onToggleForceError={(val) => {
          setForceError(val);
          // Refetch with new force error value
        }}
        simulatedDelay={simulatedDelay}
        onDelayChange={(d) => setSimulatedDelay(d)}
        onRefreshData={fetchCandidate}
      />

      {/* Main Navbar */}
      <Navbar candidateId={candidate?.id} />

      {/* Main Hub Body */}
      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 space-y-8">
        {/* Render Skeleton if loading OR forceSkeleton active */}
        {loading || forceSkeleton ? (
          <CandidateSkeleton />
        ) : errorStatus === 404 ? (
          <CandidateNotFound attemptedId={candidateId} />
        ) : errorStatus !== null || !candidate ? (
          /* Server Error State (500) */
          <div className="min-h-[50vh] flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-rose-200 dark:border-rose-900/60 shadow-lg text-center p-6">
              <div className="mx-auto h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-3">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Application Hub Temporarily Unavailable
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-4">
                {errorMessage || "We encountered an issue fetching your live dossier. Please retry."}
              </p>
              <Button
                onClick={() => {
                  setForceError(false);
                  fetchCandidate();
                }}
                className="gap-2 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retry Connection</span>
              </Button>
            </Card>
          </div>
        ) : (
          /* Valid Candidate Loaded State */
          <>
            {/* Hero Section */}
            <CandidateHero candidate={candidate} />

            {/* Offer Celebration Banner (If Candidate is in Offer Stage) */}
            {candidate.currentStage === "offer" && candidate.offerDetails && (
              <OfferCelebrationCard
                offer={candidate.offerDetails}
                candidateName={candidate.fullName}
              />
            )}

            {/* Visual Progress Timeline (Feature 2) */}
            <ProgressTimeline
              timeline={candidate.timeline}
              currentStage={candidate.currentStage}
              candidateName={candidate.fullName}
            />

            {/* Main 2-Column Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (8 cols): What Next + Action Checklist */}
              <div className="lg:col-span-8 space-y-6">
                {/* What Happens Next Card (Feature 3) */}
                <WhatHappensNextCard
                  nextStep={candidate.nextStep}
                  overallStatus={candidate.overallStatus}
                  candidateName={candidate.fullName}
                  candidateId={candidate.id}
                />

                {/* Action Checklist (Feature 4) */}
                <ActionChecklist
                  checklist={candidate.checklist}
                  candidateId={candidate.id}
                  onRequestReschedule={() => setIsRescheduleOpen(true)}
                  onChecklistUpdate={handleChecklistUpdate}
                />
              </div>

              {/* Right Column (4 cols): Recruiter + Notifications + AI Assistant */}
              <div className="lg:col-span-4 space-y-6">
                {/* Recruiter Contact Card (Feature 3) */}
                <RecruiterCard
                  recruiter={candidate.recruiter}
                  candidateId={candidate.id}
                  candidateName={candidate.fullName}
                />

                {/* Notification Preferences Card (Feature 5) */}
                <NotificationPreferencesCard
                  preferences={candidate.notificationPreferences}
                  candidateId={candidate.id}
                  onPreferencesUpdated={handlePreferencesUpdated}
                />

                {/* AI Application Assistant Chat (Feature 8) */}
                <AiApplicationAssistant candidate={candidate} />
              </div>
            </div>

            {/* Reschedule Modal */}
            <RescheduleModal
              open={isRescheduleOpen}
              onOpenChange={setIsRescheduleOpen}
              candidateId={candidate.id}
              onSuccess={handleRescheduleSuccess}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

