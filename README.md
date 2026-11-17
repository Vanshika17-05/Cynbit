# Application Status Hub 2.0

[Live Demo](<PASTE LIVE URL>) · [Technical Report](https://github.com/Vanshika17-05/Cynbit/blob/main/docs/TECHNICAL_REPORT.md) · [Screenshots](https://github.com/Vanshika17-05/Cynbit/tree/main/docs/screenshots)

A candidate status experience built for Cynbit with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. The repository contains fictional candidate records and demonstration workflows; it does not contain production candidate data.

## Problem

### What I observed

The existing candidate page shows only the plain text `Loading Application Status Hub...` while loading. That is the only behavior documented here as directly observed.

### What I expect

Candidates likely want to know where they are in the process, what happens next, and whether they need to act. I expect a visible timeline, clear next step, and reachable contact to make the page easier to understand. These are product hypotheses, not measured outcomes.

## Solution

The prototype turns a single loading state into a candidate hub with a stage timeline, next-step card, action checklist, recruiter contact, notification controls, recovery states, and a candidate-grounded assistant. A reviewer toolbar exposes demo states without implying that those controls belong in a production candidate experience.

## Features

- Four fictional candidate scenarios covering application, screening, interview, and offer stages
- Loading skeleton, invalid-ID recovery UI, and simulated server-error state
- Timeline, next step, checklist, recruiter contact, and notification preferences
- Simulated document upload and interview rescheduling
- Server-side Gemini assistant when both environment variables are configured, with a local grounded fallback
- Responsive layout, theme toggle, keyboard focus styles, and reduced-motion support

## Tech stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Netlify](https://www.netlify.com/)

## Project structure

```text
src/
  app/
    api/                 Server-side demo API routes
    candidate/[id]/      Candidate page and route states
  components/
    candidate/           Candidate hub features
    layout/              Shared navigation and footer
    ui/                  Reusable interface primitives
  lib/                   Mock candidate store and helpers
  types/                 Shared TypeScript types
docs/
  TECHNICAL_REPORT.md    Design and implementation notes
netlify.toml             Netlify build configuration
```

## Demo routes

- `http://localhost:3000/candidate/cyn-aarav-892`
- `http://localhost:3000/candidate/cyn-rohan-731`
- `http://localhost:3000/candidate/cyn-priya-412`
- `http://localhost:3000/candidate/cyn-ananya-105`
- `http://localhost:3000/candidate/invalid-id-demo`

## Measured results

No comparative audit has been completed. Values stay explicit rather than presenting estimates as measurements.

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
- The AI assistant uses Gemini when `GEMINI_API_KEY` and `GEMINI_MODEL` are configured, and a local grounded fallback otherwise.
- Dates, compensation, roles, people, and contact details shown in demo records are fictional.

## Future work

- Add authenticated candidate sessions and an authorized recruiting data source.
- Persist actions in a database and connect notifications to consent-aware delivery services.
- Replace simulated uploads with secure object storage and file validation.
- Add automated end-to-end and accessibility tests.
- Run repeatable audits against both the original page and a deployed production build.

## How to run locally

```bash
git clone https://github.com/Vanshika17-05/Cynbit.git
cd Cynbit
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Copy `.env.example` to `.env.local` only if you want to configure the optional server-side assistant. Never commit real credentials.

## Deployment

Netlify reads `netlify.toml`, builds with `pnpm build`, publishes the Next.js output from `.next`, and uses Node.js 20. Set `GEMINI_API_KEY`, `GEMINI_MODEL`, and `NEXT_PUBLIC_APP_URL` in the Netlify environment when needed.
