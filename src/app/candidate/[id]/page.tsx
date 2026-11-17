import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMockCandidate } from "@/lib/mock-candidates";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CandidateHubView } from "@/components/candidate/CandidateHubView";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const candidate = getMockCandidate(params.id);

  if (!candidate) {
    return {
      title: "Candidate Not Found | Cynbit Technologies",
      description: "Candidate application could not be located.",
    };
  }

  return {
    title: `${candidate.fullName} • Status Hub 2.0 | Cynbit Technologies`,
    description: `Track real-time recruitment milestones, next steps, and hiring timeline for ${candidate.role} at Cynbit Technologies, Jaipur.`,
  };
}

export default function CandidatePage({ params }: PageProps) {
  const candidate = getMockCandidate(params.id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar candidateId={candidate?.id} />
      <main className="flex-1">
        <CandidateHubView initialCandidate={candidate} candidateId={params.id} />
      </main>
      <Footer />
    </div>
  );
}
