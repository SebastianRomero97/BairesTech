"use client";

import Link from "next/link";
import Image from "next/image";
import { FiInstagram, FiMail, FiChevronUp } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const year = new Date().getFullYear();

export default function Footer() {
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
      {/* Glow sutil */}
      <div className="pointer-events-none h-1 w-full bg-[radial-gradient(120%_160%_at_50%_0%,rgba(78,151,255,.55)_0%,transparent_70%)]" />

      {/* Un poco más angosto y más bajo */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-7">
        {/* Layout: izq (contacto), centro (brand), der (compañía) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Col 1: Contacto rápido (izquierda) */}
          <div className="md:col-span-2 order-2 md:order-1">
            <ul className="flex items-center gap-3">
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
          </div>

          {/* Col 2: Brand (centro) */}
          <div className="md:col-span-6 order-1 md:order-2 flex flex-col items-center text-center gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.ico"
                alt="Logo BairesTech"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="text-lg font-semibold">BairesTech</span>
            </div>

            <p className="text-[color:var(--fg)/.75] max-w-prose">
              Un pequeño paso en tu presente, pero un gran salto en tu futuro.
              Tecnología, soporte y una experiencia de compra simple.
            </p>
          </div>

          {/* Col 3: Enlaces compañía (derecha) */}
          <nav
            className="md:col-span-4 order-3 space-y-3 justify-self-start md:justify-self-end text-left md:text-right"
            aria-label="Navegación del sitio"
          >
            <h3 className="font-semibold">Compañía</h3>
            <ul className="space-y-3">
              <li>
                <Link className="link" href="/about" prefetch={false}>
                  Sobre mí
                </Link>
              </li>
              <li>
                <Link className="link" href="/contact" prefetch={false}>
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar (compacto) */}
        <div className="mt-8 pt-4 border-t border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-3">
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
