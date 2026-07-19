// ============================================================
// Real data for The Boulders Shopping Centre, Midrand.
// Verified against the centre's own published store list, mall
// map, and trading hours. No invented tenants, events, or history.
// ============================================================

export const centre = {
  name: "The Boulders Shopping Centre",
  address: "Old Pretoria Road, Midrand, Gauteng",
  phone: "011 315 3345",
  phoneHref: "tel:0113153345",
  email: "info@boulders.co.za",
  storeCountPublished: 108, // the centre's own published tenant count
  parkingBays: 1900,
  floorArea: "48,632", // m²
  managedBy: "Redefine Properties",
};

export const tradingHours = [
  { day: "Monday", jsDay: 1, open: 9, close: 18 },
  { day: "Tuesday", jsDay: 2, open: 9, close: 18 },
  { day: "Wednesday", jsDay: 3, open: 9, close: 18 },
  { day: "Thursday", jsDay: 4, open: 9, close: 18 },
  { day: "Friday", jsDay: 5, open: 9, close: 18 },
  { day: "Saturday", jsDay: 6, open: 9, close: 16 },
  { day: "Sunday", jsDay: 0, open: 9, close: 14 },
];

export function getOpenState(now = new Date()) {
  const jsDay = now.getDay();
  const today = tradingHours.find((d) => d.jsDay === jsDay);
  const hour = now.getHours() + now.getMinutes() / 60;
  const fmt = (h) => `${String(h).padStart(2, "0")}:00`;

  if (hour >= today.open && hour < today.close) {
    return { isOpen: true, message: `Open now, until ${fmt(today.close)}`, todayLabel: today.day };
  }
  if (hour < today.open) {
    return { isOpen: false, message: `Closed, opens at ${fmt(today.open)} today`, todayLabel: today.day };
  }
  const tomorrow = tradingHours[(jsDay + 1) % 7];
  return { isOpen: false, message: `Closed, opens ${fmt(tomorrow.open)} ${tomorrow.day}`, todayLabel: today.day };
}

// Real tenants and shop numbers, taken from the centre's own
// published store list and mall map.
export const tenants = [
  { name: "Pick n Pay", shop: "6B", category: "Groceries", level: "Upper" },
  { name: "Boxer Superstore", shop: "9", category: "Groceries", level: "Upper" },
  { name: "Boxer Liquor", shop: "9A", category: "Groceries", level: "Upper" },
  { name: "Truworths", shop: "57", category: "Fashion", level: "Upper" },
  { name: "Truworths Man", shop: "2", category: "Fashion", level: "Upper" },
  { name: "Studio 88", shop: "43", category: "Fashion", level: "Upper" },
  { name: "Sportscene", shop: "15A", category: "Fashion", level: "Upper" },
  { name: "Totalsports", shop: "18A", category: "Fashion", level: "Upper" },
  { name: "Skipper Bar", shop: "47", category: "Fashion", level: "Upper" },
  { name: "Uzzi", shop: "13", category: "Fashion", level: "Upper" },
  { name: "Webbers", shop: "37", category: "Fashion", level: "Upper" },
  { name: "Rage", shop: "26", category: "Fashion", level: "Upper" },
  { name: "Spitz", shop: "28B", category: "Fashion", level: "Upper" },
  { name: "Tekkie Town", shop: "66", category: "Fashion", level: "Upper" },
  { name: "John Craig", shop: "45", category: "Fashion", level: "Upper" },
  { name: "Sterns", shop: "14A", category: "Fashion", level: "Upper" },
  { name: "PQ Clothing", shop: "106", category: "Fashion", level: "Lower" },
  { name: "A2Z", shop: "112", category: "Fashion", level: "Lower" },
  { name: "Bellema", shop: "31", category: "Fashion", level: "Upper" },
  { name: "Steers", shop: "48", category: "Food & Dining", level: "Upper" },
  { name: "Real Fish & Chips", shop: "52", category: "Food & Dining", level: "Upper" },
  { name: "The Lion Club Midrand", shop: "3", category: "Food & Dining", level: "Lower" },
  { name: "Clicks", shop: "34", category: "Health & Pharmacy", level: "Upper" },
  { name: "Spec-Savers", shop: "17", category: "Health & Pharmacy", level: "Upper" },
  { name: "Another Chance Centre", shop: "8", category: "Health & Pharmacy", level: "Lower" },
  { name: "Senza Cosmetics", shop: "63", category: "Beauty", level: "Upper" },
  { name: "Signature Cosmetics", shop: "27", category: "Beauty", level: "Upper" },
  { name: "Arthur Ford", shop: "22", category: "Beauty", level: "Upper" },
  { name: "David Hair Trends", shop: "41", category: "Beauty", level: "Upper" },
  { name: "Sheet Street", shop: "56A", category: "Home & Living", level: "Upper" },
  { name: "Bradlows", shop: "60", category: "Home & Living", level: "Upper" },
  { name: "PEP Home", shop: "11", category: "Home & Living", level: "Upper" },
  { name: "Wool", shop: "29", category: "Home & Living", level: "Upper" },
  { name: "MTN", shop: "2", category: "Tech & Mobile", level: "Upper", note: "Currently trading from a kiosk at Entrance 2 while the store is renovated" },
  { name: "Vodacom Chatz", shop: "25B", category: "Tech & Mobile", level: "Upper" },
  { name: "Mr Price Cellular", shop: "16", category: "Tech & Mobile", level: "Upper" },
  { name: "Photomania", shop: "4", category: "Tech & Mobile", level: "Upper" },
  { name: "Standard Bank", shop: "7", category: "Services & Banking", level: "Upper" },
  { name: "Old Mutual", shop: "3", category: "Services & Banking", level: "Upper" },
  { name: "Capitec Bank", shop: "5", category: "Services & Banking", level: "Upper" },
  { name: "Atlas Finance", shop: "19", category: "Services & Banking", level: "Upper" },
  { name: "Platinum Family Loans", shop: "6", category: "Services & Banking", level: "Upper" },
  { name: "Midrand Tailoring", shop: "21", category: "Services & Banking", level: "Lower" },
  { name: "Rabbit Gxng", shop: "20D", category: "Services & Banking", level: "Upper" },
];

export const tenantCategories = [...new Set(tenants.map((t) => t.category))].sort();

// Real centre news, no invented programming.
export const happenings = [
  {
    id: "h1",
    tag: "Centre news",
    when: "Until further notice",
    title: "MTN has moved to a kiosk at Entrance 2",
    body: "While Shop 2 is being renovated, the MTN team is trading from a kiosk just inside Entrance 2. Same staff, same services.",
  },
  {
    id: "h2",
    tag: "Centre news",
    when: "Every day",
    title: "Free undercover parking, 1,900 bays",
    body: "Covered and open-air parking is free for all shoppers, with wheelchair ramps and dedicated bays at every entrance.",
  },
  {
    id: "h3",
    tag: "Promotion",
    when: "This season",
    title: "Back-to-school at the fashion stores",
    body: "Uniform and stationery deals across PEP Home, Studio 88, Tekkie Town and Rage. Ask in store for current pricing.",
  },
];
