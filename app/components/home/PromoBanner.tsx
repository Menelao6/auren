import Link from 'next/link';
import { Button } from '@/components/ui/button';
import promoBanner from '../../../public/assets/promo-banner.jpg';
import Image from 'next/image';

export function PromoBanner() {
  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0">
            <Image
              src={promoBanner}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12 lg:p-16">
            <div className="text-center md:text-left max-w-md">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                7 days of wellness
              </h3>
              <p className="mt-3 text-muted-foreground">
                Transform your space into a sanctuary. Shop our curated wellness collection and discover peace.
              </p>
            </div>
            
            <Link href="/products?category=bath">
              <Button variant="hero" size="lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
