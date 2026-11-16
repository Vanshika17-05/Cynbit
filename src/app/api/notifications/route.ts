import { NextRequest, NextResponse } from "next/server";
import { updateCandidateNotifications } from "@/lib/mock-candidates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, preferences } = body;

    if (!candidateId || !preferences) {
      return NextResponse.json(
        { success: false, error: "candidateId and preferences are required" },
        { status: 400 }
      );
    }

    const updated = updateCandidateNotifications(candidateId, preferences);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Candidate with ID ${candidateId} not found` },
        { status: 404 }
      );
    }

    // Generate descriptive success message
    const activeChannels = [];
    if (updated.notificationPreferences.whatsapp) activeChannels.push("WhatsApp");
    if (updated.notificationPreferences.email) activeChannels.push("Email");
    if (updated.notificationPreferences.sms) activeChannels.push("SMS");

    return NextResponse.json({
      success: true,
      message: `Notification preferences updated successfully. Alerts active via: ${
        activeChannels.length > 0 ? activeChannels.join(", ") : "None (All Muted)"
      }`,
      preferences: updated.notificationPreferences,
      candidate: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update notification settings" },
      { status: 500 }
    );
  }
}

