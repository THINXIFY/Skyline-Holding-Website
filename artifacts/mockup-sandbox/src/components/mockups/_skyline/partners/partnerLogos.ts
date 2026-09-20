import { partnerLogoFiles } from "../../../../.generated/partner-logos";

/**
 * Single source of truth for the partner logos shown on the site.
 *
 * The list of files is generated from public/images/partners by
 * partnerLogosPlugin.ts (every valid image in that folder, with its real
 * pixel size). This module only adds a readable label and a normalised
 * display size. Nothing here is a hand-maintained list of filenames.
 */

/** Design pixels (at scale 1) of the row every logo is centred in. */
export const LOGO_ROW_HEIGHT = 64;
const MAX_WIDTH = 176;
/** Target visual area: keeps a wide wordmark and a squarish emblem balanced. */
const TARGET_AREA = 10_000;

export interface PartnerLogo {
  src: string;
  alt: string;
  /** Natural size of the file. */
  width: number;
  height: number;
  /** Display size at scale 1: same aspect ratio as the file, never distorted. */
  boxW: number;
  boxH: number;
}

/**
 * Display size for a logo. Height is limited by the row, width by MAX_WIDTH,
 * and the target area is spread so wide logos are not visually lighter than
 * tall ones. The aspect ratio is always preserved.
 */
export function fitLogo(width: number, height: number): { boxW: number; boxH: number } {
  const aspect = width / height;
  const h = Math.min(LOGO_ROW_HEIGHT, Math.sqrt(TARGET_AREA / aspect));
  const w = Math.min(MAX_WIDTH, h * aspect);
  return { boxW: Math.round(w), boxH: Math.round(w / aspect) };
}

/** Readable names for logos whose file name identifies the company. */
const KNOWN_LABELS: ReadonlyArray<[RegExp, string]> = [
  [/telekom/i, "Telekom"],
  [/(^|[^a-z])ubs([^a-z]|$)/i, "UBS"],
  [/newmont/i, "Newmont"],
  [/vodafone/i, "Vodafone"],
  [/shell/i, "Shell"],
  [/mercedes/i, "Mercedes-Benz"],
  [/sauber/i, "Sauber Motorsport"],
  [/allianz/i, "Allianz"],
  // The file name is a generated-image name; the artwork itself reads "Nexus Mutual".
  [/chatgpt-image-jul-21-2026-01_24_39/i, "Nexus Mutual"],
];

/** Best-effort readable label for a logo file that is not in KNOWN_LABELS. */
export function deriveLabel(file: string): string {
  const name = file
    .replace(/\.[^.]+$/, "")
    .replace(/^imgi_\d+_/i, "")
    .replace(/^\d+px[-_]/i, "")
    .replace(/\.svg(-scaled)?$/i, "")
    .replace(/-scaled$/i, "")
    .replace(/_/g, " ")
    .replace(/\s-\s/g, " ")
    .replace(/\b(19|20)\d{2}\b/g, "")
    .replace(/\b(logo|logos|corporation|corp|inc|ltd|llc|svg|scaled)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!name) return "Partner logo";
  return name
    .split(" ")
    .map((word) => (word === word.toLowerCase() ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export function labelFor(file: string): string {
  return KNOWN_LABELS.find(([pattern]) => pattern.test(file))?.[1] ?? deriveLabel(file);
}

export const partnerLogos: PartnerLogo[] = partnerLogoFiles.map((logo) => ({
  src: `/images/partners/${encodeURIComponent(logo.file)}`,
  alt: labelFor(logo.file),
  width: logo.width,
  height: logo.height,
  ...fitLogo(logo.width, logo.height),
}));
