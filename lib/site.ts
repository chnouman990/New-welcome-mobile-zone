/**
 * Shop details used across the website.
 * Update the placeholders (marked TODO) with the real details before going live.
 */
export const site = {
  name: "New Welcome Mobile Zone",
  shortName: "New Welcome",
  tagline: "New Android phones & accessories in Bahawalpur",
  address: {
    line1: "Dubai Plaza",
    city: "Bahawalpur",
    region: "Punjab, Pakistan",
  },
  // TODO: replace with the shop's real WhatsApp number in international format (no + or spaces).
  whatsapp: "923000000000",
  // TODO: replace with the shop's real phone number.
  phoneDisplay: "+92 300 0000000",
  // TODO: confirm opening hours.
  hours: "Open daily · 11:00 am – 10:00 pm",
  mapQuery: "Dubai Plaza, Bahawalpur",
  // TODO: add the real social profile links.
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "TikTok", href: "#" },
  ],
} as const;

export function whatsappLink(message?: string) {
  const text = message ?? `Assalam o Alaikum! I found you on the ${site.name} website.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  site.mapQuery,
)}&z=16&output=embed`;

export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.mapQuery,
)}`;
