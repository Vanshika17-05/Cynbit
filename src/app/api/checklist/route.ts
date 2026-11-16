import { NextRequest, NextResponse } from "next/server";
import { updateCandidateChecklist } from "@/data/mockCandidates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, actionId, fileName, fileSize, status = "completed" } = body;

    if (!candidateId || !actionId) {
      return NextResponse.json(
        { success: false, error: "candidateId and actionId are required" },
        { status: 400 }
      );
    }

    const updated = updateCandidateChecklist(candidateId, actionId, {
      status,
      meta: fileName
        ? {
            uploadedFileName: fileName,
            uploadedAt: new Date().toISOString(),
          }
        : undefined,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Candidate with ID ${candidateId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: fileName
        ? `"${fileName}" uploaded successfully and linked to your candidate dossier.`
        : "Checklist item marked as completed.",
      candidate: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update checklist item" },
      { status: 500 }
    );
  }
}
