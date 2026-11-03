/**
 * Regex constants, validation schemas, and types for forms.
 */

// Email regex matching standard RFC 5322 specifications
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// UK Phone regex: Must start with +44, followed by 9-10 digits (with optional spaces, hyphens, or (0) trunk prefix)
export const UK_PHONE_REGEX =
  /^\+44[\s.-]?(?:\(?0\)?[\s.-]?)?[1-9](?:[\s.-]?\d){8,9}$/;

export const PHONE_REGEX = UK_PHONE_REGEX;

/**
 * Validates that a string is a valid UK phone number starting with +44.
 */
export function isValidUkPhone(phone: unknown): boolean {
  if (!phone || typeof phone !== "string") return false;
  const trimmed = phone.trim();
  if (!trimmed.startsWith("+44")) return false;

  // Extract digits after +44
  const digits = trimmed.slice(3).replace(/\D/g, "");
  const normalizedDigits = digits.startsWith("0") ? digits.slice(1) : digits;

  // UK national numbers have 9 or 10 digits
  if (normalizedDigits.length < 9 || normalizedDigits.length > 10) return false;
  if (!/^[1-9]/.test(normalizedDigits)) return false;

  return /^\+44[\s.()-\d]+$/.test(trimmed);
}

// Full Name regex: allows international alphabets, spaces, apostrophes, hyphens (2 to 60 chars)
export const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s'\-]{2,60}$/;

// ISO Date regex: YYYY-MM-DD
export const DATE_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;

export const ALLOWED_SERVICES = [
  "Polished Hair",
  "Glam Locks",
  "Velvet Strands",
  "Locks of Love",
] as const;

export type AllowedService = (typeof ALLOWED_SERVICES)[number];

export interface BookingFormValues {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  notes?: string;
  mode: "book" | "contact";
}

export interface NewsletterFormValues {
  email: string;
}

export interface FieldErrors {
  [key: string]: string;
}

export interface ValidationOutcome {
  isValid: boolean;
  errors: FieldErrors;
}

/**
 * Validates booking and contact form data against business rules and regex.
 */
export function validateBookingData(
  data: BookingFormValues
): ValidationOutcome {
  const errors: FieldErrors = {};

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Full name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  } else if (data.name.trim().length > 60) {
    errors.name = "Name cannot exceed 60 characters";
  } else if (!NAME_REGEX.test(data.name.trim())) {
    errors.name = "Name contains invalid characters (letters only)";
  }

  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email address is required";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please provide a valid email address";
  } else if (data.email.trim().length > 100) {
    errors.email = "Email cannot exceed 100 characters";
  }

  // Phone validation (required for booking, optional for contact — must be a UK number starting with +44)
  if (data.mode === "book") {
    if (!data.phone || data.phone.trim().length === 0) {
      errors.phone = "Phone number is required (must be a UK number starting with +44)";
    } else if (!isValidUkPhone(data.phone.trim())) {
      errors.phone = "Must be a valid UK phone number starting with +44 (e.g., +44 7911 123456 or +44 20 7946 0919)";
    }
  } else if (data.phone && data.phone.trim().length > 0) {
    if (!isValidUkPhone(data.phone.trim())) {
      errors.phone = "Must be a valid UK phone number starting with +44 (e.g., +44 7911 123456 or +44 20 7946 0919)";
    }
  }

  // Date validation (required for booking)
  if (data.mode === "book") {
    if (!data.date || data.date.trim().length === 0) {
      errors.date = "Please select an appointment date";
    } else if (!DATE_REGEX.test(data.date.trim())) {
      errors.date = "Invalid date format. Use YYYY-MM-DD";
    } else {
      const selected = new Date(data.date + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(selected.getTime())) {
        errors.date = "Invalid calendar date";
      } else if (selected < today) {
        errors.date = "Appointment date cannot be in the past";
      }
    }

    // Service validation
    if (!data.service || !ALLOWED_SERVICES.includes(data.service as AllowedService)) {
      errors.service = `Please select a valid service (${ALLOWED_SERVICES.join(", ")})`;
    }
  }

  // Notes validation
  if (data.notes && data.notes.length > 500) {
    errors.notes = "Notes cannot exceed 500 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates newsletter form email.
 */
export function validateNewsletterData(
  data: NewsletterFormValues
): ValidationOutcome {
  const errors: FieldErrors = {};

  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email address is required";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  } else if (data.email.trim().length > 100) {
    errors.email = "Email address cannot exceed 100 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

