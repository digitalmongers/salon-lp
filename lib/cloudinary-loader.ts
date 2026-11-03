"use client";

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Cloudinary Custom Image Loader for Next.js
 *
 * Automatically delivers:
 * - f_auto: WebP / AVIF based on browser support
 * - q_auto: Intelligent perceptual compression
 * - c_limit, w_{width}: Dynamically resized responsive widths
 *
 * Configured via:
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (required for Cloudinary delivery)
 * - NEXT_PUBLIC_CLOUDINARY_FOLDER (optional folder prefix, e.g. "hair-stylist")
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

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // If no Cloudinary cloud name is provided (e.g. local dev), fallback to local static serving
  if (!cloudName) {
    return src;
  }

  // If the src is already a full Cloudinary or remote URL, pass it through
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // Remove leading slash for Cloudinary pathing
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;

  const params = [
    "f_auto",
    "c_limit",
    `w_${width}`,
    `q_${quality || "auto"}`,
  ];

  const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER
    ? `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER.replace(/^\/|\/$/g, "")}/`
    : "";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(",")}/${folder}${cleanSrc}`;
}

