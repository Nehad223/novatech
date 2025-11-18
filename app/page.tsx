import './globals.css'
import Navbar from './Components/Navbar'
import Main_Home from './Components/Main_Home'
import type { Metadata } from "next";
import Script from 'next/script';
export const metadata: Metadata = {
  title:
    "NovaTech | تصميم مواقع احترافية - تطبيقات موبايل - ذكاء اصطناعي - بوتات تلغرام | اللاذقية سوريا",
  
  description:
    "NovaTech شركة برمجيات رائدة في تصميم وتطوير المواقع والتطبيقات، إنشاء نماذج الذكاء الاصطناعي، وبرمجة بوتات تلغرام. نقدم حلولاً تقنية مبتكرة للشركات والأفراد في اللاذقية – سوريا، مع جودة عالية وخبرة احترافية.",

  keywords: [
    "NovaTech",
    "تصميم مواقع",
    "شركة تصميم مواقع",
    "برمجة مواقع",
    "Web Design",
    "Web Development",
    "تطوير مواقع",
    "تطبيقات موبايل",
    "Mobile Apps",
    "ذكاء اصطناعي",
    "AI",
    "نماذج ذكاء اصطناعي",
    "AI Models",
    "بوت تلغرام",
    "Telegram Bot",
    "شركة برمجيات",
    "Software Company",
    "شركة تقنية",
    "Tech Company",
    "حلول برمجية",
    "Syria",
    "Lattakia",
    "اللاذقية",
    "سوريا",
    "شركة تكنولوجيا",
    "تطوير برمجيات",
    "برمجة خاصة",
    "مواقع شركات",
  ],

  openGraph: {
    title:
      "NovaTech | حلول برمجية – تصميم مواقع – ذكاء اصطناعي – تطبيقات موبايل",
    
    description:
      "شركة NovaTech تقدم خدمات تصميم مواقع، تطوير تطبيقات، ذكاء اصطناعي، وبرمجة بوتات تلغرام بمستوى احترافي في سوريا – اللاذقية.",
    
    url: "https://novatech-1tne.vercel.app",
    siteName: "NovaTech",
    locale: "ar_SY",
    type: "website",
    images: [
      {
        url: "https://novatech-1tne.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "NovaTech – Website Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NovaTech | تصميم مواقع – تطبيقات – ذكاء اصطناعي",
    description:
      "حلول برمجية حديثة تشمل تصميم مواقع، تطوير تطبيقات، ذكاء اصطناعي وبوتات تلغرام في سوريا.",
    images: ["https://novatech-1tne.vercel.app/og-image.png"],
  },

  alternates: {
    canonical: "https://novatech-1tne.vercel.app",
  },

  authors: [
    { name: "NovaTech Team", url: "https://novatech-1tne.vercel.app" },
  ],

  creator: "NovaTech",
  publisher: "NovaTech",
};


export default function Home() {

  return (
    <div className="">
    <Navbar/>
    <Main_Home/>
    </div>
  );
}
