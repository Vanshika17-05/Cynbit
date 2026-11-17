# Application Status Hub 2.0 — Technical Report

[Live Demo](<PASTE LIVE URL>) · [Technical Report](https://github.com/Vanshika17-05/Cynbit/blob/main/docs/TECHNICAL_REPORT.md) · [Screenshots](https://github.com/Vanshika17-05/Cynbit/tree/main/docs/screenshots)

This report explains the product choices and implementation boundaries of the candidate status prototype. All candidate records and people shown in the application are fictional.

## Problem

### What I observed

The existing candidate page shows only the plain text `Loading Application Status Hub...` while loading. I did not verify its eventual data state, performance, accessibility score, or user impact, so this report does not claim results for those areas.

### What I expect

A candidate likely needs quick answers to three questions: where the application stands, what happens next, and whether an action is required. I expect explicit progress and recovery states to be more useful than an indefinite plain-text loading view. I also expect self-service demo actions to help reviewers explore the intended workflow. These remain hypotheses until tested with users and measurements.

## Solution

Application Status Hub 2.0 renders mock candidate data into a responsive status page. The server-rendered route provides an initial record when the ID exists, while the client view supports reviewer-triggered loading and error states. Route handlers expose mock candidate data and simulate checklist, notification, and reschedule actions. The assistant stays server-side: it calls Gemini only when both required environment variables exist and otherwise uses a local candidate-grounded response engine.

## Features

- Candidate-specific status, role, timeline, next step, and checklist
- Fictional recruiter contact through `recruiter@example.com`
- Loading skeleton plus invalid-ID and simulated 500 recovery states
- Simulated notification, upload, and reschedule workflows
- Offer-stage demonstration state
- Optional server-side Gemini integration with local fallback
- Reviewer-only controls for persona, delay, skeleton, and error testing

## Tech stack

- [Next.js 14](https://nextjs.org/) App Router and route handlers
- [TypeScript](https://www.typescriptlang.org/) for shared data contracts
- [Tailwind CSS](https://tailwindcss.com/) for responsive styling
- [Framer Motion](https://www.framer.com/motion/) for interface transitions
- [Netlify](https://www.netlify.com/) for serverless deployment

## Project structure

```text
src/
  app/
    api/assistant/       Server-side assistant endpoint
    api/candidate/       Mock candidate endpoint
    api/checklist/       Simulated checklist mutation
    api/notifications/   Simulated preference mutation
    api/reschedule/      Simulated reschedule mutation
    candidate/[id]/      Candidate route and route states
  components/candidate/ Candidate experience and demo controls
  components/layout/    Shared page chrome
  components/ui/        Reusable primitives
  lib/                   In-memory mock data and helpers
  types/                 Application types
docs/                    Project documentation
```

## Implementation notes

The candidate page reads from an in-memory mock store. This is suitable for a demonstration but each serverless instance can have different transient state, and state can disappear between requests. No route writes to the local filesystem.

The assistant reads `GEMINI_API_KEY` and `GEMINI_MODEL` from the server environment. Neither value is sent to the browser. A missing value, rejected request, or unusable response leads to the local grounded engine. The configured model is not hardcoded in application source.

## Measured results

No side-by-side measurements have been completed.

| Metric | Original page | My prototype |
| --- | --- | --- |
| Lighthouse Performance | not measured yet | not measured yet |
| Lighthouse Accessibility | not measured yet | not measured yet |
| Lighthouse Best Practices | not measured yet | not measured yet |
| Lighthouse SEO | not measured yet | not measured yet |

## Limitations

- All candidate data is mocked.
- Uploads, notifications, and reschedule actions are simulated and are not persisted on serverless hosting.
- The reviewer toolbar is for demo use only.
- The AI assistant uses Gemini when configured and a local fallback otherwise.
- The prototype has not been validated with candidates or recruiting staff.

## Future work

- Add authentication, authorization, and an audited recruiting-system integration.
- Store mutations in a database and uploads in secure object storage.
- Add consent-aware notification delivery and delivery-status handling.
- Add browser-level tests for all route states and keyboard workflows.
- Measure the original and deployed prototype with the same repeatable test setup.

## How to run locally

```bash
git clone https://github.com/Vanshika17-05/Cynbit.git
cd Cynbit
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Start from `.env.example` for optional environment configuration. Keep real credentials in `.env.local` or the hosting provider, never in Git.
