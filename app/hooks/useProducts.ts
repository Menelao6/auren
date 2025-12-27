import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../../sanity/lib/client';
import { 
  PRODUCTS_QUERY, 
  PRODUCTS_BY_CATEGORY_QUERY, 
  FEATURED_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCTS_BY_IDS_QUERY,
  CATEGORIES_QUERY 
} from '../../sanity/lib/queries';
import { mapSanityProduct, mapSanityCategory } from '../../sanity/lib/mappers';
import type { Product, Category } from '@/types/product';
import type { SanityProduct, SanityCategory } from '../../sanity/lib/types';

export function useProducts(category?: string) {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async (): Promise<Product[]> => {
      const query = category && category !== 'all' 
        ? PRODUCTS_BY_CATEGORY_QUERY 
        : PRODUCTS_QUERY;
      
      const params = category && category !== 'all' ? { category } : {};
      const data = await sanityClient.fetch<SanityProduct[]>(query, params);
      
      return (data || []).map(mapSanityProduct);
    },
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async (): Promise<Product[]> => {
      const data = await sanityClient.fetch<SanityProduct[]>(FEATURED_PRODUCTS_QUERY);
      return (data || []).map(mapSanityProduct);
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async (): Promise<Product | null> => {
      const data = await sanityClient.fetch<SanityProduct | null>(PRODUCT_BY_SLUG_QUERY, { slug });
      
      if (!data) return null;
      
      return mapSanityProduct(data);
    },
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const data = await sanityClient.fetch<SanityCategory[]>(CATEGORIES_QUERY);
      return (data || []).map(mapSanityCategory);
    },
  });
}

export function useProductsByIds(ids: string[]) {
  return useQuery({
    queryKey: ['products', 'byIds', ids],
    queryFn: async (): Promise<Product[]> => {
      if (ids.length === 0) return [];
      
      const data = await sanityClient.fetch<SanityProduct[]>(PRODUCTS_BY_IDS_QUERY, { ids });
      return (data || []).map(mapSanityProduct);
    },
    enabled: ids.length > 0,
  });
}
