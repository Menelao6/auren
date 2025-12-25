// import { useQuery } from '@tanstack/react-query';
// import { sanityClient } from '@/lib/sanity/client';
// import { 
//   PRODUCTS_QUERY, 
//   PRODUCTS_BY_CATEGORY_QUERY, 
//   FEATURED_PRODUCTS_QUERY,
//   PRODUCT_BY_SLUG_QUERY,
//   PRODUCTS_BY_IDS_QUERY,
//   CATEGORIES_QUERY 
// } from '@/lib/sanity/queries';
// import { mapSanityProduct, mapSanityCategory } from '@/lib/sanity/mappers';
// import { sampleProducts, sampleCategories } from '@/lib/sanity/sampleData';
// import type { Product, Category } from '@/types/product';
// import type { SanityProduct, SanityCategory } from '@/lib/sanity/types';

// // Check if Sanity is properly configured
// const isSanityConfigured = () => {
//   const projectId = import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
//   return projectId && projectId.length > 0;
// };


// export function useProducts(category?: string) {
//   return useQuery({
//     queryKey: ['products', category],
//     queryFn: async () => {
//       if (!isSanityConfigured()) {
//         // Return sample data filtered by category
//         if (category && category !== 'all') {
//           return sampleProducts.filter(p => p.category === category);
//         }
//         return sampleProducts;
//       }

//       try {
//         const query = category && category !== 'all' 
//           ? PRODUCTS_BY_CATEGORY_QUERY 
//           : PRODUCTS_QUERY;
        
//         const params = category && category !== 'all' ? { category } : {};
//         const data = await sanityClient.fetch<SanityProduct[]>(query, params);
        
//         // Fall back to sample data if Sanity returns empty
//         if (!data || data.length === 0) {
//           if (category && category !== 'all') {
//             return sampleProducts.filter(p => p.category === category);
//           }
//           return sampleProducts;
//         }
        
//         return data.map(mapSanityProduct);
//       } catch (error) {
//         console.warn('Sanity fetch failed, using sample data:', error);
//         if (category && category !== 'all') {
//           return sampleProducts.filter(p => p.category === category);
//         }
//         return sampleProducts;
//       }
//     },
//   });
// }

// export function useFeaturedProducts() {
//   return useQuery({
//     queryKey: ['products', 'featured'],
//     queryFn: async () => {
//       if (!isSanityConfigured()) {
//         return sampleProducts.filter(p => p.featured);
//       }

//       try {
//         const data = await sanityClient.fetch<SanityProduct[]>(FEATURED_PRODUCTS_QUERY);
        
//         if (!data || data.length === 0) {
//           return sampleProducts.filter(p => p.featured);
//         }
        
//         return data.map(mapSanityProduct);
//       } catch (error) {
//         console.warn('Sanity fetch failed, using sample data:', error);
//         return sampleProducts.filter(p => p.featured);
//       }
//     },
//   });
// }

// export function useProduct(slug: string) {
//   return useQuery({
//     queryKey: ['product', slug],
//     queryFn: async () => {
//       if (!isSanityConfigured()) {
//         return sampleProducts.find(p => p.slug === slug) || null;
//       }

//       try {
//         const data = await sanityClient.fetch<SanityProduct | null>(PRODUCT_BY_SLUG_QUERY, { slug });
        
//         if (!data) {
//           return sampleProducts.find(p => p.slug === slug) || null;
//         }
        
//         return mapSanityProduct(data);
//       } catch (error) {
//         console.warn('Sanity fetch failed, using sample data:', error);
//         return sampleProducts.find(p => p.slug === slug) || null;
//       }
//     },
//     enabled: !!slug,
//   });
// }

// export function useCategories() {
//   return useQuery({
//     queryKey: ['categories'],
//     queryFn: async () => {
//       if (!isSanityConfigured()) {
//         return sampleCategories;
//       }

//       try {
//         const data = await sanityClient.fetch<SanityCategory[]>(CATEGORIES_QUERY);
        
//         if (!data || data.length === 0) {
//           return sampleCategories;
//         }
        
//         return data.map(mapSanityCategory);
//       } catch (error) {
//         console.warn('Sanity fetch failed, using sample data:', error);
//         return sampleCategories;
//       }
//     },
//   });
// }

// export function useProductsByIds(ids: string[]) {
//   return useQuery({
//     queryKey: ['products', 'byIds', ids],
//     queryFn: async () => {
//       if (ids.length === 0) return [];
      
//       if (!isSanityConfigured()) {
//         return sampleProducts.filter(p => ids.includes(p.id));
//       }

//       try {
//         const data = await sanityClient.fetch<SanityProduct[]>(PRODUCTS_BY_IDS_QUERY, { ids });
        
//         if (!data || data.length === 0) {
//           return sampleProducts.filter(p => ids.includes(p.id));
//         }
        
//         return data.map(mapSanityProduct);
//       } catch (error) {
//         console.warn('Sanity fetch failed, using sample data:', error);
//         return sampleProducts.filter(p => ids.includes(p.id));
//       }
//     },
//     enabled: ids.length > 0,
//   });
// }
