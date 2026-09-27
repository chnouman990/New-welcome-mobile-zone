/**
 * SAMPLE catalogue data for the home page.
 * Names, specs and prices are placeholders — replace them with the shop's real
 * stock and prices. Later this will come from the backend / admin panel.
 */

export type FeaturedPhone = {
  id: string;
  brand: string;
  name: string;
  specs: string[];
  price: number; // PKR
  tag?: string;
  /** Colours used to draw the phone mockup: [back, camera island, accent] */
  finish: [string, string, string];
};

export const featuredPhones: FeaturedPhone[] = [
  {
    id: "galaxy-a56",
    brand: "Samsung",
    name: "Galaxy A56 5G",
    specs: ["8GB / 256GB", '6.7" AMOLED', "50MP OIS"],
    price: 119999,
    tag: "Best seller",
    finish: ["#1b2436", "#0d1320", "#8ea4ff"],
  },
  {
    id: "redmi-note-14-pro",
    brand: "Xiaomi",
    name: "Redmi Note 14 Pro",
    specs: ["8GB / 256GB", "200MP camera", "5500 mAh"],
    price: 84999,
    tag: "New arrival",
    finish: ["#6d4dd8", "#2b1c6b", "#d8ccff"],
  },
  {
    id: "infinix-note-50-pro",
    brand: "Infinix",
    name: "Note 50 Pro",
    specs: ["12GB / 256GB", "90W charging", '6.78" AMOLED'],
    price: 69999,
    finish: ["#c9ced8", "#1d2230", "#ffffff"],
  },
  {
    id: "tecno-camon-40",
    brand: "Tecno",
    name: "Camon 40 Pro",
    specs: ["8GB / 256GB", "50MP selfie", "IP68"],
    price: 72999,
    finish: ["#0d3fd6", "#081d6b", "#9fb6ff"],
  },
  {
    id: "vivo-v50",
    brand: "Vivo",
    name: "V50 5G",
    specs: ["12GB / 512GB", "ZEISS optics", "6000 mAh"],
    price: 159999,
    tag: "Premium",
    finish: ["#e7c9b8", "#3b2a24", "#fff4ec"],
  },
  {
    id: "oppo-reno-13",
    brand: "Oppo",
    name: "Reno 13 F",
    specs: ["8GB / 256GB", "IP69", "45W SUPERVOOC"],
    price: 99999,
    finish: ["#2f6f73", "#113236", "#b9f0ec"],
  },
];

export const brands = [
  "Samsung",
  "Xiaomi",
  "Redmi",
  "Infinix",
  "Tecno",
  "Vivo",
  "Oppo",
  "Realme",
  "Honor",
  "OnePlus",
  "Nothing",
  "itel",
];

export type Category = {
  id: string;
  title: string;
  blurb: string;
  items: string[];
  art: "phone" | "charger" | "audio" | "powerbank" | "case" | "watch";
};

export const categories: Category[] = [
  {
    id: "phones",
    title: "New Android Phones",
    blurb: "Box-packed sets from every major brand, from budget to flagship.",
    items: ["5G phones", "Gaming phones", "Camera phones", "Budget picks"],
    art: "phone",
  },
  {
    id: "chargers",
    title: "Chargers & Cables",
    blurb: "Fast chargers and sturdy cables that match your phone's wattage.",
    items: ["Type-C cables", "Fast chargers", "Car chargers", "Wireless pads"],
    art: "charger",
  },
  {
    id: "audio",
    title: "Earbuds & Audio",
    blurb: "Wireless earbuds, neckbands and speakers for every budget.",
    items: ["TWS earbuds", "Neckbands", "Handsfree", "Speakers"],
    art: "audio",
  },
  {
    id: "power",
    title: "Power Banks",
    blurb: "Compact to high-capacity — never run out of battery again.",
    items: ["10,000 mAh", "20,000 mAh", "Magnetic", "Fast charge"],
    art: "powerbank",
  },
  {
    id: "protection",
    title: "Cases & Protection",
    blurb: "Covers and glass protectors cut for your exact model.",
    items: ["Back covers", "Tempered glass", "Camera guards", "Pouches"],
    art: "case",
  },
  {
    id: "wearables",
    title: "Smart Watches",
    blurb: "Track steps, sleep and notifications right from your wrist.",
    items: ["Smart watches", "Fitness bands", "Straps", "Chargers"],
    art: "watch",
  },
];

export function formatPKR(value: number) {
  return "Rs " + value.toLocaleString("en-PK");
}
