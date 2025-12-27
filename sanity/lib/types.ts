import type { SanityImageSource } from './client';

// Sanity document types
export interface SanityProduct {
  _id: string;
  _type: 'product';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  description?: string;
  images?: SanityImageSource[];
  priceCents: number;
  discountPercent?: number;
  outOfStock?: boolean;
  category?: {
    _ref: string;
    _type: 'reference';
  };
  categoryData?: SanityCategory; // Populated via GROQ join
  featured?: boolean;
}

export interface SanityCategory {
  _id: string;
  _type: 'category';
  _createdAt: string;
  title: string;
  slug: { current: string };
  sortOrder?: number;
}
