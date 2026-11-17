import { NextRequest, NextResponse } from "next/server";
import { updateCandidateNotifications } from "@/lib/mock-candidates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, preferences } = body;

    // Validate presence
    if (!candidateId || typeof candidateId !== "string" || !candidateId.trim()) {
      return NextResponse.json(
        { success: false, error: "Valid candidateId string is required" },
        { status: 400 }
      );
    }

    if (!preferences || typeof preferences !== "object") {
      return NextResponse.json(
        { success: false, error: "Preferences payload object is required" },
        { status: 400 }
      );
    }

    // Validate channels types
    if (preferences.email !== undefined && typeof preferences.email !== "boolean") {
      return NextResponse.json(
        { success: false, error: "preferences.email must be a boolean" },
        { status: 400 }
      );
    }

    if (preferences.whatsapp !== undefined && typeof preferences.whatsapp !== "boolean") {
      return NextResponse.json(
        { success: false, error: "preferences.whatsapp must be a boolean" },
        { status: 400 }
      );
    }

    if (preferences.sms !== undefined && typeof preferences.sms !== "boolean") {
      return NextResponse.json(
        { success: false, error: "preferences.sms must be a boolean" },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (preferences.emailAddress) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(preferences.emailAddress)) {
        return NextResponse.json(
          { success: false, error: "Invalid emailAddress format" },
          { status: 400 }
        );
      }
    }

    // Validate phone number format if provided
    if (preferences.phoneNumber) {
      const cleanPhone = preferences.phoneNumber.replace(/[\s-]/g, "");
      if (cleanPhone.length < 8) {
        return NextResponse.json(
          { success: false, error: "Invalid phoneNumber length" },
          { status: 400 }
        );
      }
    }

    const updated = updateCandidateNotifications(candidateId, preferences);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Candidate with ID "${candidateId}" not found` },
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
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to update notification settings";
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
