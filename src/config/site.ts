export const site = {
  name: "Hello Honey Bunny",
  url: "https://hellohoneybunny.com",
  description: "Small-batch goat dairy in Kunjirwadi, near Pune. Current milk and paneer availability is confirmed personally on WhatsApp.",
  phoneDisplay: "+91 8208 665 234",
  whatsappNumber: "918208665234",
  email: "visit@hellohoneybunny.com",
  location: "Kunjirwadi, Maharashtra 412201, near Pune",
  deliveryAreas: [
    "Pune",
    "Pimpri-Chinchwad",
    "Katraj",
    "Hadapsar",
    "Loni Kalbhor",
    "Kunjirwadi",
    "Uruli Kanchan"
  ],
  address: {
    locality: "Kunjirwadi",
    region: "Maharashtra",
    postalCode: "412201",
    country: "IN"
  },
  social: {
    linkedin: "https://www.linkedin.com/company/hellohoneybunny"
  },
  maxRequestQuantity: 24
} as const;

export const navItems = [
  { href: "/fresh-goat-milk", label: "Fresh Goat Milk", page: "milk" },
  { href: "/goat-milk-paneer", label: "Goat Milk Paneer", page: "paneer" },
  { href: "/our-farm", label: "Our Farm", page: "farm" },
  { href: "/for-chefs-and-retailers", label: "For Food Businesses", page: "business" },
  { href: "/faqs", label: "FAQs", page: "faqs" }
] as const;

export function withBase(path: string, base = import.meta.env.BASE_URL) {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}` || "/";
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const availabilityMessage =
  "Hello, I would like to check current availability for fresh goat milk and goat milk paneer. Please share the available batch options, final pricing and the available pickup or delivery arrangement for my area.";
