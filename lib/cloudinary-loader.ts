"use client";

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Cloudinary Custom Image Loader for Next.js
 *
 * Delivers images via Cloudinary with f_auto, q_auto, and responsive c_limit widths
 * in both local development and production.
 * Note: Cloudinary Dynamic Folders do not add UI folder names to delivery URLs,
 * so local "/images/<file>.webp" maps directly to "<file>.webp" unless
 * NEXT_PUBLIC_CLOUDINARY_FOLDER is explicitly configured for Fixed Folder prefixes.
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

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // If no Cloudinary cloud name is configured, fallback to local static files
  if (!cloudName) {
    return src;
  }

  const rawFolder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER?.replace(
    /^\/+|\/+$/g,
    ""
  );

  // Strip leading "/images/" or "/" so "/images/hero-composed.webp" -> "hero-composed.webp"
  const cleanSrc = src.replace(/^\/?(images\/)?/, "");

  const params = [
    "f_auto",
    "c_limit",
    `w_${width}`,
    `q_${quality || "auto"}`,
  ];

  const folderPrefix = rawFolder ? `${rawFolder}/` : "";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(",")}/${folderPrefix}${cleanSrc}`;
}
