// ============================================
// TypeScript Types for Priti's Gruh Udyog
// ============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  description: string | null;
  price: number | null;
  image: string | null;
  is_available: boolean;
  is_featured: boolean;
  weight: string | null;
  ingredients: string | null;
  created_at: string;
  updated_at: string;
  categories?: Category;
}

export interface Enquiry {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  product_id: string | null;
  product_name: string | null;
  message: string | null;
  status: "new" | "contacted" | "resolved";
  created_at: string;
  products?: Product;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  location: string | null;
  rating: number;
  review: string;
  avatar: string | null;
  is_featured: boolean;
  created_at: string;
}


export interface ContactFormData {
  customer_name: string;
  phone: string;
  email?: string;
  product_name?: string;
  product_id?: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}
