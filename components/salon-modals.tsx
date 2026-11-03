"use client";

import * as React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ALL_GALLERY_ITEMS,
  FOOTER_NAV_LINKS,
  SERVICES,
  type GalleryItem,
  type ServiceItem,
} from "@/lib/figma-data";
import {
  EMAIL_REGEX,
  NAME_REGEX,
  DATE_REGEX,
  isValidUkPhone,
  type BookingFormValues,
} from "@/lib/validations";
import {
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeDate,
} from "@/lib/sanitize";
import { generateWhatsAppBookingUrl } from "@/lib/whatsapp";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "book" | "contact";
  initialService?: string;
}

export function BookingDialog({
  open,
  onOpenChange,
  mode,
  initialService = "Glam Locks",
}: BookingDialogProps) {
  const [serviceOverride, setServiceOverride] = React.useState<string | null>(
    null
  );
  const selectedService = serviceOverride ?? initialService;
  const [submittedData, setSubmittedData] = React.useState<{
    name: string;
    email: string;
    phone: string;
    date?: string;
    service: string;
    notes?: string;
    bookingId?: string;
    mode: "book" | "contact";
  } | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      service: initialService,
      notes: "",
      mode,
    },
  });

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSubmittedData(null);
      setServerError(null);
      setServiceOverride(null);
      reset({
        name: "",
        email: "",
        phone: "",
        date: "",
        service: initialService,
        notes: "",
        mode,
      });
    }
    onOpenChange(nextOpen);
  };

  const onSubmit = async (values: BookingFormValues) => {
    setServerError(null);

    // Client-side sanitization prior to payload dispatch
    const payload: BookingFormValues = {
      name: sanitizeText(values.name, 60),
      email: sanitizeEmail(values.email),
      phone: sanitizePhone(values.phone),
      date: sanitizeDate(values.date),
      service: selectedService,
      notes: sanitizeText(values.notes, 500),
      mode,
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, msg]) => {
            setError(field as keyof BookingFormValues, {
              type: "server",
              message: String(msg),
            });
          });
        }
        setServerError(
          result.message || "Failed to submit booking. Please verify your details."
        );
        return;
      }

      setSubmittedData({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        date: payload.date,
        service: payload.service,
        notes: payload.notes,
        bookingId: result.booking?.id,
        mode,
      });
      reset();
    } catch {
      setServerError("Network error. Please check your connection and retry.");
    }
  };

  const whatsAppUrl = submittedData
    ? generateWhatsAppBookingUrl({
        name: submittedData.name,
        email: submittedData.email,
        phone: submittedData.phone,
        service: submittedData.service,
        date: submittedData.date,
        notes: submittedData.notes,
        bookingId: submittedData.bookingId,
        mode: submittedData.mode,
      })
    : "#";

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[520px] bg-[#272422] border-white/15">
        {submittedData ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8BF96]/20 text-[#E8BF96]">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <DialogHeader className="text-center items-center">
              <DialogTitle className="text-center">
                {mode === "book" ? "Appointment Requested" : "Message Received"}
              </DialogTitle>
              <DialogDescription className="text-center max-w-sm">
                Thank you, {submittedData.name || "guest"}. Your request has been recorded.
                You can also instantly send this booking directly to our WhatsApp concierge below.
              </DialogDescription>
            </DialogHeader>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[75px] bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.05em] transition-all duration-200 shadow-md w-full sm:w-auto"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="shrink-0"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Send to WhatsApp
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDialogOpenChange(false)}
                className="w-full sm:w-auto text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {mode === "book" ? "Book Your Style" : "Contact Our Salon"}
              </DialogTitle>
              <DialogDescription>
                {mode === "book"
                  ? "Reserve a personalized hair styling session with our award-winning team."
                  : "Have a question about a transformation or bridal booking? Send us a note."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {serverError && (
                <div className="rounded-md bg-[#F07A60]/15 border border-[#F07A60]/40 px-3 py-2 text-xs text-[#F07A60]">
                  {serverError}
                </div>
              )}

              {mode === "book" && (
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.12em] text-[#B8B0BB]">
                    Select Service
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES.map((svc) => {
                      const active = selectedService === svc.title;
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => setServiceOverride(svc.title)}
                          className={`rounded-lg border px-3 py-2.5 text-left transition-colors cursor-pointer ${
                            active
                              ? "border-[#E8BF96] bg-[#E8BF96]/15 text-white"
                              : "border-white/10 bg-[#1C1D20]/60 text-[#B8B0BB] hover:border-white/25"
                          }`}
                        >
                          <div className="font-serif text-base text-white">
                            {svc.title}
                          </div>
                          <div className="text-[11px] text-[#E8BF96]">
                            {svc.price} · {svc.duration}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-[0.1em] text-[#B8B0BB]">
                    Full Name *
                  </label>
                  <Input
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    className={cn(
                      errors.name && "border-[#F07A60] focus-visible:ring-[#F07A60]"
                    )}
                    {...register("name", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 60,
                        message: "Name cannot exceed 60 characters",
                      },
                      pattern: {
                        value: NAME_REGEX,
                        message: "Letters and standard spaces only",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-[#F07A60] mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-[0.1em] text-[#B8B0BB]">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    className={cn(
                      errors.email && "border-[#F07A60] focus-visible:ring-[#F07A60]"
                    )}
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: EMAIL_REGEX,
                        message: "Please enter a valid email address",
                      },
                      maxLength: {
                        value: 100,
                        message: "Email cannot exceed 100 characters",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#F07A60] mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-[0.1em] text-[#B8B0BB]">
                    UK Phone Number {mode === "book" ? "*" : "(Optional)"}
                  </label>
                  <Input
                    type="tel"
                    placeholder="+44 7911 123456"
                    aria-invalid={!!errors.phone}
                    className={cn(
                      errors.phone && "border-[#F07A60] focus-visible:ring-[#F07A60]"
                    )}
                    {...register("phone", {
                      required:
                        mode === "book"
                          ? "UK phone number starting with +44 is required"
                          : false,
                      validate: (val) => {
                        if (!val && mode !== "book") return true;
                        if (!val)
                          return "UK phone number starting with +44 is required";
                        if (!isValidUkPhone(val)) {
                          return "Must be a valid UK number starting with +44 (e.g., +44 7911 123456)";
                        }
                        return true;
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-[#F07A60] mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-[0.1em] text-[#B8B0BB]">
                    Preferred Date {mode === "book" ? "*" : "(Optional)"}
                  </label>
                  <Input
                    type="date"
                    aria-invalid={!!errors.date}
                    className={cn(
                      "scheme-dark",
                      errors.date && "border-[#F07A60] focus-visible:ring-[#F07A60]"
                    )}
                    {...register("date", {
                      required:
                        mode === "book"
                          ? "Appointment date is required"
                          : false,
                      pattern: {
                        value: DATE_REGEX,
                        message: "Date format must be YYYY-MM-DD",
                      },
                      validate: (val) => {
                        if (!val && mode !== "book") return true;
                        if (!val) return "Please choose an appointment date";
                        const selected = new Date(val + "T00:00:00");
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        if (isNaN(selected.getTime()))
                          return "Invalid calendar date";
                        if (selected < today)
                          return "Date cannot be in the past";
                        return true;
                      },
                    })}
                  />
                  {errors.date && (
                    <p className="text-[11px] text-[#F07A60] mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-[0.1em] text-[#B8B0BB]">
                  Styling Notes (Optional)
                </label>
                <Input
                  placeholder="Tell us about your hair goals or inspiration..."
                  aria-invalid={!!errors.notes}
                  className={cn(
                    errors.notes && "border-[#F07A60] focus-visible:ring-[#F07A60]"
                  )}
                  {...register("notes", {
                    maxLength: {
                      value: 500,
                      message: "Notes cannot exceed 500 characters",
                    },
                  })}
                />
                {errors.notes && (
                  <p className="text-[11px] text-[#F07A60] mt-1">
                    {errors.notes.message}
                  </p>
                )}
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDialogOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="px-7"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : mode === "book"
                    ? "Confirm Booking"
                    : "Send Message"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface ServiceDetailDialogProps {
  service: ServiceItem | null;
  onOpenChange: (open: boolean) => void;
  onBookService: (title: string) => void;
}

export function ServiceDetailDialog({
  service,
  onOpenChange,
  onBookService,
}: ServiceDetailDialogProps) {
  return (
    <Dialog open={!!service} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden bg-[#272422] border-white/15">
        {service && (
          <div>
            <div className="relative h-64 w-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#272422] via-[#272422]/30 to-transparent" />
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <span className="rounded-full bg-[#F07A60] px-3 py-1 text-xs font-medium text-white">
                  {service.price}
                </span>
                <span className="rounded-full bg-black/55 px-3 py-1 text-xs text-[#F6D9BB]">
                  {service.duration}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <DialogHeader>
                <DialogTitle className="text-3xl">{service.title}</DialogTitle>
                <DialogDescription className="text-base text-[#B8B0BB]">
                  {service.summary}
                </DialogDescription>
              </DialogHeader>
              <Card className="bg-[#1C1D20] border border-white/10 rounded-xl">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm uppercase font-sans tracking-[0.12em] text-[#E8BF96]">
                    Session Includes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-1 text-sm text-[#B8B0BB] space-y-1">
                  <p>• One-on-one texture & face-shape consultation</p>
                  <p>• Botanical wash, scalp massage & nourishing gloss</p>
                  <p>• Signature editorial finish & home-care guide</p>
                </CardContent>
              </Card>
              <DialogFooter>
                <Button
                  onClick={() => {
                    const title = service.title;
                    onOpenChange(false);
                    onBookService(title);
                  }}
                >
                  Book now
                </Button>
              </DialogFooter>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface GalleryDialogProps {
  selectedLook: GalleryItem | null;
  viewAllOpen: boolean;
  onCloseLook: () => void;
  onCloseViewAll: () => void;
  onSelectLook: (item: GalleryItem) => void;
  onBookLook: (category: string) => void;
}

export function GalleryDialogs({
  selectedLook,
  viewAllOpen,
  onCloseLook,
  onCloseViewAll,
  onSelectLook,
  onBookLook,
}: GalleryDialogProps) {
  return (
    <>
      <Dialog
        open={!!selectedLook}
        onOpenChange={(open) => !open && onCloseLook()}
      >
        <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden bg-[#272422] border-white/15">
          {selectedLook && (
            <div>
              <div className="relative aspect-square w-full max-h-[420px]">
                <Image
                  src={selectedLook.image}
                  alt={selectedLook.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <DialogHeader>
                  <DialogDescription className="uppercase tracking-[0.14em] text-xs text-[#E8BF96]">
                    {selectedLook.category}
                  </DialogDescription>
                  <DialogTitle className="text-2xl">
                    {selectedLook.title}
                  </DialogTitle>
                </DialogHeader>
                <Button
                  size="sm"
                  onClick={() => {
                    const cat = selectedLook.category;
                    onCloseLook();
                    onBookLook(cat);
                  }}
                >
                  Book This Look
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={viewAllOpen}
        onOpenChange={(open) => !open && onCloseViewAll()}
      >
        <DialogContent className="sm:max-w-[820px] bg-[#1C1D20] border-white/15">
          <DialogHeader>
            <DialogTitle className="text-3xl">
              Transformation <span className="text-white">Gallery</span>
            </DialogTitle>
            <DialogDescription>
              Explore our full collection of before and after salon
              transformations. Click any portrait to inspect.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {ALL_GALLERY_ITEMS.map((item) => (
              <Card
                key={item.id}
                onClick={() => {
                  onCloseViewAll();
                  onSelectLook(item);
                }}
                className="group relative aspect-square cursor-pointer bg-[#272422]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <CardDescription className="text-xs text-white font-serif">
                    {item.title}
                  </CardDescription>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface MenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookClick: () => void;
}

export function MenuDialog({
  open,
  onOpenChange,
  onBookClick,
}: MenuDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] bg-[#1C1D20] border-white/15 p-8">
        <DialogHeader>
          <DialogDescription className="uppercase tracking-[0.2em] text-xs text-[#E8BF96]">
            Navigation
          </DialogDescription>
          <DialogTitle className="font-logo text-2xl uppercase text-white tracking-wide">
            YOUR LOGO
          </DialogTitle>
        </DialogHeader>
        <nav className="flex flex-col gap-3 py-4">
          {FOOTER_NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="font-serif font-light text-3xl text-white hover:text-[#E8BF96] transition-colors py-1 border-b border-white/10"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#B8B0BB]">+44 20 7946 0919</span>
          <Button
            size="sm"
            onClick={() => {
              onOpenChange(false);
              onBookClick();
            }}
          >
            Book now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface VideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookClick: () => void;
}

export function VideoDialog({
  open,
  onOpenChange,
  onBookClick,
}: VideoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[760px] p-0 overflow-hidden bg-[#1C1D20] border-white/15">
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <Image
            src="/images/video-banner.png"
            alt="Salon styling behind-the-scenes showreel"
            fill
            className="object-cover grayscale opacity-55 scale-105 animate-pulse"
          />
          <div className="relative z-10 text-center px-6 space-y-4 max-w-md">
            <span className="inline-block rounded-full bg-[#E8BF96]/20 border border-[#E8BF96]/50 px-4 py-1 text-xs uppercase tracking-[0.18em] text-[#F6D9BB]">
              Studio Showreel · 2024
            </span>
            <DialogHeader className="items-center text-center">
              <DialogTitle className="text-4xl text-white text-center">
                Hairdresser of the Year
              </DialogTitle>
              <DialogDescription className="text-center text-white/80">
                Behind the chair: precision dry cutting, high-gloss treatments,
                and runway transformations.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => {
                onOpenChange(false);
                onBookClick();
              }}
            >
              Book now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
