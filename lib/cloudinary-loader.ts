"use client";

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

const DEFAULT_CLOUD_NAME = "gps27k9y";

/**
 * Cloudinary Custom Image Loader for Next.js
 *
 * Delivers images via Cloudinary with f_auto, q_auto, and responsive c_limit widths
 * in both local development and production.
 * Note: Cloudinary Dynamic Folders do not add UI folder names to delivery URLs,
 * so local "/images/<file>.webp" maps directly to "<file>.webp".
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderParams): string {
  // SVGs are vector assets and should never be transformed
  if (src.endsWith(".svg")) {
    return src;
  }

  // If the src is already an external URL, pass it through directly
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD_NAME;

  // Strip leading "/images/" or "/" so "/images/about-me.webp" -> "about-me.webp"
  const cleanSrc = src.replace(/^\/?(images\/)?/, "");

  const params = [
    "f_auto",
    "c_limit",
    `w_${width}`,
    `q_${quality || "auto"}`,
  ];

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(",")}/${cleanSrc}`;
}
