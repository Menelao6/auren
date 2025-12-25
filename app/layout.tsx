import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Auren",
  description: "Eccomernce Store",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
          <Header />
          <main>{children}</main>
          <Footer />
      </body>
    </html>
  );
}