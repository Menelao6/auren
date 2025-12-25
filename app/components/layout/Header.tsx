// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { ShoppingBag, Menu, User, Heart, Package, HelpCircle, Home, Grid3X3, ChevronRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/hooks/useAuth';
// import { SearchButton } from '@/components/search/SearchModal';
// import { cn } from '@/lib/utils';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet';

// const navLinks = [
//   { href: '/', label: 'Home', icon: Home },
//   { href: '/products', label: 'Shop All', icon: Grid3X3 },
//   { href: '/wishlist', label: 'Wishlist', icon: Heart },
//   { href: '/orders', label: 'My Orders', icon: Package },
//   { href: '/help', label: 'Help & Support', icon: HelpCircle },
// ];

// export function Header() {
//   const { totalItems } = useCart();
//   const { user } = useAuth();
//   const location = useRouter();

//   return (
//     <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
//       <div className="container flex h-16 items-center justify-between">
//         {/* Logo */}
//         <Link 
//           href="/" 
//           className="group flex items-center gap-2.5"
//         >
//           <span className="text-2xl transition-transform duration-300 group-hover:rotate-45">✦</span>
//           <span className="text-xl font-display font-semibold tracking-tight text-foreground">
//             Auren
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-1">
//           {navLinks.slice(0, 3).map((link) => {
//             const isActive = location.pathname === link.href;
//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={cn(
//                   "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
//                   isActive 
//                     ? "text-foreground bg-surface" 
//                     : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
//                 )}
//               >
//                 {link.label}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Actions */}
//         <div className="flex items-center gap-0.5">
//           <SearchButton variant="icon" />
          
//           {/* Wishlist - Desktop only */}
//           <Link href="/wishlist" className="hidden md:block">
//             <Button variant="ghost" size="icon" className="rounded-full hover:bg-surface">
//               <Heart className="h-5 w-5" />
//               <span className="sr-only">Wishlist</span>
//             </Button>
//           </Link>
          
//           <Link href={user ? "/profile" : "/auth"}>
//             <Button variant="ghost" size="icon" className="rounded-full hover:bg-surface">
//               {user ? (
//                 <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center ring-2 ring-primary/20">
//                   <span className="text-xs font-semibold text-primary-foreground">
//                     {user.user_metadata?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//               ) : (
//                 <User className="h-5 w-5" />
//               )}
//               <span className="sr-only">{user ? 'Profile' : 'Sign in'}</span>
//             </Button>
//           </Link>
          
//           <Link href="/cart">
//             <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-surface">
//               <ShoppingBag className="h-5 w-5" />
//               {totalItems > 0 && (
//                 <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center shadow-sm">
//                   {totalItems > 99 ? '99+' : totalItems}
//                 </span>
//               )}
//               <span className="sr-only">Cart</span>
//             </Button>
//           </Link>

//           {/* Mobile Menu */}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden rounded-full hover:bg-surface"
//               >
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-full max-w-sm p-0 bg-background">
//               <SheetHeader className="p-6 pb-4 border-b border-border/50">
//                 <SheetTitle className="flex items-center gap-2.5 text-left">
//                   <span className="text-xl">✦</span>
//                   <span className="font-display font-semibold">Auren</span>
//                 </SheetTitle>
//               </SheetHeader>
              
//               {/* User Section */}
//               <div className="p-4 border-b border-border/50">
//                 <Link 
//                   href={user ? "/profile" : "/auth"}
//                   className="flex items-center gap-4 p-3 rounded-xl bg-surface/50 hover:bg-surface transition-colors"
//                 >
//                   {user ? (
//                     <>
//                       <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
//                         <span className="text-lg font-semibold text-primary-foreground">
//                           {user.user_metadata?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-foreground truncate">
//                           {user.user_metadata?.name || 'Welcome back'}
//                         </p>
//                         <p className="text-sm text-muted-foreground truncate">
//                           {user.email}
//                         </p>
//                       </div>
//                       <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                     </>
//                   ) : (
//                     <>
//                       <div className="h-12 w-12 rounded-full bg-surface-2 flex items-center justify-center">
//                         <User className="h-6 w-6 text-muted-foreground" />
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-medium text-foreground">Sign in</p>
//                         <p className="text-sm text-muted-foreground">
//                           Access your account
//                         </p>
//                       </div>
//                       <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                     </>
//                   )}
//                 </Link>
//               </div>
              
//               {/* Navigation Links */}
//               <nav className="p-4 space-y-1">
//                 {navLinks.map((link, index) => {
//                   const Icon = link.icon;
//                   const isActive = location.pathname === link.href;
//                   return (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       className={cn(
//                         "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200",
//                         "opacity-0 animate-fade-in",
//                         isActive 
//                           ? "bg-primary text-primary-foreground" 
//                           : "text-foreground hover:bg-surface"
//                       )}
//                       style={{ animationDelay: `${index * 50}ms` }}
//                     >
//                       <Icon className="h-5 w-5" />
//                       <span className="font-medium">{link.label}</span>
//                       {!isActive && <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />}
//                     </Link>
//                   );
//                 })}
//               </nav>
              
//               {/* Cart Button */}
//               <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-background">
//                 <Link href="/cart" className="block">
//                   <Button className="w-full h-12 rounded-xl gap-2 text-base font-medium">
//                     <ShoppingBag className="h-5 w-5" />
//                     View Cart
//                     {totalItems > 0 && (
//                       <span className="ml-1 px-2 py-0.5 rounded-full bg-primary-foreground/20 text-sm">
//                         {totalItems}
//                       </span>
//                     )}
//                   </Button>
//                 </Link>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }


import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link href="/" style={{ marginRight: '1rem', textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
          My Next.js App
        </Link>
      </div>
      <nav>
        <Link href="/about" style={{ marginRight: '1rem', textDecoration: 'none', color: 'blue' }}>
          About
        </Link>
        <Link href="/contact" style={{ textDecoration: 'none', color: 'blue' }}>
          Contact
        </Link>
      </nav>
    </header>
  );
}