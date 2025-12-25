import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice, calculateFinalPrice } from '@/types/product';
import type { Product } from '@/types/product';
import { cn } from '@/lib/utils';
import { getProductImage } from '@/lib/productImages';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, getItemQty } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const finalPrice = calculateFinalPrice(product.price_cents, product.discount_percent);
  const hasDiscount = product.discount_percent > 0;
  const inCart = getItemQty(product.id) > 0;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.out_of_stock) {
      addItem(product.id);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group block overflow-hidden rounded-xl bg-card transition-all duration-base hover:shadow-md",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <img
          src={getProductImage(product.slug, product.images[0])}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && (
            <Badge variant="sale">-{product.discount_percent}%</Badge>
          )}
          {product.out_of_stock && (
            <Badge variant="outOfStock">Sold Out</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={handleToggleWishlist}
          className={cn(
            "absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background",
            inWishlist && "text-red-500 hover:text-red-600"
          )}
        >
          <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          <span className="sr-only">{inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}</span>
        </Button>

        {/* Quick Add Button */}
        {!product.out_of_stock && (
          <div className="absolute bottom-3 right-3 opacity-0 translate-y-2 transition-all duration-base group-hover:opacity-100 group-hover:translate-y-0">
            <Button
              size="icon"
              variant={inCart ? "accent" : "default"}
              onClick={handleAddToCart}
              className="h-9 w-9 rounded-full shadow-md"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {product.category && (
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            {product.category}
          </p>
        )}
        <h3 className="font-display text-lg font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {formatPrice(finalPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price_cents)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
