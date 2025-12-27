"use client";

import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { CartProvider } from '@/contexts/CartContext';
import ReactQueryProvider from '@/providers/ReactQueryProviders';


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex min-h-screen flex-col">
      <ReactQueryProvider>
      <CartProvider>
      <Header />
      {children}
      <Footer />
      </CartProvider>
      </ReactQueryProvider>
    </div>
  );
}
