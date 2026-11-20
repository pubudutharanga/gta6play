// src/content/screenshots.ts — Typed screenshot metadata, generated from the image manifest.

export type Screenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  focal: string; // CSS object-position
  accent: string; // sampled hex; drives --scene-accent
  hero?: boolean;
  scene?: number; // order in hero scene switcher (1-based, max 5)
};

export const screenshots: Screenshot[] = [
  {
    src: "/screenshots/vice-city-golden-hour.webp",
    width: 2560,
    height: 1440,
    alt: "Vice City skyline bathed in golden sunset light, skyscrapers silhouetted against an orange sky", // TODO(owner): verify
    caption: "Golden hour over Vice City's downtown skyline.",
    focal: "50% 40%",
    accent: "#F0C078",
    hero: true,
    scene: 1,
  },
  {
    src: "/screenshots/vice-city-neon-skyline.webp",
    width: 2560,
    height: 1440,
    alt: "Vice City at night with neon-lit buildings reflecting purple and gold across the water", // TODO(owner): verify
    caption: "The Vice City waterfront after dark.",
    focal: "50% 45%",
    accent: "#F0D878",
    scene: 2,
  },
  {
    src: "/screenshots/jason-lucia-convertible.webp",
    width: 2560,
    height: 1440,
    alt: "Jason and Lucia driving a convertible through palm-lined streets at sunset", // TODO(owner): verify
    caption: "Jason and Lucia cruising through the city at dusk.",
    focal: "45% 50%",
    accent: "#F0C078",
    scene: 3,
  },
  {
    src: "/screenshots/vice-city-neon-station.webp",
    width: 2560,
    height: 1440,
    alt: "A neon-lit gas station at night with pink and orange signs glowing against a violet sky", // TODO(owner): verify
    caption: "Neon signs light up a Vice City station after hours.",
    focal: "50% 50%",
    accent: "#FF9078",
    scene: 4,
  },
  {
    src: "/screenshots/port-gellhorn-dusk.webp",
    width: 2560,
    height: 1440,
    alt: "Port Gellhorn docks at dusk with cargo ships and cranes under an amber sky", // TODO(owner): verify
    caption: "Dusk over Port Gellhorn's industrial waterfront.",
    focal: "55% 45%",
    accent: "#FFD878",
    scene: 5,
  },
  {
    src: "/screenshots/vice-city-mural.webp",
    width: 2560,
    height: 1440,
    alt: "A large street mural on the side of a building in a neon-lit Vice City alley at night", // TODO(owner): verify
    caption: "Street art and neon collide in a Vice City alley.",
    focal: "50% 50%",
    accent: "#F0A890",
  },
  {
    src: "/screenshots/grassrivers-channel.webp",
    width: 2560,
    height: 1440,
    alt: "A wide grassy river channel winding through subtropical wetlands under a hazy sky", // TODO(owner): verify
    caption: "The Grassrivers channel cuts through Leonida's wetlands.",
    focal: "50% 60%",
    accent: "#D8C090",
  },
  {
    src: "/screenshots/store-hold-up.webp",
    width: 2560,
    height: 1440,
    alt: "A tense store hold-up scene with a character pointing at a clerk behind the counter", // TODO(owner): verify
    caption: "Quick cash at a convenience store hold-up.",
    focal: "50% 45%",
    accent: "#007830",
  },
  {
    src: "/screenshots/leonida-keys-boats.webp",
    width: 2560,
    height: 1440,
    alt: "Fishing boats moored along the turquoise shores of the Leonida Keys under a bright sky", // TODO(owner): verify
    caption: "Crystal-clear waters around the Leonida Keys.",
    focal: "50% 55%",
    accent: "#003090",
  },
  {
    src: "/screenshots/mount-kalaga-helicopter.webp",
    width: 2560,
    height: 1440,
    alt: "A helicopter flying low over Mount Kalaga's forested ridges at sunset", // TODO(owner): verify
    caption: "Helicopter flyover above Mount Kalaga at golden hour.",
    focal: "55% 40%",
    accent: "#F0D890",
  },
  {
    src: "/screenshots/real-dimez-studio.webp",
    width: 2560,
    height: 1440,
    alt: "Real Dimez in a recording studio lit by magenta neon lights", // TODO(owner): verify
    caption: "Real Dimez lays down tracks in a neon-lit studio.",
    focal: "50% 45%",
    accent: "#F048D8",
  },
  {
    src: "/screenshots/artwork-beach.webp",
    width: 1770,
    height: 2160,
    alt: "Artistic portrait of Jason and Lucia on a tropical beach at sunset with palm trees", // TODO(owner): verify
    caption: "Jason and Lucia on the beach — official artwork.",
    focal: "50% 30%",
    accent: "#F0A890",
  },
  {
    src: "/screenshots/artwork-rooftop.webp",
    width: 1920,
    height: 2160,
    alt: "Artistic portrait of Jason and Lucia on a rooftop overlooking Vice City's skyline at twilight", // TODO(owner): verify
    caption: "Rooftop view over Vice City — official artwork.",
    focal: "50% 35%",
    accent: "#78D8F0",
  },
  {
    src: "/screenshots/jason-bike.webp",
    width: 2560,
    height: 1440,
    alt: "Jason riding a motorcycle on a sunlit highway with a bright sky overhead", // TODO(owner): verify
    caption: "Jason hits the open highway on a motorcycle.",
    focal: "55% 50%",
    accent: "#D8C090",
  },
  {
    src: "/screenshots/lucia-neon.webp",
    width: 2560,
    height: 1440,
    alt: "Lucia standing under blue neon lights in a dark urban setting", // TODO(owner): verify
    caption: "Lucia under the blue neon glow of the city.",
    focal: "50% 40%",
    accent: "#0048D8",
  },
  {
    src: "/screenshots/lucia-poolside.webp",
    width: 2560,
    height: 1440,
    alt: "Lucia lounging poolside in bright daylight with a tiled patio and tropical plants", // TODO(owner): verify
    caption: "Lucia takes a break poolside in the Florida sun.",
    focal: "50% 50%",
    accent: "#D84830",
  },
  {
    src: "/screenshots/jason-lucia-sunset.webp",
    width: 2560,
    height: 1440,
    alt: "Jason and Lucia silhouetted against a deep orange sunset sky", // TODO(owner): verify
    caption: "Jason and Lucia, silhouetted against a Leonida sunset.",
    focal: "50% 40%",
    accent: "#F0D878",
  },
  {
    src: "/screenshots/club-embrace.webp",
    width: 2560,
    height: 1440,
    alt: "Jason and Lucia in an embrace inside a dimly lit nightclub with blue spotlights", // TODO(owner): verify
    caption: "An intimate moment at a Vice City nightclub.",
    focal: "50% 45%",
    accent: "#0048D8",
  },
  {
    src: "/screenshots/vice-city-beach.webp",
    width: 2560,
    height: 1440,
    alt: "A crowded Vice City beach with colorful umbrellas, palm trees, and a lifeguard tower", // TODO(owner): verify
    caption: "Sun, sand, and crowds on Vice City Beach.",
    focal: "50% 55%",
    accent: "#F04830",
  },
  {
    src: "/screenshots/vice-city-ferris-wheel.webp",
    width: 2560,
    height: 1440,
    alt: "A large ferris wheel on the Vice City boardwalk lit warmly against the night sky", // TODO(owner): verify
    caption: "The Vice City boardwalk ferris wheel at night.",
    focal: "50% 40%",
    accent: "#D8A860",
  },
  {
    src: "/screenshots/vice-city-lowrider.webp",
    width: 2560,
    height: 1440,
    alt: "A pink lowrider car parked on a Vice City street with pedestrians and storefronts", // TODO(owner): verify
    caption: "A pink lowrider turns heads on a Vice City street.",
    focal: "50% 50%",
    accent: "#C00060",
  },
  {
    src: "/screenshots/leonida-keys-aerial.webp",
    width: 2560,
    height: 1440,
    alt: "Aerial view of the Leonida Keys with teal ocean, sandbars, and scattered islands", // TODO(owner): verify
    caption: "Aerial view of the turquoise Leonida Keys.",
    focal: "50% 50%",
    accent: "#307890",
  },
  {
    src: "/screenshots/ambrosia-sunset.webp",
    width: 2560,
    height: 1440,
    alt: "The town of Ambrosia at sunset with low buildings, power lines, and a glowing horizon", // TODO(owner): verify
    caption: "Sunset over the quiet town of Ambrosia.",
    focal: "50% 45%",
    accent: "#F0D890",
  },
  {
    src: "/screenshots/boobie-ike-neon.webp",
    width: 2560,
    height: 1440,
    alt: "Boobie Ike standing in a purple-lit room with neon signage and warm accent lighting", // TODO(owner): verify
    caption: "Boobie Ike holds court under neon lights.",
    focal: "50% 45%",
    accent: "#FFA890",
  },
  {
    src: "/screenshots/mount-kalaga-cattle.webp",
    width: 2560,
    height: 1440,
    alt: "Cattle grazing on a golden hillside in Mount Kalaga National Park with distant mountains", // TODO(owner): verify
    caption: "Cattle on the sunlit hills of Mount Kalaga.",
    focal: "50% 55%",
    accent: "#D8C090",
  },
  {
    src: "/screenshots/vice-city-rooftop-pool.webp",
    width: 2560,
    height: 1440,
    alt: "A rooftop infinity pool at night overlooking Vice City's glittering skyline", // TODO(owner): verify
    caption: "Rooftop pool with a view of Vice City after dark.",
    focal: "50% 50%",
    accent: "#184860",
  },
];

/** The single hero screenshot used as the LCP image. */
export const heroScreenshot = screenshots.find((s) => s.hero)!;

/** Screenshots marked as scene-switcher options (max 5). */
export const sceneScreenshots = screenshots
  .filter((s) => s.scene != null)
  .sort((a, b) => a.scene! - b.scene!);

/** All screenshots excluding hero duplicates for the gallery. */
export const galleryScreenshots = screenshots;
