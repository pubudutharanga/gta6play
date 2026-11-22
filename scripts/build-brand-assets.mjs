/* Builds favicons, app icons, and the share-image background. Run: node scripts/build-brand-assets.mjs */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ICONS = path.join(ROOT, "public", "icons");
const APP = path.join(ROOT, "src", "app");
await mkdir(ICONS, { recursive: true });

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="sunset" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FF4F9A"/>
      <stop offset="1" stop-color="#FF8F3F"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.15" r="0.9">
      <stop offset="0" stop-color="#2B1A5E"/>
      <stop offset="1" stop-color="#120A2B"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="104" fill="url(#glow)"/>
  <path d="M64 118 H164 L212 310 L260 118 H360 L280 404 H192 Z" fill="url(#sunset)"/>
  <rect x="386" y="118" width="66" height="286" rx="6" fill="#FFEBCB"/>
  <rect x="64" y="438" width="384" height="10" rx="5" fill="#2DD4C0"/>
</svg>`;

// Maskable icons need a full-bleed background and the logo inside the 80%
// safe zone, otherwise Android clips the mark when it applies a shape.
const maskableSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="sunset" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FF4F9A"/>
      <stop offset="1" stop-color="#FF8F3F"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.15" r="0.9">
      <stop offset="0" stop-color="#2B1A5E"/>
      <stop offset="1" stop-color="#120A2B"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#glow)"/>
  <g transform="translate(256 256) scale(0.72) translate(-256 -256)">
    <path d="M64 118 H164 L212 310 L260 118 H360 L280 404 H192 Z" fill="url(#sunset)"/>
    <rect x="386" y="118" width="66" height="286" rx="6" fill="#FFEBCB"/>
    <rect x="64" y="438" width="384" height="10" rx="5" fill="#2DD4C0"/>
  </g>
</svg>`;

const iconSvgPath = path.join(APP, "icon.svg");
await writeFile(iconSvgPath, iconSvg.trim() + "\n");

const iconPng = await sharp(Buffer.from(iconSvg)).png().toBuffer();
const maskablePng = await sharp(Buffer.from(maskableSvg)).png().toBuffer();
await writeFile(path.join(ICONS, "icon-512.png"), await sharp(iconPng).resize(512).png().toBuffer());
await writeFile(path.join(ICONS, "icon-192.png"), await sharp(iconPng).resize(192).png().toBuffer());
await writeFile(
  path.join(ICONS, "icon-maskable-512.png"),
  await sharp(maskablePng).resize(512).png().toBuffer()
);
await writeFile(path.join(APP, "apple-icon.png"), await sharp(iconPng).resize(180).png().toBuffer());

// favicon.ico is a PNG wrapped in a one-image ICO container.
const fav = await sharp(iconPng).resize(32).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry[0] = 32;
entry[1] = 32;
entry[2] = 0;
entry[3] = 0;
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(fav.length, 8);
entry.writeUInt32LE(22, 12);
await writeFile(path.join(APP, "favicon.ico"), Buffer.concat([header, entry, fav]));

await sharp(path.join(ROOT, "public", "screenshots", "vice-city-golden-hour.webp"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, progressive: true })
  .toFile(path.join(ROOT, "public", "og-background.jpg"));

console.log("Brand assets written.");
