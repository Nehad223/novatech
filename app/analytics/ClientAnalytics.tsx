"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ClientAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      const page_path = pathname + (searchParams ? "?" + searchParams.toString() : "");
      window.gtag("config", "G-B3LSP77WJ0", { page_path });
    }
  }, [pathname, searchParams]);

  return null; 
}
