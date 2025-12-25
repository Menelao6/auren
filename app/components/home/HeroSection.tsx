import  Link  from "next/link";
import { Button } from '@/components/ui/button';
import heroBg from '../../../public/assets/hero-bg.jpg';
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroBg}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background/30" />
      
      <div className="container py-20 md:py-28 lg:py-40">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            New Collection
          </p>
          <h1 
            className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1] opacity-0 animate-fade-in" 
            style={{ animationDelay: '0.2s' }}
          >
            Curated essentials for modern living
          </h1>
          <p 
            className="mt-6 text-lg text-muted-foreground max-w-md opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            Discover artisan-crafted pieces that bring warmth and character to your home.
          </p>
          <div 
            className="mt-8 opacity-0 animate-fade-in" 
            style={{ animationDelay: '0.4s' }}
          >
            <Link href="/products">
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
