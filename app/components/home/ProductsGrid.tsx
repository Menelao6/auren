import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product/ProductGrid';
import type { Product } from '@/types/product';
import { ArrowRight } from 'lucide-react';

interface ProductsGridSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  showViewAll?: boolean;
}

export function ProductsGridSection({ title, subtitle, products, showViewAll = true }: ProductsGridSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          {showViewAll && (
            <Link href="/products" className="hidden md:block">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        {/* Products */}
        <ProductGrid products={products} />

        {/* Mobile View All */}
        {showViewAll && (
          <div className="mt-8 text-center md:hidden">
            <Link href="/products">
              <Button variant="hero" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
