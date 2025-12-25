'use client';

// import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
// import { ProductCarousel } from '@/components/home/ProductCarousel';
// import { PromoBanner } from '@/components/home/PromoBanner';
// import { CategorySection } from '@/components/home/CategorySection';
// import { SaleBanners } from '@/components/home/SaleBanners';
// import { ProductsGridSection } from '@/components/home/ProductsGrid';
// import { useFeaturedProducts, useProducts } from '@/hooks/useProducts';

export default function Page() {
  // const { data: featuredProducts = [], isLoading: loadingFeatured } = useFeaturedProducts();
  // const { data: allProducts = [], isLoading: loadingAll } = useProducts();

  // Split products for different sections
  // const topProducts = featuredProducts.slice(0, 8);
  // const moreProducts = allProducts.slice(0, 8);

  return (
    // <Layout>
    //   {/* Hero Section */}
    //   <HeroSection />

    //   {/* Top Products Carousel */}
    //   <ProductCarousel
    //     title="Top Products"
    //     subtitle="Our most loved pieces"
    //     products={topProducts}
    //   />

    //   {/* Promo Banner */}
    //   <PromoBanner />

    //   {/* Category Section */}
    //   <CategorySection />

    //   {/* Sale Banners */}
    //   <SaleBanners />

    //   {/* Products Grid */}
    //   <ProductsGridSection
    //     title="New Arrivals"
    //     subtitle="Fresh additions to our collection"
    //     products={moreProducts}
    //   />
    // </Layout>
    <HeroSection />
  );
}
