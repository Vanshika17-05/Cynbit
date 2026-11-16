import * as React from "react";
import Link from "next/link";
import { Heart, MapPin, Shield, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 mt-16 transition-colors">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs sm:text-sm">
          {/* Col 1: About */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">
                Cynbit Technologies
              </span>
              <span className="text-[10px] font-semibold bg-cynbit-100 dark:bg-cynbit-950 text-cynbit-700 dark:text-cynbit-300 px-1.5 py-0.5 rounded">
                Jaipur, India
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-md leading-relaxed text-xs">
              Pioneering agentic automation, LLM workflows, and full-stack software for modern enterprises. Headquartered in Jaipur with teams working on cutting-edge generative software systems.
            </p>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <MapPin className="h-3.5 w-3.5 text-cynbit-500 shrink-0" />
              <span>Tonk Road / Malviya Nagar Innovation Hub, Jaipur, RJ 302017</span>
            </div>
          </div>

          {/* Col 2: Candidate Transparency Guarantee */}
          <div className="space-y-2">
            <p className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Candidate Commitment
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>• Guaranteed feedback within 48h</li>
              <li>• Real-world systems design, no trivia</li>
              <li>• Transparent compensation bands</li>
              <li>• Direct recruiter access via WhatsApp & email</li>
            </ul>
          </div>

          {/* Col 3: Reviewer Links */}
          <div className="space-y-2">
            <p className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Evaluation & Docs
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-cynbit-600 dark:hover:text-cynbit-400">
                  Prototype Overview & Personas
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cynbit-600 dark:hover:text-cynbit-400 inline-flex items-center gap-1"
                >
                  <span>Architecture Docs</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.cynbit.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cynbit-600 dark:hover:text-cynbit-400 inline-flex items-center gap-1"
                >
                  <span>Official Cynbit Website</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Cynbit Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>for the Jaipur AI & Engineering community</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

