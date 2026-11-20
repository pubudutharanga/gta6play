/* One-off asset pipeline. Run with: node scripts/build-images.mjs */
import sharp from "sharp";
import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "screenshots");
const SOURCE = path.join(ROOT);

const images = [
  { name: "vice-city-golden-hour", file: "Places/Vice City/Vice_City_11.jpg" },
  { name: "vice-city-neon-skyline", file: "Places/Vice City/Vice_City_27.jpg" },
  { name: "jason-lucia-convertible", file: "People/Jason and Lucia/Jason_and_Lucia_03.jpg" },
  { name: "vice-city-mural", file: "Places/Vice City/Vice_City_09.jpg" },
  { name: "grassrivers-channel", file: "Places/Grassrivers/Grassrivers_05.jpg" },
  { name: "vice-city-neon-station", file: "Places/Vice City/Vice_City_22.jpg" },
  { name: "store-hold-up", file: "People/Jason and Lucia/Jason_and_Lucia_15.jpg" },
  { name: "leonida-keys-boats", file: "Places/Leonida Keys/Leonida_Keys_05.jpg" },
  { name: "mount-kalaga-helicopter", file: "Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_02.jpg" },
  { name: "real-dimez-studio", file: "People/Real Dimez/Real_Dimez_04.jpg" },
  {
    name: "artwork-beach",
    file: "Artwork/Jason_Lucia_Beach_With_Logos_landscape.jpg",
    crop: { left: 1750, top: 0, width: 1770, height: 2160 },
  },
  {
    name: "artwork-rooftop",
    file: "Artwork/Jason_Lucia_Rooftop_With_Logos_landscape.jpg",
    crop: { left: 1600, top: 0, width: 1920, height: 2160 },
  },
  { name: "jason-bike", file: "People/Jason Duval/Jason_Duval_01.jpg" },
  { name: "lucia-neon", file: "People/Lucia Caminos/Lucia_Caminos_11.jpg" },
  { name: "lucia-poolside", file: "People/Lucia Caminos/Lucia_Caminos_02.jpg" },
  { name: "jason-lucia-sunset", file: "People/Jason and Lucia/Jason_and_Lucia_13.jpg" },
  { name: "club-embrace", file: "People/Jason and Lucia/Jason_and_Lucia_14.jpg" },
  { name: "vice-city-beach", file: "Places/Vice City/Vice_City_05.jpg" },
  { name: "vice-city-ferris-wheel", file: "Places/Vice City/Vice_City_08.jpg" },
  { name: "vice-city-lowrider", file: "Places/Vice City/Vice_City_24.jpg" },
  { name: "leonida-keys-aerial", file: "Places/Leonida Keys/Leonida_Keys_01.jpg" },
  { name: "ambrosia-sunset", file: "Places/Ambrosia/Ambrosia_04.jpg" },
  { name: "port-gellhorn-dusk", file: "Places/Port Gellhorn/Port_Gellhorn_06.jpg" },
  { name: "boobie-ike-neon", file: "People/Boobie Ike/Boobie_Ike_03.jpg" },
  { name: "mount-kalaga-cattle", file: "Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_05.jpg" },
  { name: "vice-city-rooftop-pool", file: "Places/Vice City/Vice_City_02.jpg" },
];

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}

const hex = (r, g, b) =>
  "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();

async function palette(input) {
  const { data, info } = await sharp(input)
    .resize(80, 45, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const counts = new Map();
  const vivid = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const [, s, l] = rgbToHsl(r, g, b);
    const qr = Math.min(255, Math.round(r / 24) * 24);
    const qg = Math.min(255, Math.round(g / 24) * 24);
    const qb = Math.min(255, Math.round(b / 24) * 24);
    const key = `${qr},${qg},${qb}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
    if (s > 0.32 && l > 0.22 && l < 0.78) {
      const score = s * 2 + (1 - Math.abs(l - 0.55));
      const prev = vivid.get(key);
      if (!prev || prev.score < score) vivid.set(key, { score, r: qr, g: qg, b: qb });
    }
  }
  const top = [...vivid.values()].sort((a, b) => b.score - a.score).slice(0, 5);
  const dominant = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map(Number);
  return {
    dominant: hex(...dominant),
    vivid: top.map((c) => hex(c.r, c.g, c.b)),
  };
}

await mkdir(OUT, { recursive: true });
const manifest = [];

for (const image of images) {
  const input = path.join(SOURCE, image.file);
  let pipeline = sharp(input);
  if (image.crop) {
    pipeline = pipeline.extract(image.crop);
  }
  const output = path.join(OUT, `${image.name}.webp`);
  await pipeline
    .resize({ width: 2560, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6, smartSubsample: true })
    .toFile(output);

  const meta = await sharp(output).metadata();
  const fileStat = await stat(output);
  const colors = await palette(output);
  manifest.push({
    name: image.name,
    width: meta.width,
    height: meta.height,
    bytes: fileStat.size,
    ...colors,
  });
  console.log(`${image.name.padEnd(28)} ${meta.width}x${meta.height} ${(fileStat.size / 1024).toFixed(0)}kB  vibrant=${colors.vivid[0]}  dominant=${colors.dominant}`);
}

await writeFile(path.join(ROOT, "scripts", "image-manifest.json"), JSON.stringify(manifest, null, 2));
const total = manifest.reduce((sum, i) => sum + i.bytes, 0);
console.log(`\n${manifest.length} images, ${(total / 1024 / 1024).toFixed(1)} MB total`);
