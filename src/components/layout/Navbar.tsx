"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Share2, Check, ExternalLink, Cpu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface NavbarProps {
  candidateId?: string;
}

export function Navbar({ candidateId }: NavbarProps) {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Candidate hub link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <header className="w-full border-b border-slate-200/80 bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo & Studio Identity */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cynbit-500 rounded-lg p-1"
          aria-label="Cynbit Technologies Home"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cynbit-600 via-cynbit-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-cynbit-500/20 group-hover:scale-105 transition-transform">
            <Cpu className="h-5 w-5" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-cynbit-600 dark:group-hover:text-cynbit-400 transition-colors">
                CYNBIT
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-cynbit-600 dark:text-cynbit-400 bg-cynbit-50 dark:bg-cynbit-950/60 px-1.5 py-0.2 rounded border border-cynbit-200/60 dark:border-cynbit-900/60">
                JAIPUR
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              AI Automation & Software Studio
            </span>
          </div>
        </Link>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Badge
            variant="outline"
            className="hidden md:inline-flex text-xs font-medium py-1 px-2.5 bg-slate-50 dark:bg-slate-900"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2" />
            Status Hub 2.0
          </Badge>

          {candidateId && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="text-xs gap-1.5 h-9"
              aria-label="Share status hub link"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Share Link</span>
                </>
              )}
            </Button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

