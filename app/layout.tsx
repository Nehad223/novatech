"use client"; // لو RootLayout يستخدم state / effect
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Tajawal, Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { useState, useEffect } from "react";
import LoadingScreen from "./Components/LoadingScreen";
import Script from "next/script";
import ClientAnalytics from "./analytics/ClientAnalytics"; // استيراد

const tajawal = Tajawal({
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="ar">
      <head>
        {/* ---- Google Analytics ---- */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-B3LSP77WJ0`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B3LSP77WJ0', { page_path: window.location.pathname });
          `}
        </Script>
        {/* ------------------------- */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable} ${roboto.variable} antialiased`}
        style={{ fontFamily: "var(--font-tajawal), var(--font-roboto), sans-serif" }}
      >
        {loading ? (
          <LoadingScreen />
        ) : (
          <Providers>
            <ClientAnalytics /> {/* تتبع كل التنقلات */}
            {children}
          </Providers>
        )}
      </body>
    </html>
  );
}
