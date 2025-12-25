export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  images: string[];
  price_cents: number;
  discount_percent: number;
  out_of_stock: boolean;
  category: string | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  sort_order: number | null;
  created_at: string;
}

export interface CartItem {
  productId: string;
  qty: number;
}

export interface CartProduct extends Product {
  qty: number;
}

export function calculateFinalPrice(priceCents: number, discountPercent: number): number {
  return Math.round(priceCents * (1 - discountPercent / 100));
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
