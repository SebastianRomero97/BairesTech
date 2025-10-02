import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


const PUBLIC_PAGES = new Set<string>(["/", "/landing", "/login", "/register"]);


const AUTH_COOKIE = "bt_auth";


const ASSET_EXT_RE =
  /\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|mjs|map|txt|xml|json|woff2?|ttf|otf|eot|mp4|webm|wav|mp3)$/i;

const isAsset = (p: string) =>
  p.startsWith("/_next/") ||       
  p.startsWith("/favicon") ||      
  ASSET_EXT_RE.test(p);             

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;


  if (isAsset(pathname)) return NextResponse.next();


  if (pathname.startsWith("/api/auth/")) return NextResponse.next();


  const isLogged = req.cookies.get(AUTH_COOKIE)?.value === "1";


  if (isLogged && PUBLIC_PAGES.has(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }


  if (PUBLIC_PAGES.has(pathname)) return NextResponse.next();


  if (!isLogged) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/landing";
    url.search = "";
    url.searchParams.set("from", pathname + search);
    return NextResponse.redirect(url);
  }

 
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico).*)"],
};
