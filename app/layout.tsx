import type { Metadata, Viewport } from "next";
import { Archivo, Manrope, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — New Android Phones & Accessories in Bahawalpur`,
  description:
    "New Android phones and mobile accessories from Dubai Plaza, Bahawalpur. Samsung, Xiaomi, Infinix, Tecno, Vivo, Oppo and more — shop online or visit the store.",
  openGraph: {
    title: site.name,
    description: site.tagline,
    images: ["/brand/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d3fd6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable} ${mono.variable}`}>
      <body className="grain">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
