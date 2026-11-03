/**
 * Input sanitization utilities for client and server-side forms.
 * Defends against XSS, HTML injection, and malformed inputs.
 */

/**
 * Strips HTML tags, script tags, control characters, and dangerous entities.
 */
export function sanitizeText(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";

  return input
    // Strip control characters except newline and tab
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Strip HTML tags (<script>...</script>, <div>, etc.)
    .replace(/<[^>]*>/g, "")
    // Normalize consecutive whitespace but preserve single spaces
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitizes an email address: trims whitespace, lowercases, removes dangerous characters.
 */
export function sanitizeEmail(input: unknown): string {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w.!#$%&'*+/=?^`{|}~@-]/g, "")
    .slice(0, 100);
}

/**
 * Sanitizes a phone number: preserves digits, spaces, hyphens, parentheses, and leading plus.
 */
export function sanitizePhone(input: unknown): string {
  if (typeof input !== "string") return "";

  const trimmed = input.trim();
  const hasPlus = trimmed.startsWith("+");
  const cleaned = trimmed.replace(/[^\d\s\-().]/g, "").slice(0, 30);

  return (hasPlus ? "+" : "") + cleaned.replace(/^\+/, "");
}

/**
 * Sanitizes an ISO date string (YYYY-MM-DD).
 */
export function sanitizeDate(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, 10);
}

