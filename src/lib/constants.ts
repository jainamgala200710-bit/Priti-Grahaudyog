// ============================================
// Constants for Priti's Gruh Udyog
// ============================================

import { NavItem } from "./types";

// Brand Colors
export const BRAND_COLORS = {
  saffron: "#FF6B00",
  deepRed: "#B91C1C",
  cream: "#FFF7ED",
  darkGray: "#1F2937",
} as const;

// Business Info
export const BUSINESS = {
  name: "Priti's Gruh Udyog",
  tagline: "Authentic Homemade Namkeen Since Generations",
  description:
    "Premium handcrafted Indian snacks & namkeen made with love, tradition, and the finest ingredients. Serving families across Mumbai since generations.",
  phone: "+91 93239 07480, +91 86918 67771",
  phoneDisplay: "+91 93239 07480 / +91 86918 67771",
  email: "info@pritigruhudyog.com",
  whatsapp: "919323907480",
  address: "Ghatkopar West, Mumbai, Maharashtra 400086",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
  pincode: "400086",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.187311195678!2d72.9082!3d19.0863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f123456789%3A0x123456789012345!2sGhatkopar%2C+Mumbai!5e0!3m2!1sen!2sin!4v1234567890",
  businessHours: {
    weekdays: "9:00 AM - 8:00 PM",
    saturday: "9:00 AM - 6:00 PM",
    sunday: "Closed",
  },
} as const;

// Navigation Items
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

// Product Categories
export const PRODUCT_CATEGORIES = [
  "Spicy Sev",
  "Black Salt Sev",
  "Gathiya",
  "Tikha Gathiya",
  "Ratlami Sev",
  "Bhavnagari Gathiya",
  "Chana Dal",
  "Mixture",
  "Farsan",
] as const;

// WhatsApp Numbers (primary first)
export const WHATSAPP_NUMBERS = ["919323907480", "918691867771"] as const;

// WhatsApp Message Generator — returns link for primary number
export function getWhatsAppLink(message?: string): string {
  const defaultMessage = `Hi! I'm interested in your namkeen products. Please share more details.`;
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${WHATSAPP_NUMBERS[0]}?text=${encodedMessage}`;
}

// Returns WhatsApp links for BOTH numbers
export function getWhatsAppLinks(message?: string): string[] {
  const defaultMessage = `Hi! I'm interested in your namkeen products. Please share more details.`;
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  return WHATSAPP_NUMBERS.map((num) => `https://wa.me/${num}?text=${encodedMessage}`);
}

// Opens WhatsApp for both numbers
export function openBothWhatsApp(message?: string): void {
  const links = getWhatsAppLinks(message);
  // Open primary immediately
  window.open(links[0], '_blank');
  // Open secondary with a slight delay so browser doesn't block it
  setTimeout(() => window.open(links[1], '_blank'), 300);
}

export function getProductWhatsAppLink(productName: string, price?: number | null): string {
  let message = `Hi! I'm interested in ordering "${productName}"`;
  if (price) {
    message += ` (₹${price})`;
  }
  message += `. Please share availability and order details.`;
  return getWhatsAppLink(message);
}

// Why Choose Us Features
export const WHY_CHOOSE_US = [
  {
    icon: "Home",
    title: "Homemade Quality",
    description:
      "Every product is handcrafted with love using traditional recipes passed down through generations. No factory shortcuts, just authentic homemade goodness.",
  },
  {
    icon: "Sparkles",
    title: "Premium Ingredients",
    description:
      "We source only the finest quality besan, spices, and oils. No artificial colors, preservatives, or additives — ever.",
  },
  {
    icon: "Zap",
    title: "Fresh Production",
    description:
      "Made fresh daily in small batches to ensure maximum crunch and flavor. From our kitchen to your table — always fresh.",
  },
  {
    icon: "Truck",
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery across Mumbai and beyond. Your favorite snacks delivered right to your doorstep.",
  },
  {
    icon: "Heart",
    title: "Trusted by Customers",
    description:
      "Loved by over 1,500 families. Our consistent quality and taste have earned us unwavering trust.",
  },
] as const;

// Business Stats
export const BUSINESS_STATS = [
  { label: "Years of Passion", value: "5+", icon: "Calendar" },
  { label: "Happy Customers", value: "1,500+", icon: "Users" },
  { label: "Premium Products", value: "20+", icon: "Package" },
  { label: "Regions Served", value: "Mumbai Wide", icon: "MapPin" },
] as const;



// SEO Defaults
export const SEO = {
  title: "Priti's Gruh Udyog — Authentic Homemade Namkeen & Indian Snacks",
  description:
    "Premium handcrafted namkeen, sev, gathiya, and traditional Indian snacks made with the finest ingredients. Order fresh, authentic Gujarati snacks from Priti's Gruh Udyog, Ghatkopar, Mumbai.",
  keywords: [
    "namkeen",
    "Indian snacks",
    "Gujarati snacks",
    "sev",
    "gathiya",
    "farsan",
    "homemade namkeen",
    "Mumbai namkeen",
    "traditional snacks",
    "Priti's Gruh Udyog",
    "bhavnagari gathiya",
    "ratlami sev",
    "spicy sev",
    "mixture",
    "chana dal",
  ],
  ogImage: "/images/og-image.jpg",
} as const;
