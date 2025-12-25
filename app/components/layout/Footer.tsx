import Link  from 'next/link';

const footerLinks = {
  shop: [
    { href: '/products', label: 'All Products' },
    { href: '/products?category=new', label: 'New Arrivals' },
    { href: '/products?category=sale', label: 'Sale' },
  ],
  support: [
    { href: '/help', label: 'FAQ' },
    { href: '/help', label: 'Shipping' },
    { href: '/help', label: 'Returns' },
  ],
  company: [
    { href: '/help', label: 'About Us' },
    { href: '/help', label: 'Contact' },
    { href: '/help', label: 'Privacy Policy' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-display font-semibold text-foreground">
              <span className="text-2xl">✦</span>
              <span>Auren</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Curated essentials for the modern lifestyle. Quality craftsmanship meets timeless design.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Auren. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/help" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/help" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
