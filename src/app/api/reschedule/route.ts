import { NextRequest, NextResponse } from "next/server";
import { requestInterviewReschedule } from "@/data/mockCandidates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, preferredDate, preferredTimeSlot, reason, note } = body;

    if (!candidateId || !preferredDate || !preferredTimeSlot || !reason) {
      return NextResponse.json(
        {
          success: false,
          error: "candidateId, preferredDate, preferredTimeSlot, and reason are required",
        },
        { status: 400 }
      );
    }

    const updated = requestInterviewReschedule(candidateId, {
      preferredDate,
      preferredTimeSlot,
      reason,
      note,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Candidate with ID ${candidateId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Reschedule request submitted to Pooja Rathore. Updated calendar invite will be issued within ~4 hours.`,
      candidate: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process reschedule request" },
      { status: 500 }
    );
  }
}
