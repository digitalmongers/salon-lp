import { NextResponse } from "next/server";
import { sanitizeEmail } from "@/lib/sanitize";
import { validateNewsletterData } from "@/lib/validations";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const raw = await request.json();

    if (!raw || typeof raw !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // 1. Sanitize email
    const sanitizedEmail = sanitizeEmail(raw.email);

    // 2. Validate
    const validation = validateNewsletterData({ email: sanitizedEmail });

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // 3. Persist subscriber
    const { record, isNew } = db.subscribeNewsletter(sanitizedEmail);

    return NextResponse.json(
      {
        success: true,
        message: isNew
          ? "Thank you for subscribing to our salon updates."
          : "You are already subscribed to our salon updates.",
        subscriber: record,
      },
      { status: isNew ? 201 : 200 }
    );
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const subscribers = db.getSubscribers();
  return NextResponse.json({
    success: true,
    count: subscribers.length,
    subscribers,
  });
}

