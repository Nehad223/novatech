import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("access_token")?.value;

  // استثناء صفحة login نفسها
  if (url.pathname.startsWith("/admin") && !url.pathname.startsWith("/admin/login")) {
    if (!token) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

  }
  if (url.pathname === "/admin/login" && token) {
  url.pathname = "/admin";
  return NextResponse.redirect(url);
}


  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


