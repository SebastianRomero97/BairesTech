//"use client"

//import Link from "next/link";
//import { useAuth } from "@/context/AuthContext";
//import { NavItems, PATHROUTES} from "@/helpers/NavItems";
//function  NavBar () {
//const {dataUser,logout} = useAuth()
//  return <nav>
  //      <section>Logo</section>
    //   {NavItems.map((navigationitem) => {
     //   return (
       // <Link 
        //href={navigationitem.route} 
        //key={navigationitem.name} prefetch = {false}>
            //   {navigationitem.name}
            //</Link>)})}
       //<div>
        //{dataUser ? (
          //  <div>
          //  <h3 className='text-3xl'>{dataUser?.user.name}</h3>
          //  <button onClick={() => logout()}>Cerrar Sesión</button>
          //  </div>
        //) : (
        //<Link href={PATHROUTES.LOGIN}>Ingresa a tu cuenta</Link>
        //)}
       //</div>
    //</nav>
//}
//export default NavBar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState,useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { NavItems } from "@/helpers/NavItems";
import Button from "@/components/Ui/button";
import ThemeSwitcher from "@/components/Switcher/ThemeSwitcher";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { dataUser, logout } = useAuth();

  // compact al scrollear
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const itemsForUser = useMemo(() => {
    return NavItems.filter((it: any) => {
      if (it?.private && !dataUser) return false;
      if (it?.hideWhenAuth && dataUser) return false;
      return true;
    });
  }, [dataUser]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50 px-4" >
      <nav
        className={[
          "relative mx-auto max-w-6xl rounded-3xl border",
          "backdrop-blur-md text-[var(--fg)]",
          "transition-all duration-300",
          compact ? "border-[var(--nav-border)] bg-[var(--nav-bg)] shadow-lg" 
                  : "border-[var(--nav-border)] bg-[var(--nav-bg)]",
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

        <div className={[
          "flex items-center justify-between px-4 md:px-6",
          compact ? "py-2.5 md:py-3" : "py-3 md:py-4",
        ].join(" ")}>
         
         
          {/* Logo */}
          <section>
<img 
  src="/logo.png" 
  alt="Logo de BairesTech" 
  className="h-18 w-auto" 
/>
</section>


          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-6">
            {itemsForUser.map((item) => (
              <li key={item.name} className="relative">
                <Link
                  href={item.route}
                  prefetch={false}
                  className={[
                    "inline-flex items-center px-2 py-1",
                    "text-[var(--nav-link)] hover:text-[var(--nav-link-hover)]",
                    "after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:rounded-full",
                    "after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
                    "after:bg-[var(--nav-border)]",
                    isActive(item.route) ? "after:scale-x-100 text-[var(--nav-link-hover)]" : "",
                  ].join(" ")}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Dropdown simple para Productos (ejemplo) */}
            {/* Si tenés categorías, cambialas acá */}
            {/* <li className="relative group">
              <button className="px-2 py-1 text-[var(--nav-link)] hover:text-[var(--nav-link-hover)]">
                Categorías
              </button>
              <div className="absolute left-0 top-full mt-2 min-w-48 rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-md p-2 hidden group-hover:block">
                <Link href="/products?c=notebooks" className="block rounded-xl px-3 py-2 hover:bg-[color:var(--btn-bg)/.06]">Notebooks</Link>
                <Link href="/products?c=phones" className="block rounded-xl px-3 py-2 hover:bg-[color:var(--btn-bg)/.06]">Celulares</Link>
                <Link href="/products?c=audio" className="block rounded-xl px-3 py-2 hover:bg-[color:var(--btn-bg)/.06]">Audio</Link>
              </div>
            </li> */}
          </ul>

          {/* Acciones desktop */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />
            {!dataUser ? (
              <>
                <Button variant="primary" size="sm" href="/login" minWidth="9rem">
                  Iniciar sesión
                </Button>
             
              </>
            ) : (
              <>
                <span className="text-sm mr-1">
                  Hola, <strong>{dataUser.user?.name}</strong>
                </span>
                <Button variant="secondary" size="sm" href="/dashboard" minWidth="9rem">
                  Dashboard
                </Button>
                <Button variant="primary" size="sm" onClick={logout} minWidth="8rem">
                  Salir
                </Button>
              </>
            )}
            
          </div>

          {/* Toggle móvil */}
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--nav-border)] bg-[color:var(--near-black)/0.5]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        {/* Drawer móvil */}
        {open && (
          <div className="md:hidden px-4 pb-4 pt-0">
            <div className="flex items-center justify-between pb-3">
              <ThemeSwitcher />
              {!dataUser ? (
                <Button variant="primary" size="sm" href="/register" minWidth="9rem">
                  Registrarse
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={logout} minWidth="8rem">
                  Salir
                </Button>
              )}
            </div>

            <ul className="grid gap-2">
              {itemsForUser.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.route}
                    prefetch={false}
                    onClick={() => setOpen(false)}
                    className={[
                      "block rounded-xl px-3 py-2",
                      "hover:bg-[color:var(--btn-bg)/.06]",
                      isActive(item.route) ? "bg-[color:var(--btn-bg)/.08]" : "",
                    ].join(" ")}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
