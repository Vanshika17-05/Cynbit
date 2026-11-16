import { NextRequest, NextResponse } from "next/server";
import { getMockCandidate } from "@/data/mockCandidates";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const searchParams = request.nextUrl.searchParams;

  // Reviewer utility: allow query param simulated delay (?delay=1200)
  const delayParam = searchParams.get("delay");
  const delayMs = delayParam ? parseInt(delayParam, 10) : 0;
  if (!isNaN(delayMs) && delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, Math.min(delayMs, 5000)));
  }

  // Reviewer utility: allow forced error (?forceError=true)
  const forceError = searchParams.get("forceError") === "true";
  if (forceError) {
    return NextResponse.json(
      {
        success: false,
        error: "Simulated Internal Server Error (500). Please retry shortly.",
      },
      { status: 500 }
    );
  }

  const candidate = getMockCandidate(id);

  if (!candidate) {
    return NextResponse.json(
      {
        success: false,
        error: `Candidate ID "${id}" was not found. Please verify the link provided in your email or try one of the demo candidates.`,
        availableDemoIds: [
          "cyn-aarav-892",
          "cyn-priya-412",
          "cyn-rohan-731",
          "cyn-ananya-105",
        ],
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      candidate,
      meta: {
        serverTime: new Date().toISOString(),
        hubVersion: "2.0.0",
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
