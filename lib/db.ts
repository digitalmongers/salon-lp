/**
 * In-memory server database for appointments and newsletter subscriptions.
 * Global singleton pattern ensures persistence across App Router API invocations.
 */

export interface BookingRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  notes: string;
  mode: "book" | "contact";
  createdAt: string;
  status: "pending" | "confirmed";
}

export interface NewsletterRecord {
  id: string;
  email: string;
  subscribedAt: string;
}

interface SalonStorage {
  bookings: BookingRecord[];
  subscribers: NewsletterRecord[];
}

// Attach to globalThis in Node.js to persist across development hot-reloads
const globalForSalon = globalThis as unknown as {
  salonStorage?: SalonStorage;
};

const storage: SalonStorage =
  globalForSalon.salonStorage ?? {
    bookings: [],
    subscribers: [],
  };

if (process.env.NODE_ENV !== "production") {
  globalForSalon.salonStorage = storage;
}

const MAX_BOOKINGS = 1000;
const MAX_SUBSCRIBERS = 2500;

export const db = {
  // Bookings
  createBooking(
    data: Omit<BookingRecord, "id" | "createdAt" | "status">
  ): BookingRecord {
    const record: BookingRecord = {
      ...data,
      id: `bk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    storage.bookings.unshift(record);

    // Bounded array capacity to prevent memory leaks under stress
    if (storage.bookings.length > MAX_BOOKINGS) {
      storage.bookings.length = MAX_BOOKINGS;
    }

    return record;
  },

  getBookings(): BookingRecord[] {
    return [...storage.bookings];
  },

  // Newsletter
  subscribeNewsletter(email: string): { record: NewsletterRecord; isNew: boolean } {
    const existing = storage.subscribers.find(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );

    if (existing) {
      return { record: existing, isNew: false };
    }

    const record: NewsletterRecord = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
    };
    storage.subscribers.unshift(record);

    // Bounded subscriber array capacity
    if (storage.subscribers.length > MAX_SUBSCRIBERS) {
      storage.subscribers.length = MAX_SUBSCRIBERS;
    }

    return { record, isNew: true };
  },

  getSubscribers(): NewsletterRecord[] {
    return [...storage.subscribers];
  },
};

