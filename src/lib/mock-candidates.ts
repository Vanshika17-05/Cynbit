import { CandidateProfile } from "@/types/candidate";

export const MOCK_CANDIDATES: Record<string, CandidateProfile> = {
  "cyn-aarav-892": {
    id: "cyn-aarav-892",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98290 12345",
    role: "Senior AI Automation Engineer",
    department: "AI Engineering & Multi-Agent Systems",
    experienceLevel: "Senior (5+ yrs)",
    location: "Jaipur, Rajasthan (Hybrid)",
    appliedDate: "2026-11-04T10:30:00Z",
    overallStatus: "action_required",
    overallStatusLabel: "Action Required • Round 2 Scheduled",
    currentStage: "interview",
    timeline: [
      {
        id: "m-applied",
        key: "applied",
        title: "Application Received",
        shortTitle: "Applied",
        description: "Application submitted via Cynbit Careers portal with resume and GitHub portfolio.",
        status: "completed",
        date: "2026-11-04T10:30:00Z",
        completedAt: "2026-11-04T10:32:00Z",
        details: {
          highlight: "Application acknowledged instantly",
          bullets: [
            "Resume passed initial ATS keyword matching (98% alignment with Agentic Workflows)",
            "Confirmation email dispatched with tracking token CYN-892",
          ],
        },
      },
      {
        id: "m-screening",
        key: "screening",
        title: "Profile & Technical Screening",
        shortTitle: "Screening",
        description: "Initial conversation with Talent Acquisition & foundational system review.",
        status: "completed",
        date: "2026-11-08T14:00:00Z",
        completedAt: "2026-11-08T15:15:00Z",
        details: {
          highlight: "Cleared with Strong Hire rating",
          score: "94 / 100",
          bullets: [
            "Evaluated on LangChain, Autogen, FastAPI, and asynchronous orchestration",
            "Demonstrated deep understanding of vector embeddings and retrieval latency tradeoffs",
            "Hiring team recommended immediate fast-track to Technical Deep Dive",
          ],
        },
      },
      {
        id: "m-interview",
        key: "interview",
        title: "Technical Architecture & Culture Fit",
        shortTitle: "Interview",
        description: "60-minute live systems architecture session focusing on multi-agent collaboration.",
        status: "in_progress",
        date: "2026-11-19T15:30:00+05:30",
        details: {
          highlight: "Upcoming: Thursday, Nov 19 at 3:30 PM IST",
          scheduledTime: "Thursday, Nov 19, 2026 • 3:30 PM – 4:30 PM IST",
          meetingPlatform: "Google Meet (Link activated 15 mins prior)",
          meetingLink: "https://meet.google.com/cyn-auto-eng",
          bullets: [
            "System Design: Designing an autonomous multi-tier customer support agent network",
            "Handling API rate limits, tool-calling validation, and state rollback mechanisms",
            "Live discussion on prompt optimization and observability with LangSmith/Arize",
          ],
          interviewers: [
            {
              name: "Rahul Sen",
              role: "Principal AI Architect",
              avatar: "",
              linkedin: "https://linkedin.com/in/cynbit-engineering",
            },
            {
              name: "Neha Mathur",
              role: "Head of Engineering",
              avatar: "",
              linkedin: "https://linkedin.com/in/cynbit-engineering",
            },
          ],
        },
      },
      {
        id: "m-offer",
        key: "offer",
        title: "Offer & Welcome to Cynbit",
        shortTitle: "Offer",
        description: "Executive discussion, competitive CTC compensation breakdown, and onboarding timeline.",
        status: "upcoming",
        date: "Expected by Nov 23, 2026",
        details: {
          highlight: "Final milestone upon round 2 feedback synthesis",
          bullets: [
            "Hiring committee consensus typically finalized within 48 hours post-interview",
            "Offer package includes performance bonuses, learning allowances, and stock appreciation rights",
          ],
        },
      },
    ],
    nextStep: {
      title: "Round 2: Agent Architecture & Systems Deep Dive",
      description: "Join Rahul Sen and Neha Mathur on Google Meet. Please keep your camera on and prepare a 5-minute walkthrough of any agent or automation pipeline you've built.",
      expectedTimeframe: "Thursday, Nov 19, 2026 at 3:30 PM IST",
      expectedDate: "2026-11-19T15:30:00+05:30",
      responsibleParty: "Rahul Sen (Principal AI Architect)",
      tips: [
        "Review Cynbit's open-source architecture principles in our prep sheet below",
        "Be ready to sketch a high-level sequence diagram using Excalidraw or pen-paper",
        "Test your mic and audio setup in advance; a quiet workspace is recommended",
      ],
    },
    recruiter: {
      name: "Pooja Rathore",
      title: "Lead Talent Partner • Tech & AI",
      email: "pooja.rathore@cynbit.in",
      phone: "+91 141 409 2381",
      avatar: "",
      sla: "Replies within 3 hours during Jaipur office hours (10 AM – 7 PM IST)",
      location: "Cynbit Innovation Center, Tonk Road / Malviya Nagar, Jaipur",
      bio: "Helping the brightest minds build autonomous AI solutions at Cynbit. Ping me anytime you have questions about our culture, process, or interview prep!",
    },
    checklist: [
      {
        id: "chk-doc-portfolio",
        title: "Upload System Architecture Diagram / Portfolio",
        description: "Submit a recent high-level architecture diagram or GitHub link of an autonomous pipeline you authored (PDF, PNG, or Markdown).",
        type: "document_upload",
        status: "pending",
        actionLabel: "Upload Document",
        dueDate: "Nov 18, 2026",
        meta: {
          allowedFormats: [".pdf", ".png", ".jpg", ".docx"],
          maxSizeBytes: 10485760, // 10MB
        },
      },
      {
        id: "chk-prep-sheet",
        title: "Review Technical Deep Dive Prep Guide",
        description: "A tailored 4-page briefing covering Cynbit's evaluation rubric, common agent design patterns, and sample questions.",
        type: "prep_guide",
        status: "pending",
        actionLabel: "View Prep Sheet",
        meta: {
          prepUrl: "/prep/senior-ai-engineer-cynbit.pdf",
          prepTopics: [
            "Deterministic vs LLM-driven tool execution",
            "Multi-tenant vector indexing strategies",
            "Latency mitigation and speculative decoding",
            "Cynbit culture: high ownership and rapid iteration",
          ],
        },
      },
      {
        id: "chk-reschedule",
        title: "Need to adjust your interview schedule?",
        description: "Conflict came up? No worries at all. Request an alternative time slot without delaying your evaluation.",
        type: "reschedule",
        status: "optional",
        actionLabel: "Request Reschedule",
      },
    ],
    notificationPreferences: {
      email: true,
      whatsapp: true,
      sms: false,
      phoneNumber: "+91 98290 12345",
      emailAddress: "aarav.sharma@example.com",
      frequency: "instant",
      updatedAt: "2026-11-09T16:20:00Z",
    },
    tags: ["High Priority", "Fast Track", "Agentic Systems", "Jaipur Hybrid"],
    aiSummary: "Aarav Sharma has cleared stage 1 (Application) and stage 2 (Technical Screening) with a 94/100 score. He is currently in stage 3 (Interview), with his 60-minute Technical Architecture session confirmed for Thursday, Nov 19 at 3:30 PM IST with Rahul Sen and Neha Mathur. He has one pending document upload (Architecture diagram), is recommended to read the prep sheet, and can reschedule if required. Recruiter is Pooja Rathore (pooja.rathore@cynbit.in). Next milestone is the formal Offer stage.",
    frequentlyAsked: [
      {
        q: "What will be asked in Thursday's technical round?",
        a: "The session covers real-world multi-agent systems design, state management, tool-calling validation, and vector retrieval tradeoffs. There will be no abstract LeetCode brainteasers; it focuses purely on production engineering.",
      },
      {
        q: "How soon will I know the outcome of this interview?",
        a: "Our hiring committee convenes within 24 to 48 hours post-interview. You will receive an official update by Friday evening or Monday noon at latest.",
      },
      {
        q: "Can I reschedule if an emergency arises?",
        a: "Yes! Use the 'Request Reschedule' button on your checklist. Pooja will offer alternative slots for Friday or early next week.",
      },
    ],
  },

  "cyn-priya-412": {
    id: "cyn-priya-412",
    fullName: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 98765 43210",
    role: "Full Stack Engineer (Next.js & Cloud)",
    department: "Enterprise Solutions",
    experienceLevel: "Mid-Level (3 yrs)",
    location: "Jaipur, Rajasthan (Onsite / Flexible)",
    appliedDate: "2026-11-12T09:15:00Z",
    overallStatus: "in_review",
    overallStatusLabel: "Under Review • Screening Stage",
    currentStage: "screening",
    timeline: [
      {
        id: "m-applied",
        key: "applied",
        title: "Application Received",
        shortTitle: "Applied",
        description: "Application submitted with resume and live fullstack project demo links.",
        status: "completed",
        date: "2026-11-12T09:15:00Z",
        completedAt: "2026-11-12T09:18:00Z",
        details: {
          highlight: "Application verified",
          bullets: ["Verified credentials and portfolio live URLs"],
        },
      },
      {
        id: "m-screening",
        key: "screening",
        title: "Portfolio & Code Review",
        shortTitle: "Screening",
        description: "Hiring managers are reviewing your submitted repositories and architectural code quality.",
        status: "in_progress",
        date: "2026-11-14T11:00:00Z",
        details: {
          highlight: "Currently being reviewed by Tech Leads",
          bullets: [
            "Reviewing Next.js 14 App Router patterns, TypeScript rigor, and Tailwind modularity",
            "Checking responsiveness, lighthouse performance, and API route structures",
          ],
        },
      },
      {
        id: "m-interview",
        key: "interview",
        title: "Pair Programming & Systems Round",
        shortTitle: "Interview",
        description: "Collaborative coding and full-stack product building exercise.",
        status: "upcoming",
        date: "Tentative: Nov 20, 2026",
      },
      {
        id: "m-offer",
        key: "offer",
        title: "Offer & Decision",
        shortTitle: "Offer",
        description: "Final hiring decision and formal offer rollout.",
        status: "upcoming",
        date: "Tentative: Nov 26, 2026",
      },
    ],
    nextStep: {
      title: "Hiring Manager Review in Progress",
      description: "Our engineering leads are actively evaluating your portfolio code samples. You will receive an invitation for the pair-programming round or detailed feedback within 2 business days.",
      expectedTimeframe: "By Wednesday, Nov 18, 5:00 PM IST",
      responsibleParty: "Vikram Singhal (Engineering Manager)",
      tips: [
        "Ensure your demo repositories remain public or accessible",
        "Keep notification channels active on WhatsApp for swift scheduling",
      ],
    },
    recruiter: {
      name: "Pooja Rathore",
      title: "Lead Talent Partner • Tech & AI",
      email: "pooja.rathore@cynbit.in",
      avatar: "",
      sla: "Replies within 3 hours during office hours",
      location: "Cynbit Jaipur Campus",
    },
    checklist: [
      {
        id: "chk-code-quiz",
        title: "Quick 15-Minute Async Engineering Survey",
        description: "Help us calibrate the interview topics to your strongest areas: frontend, backend, or cloud infra.",
        type: "survey",
        status: "pending",
        actionLabel: "Take Quick Survey",
        dueDate: "Nov 17, 2026",
      },
    ],
    notificationPreferences: {
      email: true,
      whatsapp: false,
      sms: false,
      phoneNumber: "+91 98765 43210",
      emailAddress: "priya.patel@example.com",
      frequency: "instant",
      updatedAt: "2026-11-12T09:15:00Z",
    },
    tags: ["Full Stack", "React/Next.js", "Jaipur Tech"],
    aiSummary: "Priya Patel applied for Full Stack Engineer on Nov 12. She is currently in the Screening stage (Portfolio & Code Review). The hiring manager Vikram Singhal is reviewing her code samples, with feedback expected by Wednesday, Nov 18. She has a pending 15-minute engineering survey to calibrate interview focus.",
    frequentlyAsked: [
      {
        q: "When can I expect feedback on my application?",
        a: "Our team aims to complete portfolio reviews within 48 to 72 hours. You will receive a notification by Wednesday, Nov 18.",
      },
      {
        q: "What tech stack does Cynbit use for full-stack projects?",
        a: "We heavily build with Next.js 14/15, TypeScript, Tailwind CSS, PostgreSQL / Supabase, Docker, and Google Cloud Platform.",
      },
    ],
  },

  "cyn-rohan-731": {
    id: "cyn-rohan-731",
    fullName: "Rohan Verma",
    email: "rohan.verma@example.com",
    phone: "+91 91234 56789",
    role: "Machine Learning Intern (GenAI & RAG)",
    department: "AI Research & Solutions",
    experienceLevel: "College Graduate / Intern",
    location: "Jaipur, Rajasthan (On-site)",
    appliedDate: "2026-10-25T11:00:00Z",
    overallStatus: "offer_extended",
    overallStatusLabel: "Offer Extended! Congratulations 🎉",
    currentStage: "offer",
    timeline: [
      {
        id: "m-applied",
        key: "applied",
        title: "Application Received",
        shortTitle: "Applied",
        description: "Applied through campus referral with open-source RAG benchmark contributions.",
        status: "completed",
        date: "2026-10-25T11:00:00Z",
        completedAt: "2026-10-25T11:05:00Z",
      },
      {
        id: "m-screening",
        key: "screening",
        title: "Python & ML Assessment",
        shortTitle: "Screening",
        description: "Scored in top 5% on practical PyTorch, tokenization, and vector DB evaluation.",
        status: "completed",
        date: "2026-10-29T16:00:00Z",
        completedAt: "2026-10-29T17:30:00Z",
      },
      {
        id: "m-interview",
        key: "interview",
        title: "Founder & Lead Scientist Round",
        shortTitle: "Interview",
        description: "Deep dive into model quantization, LoRA fine-tuning, and research taste.",
        status: "completed",
        date: "2026-11-05T14:00:00Z",
        completedAt: "2026-11-05T15:10:00Z",
      },
      {
        id: "m-offer",
        key: "offer",
        title: "Offer Extended & Welcome Package",
        shortTitle: "Offer",
        description: "Official internship offer with pre-placement conversion track extended.",
        status: "in_progress",
        date: "2026-11-14T12:00:00Z",
        details: {
          highlight: "Offer Letter Ready for Acceptance",
          bullets: [
            "Monthly stipend: ₹45,000 / month during 6-month internship",
            "Pre-Placement Offer (PPO) base upon successful graduation: ₹14.5 LPA CTC",
            "Joining Date: Monday, December 01, 2026",
            "Includes M3 Pro MacBook Pro, cloud compute credits, and free lunch at Jaipur Hub",
          ],
        },
      },
    ],
    nextStep: {
      title: "Review & Sign Offer Letter",
      description: "We are thrilled to welcome you to Cynbit Technologies! Please review your official offer package below and sign the digital acceptance letter before Friday, Nov 27.",
      expectedTimeframe: "Valid till Friday, Nov 27, 2026",
      responsibleParty: "Pooja Rathore & Founders Office",
      tips: [
        "Read the offer letter terms and benefits breakdown",
        "Reach out to Pooja if you have questions regarding university exam leave allowances",
      ],
    },
    recruiter: {
      name: "Pooja Rathore",
      title: "Lead Talent Partner • Tech & AI",
      email: "pooja.rathore@cynbit.in",
      avatar: "",
      sla: "Replies within 1-2 hours for offer holders",
      location: "Cynbit Jaipur Innovation Center",
    },
    checklist: [
      {
        id: "chk-offer-sign",
        title: "Review & Electronically Sign Offer Letter",
        description: "Download the formal offer letter, verify joining dates, and submit digital confirmation.",
        type: "document_upload",
        status: "pending",
        actionLabel: "Sign Offer Letter",
        dueDate: "Nov 27, 2026",
      },
      {
        id: "chk-team-welcome",
        title: "Schedule Informal Coffee Chat with Founders",
        description: "Meet the team before your first day! 20-min casual chat to ask about projects, tech stack, and Jaipur team life.",
        type: "prep_guide",
        status: "optional",
        actionLabel: "Book 15-min Coffee Chat",
      },
    ],
    offerDetails: {
      roleTitle: "Machine Learning Intern (PPO Conversion Track)",
      annualCTC: "₹45,000/mo (Internship) → ₹14.5 LPA (PPO)",
      compensationBreakdown: "Monthly Stipend: ₹45,000 + Performance Bonus up to ₹30,000 + ₹14,50,000 full-time CTC conversion",
      joiningDate: "December 01, 2026",
      validTill: "November 27, 2026",
      location: "Cynbit Hub, Tonk Road, Jaipur",
      workMode: "Hybrid / Onsite",
      benefits: [
        "Apple M3 Pro MacBook + 4K Display workstation",
        "Uncapped Google Cloud & GPU cluster credits for experimentation",
        "Flexible study leave for university semester exams",
        "Team dinners, quarterly retreats, and Jaipur tech meetups",
        "Mentorship directly under IIT alumni AI leads",
      ],
      offerLetterFileName: "Cynbit_Offer_Letter_Rohan_Verma.pdf",
    },
    notificationPreferences: {
      email: true,
      whatsapp: true,
      sms: true,
      phoneNumber: "+91 91234 56789",
      emailAddress: "rohan.verma@example.com",
      frequency: "instant",
      updatedAt: "2026-11-14T12:00:00Z",
    },
    tags: ["Offer Extended", "PPO Track", "GenAI Intern", "Top Performer"],
    aiSummary: "Rohan Verma has successfully cleared all rounds for Machine Learning Intern and received an official offer! Offer stipend is ₹45k/mo with a ₹14.5 LPA PPO conversion track, valid till Nov 27. Joining date is Dec 01, 2026. Action pending: digitally sign the offer letter.",
    frequentlyAsked: [
      {
        q: "What is the deadline to accept the offer?",
        a: "The offer is valid until Friday, November 27, 2026 at 11:59 PM IST.",
      },
      {
        q: "Can my joining date be adjusted for college exams?",
        a: "Yes! We accommodate university examination schedules seamlessly. Just let Pooja know your academic dates.",
      },
    ],
  },

  "cyn-ananya-105": {
    id: "cyn-ananya-105",
    fullName: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    phone: "+91 94140 88776",
    role: "Lead Product Designer (AI UX & Design Systems)",
    department: "Product Design",
    experienceLevel: "Staff / Lead (7+ yrs)",
    location: "Jaipur / Remote",
    appliedDate: "2026-11-15T18:00:00Z",
    overallStatus: "in_review",
    overallStatusLabel: "Application Received • Initial Review",
    currentStage: "applied",
    timeline: [
      {
        id: "m-applied",
        key: "applied",
        title: "Application Received",
        shortTitle: "Applied",
        description: "Application submitted and entered into Cynbit talent pool.",
        status: "in_progress",
        date: "2026-11-15T18:00:00Z",
        details: {
          highlight: "Just submitted",
          bullets: ["Figma portfolio and case studies attached"],
        },
      },
      {
        id: "m-screening",
        key: "screening",
        title: "Design Leadership Screening",
        shortTitle: "Screening",
        description: "Portfolio walkthrough and design system philosophy alignment.",
        status: "upcoming",
        date: "Expected by Nov 20, 2026",
      },
      {
        id: "m-interview",
        key: "interview",
        title: "Product Jam & Craft Challenge",
        shortTitle: "Interview",
        description: "Whiteboard session solving a complex AI interaction problem.",
        status: "upcoming",
        date: "Expected late Nov",
      },
      {
        id: "m-offer",
        key: "offer",
        title: "Offer & Executive Chat",
        shortTitle: "Offer",
        description: "Leadership package and team charter.",
        status: "upcoming",
        date: "Early Dec",
      },
    ],
    nextStep: {
      title: "Portfolio Evaluation Underway",
      description: "Our Design Director is reviewing your case studies and design system documentation. You will receive an initial update within 48 hours.",
      expectedTimeframe: "By Wednesday, Nov 18",
      responsibleParty: "Karan Mehta (Head of Product & Design)",
      tips: [
        "Take a look at Cynbit's recent AI product interfaces on our website",
        "No immediate action is required on your part right now",
      ],
    },
    recruiter: {
      name: "Pooja Rathore",
      title: "Lead Talent Partner • Tech & AI",
      email: "pooja.rathore@cynbit.in",
      avatar: "",
      sla: "Replies within 3 hours during office hours",
      location: "Cynbit Jaipur Innovation Center",
    },
    checklist: [],
    notificationPreferences: {
      email: true,
      whatsapp: true,
      sms: false,
      phoneNumber: "+91 94140 88776",
      emailAddress: "ananya.iyer@example.com",
      frequency: "instant",
      updatedAt: "2026-11-15T18:00:00Z",
    },
    tags: ["Design Lead", "AI UX", "Executive Candidate"],
    aiSummary: "Ananya Iyer applied for Lead Product Designer on Nov 15. She is at stage 1 (Application Received). Design Director Karan Mehta is reviewing her portfolio, with updates expected by Nov 18.",
    frequentlyAsked: [
      {
        q: "What is the typical design interview process at Cynbit?",
        a: "It includes an initial portfolio deep dive (45 mins) followed by a collaborative Whiteboard Jam on AI interaction design (60 mins), and a culture conversation with leadership.",
      },
    ],
  },
};

// In-memory store for state modifications during the reviewer session
const candidateStore = { ...MOCK_CANDIDATES };

export function getMockCandidate(id: string): CandidateProfile | null {
  const normalizedId = id.trim().toLowerCase();
  return candidateStore[normalizedId] || null;
}

export function getAllMockCandidates(): CandidateProfile[] {
  return Object.values(candidateStore);
}

export function updateCandidateNotifications(
  id: string,
  prefs: Partial<CandidateProfile["notificationPreferences"]>
): CandidateProfile | null {
  const candidate = getMockCandidate(id);
  if (!candidate) return null;

  candidate.notificationPreferences = {
    ...candidate.notificationPreferences,
    ...prefs,
    updatedAt: new Date().toISOString(),
  };

  candidateStore[id] = candidate;
  return candidate;
}

export function updateCandidateChecklist(
  id: string,
  actionId: string,
  update: Partial<CandidateProfile["checklist"][0]>
): CandidateProfile | null {
  const candidate = getMockCandidate(id);
  if (!candidate) return null;

  candidate.checklist = candidate.checklist.map((item) => {
    if (item.id === actionId) {
      return {
        ...item,
        ...update,
        meta: {
          ...item.meta,
          ...update.meta,
        },
      };
    }
    return item;
  });

  candidateStore[id] = candidate;
  return candidate;
}

export function requestInterviewReschedule(
  id: string,
  request: {
    preferredDate: string;
    preferredTimeSlot: string;
    reason: string;
    note?: string;
  }
): CandidateProfile | null {
  const candidate = getMockCandidate(id);
  if (!candidate) return null;

  candidate.overallStatus = "in_review";
  candidate.overallStatusLabel = `Reschedule Requested (${request.preferredDate})`;
  candidate.nextStep = {
    ...candidate.nextStep,
    title: "Reschedule Request Under Review",
    description: `You requested to reschedule your session to ${request.preferredDate} (${request.preferredTimeSlot}). Reason: ${request.reason}. Pooja is syncing with the interview panel and will send updated calendar invites shortly.`,
    expectedTimeframe: "Within 4 hours",
  };

  candidateStore[id] = candidate;
  return candidate;
}
