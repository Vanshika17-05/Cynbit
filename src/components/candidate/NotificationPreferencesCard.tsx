"use client";

import * as React from "react";
import {
  Bell,
  Check,
  MessageSquare,
  Mail,
  Smartphone,
  CheckCircle2,
  Save,
  Radio,
} from "lucide-react";
import { NotificationPreferences } from "@/types/candidate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface NotificationPreferencesCardProps {
  preferences: NotificationPreferences;
  candidateId: string;
  onPreferencesUpdated: (prefs: NotificationPreferences) => void;
}

export function NotificationPreferencesCard({
  preferences,
  candidateId,
  onPreferencesUpdated,
}: NotificationPreferencesCardProps) {
  const [prefs, setPrefs] = React.useState<NotificationPreferences>(preferences);
  const [saving, setSaving] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    setPrefs(preferences);
    setDirty(false);
  }, [preferences]);

  const toggleChannel = (channel: "whatsapp" | "email" | "sms") => {
    setPrefs((prev) => {
      const next = { ...prev, [channel]: !prev[channel] };
      setDirty(true);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId,
          preferences: prefs,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Notification preferences saved!");
        setDirty(false);
        onPreferencesUpdated(data.preferences);
      } else {
        toast.error(data.error || "Failed to update notification settings");
      }
    } catch {
      toast.error("Network error while updating preferences");
    } finally {
      setSaving(false);
    }
  };

  const activeCount = [prefs.whatsapp, prefs.email, prefs.sms].filter(Boolean).length;

  return (
    <Card className="border-slate-200/80 dark:border-slate-800/80 shadow-sm relative overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-cynbit-100 dark:bg-cynbit-950/80 flex items-center justify-center text-cynbit-600 dark:text-cynbit-400">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                Notification Alerts
              </CardTitle>
              <CardDescription className="text-xs">
                Never miss an update or interview link
              </CardDescription>
            </div>
          </div>

          <Badge
            variant={activeCount > 0 ? "success" : "outline"}
            className="text-[11px]"
          >
            {activeCount > 0 ? `${activeCount} Active` : "Muted"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Channel Toggles */}
        <div className="space-y-2.5">
          {/* WhatsApp Toggle */}
          <div
            onClick={() => toggleChannel("whatsapp")}
            className={cn(
              "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150 select-none",
              prefs.whatsapp
                ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-800/80 dark:bg-emerald-950/20"
                : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 opacity-70"
            )}
            role="switch"
            aria-checked={prefs.whatsapp}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleChannel("whatsapp");
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                  prefs.whatsapp
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                )}
              >
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  WhatsApp Updates
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Instant meeting links & interview alerts
                </p>
              </div>
            </div>

            <div
              className={cn(
                "h-5 w-9 rounded-full transition-colors relative flex items-center p-0.5",
                prefs.whatsapp ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
              )}
            >
              <div
                className={cn(
                  "h-4 w-4 rounded-full bg-white transition-transform shadow-xs",
                  prefs.whatsapp ? "translate-x-4" : "translate-x-0"
                )}
              />
            </div>
          </div>

          {/* Email Toggle */}
          <div
            onClick={() => toggleChannel("email")}
            className={cn(
              "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150 select-none",
              prefs.email
                ? "border-cynbit-300 bg-cynbit-50/50 dark:border-cynbit-800/80 dark:bg-cynbit-950/20"
                : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 opacity-70"
            )}
            role="switch"
            aria-checked={prefs.email}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleChannel("email");
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                  prefs.email
                    ? "bg-cynbit-600 text-white"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                )}
              >
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Email Notifications
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Comprehensive status briefs & docs
                </p>
              </div>
            </div>

            <div
              className={cn(
                "h-5 w-9 rounded-full transition-colors relative flex items-center p-0.5",
                prefs.email ? "bg-cynbit-600" : "bg-slate-300 dark:bg-slate-700"
              )}
            >
              <div
                className={cn(
                  "h-4 w-4 rounded-full bg-white transition-transform shadow-xs",
                  prefs.email ? "translate-x-4" : "translate-x-0"
                )}
              />
            </div>
          </div>

          {/* SMS Toggle */}
          <div
            onClick={() => toggleChannel("sms")}
            className={cn(
              "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150 select-none",
              prefs.sms
                ? "border-indigo-300 bg-indigo-50/50 dark:border-indigo-800/80 dark:bg-indigo-950/20"
                : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 opacity-70"
            )}
            role="switch"
            aria-checked={prefs.sms}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleChannel("sms");
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                  prefs.sms
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                )}
              >
                <Smartphone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  SMS / Urgent Ping
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Fallback alerts for time-sensitive steps
                </p>
              </div>
            </div>

            <div
              className={cn(
                "h-5 w-9 rounded-full transition-colors relative flex items-center p-0.5",
                prefs.sms ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
              )}
            >
              <div
                className={cn(
                  "h-4 w-4 rounded-full bg-white transition-transform shadow-xs",
                  prefs.sms ? "translate-x-4" : "translate-x-0"
                )}
              />
            </div>
          </div>
        </div>

        {/* Save button if preferences were modified */}
        <div className="pt-1">
          <Button
            onClick={handleSave}
            isLoading={saving}
            disabled={!dirty || saving}
            size="sm"
            className="w-full text-xs font-semibold gap-1.5"
            variant={dirty ? "default" : "secondary"}
          >
            <Save className="h-3.5 w-3.5" />
            <span>{dirty ? "Save Notification Settings" : "Preferences Saved"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

