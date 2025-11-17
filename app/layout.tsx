import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Tajawal, Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const tajawal = Tajawal({
  subsets: ["latin", "arabic"],
  weight: ["200","300","400","500","700"],
  variable: "--font-tajawal",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["200","300","400","500","700"],
  variable: "--font-roboto",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaTech",
  description: "Syria,Lattakia",
};

export default function RootLayout({ children }:{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable} ${roboto.variable} antialiased`}
        style={{ fontFamily: "var(--font-tajawal), var(--font-roboto), sans-serif" }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

