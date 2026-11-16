import { NextRequest, NextResponse } from "next/server";
import { getMockCandidate } from "@/data/mockCandidates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, message, history = [] } = body;

    if (!candidateId || !message) {
      return NextResponse.json(
        { success: false, error: "candidateId and message are required" },
        { status: 400 }
      );
    }

    const candidate = getMockCandidate(candidateId);
    if (!candidate) {
      return NextResponse.json(
        { success: false, error: `Candidate with ID ${candidateId} not found` },
        { status: 404 }
      );
    }

    const userPrompt = message.trim();
    const geminiApiKey = process.env.GEMINI_API_KEY;

    // Check if real Gemini API key is configured
    if (geminiApiKey) {
      try {
        const systemInstruction = `You are the Cynbit Technologies Application Assistant for candidate "${candidate.fullName}" (ID: ${candidate.id}).
Cynbit Technologies is an AI automation & software engineering company based in Jaipur, Rajasthan, India.
Your role is to reassure the candidate, answer questions about their application, timeline, interview prep, documents, and next steps with high clarity, empathy, and professionalism.

STRICT GROUNDING RULES:
1. Ground your answers strictly on the candidate profile data provided below.
2. If asked about something not in the candidate data, politely explain that you can only share verified details from their Cynbit application dossier, and direct them to their recruiter ${candidate.recruiter.name} (${candidate.recruiter.email}).
3. Maintain a warm, encouraging, respectful tone suitable for a senior engineering candidate.
4. Keep answers concise, actionable, and formatted nicely with bullet points where appropriate.

CANDIDATE DOSSIER:
- Full Name: ${candidate.fullName}
- Target Role: ${candidate.role} (${candidate.department})
- Location: ${candidate.location}
- Applied Date: ${candidate.appliedDate}
- Current Lifecycle Stage: ${candidate.currentStage}
- Overall Status: ${candidate.overallStatusLabel}
- Summary: ${candidate.aiSummary}
- Immediate Next Step: ${candidate.nextStep.title} - ${candidate.nextStep.description}
- Timeframe: ${candidate.nextStep.expectedTimeframe}
- Responsible Party: ${candidate.nextStep.responsibleParty}
- Recruiter: ${candidate.recruiter.name} (${candidate.recruiter.title}), Email: ${candidate.recruiter.email}, SLA: ${candidate.recruiter.sla}
- Pending Checklist Items: ${candidate.checklist
          .map((i) => `[${i.status.toUpperCase()}] ${i.title} (${i.description})`)
          .join("; ")}
${
  candidate.offerDetails
    ? `- Offer Details: ${candidate.offerDetails.roleTitle}, CTC: ${candidate.offerDetails.annualCTC}, Valid till: ${candidate.offerDetails.validTill}`
    : ""
}
`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${systemInstruction}\n\nCandidate Question: ${userPrompt}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          const generatedText =
            result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              success: true,
              reply: generatedText,
              provider: "Gemini 1.5 Flash (Live API)",
              grounded: true,
            });
          }
        }
      } catch (geminiError) {
        console.error("Gemini API call failed, falling back to local grounding engine:", geminiError);
      }
    }

    // Context-Aware Deterministic Fallback Grounding Engine
    // (Used when API key is not present or for ultra-reliable local testing)
    const lower = userPrompt.toLowerCase();
    let reply = "";

    if (
      lower.includes("prep") ||
      lower.includes("prepare") ||
      lower.includes("interview") ||
      lower.includes("topic") ||
      lower.includes("round")
    ) {
      const activeMilestone = candidate.timeline.find(
        (m) => m.key === candidate.currentStage
      );
      reply = `For your upcoming session (**${candidate.nextStep.title}**), here is what to focus on:

• **Key Topics:** ${
        candidate.checklist.find((c) => c.type === "prep_guide")?.meta
          ?.prepTopics?.join(", ") ||
        "Systems architecture, stateful workflows, and API rate-limiting tradeoffs"
      }
• **Panel:** ${
        activeMilestone?.details?.interviewers
          ?.map((p) => `${p.name} (${p.role})`)
          .join(", ") || candidate.nextStep.responsibleParty
      }
• **Format:** A collaborative 60-minute systems design discussion on Google Meet. There is no LeetCode trivia; we evaluate real-world production engineering.
• Check your checklist above to open the full Cynbit Technical Prep Guide!`;
    } else if (
      lower.includes("when") ||
      lower.includes("time") ||
      lower.includes("schedule") ||
      lower.includes("deadline") ||
      lower.includes("date")
    ) {
      reply = `Here is your verified timeline:

• **Immediate Next Step:** ${candidate.nextStep.title}
• **Expected Timeframe:** ${candidate.nextStep.expectedTimeframe}
• **Hiring Committee SLA:** Decisions and scorecards are compiled within 24 to 48 hours post-round.
• If you need to adjust this date, simply click the **"Request Reschedule"** button in your checklist.`;
    } else if (
      lower.includes("recruiter") ||
      lower.includes("who") ||
      lower.includes("pooja") ||
      lower.includes("contact") ||
      lower.includes("email")
    ) {
      reply = `Your dedicated talent partner is **${candidate.recruiter.name}** (${candidate.recruiter.title}).

• **Email:** [${candidate.recruiter.email}](mailto:${candidate.recruiter.email})
• **Direct SLA:** ${candidate.recruiter.sla}
• **Office Location:** ${candidate.recruiter.location}
Feel free to email her directly using the button on your right sidebar anytime!`;
    } else if (
      lower.includes("document") ||
      lower.includes("upload") ||
      lower.includes("pending") ||
      lower.includes("action")
    ) {
      const pendingItems = candidate.checklist.filter(
        (i) => i.status === "pending"
      );
      if (pendingItems.length === 0) {
        reply = `You have completed all pending checklist items! There are no missing documents at this stage.`;
      } else {
        reply = `You currently have **${pendingItems.length} pending action item(s)**:

${pendingItems
  .map(
    (item, i) =>
      `• **${item.title}:** ${item.description}${
        item.dueDate ? ` *(Due: ${item.dueDate})*` : ""
      }`
  )
  .join("\n")}

You can upload files directly through the **Action Checklist** card on this page.`;
      }
    } else if (
      lower.includes("offer") ||
      lower.includes("salary") ||
      lower.includes("ctc") ||
      lower.includes("compensation")
    ) {
      if (candidate.offerDetails) {
        reply = `Congratulations on your offer! Here is a summary of your terms:

• **Role:** ${candidate.offerDetails.roleTitle}
• **Compensation:** ${candidate.offerDetails.annualCTC} (${candidate.offerDetails.compensationBreakdown})
• **Joining Date:** ${candidate.offerDetails.joiningDate}
• **Acceptance Deadline:** ${candidate.offerDetails.validTill}
• Please review and digitally confirm through the checklist card.`;
      } else {
        reply = `You are currently in the **${candidate.currentStage.toUpperCase()}** stage. Compensation details and formal offer rollout occur immediately following the completion of your technical rounds.`;
      }
    } else {
      reply = `Hello ${candidate.fullName.split(" ")[0]}! I am your Cynbit Application Assistant.

Your application for **${candidate.role}** is currently **${
        candidate.overallStatusLabel
      }**. 

• **Current Stage:** ${candidate.currentStage.toUpperCase()}
• **Next Step:** ${candidate.nextStep.title} (${candidate.nextStep.expectedTimeframe})
• **Your Recruiter:** ${candidate.recruiter.name} (${candidate.recruiter.email})

Feel free to ask me about your interview prep, expected timelines, pending documents, or reschedule options!`;
    }

    return NextResponse.json({
      success: true,
      reply,
      provider: "Cynbit Grounded AI Engine (Offline / Local Mode)",
      grounded: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process chat query" },
      { status: 500 }
    );
  }
}

