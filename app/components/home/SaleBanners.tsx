import Link from 'next/link';
import saleBanner1 from '../../../public/assets/sale-banner-1.jpg';
import saleBanner2 from '../../../public/assets/sale-banner-2.jpg';
import Image from 'next/image';

const banners = [
  {
    id: 1,
    title: 'Seasonal Sale',
    subtitle: 'Up to 15% off',
    image: saleBanner1,
    link: '/products',
    overlay: 'from-black/50 to-transparent',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh designs',
    image: saleBanner2,
    link: '/products',
    overlay: 'from-black/40 to-transparent',
  },
];

export function SaleBanners() {
  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] sm:aspect-square"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${banner.overlay}`} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wide">
                  {banner.subtitle}
                </p>
                <h3 className="mt-1 font-display text-xl md:text-2xl font-semibold text-primary-foreground">
                  {banner.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
