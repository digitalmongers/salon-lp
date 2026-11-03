/**
 * Script to automatically upload all images in public/images to your Cloudinary account.
 *
 * Usage:
 *   CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=yyy node scripts/upload-to-cloudinary.mjs
 * Or with unsigned upload preset:
 *   CLOUDINARY_PRESET=xxx node scripts/upload-to-cloudinary.mjs
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "gps27k9y";
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const uploadPreset = process.env.CLOUDINARY_PRESET;

if (!apiKey && !uploadPreset) {
  console.log(`
----------------------------------------------------------------------
To upload your local images to Cloudinary (${cloudName}):
Option 1 (API Key & Secret):
  $env:CLOUDINARY_API_KEY="your_api_key"
  $env:CLOUDINARY_API_SECRET="your_api_secret"
  node scripts/upload-to-cloudinary.mjs

Option 2 (Unsigned Upload Preset created in Cloudinary Settings):
  $env:CLOUDINARY_PRESET="your_preset_name"
  node scripts/upload-to-cloudinary.mjs
----------------------------------------------------------------------
`);
  process.exit(0);
}

const imagesDir = path.resolve("public/images");
const files = fs.readdirSync(imagesDir).filter((f) => f.endsWith(".webp"));

console.log(`Found ${files.length} images to upload to Cloudinary (${cloudName})...\n`);

for (const file of files) {
  const filePath = path.join(imagesDir, file);
  const publicId = `images/${file.replace(/\.webp$/, "")}`;
  const timestamp = Math.round(Date.now() / 1000);

  const formData = new FormData();
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: "image/webp" });
  formData.append("file", blob, file);
  formData.append("public_id", publicId);

  if (uploadPreset) {
    formData.append("upload_preset", uploadPreset);
  } else if (apiKey && apiSecret) {
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());

    // Generate SHA1 signature
    const signatureStr = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(signatureStr).digest("hex");
    formData.append("signature", signature);
  }

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      console.log(`✓ Uploaded ${file} -> ${data.secure_url}`);
    } else {
      console.error(`✗ Failed ${file}:`, data.error?.message || data);
    }
  } catch (err) {
    console.error(`✗ Error uploading ${file}:`, err.message);
  }
}

console.log("\nDone!");
