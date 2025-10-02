"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiInstagram, FiMail, FiChevronUp } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const year = new Date().getFullYear();

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/landing") return null;

  function scrollTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <footer
      className="
        mt-12 border-t border-[var(--card-border)]
        bg-[color:var(--nav-bg)/.75] backdrop-blur-sm
      "
      aria-labelledby="site-footer"
    >
   
      <div className="pointer-events-none h-1 w-full bg-[radial-gradient(120%_160%_at_50%_0%,rgba(78,151,255,.55)_0%,transparent_70%)]" />

     
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-7">
        
        <div className="flex flex-col items-center text-center gap-3 w-full">
        
          <div className="flex items-center justify-center gap-3 w-full">
            <Image
              src="/favicon.ico"
              alt="Logo BairesTech"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="text-lg font-semibold">BairesTech</span>
          </div>

       
          <p className="text-[color:var(--fg)/.75] max-w-2xl mx-auto">
            Un pequeño paso en tu presente, pero un gran salto en tu futuro.
            Tecnología, soporte y una experiencia de compra simple.
          </p>

         
          <ul className="mt-1 flex items-center justify-center gap-3 w-full">
            <li>
              <Link
                href="mailto:contacto@bairestech.com"
                aria-label="E-mail"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--card-border)] hover:bg-[color:var(--btn-bg)/.06] cursor-pointer"
              >
                <FiMail />
              </Link>
            </li>
            <li>
              <Link
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--card-border)] hover:bg-[color:var(--btn-bg)/.06] cursor-pointer"
              >
                <FaWhatsapp />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--card-border)] hover:bg-[color:var(--btn-bg)/.06] cursor-pointer"
              >
                <FiInstagram />
              </Link>
            </li>
          </ul>

        
          <div className="w-full h-px bg-[color:var(--card-border)]/70 mt-4" />
        </div>

        
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-[color:var(--fg)/.7]">
            © {year} BairesTech · Hecho con ♥ en Argentina
          </p>

          <button
            onClick={scrollTop}
            className="
              inline-flex items-center gap-2 rounded-lg border
              border-[var(--card-border)] px-3 h-9 text-sm
              hover:bg-[color:var(--btn-bg)/.06]
            "
            aria-label="Volver arriba"
          >
            <FiChevronUp />
            Volver arriba
          </button>
        </div>
      </div>
    </footer>
  );
}
