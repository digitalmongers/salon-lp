export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  arrowIcon: string;
  featured?: boolean;
  duration: string;
  price: string;
  summary: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  featured?: boolean;
}

export const MARQUEE_ITEMS = [
  "Hair Glam",
  "Locks of Love",
  "Glossy Tresses",
  "Polished Hair",
  "Glam Locks",
  "Velvet Strands",
] as const;

export const SERVICES: ServiceItem[] = [
  {
    id: "polished-hair",
    title: "Polished Hair",
    image: "/images/service-1.png",
    arrowIcon: "/icons/num-01.svg",
    duration: "60 min",
    price: "£120",
    summary:
      "Precision consultation, signature blowout, and mirror-shine finishing tailored to your face shape and hair texture.",
  },
  {
    id: "glam-locks",
    title: "Glam Locks",
    image: "/images/service-2.png",
    arrowIcon: "/icons/num-02.svg",
    featured: true,
    duration: "90 min",
    price: "£185",
    summary:
      "Full editorial styling, dimensional glossing, and soft sculpted waves designed for lasting movement and radiance.",
  },
  {
    id: "velvet-strands",
    title: "Velvet Strands",
    image: "/images/service-3.png",
    arrowIcon: "/icons/num-03.svg",
    duration: "75 min",
    price: "£150",
    summary:
      "Deep silk-protein hydration ritual and bond-repair treatment restoring cashmere softness to dry or color-treated hair.",
  },
  {
    id: "locks-of-love",
    title: "Locks of Love",
    image: "/images/service-4.png",
    arrowIcon: "/icons/num-04.svg",
    duration: "75 min",
    price: "£140",
    summary:
      "Bespoke wet-and-dry haircut architecture engineered for effortless daily styling and graceful grow-out.",
  },
];

export const GALLERY_TOP_LEFT: GalleryItem[] = [
  {
    id: "tl-1",
    title: "Soft Auburn Curls",
    category: "Glam Locks",
    image: "/images/gallery-tl-1-3aa493.png",
  },
  {
    id: "tl-2",
    title: "Sculpted Blonde Updo",
    category: "Editorial Styling",
    image: "/images/gallery-tl-2-f372e5.png",
  },
  {
    id: "tl-3",
    title: "Sleek Midnight Shine",
    category: "Polished Hair",
    image: "/images/gallery-tl-3-74930c.png",
  },
  {
    id: "tl-4",
    title: "Warm Copper Twist",
    category: "Locks of Love",
    image: "/images/gallery-tl-4-718166.png",
  },
];

export const GALLERY_TOP_RIGHT_LARGE: GalleryItem = {
  id: "tr-large",
  title: "Voluminous Studio Curls",
  category: "Velvet Strands",
  image: "/images/gallery-tr-large-d937cc.png",
  featured: true,
};

export const GALLERY_BOTTOM_LEFT_LARGE: GalleryItem = {
  id: "bl-large",
  title: "Textured Editorial Volume",
  category: "Glam Locks",
  image: "/images/gallery-bl-large-73a784.png",
  featured: true,
};

export const GALLERY_BOTTOM_RIGHT: GalleryItem[] = [
  {
    id: "br-1",
    title: "Satin Bronze Waves",
    category: "Polished Hair",
    image: "/images/gallery-br-1-4357d7.png",
  },
  {
    id: "br-2",
    title: "Defined Spiral Curls",
    category: "Locks of Love",
    image: "/images/gallery-br-2-554f45.png",
  },
  {
    id: "br-3",
    title: "Tousled Studio Layers",
    category: "Velvet Strands",
    image: "/images/gallery-br-3.png",
  },
  {
    id: "br-4",
    title: "Golden Honey Waves",
    category: "Glam Locks",
    image: "/images/gallery-br-4-2eb786.png",
  },
];

export const ALL_GALLERY_ITEMS: GalleryItem[] = [
  ...GALLERY_TOP_LEFT,
  GALLERY_TOP_RIGHT_LARGE,
  GALLERY_BOTTOM_LEFT_LARGE,
  ...GALLERY_BOTTOM_RIGHT,
];

export const INSTAGRAM_IMAGES = [
  {
    id: "ig-1",
    src: "/images/service-4.png",
    alt: "Precision salon haircut session",
  },
  {
    id: "ig-2",
    src: "/images/insta-2.png",
    alt: "Bridal updo styling in salon mirror",
  },
  {
    id: "ig-3",
    src: "/images/insta-3.png",
    alt: "Relaxing salon hair wash and spa ritual",
  },
  {
    id: "ig-4",
    src: "/images/insta-4.png",
    alt: "Glamorous curls finishing touch",
  },
  {
    id: "ig-5",
    src: "/images/insta-5.png",
    alt: "Master stylists portrait with shears",
  },
] as const;

export const FOOTER_NAV_LINKS = [
  { label: "Home", href: "#home", active: true },
  { label: "About Me", href: "#about", active: false },
  { label: "Gallery", href: "#gallery", active: false },
  { label: "Services", href: "#services", active: false },
  { label: "Contact", href: "#contact", active: false },
] as const;

export const FOOTER_SOCIAL_LINKS = [
  {
    label: "Facebook",
    icon: "/icons/facebook.svg",
    href: "https://facebook.com",
  },
  {
    label: "Instagram",
    icon: "/icons/instagram.svg",
    href: "https://instagram.com",
  },
  {
    label: "LinkedIn",
    icon: "/icons/linkedin.svg",
    href: "https://linkedin.com",
  },
] as const;

