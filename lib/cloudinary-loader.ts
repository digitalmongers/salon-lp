"use client";

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Cloudinary Custom Image Loader for Next.js
 *
 * Behavior:
 * - Local Development: Serves local static files from /public to ensure instant,
 *   offline visibility without depending on remote Cloudinary uploads.
 *   (Can be overridden with NEXT_PUBLIC_FORCE_CLOUDINARY=true).
 * - Production: Delivers via Cloudinary with f_auto, q_auto, and responsive resizing.
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

  const isDev = process.env.NODE_ENV === "development";
  const forceCloudinary = process.env.NEXT_PUBLIC_FORCE_CLOUDINARY === "true";

  // In local development, default to local static files unless explicitly forced
  if (isDev && !forceCloudinary) {
    return src;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // If no Cloudinary cloud name is configured, serve local static files
  if (!cloudName) {
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
