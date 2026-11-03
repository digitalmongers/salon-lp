/**
 * WhatsApp integration utility for salon bookings and client communication.
 */

// Default UK salon WhatsApp recipient (customizable via env var NEXT_PUBLIC_SALON_WHATSAPP_NUMBER)
export const DEFAULT_SALON_WHATSAPP = "+919897266808";

export interface WhatsAppBookingParams {
  name: string;
  email: string;
  phone: string;
  service: string;
  date?: string;
  notes?: string;
  bookingId?: string;
  mode?: "book" | "contact";
}

/**
 * Normalizes phone number into clean international format without symbols
 */
export function cleanWhatsAppNumber(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/**
 * Builds the pre-filled WhatsApp click-to-chat URL
 */
export function generateWhatsAppBookingUrl({
  name,
  email,
  phone,
  service,
  date,
  notes,
  bookingId,
  mode = "book",
}: WhatsAppBookingParams): string {
  const recipient = cleanWhatsAppNumber(
    process.env.NEXT_PUBLIC_SALON_WHATSAPP_NUMBER || DEFAULT_SALON_WHATSAPP
  );

  const lines = [
    mode === "book" ? "✨ *NEW APPOINTMENT BOOKING* ✨" : "💬 *NEW SALON INQUIRY* 💬",
    "─────────────────────",
    `• *Client Name:* ${name.trim()}`,
    mode === "book" ? `• *Selected Service:* ${service.trim()}` : null,
    date ? `• *Preferred Date:* ${date.trim()}` : null,
    `• *Client Phone:* ${phone.trim()}`,
    email ? `• *Email:* ${email.trim()}` : null,
    notes ? `• *Styling Notes:* ${notes.trim()}` : null,
    bookingId ? `• *Booking Ref:* #${bookingId}` : null,
    "─────────────────────",
    "Hello! I submitted this request on your website and would like to confirm with the salon concierge.",
  ].filter(Boolean);

  const messageText = lines.join("\n");
  return `https://wa.me/${recipient}?text=${encodeURIComponent(messageText)}`;
}

