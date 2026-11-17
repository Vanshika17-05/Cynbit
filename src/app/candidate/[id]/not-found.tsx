import { CandidateNotFound } from "@/components/candidate/CandidateNotFound";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CandidateNotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 flex items-center justify-center">
        <CandidateNotFound attemptedId="Not Found" />
      </main>
      <Footer />
    </div>
  );
}

