// /src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// páginas públicas
const PUBLIC_PAGES = new Set<string>(["/", "/landing", "/login", "/register"]);

// 🔒 cookie-bandera de sesión (asegurate de setearla a "1" al loguear)
const AUTH_COOKIE = "bt_auth";

// ✅ Detecta CUALQUIER archivo estático por extensión (sirve para /public/*)
const ASSET_EXT_RE =
  /\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|mjs|map|txt|xml|json|woff2?|ttf|otf|eot|mp4|webm|wav|mp3)$/i;

const isAsset = (p: string) =>
  p.startsWith("/_next/") ||        // internals de Next
  p.startsWith("/favicon") ||       // favicons
  ASSET_EXT_RE.test(p);             // cualquier archivo con extensión

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1) Assets: no filtrar
  if (isAsset(pathname)) return NextResponse.next();

  // 2) APIs de auth: no filtrar
  if (pathname.startsWith("/api/auth/")) return NextResponse.next();

  // 3) Sesión: cookie-bandera
  const isLogged = req.cookies.get(AUTH_COOKIE)?.value === "1";

  // 4) Si hay sesión y es página pública -> /home
  if (isLogged && PUBLIC_PAGES.has(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  // 5) Páginas públicas -> dejar pasar
  if (PUBLIC_PAGES.has(pathname)) return NextResponse.next();

  // 6) Rutas protegidas sin sesión
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

  // 7) Autenticado y no es pública -> ok
  return NextResponse.next();
}

// ⛔ además del guard isAsset, evitamos _next y favicon por matcher
export const config = {
  matcher: ["/((?!_next/|favicon.ico).*)"],
};
