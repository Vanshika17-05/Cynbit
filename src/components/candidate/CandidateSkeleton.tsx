"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CandidateSkeleton() {
  return (
    <div
      className="space-y-8 animate-in fade-in duration-300"
      aria-busy="true"
      aria-live="polite"
      role="region"
      aria-label="Loading candidate application status hub"
    >
      {/* Candidate Hero Banner Skeleton */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/60 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-36 rounded-full" />
            </div>
            <Skeleton className="h-9 w-64 sm:w-80 rounded-lg" />
            <Skeleton className="h-5 w-48 sm:w-60" />
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Progress Timeline Card Skeleton */}
      <Card className="border-slate-200/80 dark:border-slate-800/80">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          {/* Horizontal Desktop Timeline Skeleton */}
          <div className="hidden md:grid md:grid-cols-4 gap-4 relative py-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </div>

          {/* Mobile Vertical Timeline Skeleton */}
          <div className="md:hidden space-y-6 py-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3.5 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main 2-Column Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): What Next + Action Checklist + Milestone Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* What Happens Next Skeleton */}
          <Card className="border-cynbit-200/60 dark:border-cynbit-900/40">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3.5 w-64" />
                <Skeleton className="h-3.5 w-56" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-9 w-32 rounded-lg" />
              </div>
            </CardContent>
          </Card>

          {/* Action Checklist Skeleton */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-6 w-40" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-72 mt-1" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/30"
                >
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-6 w-6 rounded-full shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-48 sm:w-64" />
                      <Skeleton className="h-3 w-36 sm:w-80" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-28 rounded-lg self-end sm:self-center" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (4 cols): Recruiter Card + Notifications + AI Helper */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recruiter Card Skeleton */}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-36" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3.5 w-44" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <Skeleton className="h-14 w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>

          {/* Notifications Card Skeleton */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                  <Skeleton className="h-6 w-11 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Helper Card Skeleton */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-40" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-10 w-full rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
