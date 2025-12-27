import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Import product images for category cards
import ceramicVase from '../../../public/assets/products/ceramic-vase.jpg';
import scentedCandle from '../../../public/assets/products/scented-candle.jpg';
import deskLamp from '../../../public//assets/products/desk-lamp.jpg';
import bathTowels from '../../../public/assets/products/bath-towels.jpg';

const categories = [
  {
    slug: 'home-decor',
    title: 'Home Decor',
    image: ceramicVase,
    color: 'bg-orange-50',
  },
  {
    slug: 'kitchen',
    title: 'Kitchen',
    image: scentedCandle,
    color: 'bg-purple-50',
  },
  {
    slug: 'lighting',
    title: 'Lighting',
    image: deskLamp,
    color: 'bg-amber-50',
  },
  {
    slug: 'bath',
    title: 'Bath & Body',
    image: bathTowels,
    color: 'bg-green-50',
  },
];

export function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-10 md:py-14 bg-surface">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Shop by Category
            </h2>
            <p className="mt-1 text-muted-foreground">
              Browse our curated collections
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="h-9 w-9 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="h-9 w-9 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="flex-shrink-0 w-[200px] sm:w-[240px] snap-start group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`relative overflow-hidden rounded-xl ${category.color} aspect-square`}>
                <Image
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="font-medium text-foreground">{category.title}</h3>
                <Button variant="soft" size="sm" className="mt-2">
                  View All
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
