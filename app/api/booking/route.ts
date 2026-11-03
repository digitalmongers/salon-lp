import { NextResponse } from "next/server";
import {
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeDate,
} from "@/lib/sanitize";
import {
  validateBookingData,
  BookingFormValues,
} from "@/lib/validations";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // Rate Limiting (10 submissions per minute per IP)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous-client";
    const limit = checkRateLimit(`booking_${ip}`, 10, 60 * 1000);

    if (!limit.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many booking requests. Please wait a minute and try again.",
        },
        { status: 429 }
      );
    }

    const raw = await request.json();

    if (!raw || typeof raw !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // 1. Sanitize all inputs
    const sanitized: BookingFormValues = {
      name: sanitizeText(raw.name, 60),
      email: sanitizeEmail(raw.email),
      phone: sanitizePhone(raw.phone),
      date: sanitizeDate(raw.date),
      service: sanitizeText(raw.service, 60),
      notes: sanitizeText(raw.notes, 500),
      mode: raw.mode === "contact" ? "contact" : "book",
    };

    // 2. Validate against business rules & regex
    const validation = validateBookingData(sanitized);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please correct the highlighted errors.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // 3. Persist booking / contact record
    const record = db.createBooking({
      name: sanitized.name,
      email: sanitized.email,
      phone: sanitized.phone,
      date: sanitized.date,
      service: sanitized.service,
      notes: sanitized.notes || "",
      mode: sanitized.mode,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          sanitized.mode === "book"
            ? "Appointment requested successfully."
            : "Message received successfully.",
        booking: record,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API Error:", error);
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
  const bookings = db.getBookings();
  return NextResponse.json({
    success: true,
    count: bookings.length,
    bookings,
  });
}

