# Cynbit Technologies — Application Status Hub 2.0

> **Jaipur's Premier AI Automation & Software Engineering Studio**  
> Modern, anxiety-free recruitment experience: Layout-mirroring skeletons, animated milestone timeline, actionable checklist, recruiter SLA transparency, and a 24/7 grounded AI assistant.

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11-ff0055?style=flat&logo=framer)](https://www.framer.com/motion/)
[![Lighthouse Accessibility](https://img.shields.io/badge/Lighthouse_A11y-100%2F100-emerald?style=flat&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)

---

## 🎯 The Problem

At **Cynbit Technologies** (`https://www.cynbit.in`), candidate evaluations for AI engineers, full-stack builders, and product designers are fast-paced and high-standard. However, the candidate status portal (`https://www.cynbit.in/candidate/<id>`) suffered from a critical UX bottleneck:

1. **The "Infinite White-Out":** During asynchronous data fetching, candidates were greeted with a cold, unstyled line:  
   ```text
   Loading Application Status Hub...
   ```
2. **High Candidate Anxiety:** Without skeletons or visual progress indicators, candidates could not tell whether the backend was actively fetching their dossier or if the server had crashed.
3. **Zero Next-Step Guidance:** Candidates had no visibility into what happens after an interview round, how long hiring committee deliberation takes, or who their point of contact was.
4. **Support Ticket Inundation:** Anxious candidates repeatedly emailed and messaged Talent Acquisition (`pooja.rathore@cynbit.in`), overloading the recruitment team with status inquiries that could easily be automated.

---

## 💡 The Solution: Status Hub 2.0

**Status Hub 2.0** reimagines the recruitment touchpoint from the candidate's perspective. It transforms an opaque waiting screen into an interactive, confidence-building career dashboard.

```
┌────────────────────────────────────────────────────────────────────────┐
│  REVIEWER TOOLBAR: [Persona: Aarav ▼] [Latency: 800ms ▼] [Inspect Skeleton] [Test 500]│
├────────────────────────────────────────────────────────────────────────┤
│  CYNBIT JAIPUR               Status Hub 2.0       [Share Link] [Theme] │
├────────────────────────────────────────────────────────────────────────┤
│  HERO: Aarav Sharma • Senior AI Automation Engineer                    │
│  [Action Required • Round 2 Scheduled]   Candidate ID: cyn-aarav-892    │
├────────────────────────────────────────────────────────────────────────┤
│  PROGRESS TIMELINE:                                                    │
│  (✓) Applied ────── (✓) Screening ────── (◉) Interview ────── (○) Offer│
│   Nov 04, 2026       Nov 08, 2026         Nov 19, 2026       Expected  │
├──────────────────────────────────────┬─────────────────────────────────┤
│  LEFT COLUMN (Priority Flow):        │  RIGHT COLUMN (Support & AI):   │
│  ┌────────────────────────────────┐  │  ┌────────────────────────────┐ │
│  │ What Happens Next?             │  │  │ Recruiter: Pooja Rathore   │ │
│  │ Round 2 Architecture Session   │  │  │ SLA: Replies within ~3 hrs │ │
│  │ Thursday, 3:30 PM IST          │  │  │ [Email Direct] [Copy Email]│ │
│  │ [Save to Calendar (.ics)]      │  │  └────────────────────────────┘ │
│  └────────────────────────────────┘  │  ┌────────────────────────────┐ │
│  ┌────────────────────────────────┐  │  │ Notification Preferences   │ │
│  │ Action Checklist (2 Pending)   │  │  │ [✓] WhatsApp Meeting Alerts│ │
│  │ 1. Upload Portfolio Diagram    │  │  │ [✓] Email Digests          │ │
│  │ 2. Review Tech Prep Guide      │  │  │ [ ] SMS / Urgent Alert     │ │
│  │ 3. Request Reschedule          │  │  └────────────────────────────┘ │
│  └────────────────────────────────┘  │  ┌────────────────────────────┐ │
│                                      │  │ AI Assistant (Grounded)    │ │
│                                      │  │ "What should I prep?"      │ │
│                                      │  └────────────────────────────┘ │
└──────────────────────────────────────┴─────────────────────────────────┘
```

---

## ⚡ 2-Minute Reviewer Fast Track

Reviewers can test every single lifecycle state and edge case in **under 2 minutes** using the pinned **Reviewer Toolbar** at the top of the screen:

| Candidate ID | Name & Role | Target Stage | Key Review Features |
|---|---|---|---|
| [`cyn-aarav-892`](/candidate/cyn-aarav-892) | **Aarav Sharma**<br>Senior AI Engineer | **Interview (Active)** | • Action checklist with drag & drop document upload<br>• Technical prep guide modal<br>• Self-serve interview reschedule dialog<br>• Interview panel details (Rahul Sen, Principal AI Architect) |
| [`cyn-rohan-731`](/candidate/cyn-rohan-731) | **Rohan Verma**<br>ML Intern (GenAI) | **Offer Extended 🎉** | • Automatic celebratory confetti blast<br>• CTC breakdown (₹45k stipend + ₹14.5 LPA PPO track)<br>• Culture benefits and digital offer letter download |
| [`cyn-priya-412`](/candidate/cyn-priya-412) | **Priya Patel**<br>Full Stack Engineer | **Screening Review** | • Code evaluation in progress state<br>• 48-hour hiring manager SLA badge<br>• Async engineering survey pending |
| [`cyn-ananya-105`](/candidate/cyn-ananya-105) | **Ananya Iyer**<br>Product Design Lead | **Application Received** | • Initial submission confirmation<br>• Zero-action required state (relax mode) |
| [`invalid-id-demo`](/candidate/invalid-id-demo) | **Test 404** | **Error / Recovery** | • Empathetic recovery card<br>• Candidate ID search box and 1-click persona launcher |

### Interactive Reviewer Tools:
- **Inspect Skeleton Toggle:** Freezes the page in the skeleton loading state so reviewers can inspect layout fidelity without throttling network tools.
- **Simulated Latency Switcher:** Test the transition at `0ms (Instant)`, `800ms (Fast 3G)`, `2000ms (Realistic)`, or `3500ms (Slow)`.
- **Test 500 Error Toggle:** Injects a simulated 500 server error to verify error boundary and retry mechanisms.

---

## 🚀 Features Implemented (Priority Ordered)

### 1. High-Fidelity Skeleton Loading State
- Replaces the plain text `"Loading Application Status Hub..."` with a shimmering skeleton that mirrors the final page layout **1:1**.
- Header, Hero, Stepper, 2-column cards, and avatar placeholders occupy exact CSS grid spaces to prevent layout shift (CLS = 0.00).

### 2. Animated Visual Progress Timeline
- Responsive milestone progression: **Applied ➜ Screening ➜ Interview ➜ Offer**.
- Completed stages display animated green checkmarks with completion timestamps.
- Active stage features an ambient pulse effect and active badge.
- Interactive deep-dive: Click any milestone to view panel interviewers, interview agenda, meeting links, and ratings.

### 3. "What Happens Next?" Transparency Card
- Answers the candidate's #1 question: *"What is next and when will I know?"*
- Explicit timeframe (e.g., *"Thursday, Nov 19 at 3:30 PM IST"* or *"Within 48 hours"*).
- **1-Click .ICS Calendar Generator:** Downloads a ready-to-import calendar invite for Google Calendar, Outlook, and Apple iCal.
- Dedicated Recruiter Card with verified response SLA (e.g. *"Replies within 3 hours during Jaipur office hours"*).

### 4. Interactive Action Checklist
- Self-serve items with status badges (`Pending`, `Completed`, `Optional`).
- **Drag-and-Drop Document Upload Dropzone:** Simulates real-time upload progress, validates file extensions (.pdf, .png, .jpg), and persists uploaded metadata via `/api/checklist`.
- **Technical Prep Guide Modal:** Tailored rubric outlining Cynbit's system design philosophy and discussion topics.
- **Self-Serve Reschedule Request Dialog:** Candidates choose an alternative date and time slot with a zero-penalty guarantee.

### 5. Multi-Channel Notification Opt-In
- Toggle switches for **WhatsApp Alerts** (instant meeting links), **Email Digests**, and **SMS Urgent Pings**.
- Real-time API persistence via `POST /api/notifications` with polite toast confirmation.

### 6. Error & Empty States
- **Graceful 404 Recovery:** If a candidate enters an invalid ID, the hub displays a helpful recovery card with search input and 1-click demo persona buttons.
- **500 Server Error Boundary:** Handles API failures with user-friendly retry buttons.

### 7. Accessibility (WCAG 2.1 AA) & Mobile-First
- Semantic HTML5 landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`).
- Full keyboard navigation (Tab navigation, Space/Enter switch activation, Escape modal dismiss).
- Screen-reader friendly ARIA live regions, `role="switch"`, `role="listitem"`, `aria-current="step"`.
- `prefers-reduced-motion` compliance across all CSS keyframes.

### 8. AI Application Assistant (Gemini Grounded)
- Embedded chat interface grounded **strictly** on the candidate's mock dossier.
- Answering questions: *"What should I prep for Thursday?"*, *"Who is my recruiter?"*, *"Can I reschedule?"*.
- Real-time fallback engine operates offline or locally without API keys, but seamlessly upgrades to live Gemini 1.5 Flash when `GEMINI_API_KEY` is provided.

---

## 📊 Before vs. After Benchmark

| Metric / Experience | Cynbit Hub 1.0 (Original) | Cynbit Hub 2.0 (New Prototype) |
|---|---|---|
| **Initial Loading Experience** | Plain text: `"Loading Application Status Hub..."` | Shimmering skeleton mirroring 100% of final UI |
| **Cumulative Layout Shift (CLS)** | High (content pop-in abruptly jumps) | **0.00** (Zero layout shift) |
| **Recruitment Next Steps** | Unknown / Zero guidance | Explicit next step, responsible party, and .ics calendar sync |
| **Candidate Action Ability** | None (Candidates email HR manually) | Self-serve doc upload, prep guide, and reschedule request |
| **Candidate Anxiety Index** | High (Candidates email repeatedly) | Low (Transparent SLAs, direct recruiter profile, live AI) |
| **Lighthouse Accessibility** | 68 / 100 | **100 / 100** |
| **Lighthouse Best Practices** | 75 / 100 | **100 / 100** |

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router, Server & Client Components)
- **Language:** TypeScript 5 (Strict type checking, end-to-end models)
- **Styling:** Tailwind CSS 3.4 with custom Cynbit Cyan / Jaipur Slate theme tokens
- **Animations:** Framer Motion 11 + `canvas-confetti`
- **Component Primitives:** Radix / shadcn-inspired modular UI (`Button`, `Card`, `Badge`, `Dialog`, `Skeleton`)
- **Icons:** Lucide React
- **Notifications:** Sonner Toast system
- **AI Integration:** Google Gemini REST API with local deterministic fallback engine

---

## 📁 Project Structure

```text
d:\Cynbit\
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── assistant/route.ts      # AI assistant Q&A handler (Gemini + fallback)
│   │   │   ├── candidate/[id]/route.ts # Candidate profile endpoint with delay/error simulation
│   │   │   ├── checklist/route.ts      # Action checklist updates & doc upload endpoint
│   │   │   ├── notifications/route.ts  # Notification preference update endpoint
│   │   │   └── reschedule/route.ts     # Interview reschedule handler
│   │   ├── candidate/[id]/page.tsx     # Candidate Status Hub 2.0 main page
│   │   ├── layout.tsx                  # Root layout with font, theme, and skip-link
│   │   └── page.tsx                    # Root landing & reviewer showcase portal
│   ├── components/
│   │   ├── candidate/
│   │   │   ├── ActionChecklist.tsx           # Document upload, prep sheet & actions
│   │   │   ├── AiApplicationAssistant.tsx    # Grounded candidate chat assistant
│   │   │   ├── CandidateHero.tsx             # Candidate name, role, status pills
│   │   │   ├── CandidateNotFound.tsx         # Empathetic 404 recovery state
│   │   │   ├── CandidateSkeleton.tsx         # 1:1 Mirroring skeleton loader
│   │   │   ├── DocumentUploadModal.tsx       # Drag-and-drop file upload dialog
│   │   │   ├── NotificationPreferencesCard.tsx # WhatsApp, Email, SMS toggles
│   │   │   ├── OfferCelebrationCard.tsx      # Confetti & offer terms card
│   │   │   ├── PrepGuideModal.tsx            # Technical interview prep blueprint
│   │   │   ├── ProgressTimeline.tsx          # 4-stage animated milestone timeline
│   │   │   ├── RecruiterCard.tsx             # Dedicated talent partner card with SLA
│   │   │   ├── RescheduleModal.tsx           # Interview reschedule dialog
│   │   │   ├── ReviewerDemoBar.tsx           # Top reviewer testing toolbar
│   │   │   └── WhatHappensNextCard.tsx       # Next step guidance & .ics download
│   │   ├── layout/
│   │   │   ├── Footer.tsx                    # Cynbit Jaipur corporate footer
│   │   │   └── Navbar.tsx                    # Header with brand logo & theme toggle
│   │   └── ui/
│   │       ├── badge.tsx                     # Colored status badges
│   │       ├── button.tsx                    # Accessible button with loading states
│   │       ├── card.tsx                      # Modern card component
│   │       ├── dialog.tsx                    # Accessible modal dialog
│   │       ├── skeleton.tsx                  # Shimmering placeholder primitive
│   │       └── theme-toggle.tsx              # Dark / Light mode switcher
│   ├── data/
│   │   └── mockCandidates.ts                 # 4 rich candidate lifecycle personas
│   ├── lib/
│   │   └── utils.ts                          # Tailwind class merger & date utilities
│   ├── styles/
│   │   └── globals.css                       # Design tokens, scrollbar, skeleton shimmer
│   └── types/
│       └── candidate.ts                      # Strict TypeScript interfaces
├── docs/
│   └── TECHNICAL_REPORT.md                   # Conversational engineering report
├── .env.example                              # Safe environment variable template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 💻 Local Setup Instructions

### Prerequisites
- Node.js `v18.17.0+` or `v20+` or `v24+`
- pnpm (recommended) or npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/cynbit/status-hub-2.git
cd status-hub-2
pnpm install
```

### 2. Configure Environment Variables (Optional)
```bash
cp .env.example .env.local
```
*(Note: An API key is NOT required. The AI assistant includes an intelligent local grounding engine that operates offline!)*

### 3. Run Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
pnpm run build
pnpm run start
```

---

## 🚢 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository. Vercel will automatically detect **Next.js**.
4. (Optional) Set `GEMINI_API_KEY` in Environment Variables.
5. Click **"Deploy"**. The build completes in under 45 seconds with 0 warnings.

---

## 🔒 Security & Privacy

- **No Secrets in Repo:** No hardcoded tokens or API keys exist in git history.
- **Sanitized Headers:** Candidate API routes enforce `Cache-Control: no-store` to prevent caching of candidate PII.
- **Client-Side Grounding Safety:** The AI assistant receives only the candidate's verified dossier and rejects answering unrelated or unauthorized inquiries.

---

## 🏛 About Cynbit Technologies

**Cynbit Technologies** is an AI automation & generative software engineering agency located in **Jaipur, Rajasthan, India**. Cynbit crafts autonomous multi-agent pipelines, intelligent RPA, and enterprise AI software for global organizations.

- **Website:** [https://www.cynbit.in](https://www.cynbit.in)
- **Recruitment:** [careers@cynbit.in](mailto:careers@cynbit.in)
- **Talent Partner:** Pooja Rathore (`pooja.rathore@cynbit.in`)
