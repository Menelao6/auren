import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-Toast';
import { useProductsByIds } from './useProducts';

export function useWishlist() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) throw error;
      return data.map(item => item.product_id);
    },
    enabled: !!user,
  });

  const addToWishlist = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const { error } = await supabase
        .from('wishlist')
        .insert({ user_id: user.id, product_id: productId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: 'Added to wishlist',
        description: 'Product saved to your wishlist.',
      });
    },
    onError: (error: any) => {
      if (error.code === '23505') {
        toast({
          title: 'Already in wishlist',
          description: 'This product is already in your wishlist.',
        });
      } else {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: 'Removed from wishlist',
        description: 'Product removed from your wishlist.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const isInWishlist = (productId: string) => wishlistItems.includes(productId);

  const toggleWishlist = (productId: string) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save products to your wishlist.',
      });
      return;
    }

    if (isInWishlist(productId)) {
      removeFromWishlist.mutate(productId);
    } else {
      addToWishlist.mutate(productId);
    }
  };

  return {
    wishlistItems,
    isLoading,
    isInWishlist,
    toggleWishlist,
    addToWishlist: addToWishlist.mutate,
    removeFromWishlist: removeFromWishlist.mutate,
  };
}

// Updated to fetch products from Sanity based on wishlist IDs
export function useWishlistProducts() {
  const { user } = useAuth();

  // First get the wishlist product IDs from Supabase
  const { data: wishlistData = [], isLoading: wishlistLoading } = useQuery({
    queryKey: ['wishlist-ids', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlist')
        .select('id, created_at, product_id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Extract product IDs for Sanity query
  const productIds = wishlistData.map(item => item.product_id);

  // Fetch products from Sanity
  const { data: products = [], isLoading: productsLoading } = useProductsByIds(productIds);

  // Combine wishlist data with products
  const data = wishlistData.map(item => ({
    id: item.id,
    created_at: item.created_at,
    product_id: item.product_id,
    product: products.find((p: any) => p.id === item.product_id) || null,
  })).filter(item => item.product !== null);

  return {
    data,
    isLoading: wishlistLoading || productsLoading,
  };
}
