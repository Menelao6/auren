import type { Product, Category } from '@/types/product';
import type { SanityProduct, SanityCategory } from './types';
import { urlFor } from './client';

// Map Sanity product to app Product type
export function mapSanityProduct(sanityProduct: SanityProduct): Product {
  return {
    id: sanityProduct._id,
    slug: sanityProduct.slug?.current || '',
    title: sanityProduct.title,
    description: sanityProduct.description || null,
    images: (sanityProduct.images || []).map(img => urlFor(img)),
    price_cents: sanityProduct.priceCents || 0,
    discount_percent: sanityProduct.discountPercent || 0,
    out_of_stock: sanityProduct.outOfStock || false,
    category: sanityProduct.categoryData?.slug?.current || null,
    featured: sanityProduct.featured || false,
    created_at: sanityProduct._createdAt,
    updated_at: sanityProduct._updatedAt,
  };
}

// Map Sanity category to app Category type
export function mapSanityCategory(sanityCategory: SanityCategory): Category {
  return {
    id: sanityCategory._id,
    slug: sanityCategory.slug?.current || '',
    title: sanityCategory.title,
    sort_order: sanityCategory.sortOrder || null,
    created_at: sanityCategory._createdAt,
  };
}
