"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { NavItems } from "@/helpers/NavItems";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { confirmDialog, toastSuccess, notifyError } from "@/Alerts/notify";
import { useCart } from "@/context/CartContext";

const HIDE_IN_NAV = new Set<string>(["/login", "/register"]);

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const mounted = useMounted();

  const { dataUser, logout } = useAuth();
  const { getItemCount } = useCart();
  const cartCount = mounted ? getItemCount() : 0;

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setCompact(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  const isAuthed = mounted && !!dataUser;
  const AUTH_COOKIE = "bt_auth";
  const clearAuthFlag = () => {
  document.cookie = `${AUTH_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
  async function handleLogout() {
  const ok = await confirmDialog(
    "Vas a salir de tu cuenta.",
    "¿Cerrar sesión?",
    "Salir",
    "Cancelar"
  );
  if (!ok) return;

  try {
    clearAuthFlag();   // ← borra la cookie-bandera
    logout();          // ← limpia tu AuthContext + localStorage(userSession)
    toastSuccess("Sesión cerrada");
    router.replace("/landing");
  } catch (e: any) {
    notifyError(e?.message || "No se pudo cerrar sesión");
  }
}


  const itemsForUser = useMemo(() => {
    return NavItems.filter((it: any) => {
      if (HIDE_IN_NAV.has(it.route)) return false;
      if (it?.private && !isAuthed) return false;
      if (it?.hideWhenAuth && isAuthed) return false;
      return true;
    });
  }, [isAuthed]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const compactClass = mounted && compact ? "shadow-lg" : "";
  const userName =
    (dataUser as any)?.user?.name ?? (dataUser as any)?.name ?? "";

  return (
    <header className="sticky top-0 z-50 px-4">
      <nav
        className={[
          "relative mx-auto max-w-6xl rounded-3xl border",
          "backdrop-blur-md text-[var(--fg)] transition-all duration-300",
          "[--nav-h:84px] md:[--nav-h:92px] h-[var(--nav-h)] overflow-hidden",
          "border-[var(--nav-border)] bg-[var(--nav-bg)]",
          compactClass,
        ].join(" ")}
      >
        {/* Glow azul inferior */}
        <div
          className="
            pointer-events-none absolute inset-x-6 bottom-1 h-1
            bg-[radial-gradient(120%_200%_at_50%_100%,rgba(78,151,255,.75)_0%,transparent_70%)]
            blur-[8px] rounded-full
          "
        />

        {/* Contenedor interno */}
        <div className="flex h-[var(--nav-h)] items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <section className="flex items-center shrink-0 [--logo-h:64px] md:[--logo-h:120px]">
            <img
              src="/favicon.ico"
              alt="Logo de BairesTech"
              className="h-[var(--logo-h)] w-auto object-contain leading-none"
            />
          </section>

          {/* Centro: rutas o slogan */}
          {isAuthed ? (
            <ul className="hidden md:flex items-center gap-6">
              {itemsForUser.map((item: any) => {
                const active = isActive(item.route);
                const baseClasses = [
                  "inline-flex items-center px-2 py-1 relative",
                  "text-[var(--nav-link)] hover:text-[var(--nav-link-hover)]",
                  "after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:rounded-full",
                  "after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
                  "after:bg-[var(--nav-border)]",
                  active ? "after:scale-x-100 text-[var(--nav-link-hover)]" : "",
                ].join(" ");

                // Cart con badge
                if (item.route === "/cart") {
                  return (
                    <li key={item.name} className="relative">
                      <Link href={item.route} prefetch={false} className={baseClasses}>
                        <span className="mr-1">{item.name}</span>
                        <span className="relative inline-flex items-center ml-1">
                          <FiShoppingCart className="h-[18px] w-[18px] opacity-85" />
                          {cartCount > 0 && (
                            <span
                              aria-label={`${cartCount} productos en el carrito`}
                              className="
                                absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px]
                                rounded-full text-[10px] leading-[18px] text-white text-center
                                bg-[var(--brand-500)] shadow
                              "
                            >
                              {cartCount}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.name} className="relative">
                    <Link href={item.route} prefetch={false} className={baseClasses}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="hidden md:flex items-center">
              <span className="nav-slogan nav-slogan--md px-2">
                UN PEQUEÑO PASO EN TU PRESENTE, PERO UN GRAN SALTO EN TU FUTURO
              </span>
            </div>
          )}

          {/* Derecha: saludo + icono salir */}
          {isAuthed ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm mr-1">
                Hola, <strong>{userName}</strong>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Salir"
                title="Salir"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--nav-border)] hover:bg-[color:var(--btn-bg)/.06] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-500)]"
              >
                <FiLogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3" />
          )}

          {/* Hamburguesa móvil sólo si hay sesión */}
          {isAuthed && (
            <button
              aria-label="Abrir menú"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--nav-border)] bg-[color:var(--near-black)/0.5]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          )}
        </div>

        {/* Drawer móvil */}
        {mounted && isAuthed && open && (
          <div className="md:hidden px-4 pb-4 pt-0">
            <ul className="grid gap-2">
              {itemsForUser.map((item: any) => (
                <li key={item.name}>
                  <Link
                    href={item.route}
                    prefetch={false}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center justify-between rounded-xl px-3 py-2",
                      "hover:bg-[color:var(--btn-bg)/.06]",
                      isActive(item.route) ? "bg-[color:var(--btn-bg)/.08]" : "",
                    ].join(" ")}
                  >
                    <span>{item.name}</span>

                    {/* Badge móvil para /cart */}
                    {item.route === "/cart" && (
                      <span className="ml-2 inline-flex items-center gap-1">
                        <FiShoppingCart className="h-4 w-4 opacity-85" />
                        {cartCount > 0 && (
                          <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--brand-500)] text-white text-[10px] leading-[18px] text-center">
                            {cartCount}
                          </span>
                        )}
                      </span>
                    )}
                  </Link>
                </li>
              ))}

              <li className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  aria-label="Salir"
                  title="Salir"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--nav-border)]"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
