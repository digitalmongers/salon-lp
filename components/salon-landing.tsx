"use client";

import * as React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MarqueeRibbon } from "@/components/marquee-ribbon";
import {
  BookingDialog,
  GalleryDialogs,
  MenuDialog,
  ServiceDetailDialog,
  VideoDialog,
} from "@/components/salon-modals";
import {
  FOOTER_NAV_LINKS,
  FOOTER_SOCIAL_LINKS,
  GALLERY_BOTTOM_LEFT_LARGE,
  GALLERY_BOTTOM_RIGHT,
  GALLERY_TOP_LEFT,
  GALLERY_TOP_RIGHT_LARGE,
  INSTAGRAM_IMAGES,
  SERVICES,
  type GalleryItem,
  type ServiceItem,
} from "@/lib/figma-data";
import { EMAIL_REGEX, type NewsletterFormValues } from "@/lib/validations";
import { sanitizeEmail } from "@/lib/sanitize";

export function SalonLanding() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [bookingOpen, setBookingOpen] = React.useState(false);
  const [bookingMode, setBookingMode] = React.useState<"book" | "contact">(
    "book"
  );
  const [selectedServiceTitle, setSelectedServiceTitle] =
    React.useState("Glam Locks");
  const [detailService, setDetailService] = React.useState<ServiceItem | null>(
    null
  );
  const [selectedLook, setSelectedLook] = React.useState<GalleryItem | null>(
    null
  );
  const [viewAllOpen, setViewAllOpen] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [newsletterServerSuccess, setNewsletterServerSuccess] =
    React.useState<string | null>(null);
  const [newsletterServerError, setNewsletterServerError] =
    React.useState<string | null>(null);

  const {
    register: registerNewsletter,
    handleSubmit: handleNewsletterSubmitRHF,
    reset: resetNewsletter,
    setError: setNewsletterFieldError,
    formState: { errors: newsletterErrors, isSubmitting: isNewsletterSubmitting },
  } = useForm<NewsletterFormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const onNewsletterSubmit = async (values: NewsletterFormValues) => {
    setNewsletterServerSuccess(null);
    setNewsletterServerError(null);

    const sanitizedEmail = sanitizeEmail(values.email);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: sanitizedEmail }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors?.email) {
          setNewsletterFieldError("email", {
            type: "server",
            message: data.errors.email,
          });
        }
        setNewsletterServerError(data.message || "Failed to subscribe.");
        return;
      }

      setNewsletterServerSuccess(
        data.message || "Thank you for subscribing to our salon updates."
      );
      resetNewsletter({ email: "" });
    } catch {
      setNewsletterServerError("Network error. Please try again.");
    }
  };

  const openBooking = (serviceTitle = "Glam Locks") => {
    setSelectedServiceTitle(serviceTitle);
    setBookingMode("book");
    setBookingOpen(true);
  };

  const openContact = () => {
    setBookingMode("contact");
    setBookingOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="home" className="min-h-screen bg-[#1C1D20] text-white">
      {/* =========================================================
          HEADER + HERO SECTION (#4001:15 .. #4001:50)
      ========================================================= */}
      <section className="relative overflow-hidden">
        {/* Architectural 10% White Hairline Grid (#4001:15) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[1440px] h-[772px] overflow-hidden"
        >
          {/* Vertical lines spaced ~192.75px */}
          <div className="absolute inset-y-0 left-[142px] hidden lg:flex gap-[192.75px] opacity-10">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-full w-[0.75px] bg-white shrink-0" />
            ))}
          </div>
          {/* Horizontal lines starting at y=109.5px */}
          <div className="absolute inset-x-0 top-[109.5px] flex flex-col gap-[192.75px] opacity-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-[0.75px] bg-white" />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-[100px]">
          {/* Header Bar (#4001:187 & #4001:37) */}
          <header className="flex h-[109.5px] items-center justify-between">
            <a
              href="#home"
              className="font-logo text-[26px] sm:text-[36.29px] font-semibold leading-[37.3px] uppercase tracking-normal text-white"
            >
              HAIR STYLO
            </a>

            <Button
              variant="ghost"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className="h-auto min-w-0 px-2 py-1.5 rounded-md flex items-center gap-[15.75px] hover:bg-white/5"
            >
              <span className="font-sans text-[12px] font-medium uppercase leading-[31.5px] tracking-wider text-white">
                MENU
              </span>
              <Image
                src="/icons/menu.svg"
                alt=""
                width={42}
                height={24}
                className="w-[34px] sm:w-[42px] h-auto"
                loading="eager"
              />
            </Button>
          </header>

          {/* Hero Split Content */}
          <div className="relative pt-10 pb-16 lg:pt-[84px] lg:pb-[130px] xl:min-h-[728px] flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-4">
            {/* Left Copy Column */}
            <div className="relative z-20 w-full max-w-[465px] lg:pt-[59px] text-left">
              <p className="font-serif italic font-light text-[30px] sm:text-[42.48px] leading-[1.05] text-[#F6D9BB]">
                Laura Smith
              </p>

              <h1 className="mt-4 font-serif font-light text-[54px] sm:text-[74px] xl:text-[91.21px] leading-[1.0] text-white">
                Hairdresser
                <br />
                of the year
              </h1>

              <p className="mt-6 max-w-[394px] font-sans font-medium text-[16px] sm:text-[18px] leading-[30px] text-[#B8B0BB]">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque.
              </p>

              <div className="mt-8">
                <Button onClick={() => openBooking("Glam Locks")}>
                  Book now
                </Button>
              </div>
            </div>

            {/* Right Tilted Blue Oval + Stylist Portrait (#4001:48, #4001:49, #4001:183) */}
            <div className="relative z-10 w-full max-w-[680px] xl:max-w-[798px] lg:-mt-[58px] xl:-mr-[38px] select-none">
              <div className="relative w-full aspect-[1595/1422]">
                {/* Offset #3E6A8F Tilted Ring (#4001:48) */}
                <Image
                  src="/icons/hero-ring.svg"
                  alt=""
                  width={798}
                  height={542}
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 w-full h-auto z-0"
                  loading="eager"
                />
                {/* Seamless High-Res Composed Ellipse + Crown Cutout */}
                <Image
                  src="/images/hero-composed.webp"
                  alt="Brunette hairdresser smiling holding professional salon scissors"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 798px"
                  className="object-contain z-10"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TOP PEACH MARQUEE RIBBON (#4001:51)
      ========================================================= */}
      <MarqueeRibbon />

      {/* =========================================================
          SERVICES WE OFFER (#4001:44, #4001:83..#4001:104)
      ========================================================= */}
      <section
        id="services"
        className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-[100px] pt-[86px]"
      >
        <h2 className="text-center font-serif font-light text-[36px] sm:text-[48px] leading-[53.25px] text-[#F6D9BB]">
          Services we offer
        </h2>

        <div className="mt-[41px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-[38px]">
          {SERVICES.map((service) => (
            <Card
              key={service.id}
              onClick={() => setDetailService(service)}
              className="group relative aspect-[271/360] w-full rounded-none border-0 bg-[#272422] cursor-pointer"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 272px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Bottom Linear Gradient Scrim (#4001:84..90) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(39, 36, 34, 0) 0%, rgba(39, 36, 34, 0.65) 100%)",
                }}
              />

              {/* Coral "View details" Circular Button (#4001:103) - shown on hover across all cards */}
              <Button
                variant="coral"
                size="circle"
                onClick={(e) => {
                  e.stopPropagation();
                  setDetailService(service);
                }}
                className="absolute right-[13%] top-[30%] font-poppins font-normal text-[12px] leading-[14.25px] normal-case tracking-normal text-white shadow-lg opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 focus-visible:opacity-100 focus-visible:scale-100"
              >
                <span className="text-center">
                  View
                  <br />
                  details
                </span>
              </Button>

              {/* Curved Arrow SVG + Service Title (#4001:91..102) */}
              <div className="absolute bottom-[13px] left-[21px] right-4 flex flex-col gap-[13.5px]">
                <Image
                  src={service.arrowIcon}
                  alt=""
                  width={21}
                  height={14}
                  className="w-[19px] h-[13px]"
                  loading="lazy"
                />
                <h3 className="font-serif font-light text-[25px] xl:text-[27px] leading-[36.75px] text-white">
                  {service.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================
          ABOUT ME / DUMMY PLACEHOLDER (#4001:33..36, #4001:46..47, #4001:79, #4001:82)
      ========================================================= */}
      <section
        id="about"
        className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-[102px] pt-[120px] lg:pt-[154px]"
      >
        {/* Top Eyebrow + Display Heading */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-[38px]">
          <span className="sm:w-[126px] sm:pt-[21px] font-sans font-medium text-[16px] sm:text-[18px] leading-[30px] uppercase text-[#B8B0BB] shrink-0">
            ABOUT ME
          </span>
          <h2 className="font-serif font-light text-[54px] sm:text-[76px] lg:text-[96px] leading-[0.88] text-[#F6D9BB]">
            Laura
            <br />
            Stylist
          </h2>
        </div>

        {/* Image + Copy & 5+ Years Experience */}
        <div className="mt-11 lg:mt-[44px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[60px] xl:gap-[95px] items-start">
          {/* B&W Studio Portrait (#4001:79: 683x380) */}
          <div className="lg:col-span-7 relative aspect-[683/380] w-full overflow-hidden bg-[#272422]">
            <Image
              src="/images/about-me.webp"
              alt="Smiling hairstylist holding lock of hair and shears"
              fill
              sizes="(max-width: 1024px) 100vw, 683px"
              className="object-cover grayscale"
              loading="lazy"
            />
          </div>

          {/* Right Description + Experience Counter */}
          <div className="lg:col-span-5 max-w-[396px] space-y-[30px]">
            <p className="font-sans font-medium text-[16px] sm:text-[18px] leading-[30px] text-[#B8B0BB]">
              But I must explain to you how all this mistaken idea of denouncing
              pleasure and praising pain was born and I will give you a complete
              account of the system, and expou.
            </p>

            <p className="font-sans font-medium text-[16px] sm:text-[18px] leading-[30px] text-[#B8B0BB]">
              Expound the actual teachings of the great explorer of the truth,
              the master-builder of human.
            </p>

            {/* Vertical Line + 5+ Years of Experience (#4001:82, #4001:47, #4001:36) */}
            <div className="pt-1 flex items-center gap-[27px]">
              <div className="h-[96px] sm:h-[110.25px] w-[0.75px] bg-[#D9D9D9] shrink-0" />
              <span className="font-serif font-light text-[72px] sm:text-[96px] leading-[84.75px] text-[#F6D9BB]">
                5+
              </span>
              <span className="font-sans font-medium text-[16px] sm:text-[18px] leading-[20.25px] uppercase text-[#B8B0BB]">
                YEARS OF
                <br />
                EXPERIENCE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PORTFOLIO / TRANSFORMATION GALLERY (#4001:105..117, #4001:184)
      ========================================================= */}
      <section
        id="gallery"
        className="mx-auto max-w-[1440px] px-6 sm:px-12 pt-[120px] lg:pt-[158px]"
      >
        <div className="mx-auto max-w-[937.5px]">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-[41px]">
            <span className="sm:w-[126px] sm:pt-[21px] font-sans font-medium text-[16px] sm:text-[18px] leading-[30px] uppercase text-[#B8B0BB] shrink-0">
              PORTFOLIO
            </span>
            <div>
              <h2 className="font-serif font-light text-[52px] sm:text-[76px] lg:text-[96px] leading-[0.96]">
                <span className="text-white">Transformation</span>
                <br />
                <span className="text-[#F6D9BB]">Gallery</span>
              </h2>
              <p className="mt-6 sm:mt-[34px] font-sans font-medium text-[16px] sm:text-[18px] leading-[30px] text-[#B8B0BB]">
                Explore stunning before and after hair transformations.
              </p>
            </div>
          </div>

          {/* 10-Tile Asymmetric Mosaic Grid */}
          <div className="mt-10 sm:mt-[54px] space-y-[19.5px]">
            {/* Upper Quadrant Row: 2x2 Small Left + 1 Large Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[19.5px]">
              <div className="grid grid-cols-2 gap-[19.5px]">
                {GALLERY_TOP_LEFT.map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => setSelectedLook(item)}
                    className="group relative aspect-[219/214.5] rounded-none border-0 bg-[#272422] cursor-pointer"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 46vw, 220px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Card>
                ))}
              </div>

              <Card
                onClick={() => setSelectedLook(GALLERY_TOP_RIGHT_LARGE)}
                className="group relative aspect-[457.5/451.5] rounded-none border-0 bg-[#272422] cursor-pointer"
              >
                <Image
                  src={GALLERY_TOP_RIGHT_LARGE.image}
                  alt={GALLERY_TOP_RIGHT_LARGE.title}
                  fill
                  sizes="(max-width: 768px) 95vw, 458px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Card>
            </div>

            {/* Lower Quadrant Row: 1 Large Left + 2x2 Small Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[19.5px]">
              <Card
                onClick={() => setSelectedLook(GALLERY_BOTTOM_LEFT_LARGE)}
                className="group relative aspect-[459/451.5] rounded-none border-0 bg-[#272422] cursor-pointer"
              >
                <Image
                  src={GALLERY_BOTTOM_LEFT_LARGE.image}
                  alt={GALLERY_BOTTOM_LEFT_LARGE.title}
                  fill
                  sizes="(max-width: 768px) 95vw, 459px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Card>

              <div className="grid grid-cols-2 gap-[19.5px]">
                {GALLERY_BOTTOM_RIGHT.map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => setSelectedLook(item)}
                    className="group relative aspect-[219/215] rounded-none border-0 bg-[#272422] cursor-pointer"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 46vw, 220px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Centered "View all" Button (#4001:184) */}
          <div className="mt-[35px] flex justify-center">
            <Button onClick={() => setViewAllOpen(true)}>View all</Button>
          </div>
        </div>
      </section>

      {/* =========================================================
          VIDEO SHOWCASE BANNER (#4001:80 & #4001:81)
      ========================================================= */}
      <section className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-[100px] pt-[110px]">
        <div
          onClick={() => setVideoOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Play salon styling video reel"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setVideoOpen(true);
            }
          }}
          className="group relative aspect-[1239/726] w-full overflow-hidden bg-[#DFDFDF] cursor-pointer"
        >
          <Image
            src="/images/video-banner.webp"
            alt="Model smiling with dynamic flowing hair in black and white"
            fill
            sizes="(max-width: 1440px) 95vw, 1239px"
            className="object-cover grayscale transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          />

          {/* Centered YouTube Play Button (#4001:81: 92.25x64.5) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex h-[54px] w-[78px] sm:h-[64.5px] sm:w-[92.25px] items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/icons/youtube-play.svg"
                alt=""
                fill
                className="object-contain drop-shadow-lg"
                loading="lazy"
              />
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRANSFORMING YOUR LOOK, ELEVATING YOUR STYLE (#4001:118..130)
      ========================================================= */}
      <section className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-[102px] pt-[101px]">
        <h2 className="max-w-[920px] font-serif font-light text-[48px] sm:text-[72px] lg:text-[96px] leading-[1.12] lg:leading-[112.5px]">
          <span className="text-[#E8BF96]">Transforming </span>
          <br className="hidden sm:block" />
          <span className="text-[#E8BF96]">Your Look</span>
          <span className="text-white">, Elevating Your Style.</span>
        </h2>

        <div className="mt-12 lg:mt-[87px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Salon Image (#4001:120: 392x376, radius 7.5px) */}
          <div className="lg:col-span-4 xl:w-[392px]">
            <div className="relative aspect-[392/376] w-full overflow-hidden rounded-[7.5px] bg-[#272422]">
              <Image
                src="/images/service-2.webp"
                alt="Stylist brushing and shaping client hair in salon"
                fill
                sizes="(max-width: 1024px) 100vw, 392px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Center Copy + Contact Us CTA (#4001:121, #4001:122, #4001:128) */}
          <div className="lg:col-span-4 xl:pl-10 max-w-[360px] space-y-[29px]">
            <p className="font-sans font-medium text-[16px] sm:text-[18px] leading-[30px] text-[#B8B0BB]">
              But I must explain to you how all this mistaken idea of denouncing
              pleasure and praising pain was born and I will give you a complete
              account of the system, and expou.
            </p>

            <p className="font-sans font-medium text-[16px] sm:text-[18px] leading-[30px] text-[#B8B0BB]">
              Expound the actual teachings of the great explorer.
            </p>

            <div>
              <Button onClick={openContact}>Contact us</Button>
            </div>
          </div>

          {/* Right Elevated Salon Chair Portrait (#4001:118: 324x374, y=4838 -> -135px offset) */}
          <div className="lg:col-span-4 lg:-mt-[135px] lg:ml-auto w-full lg:max-w-[324px]">
            <div className="relative aspect-[324/374] w-full overflow-hidden rounded-[7.5px] bg-[#272422]">
              <Image
                src="/images/transform-right.webp"
                alt="Client with glossy long dark hair seated in studio chair"
                fill
                sizes="(max-width: 1024px) 100vw, 324px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOLLOW US ON INSTAGRAM (#4001:45, #4001:123..127)
      ========================================================= */}
      <section className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-[75px] pt-[120px] lg:pt-[143px]">
        <h2 className="text-center font-serif font-light text-[36px] sm:text-[48px] leading-[53.25px] text-[#F6D9BB]">
          Follow us on Instagram
        </h2>

        <div className="mt-[37px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[14.25px]">
          {INSTAGRAM_IMAGES.map((post) => (
            <Card
              key={post.id}
              className="group relative aspect-[246.75/303.75] w-full rounded-none border-0 bg-[#272422]"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 247px"
                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                loading="lazy"
              />
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================
          BOOK YOUR STYLE / TRANSFORM YOUR LOOK CTA (#4001:131..141)
      ========================================================= */}
      <section
        id="contact"
        className="mx-auto max-w-[1440px] px-6 sm:px-12 pt-[120px] pb-[120px] lg:pt-[151px] lg:pb-[155px]"
      >
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center gap-[29.25px]">
          <div className="w-full">
            <h2 className="font-serif font-light text-[50px] md:text-[96px] leading-[1.12] lg:leading-[112.5px] text-[#E8BF96]">
              Book your style
            </h2>
            <p className="font-serif font-light text-[44px] md:text-[96px] leading-[1.12] lg:leading-[112.5px] text-[#F07A60]">
              Transform your look
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-[18px]">
            <Button
              variant="outline"
              onClick={() => openBooking("Glam Locks")}
            >
              Book now
            </Button>
            <Button onClick={openContact}>Contact us</Button>
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM PEACH MARQUEE RIBBON (#4001:65)
      ========================================================= */}
      <MarqueeRibbon />

      {/* =========================================================
          FOOTER (#4001:142..#4001:188)
      ========================================================= */}
      <footer className="relative bg-[#272422] text-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-[100px] pt-[80px] lg:pt-[105px] pb-[28px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-[96px]">
            {/* Column 1: Navigation Links (#4001:164) */}
            <div className="md:col-span-3 space-y-[37.5px]">
              <h3 className="font-poppins font-medium text-[14.25px] leading-[17.25px] text-white">
                Connect
              </h3>
              <ul className="flex flex-col gap-[16.5px]">
                {FOOTER_NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`font-serif font-light text-[26px] sm:text-[30px] leading-[37.5px] transition-colors ${item.active
                          ? "text-[#E8BF96]"
                          : "text-white hover:text-[#E8BF96]"
                        }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Social Links (#4001:148) */}
            <div className="md:col-span-4 space-y-[37.5px]">
              <h3 className="font-poppins font-medium text-[14.25px] leading-[17.25px] text-white">
                Connect
              </h3>
              <ul className="flex flex-col gap-[16.5px]">
                {FOOTER_SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-[10.5px] group"
                    >
                      <Image
                        src={social.icon}
                        alt=""
                        width={33}
                        height={33}
                        className="w-[32.25px] h-[32.25px] transition-transform duration-200 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="font-serif font-light text-[26px] sm:text-[30px] leading-[37.5px] text-white group-hover:text-[#E8BF96] transition-colors">
                        {social.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Newsletter Input + YOUR LOGO (#4001:172, #4001:178, #4001:188) */}
            <div className="md:col-span-5 lg:ml-auto w-full max-w-[316px] flex flex-col justify-between gap-12">
              <div>
                <h3 className="font-poppins font-medium text-[14.25px] leading-[17.25px] text-white">
                  Newsletter
                </h3>

                <form
                  onSubmit={handleNewsletterSubmitRHF(onNewsletterSubmit)}
                  className="mt-[45px] max-w-[303px]"
                >
                  <div
                    className={`flex items-center justify-between border-b-[0.75px] pb-[14px] transition-colors ${
                      newsletterErrors.email || newsletterServerError
                        ? "border-[#F07A60]"
                        : "border-[#787878] focus-within:border-[#E8BF96]"
                    }`}
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      aria-label="Enter your email for newsletter"
                      aria-invalid={!!newsletterErrors.email}
                      className="h-auto border-0 bg-transparent p-0 rounded-none text-[12.75px] leading-[17.25px] font-medium text-white placeholder:text-white focus-visible:ring-0 focus-visible:border-0"
                      {...registerNewsletter("email", {
                        required: "Email is required",
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
                    <button
                      type="submit"
                      disabled={isNewsletterSubmitting}
                      aria-label="Subscribe to newsletter"
                      className="ml-3 py-1 pl-2 text-white hover:opacity-80 transition-opacity cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      <Image
                        src="/icons/arrow-right.svg"
                        alt=""
                        width={18}
                        height={9}
                        className="w-[17.25px] h-auto"
                        loading="lazy"
                      />
                    </button>
                  </div>
                  {newsletterErrors.email && (
                    <p className="mt-2 text-xs text-[#F07A60]">
                      {newsletterErrors.email.message}
                    </p>
                  )}
                  {newsletterServerError && !newsletterErrors.email && (
                    <p className="mt-2 text-xs text-[#F07A60]">
                      {newsletterServerError}
                    </p>
                  )}
                  {newsletterServerSuccess &&
                    !newsletterErrors.email &&
                    !newsletterServerError && (
                      <p className="mt-2 text-xs text-[#E8BF96]">
                        {newsletterServerSuccess}
                      </p>
                    )}
                </form>
              </div>

              <div className="pt-4 lg:pt-[64px]">
                <a
                  href="#home"
                  className="font-logo font-semibold text-[36px] sm:text-[48.8px] leading-[50.16px] uppercase text-white block"
                >
                  HAIR STYLO
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Divider + Copyright Bar (#4001:174..177, #4001:143) */}
          <div className="relative border-t-[0.75px] border-[#787878] pt-[26px] flex flex-col sm:flex-row items-center justify-between gap-4 pr-0 sm:pr-14 font-poppins font-medium text-[12.75px] leading-[17.25px]">
            <p>
              <span className="text-white">HairDresser.</span>
              <span className="text-[#B9B9B9]">
                {" "}
                All Rights Reserved © 2024
              </span>
            </p>

            <p>
              <span className="text-white">Call us: </span>
              <a
                href="tel:+44207946xxxx"
                className="text-[#B9B9B9] hover:text-white transition-colors"
              >
                +44 20 7946 xxxx
              </a>
            </p>

            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                openContact();
              }}
              className="text-white hover:text-[#E8BF96] transition-colors"
            >
              Privacy &amp; Cookies Policy
            </a>

            {/* Scroll-to-Top Peach Circle Button (#4001:143) */}
            <Button
              type="button"
              size="icon"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="sm:absolute sm:-right-4 xl:-right-[74px] sm:top-[14px] h-[41.25px] w-[41.25px] min-w-0 rounded-full bg-transparent hover:bg-transparent p-0 hover:scale-105"
            >
              <Image
                src="/icons/scroll-top.svg"
                alt=""
                width={42}
                height={42}
                className="w-[41.25px] h-[41.25px]"
              />
            </Button>
          </div>
        </div>
      </footer>

      {/* =========================================================
          SHADCN/UI INTERACTIVE DIALOGS
      ========================================================= */}
      <MenuDialog
        open={menuOpen}
        onOpenChange={setMenuOpen}
        onBookClick={() => openBooking("Glam Locks")}
      />

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        mode={bookingMode}
        initialService={selectedServiceTitle}
      />

      <ServiceDetailDialog
        service={detailService}
        onOpenChange={(open) => !open && setDetailService(null)}
        onBookService={(title) => openBooking(title)}
      />

      <GalleryDialogs
        selectedLook={selectedLook}
        viewAllOpen={viewAllOpen}
        onCloseLook={() => setSelectedLook(null)}
        onCloseViewAll={() => setViewAllOpen(false)}
        onSelectLook={(item) => setSelectedLook(item)}
        onBookLook={(category) => openBooking(category)}
      />

      <VideoDialog
        open={videoOpen}
        onOpenChange={setVideoOpen}
        onBookClick={() => openBooking("Glam Locks")}
      />
    </div>
  );
}

