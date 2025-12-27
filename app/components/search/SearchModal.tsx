'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { supabase } from '@/integrations/supabase/client';
import { formatPrice, calculateFinalPrice } from '@/types/product';
import { getProductImage } from '@/lib/productImages'; // local images map (StaticImageData)
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  price_cents: number;
  discount_percent: number;
  category: string | null;
  images: string[] | null;
}

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setHasSearched(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const searchProducts = async () => {
      const q = query.trim();
      if (q.length < 2) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);

      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, slug, title, price_cents, discount_percent, category, images')
          .or(`title.ilike.%${q}%,category.ilike.%${q}%,description.ilike.%${q}%`)
          .limit(8);

        if (error) throw error;
        setResults((data as SearchResult[]) || []);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (slug: string) => {
    router.push(`/products/${slug}`);
    onOpenChange(false);
  };

  const handleViewAll = () => {
    router.push(`/products?search=${encodeURIComponent(query)}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search Products</DialogTitle>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found for &quot;{query}&quot;</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="p-2">
              {results.map((product) => {
                const finalPrice = calculateFinalPrice(product.price_cents, product.discount_percent);

                // Prefer local mapped image; fallback to first Supabase URL; then placeholder
                const localImage = getProductImage(product.slug);
                const remoteUrl = product.images?.[0];
                const hasRemote = typeof remoteUrl === 'string' && remoteUrl.length > 0;

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelect(product.slug)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors text-left"
                  >
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-surface flex-shrink-0 relative">
                      {localImage ? (
                        <Image
                          src={localImage}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : hasRemote ? (
                        // Remote image (requires next.config.js images.remotePatterns OR domains)
                        <Image
                          src={remoteUrl}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <Image
                          src="/placeholder.svg"
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground line-clamp-1">{product.title}</p>
                      {product.category && (
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {product.category}
                        </p>
                      )}
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-foreground">{formatPrice(finalPrice)}</p>
                      {product.discount_percent > 0 && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.price_cents)}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}

              {query.trim().length >= 2 && (
                <Button variant="ghost" className="w-full mt-2 text-primary" onClick={handleViewAll}>
                  View all results for &quot;{query}&quot;
                </Button>
              )}
            </div>
          )}

          {!loading && !hasSearched && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Start typing to search products</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface SearchButtonProps {
  variant?: 'icon' | 'full';
  className?: string;
}

export function SearchButton({ variant = 'icon', className }: SearchButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (variant === 'full') {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            'flex items-center gap-2 w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-muted-foreground hover:bg-background hover:border-primary/30 transition-colors',
            className
          )}
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search products...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-background rounded border border-border">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>

        <SearchModal open={open} onOpenChange={setOpen} />
      </>
    );
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} className={className}>
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
      <SearchModal open={open} onOpenChange={setOpen} />
    </>
  );
}
