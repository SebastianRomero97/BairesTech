// src/app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Ui/button";

export const metadata: Metadata = {
  title: "Sobre mí — BairesTech",
  description:
    "Quién está detrás de BairesTech, nuestra misión y cómo trabajamos para darte una compra simple con soporte de primera.",
};

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-12">
      {/* HERO */}
      <section
        className="
          grid gap-8 md:grid-cols-2 items-center
          rounded-3xl border border-[var(--card-border)]
          bg-[var(--card-bg)] shadow px-6 md:px-10 py-8 md:py-10
        "
      >
        <div className="space-y-4">
          <h1 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold">
            Sobre mí
          </h1>
          <p className="text-[color:var(--fg)/.8]">
            Soy el responsable de <strong>BairesTech</strong>. Ayudo a que elegir
            tecnología sea algo simple: productos bien curados, precios claros
            y soporte post-venta de primera.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="primary" size="md">
              Hablemos
            </Button>
            <Button href="/home" variant="outline" size="md">
              Ver catálogo
            </Button>
          </div>
        </div>

        {/* Imagen local de tecnología (random) */}
        {/* Uso <img> para evitar configurar dominios de next/image */}
        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden border border-[var(--card-border)]">
          <img
            src="/localBairesTech.png"
            alt="Local de tecnología"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* MISIÓN Y VALORES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Misión & valores</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Compra simple",
              body:
                "Información clara y sin vueltas. Que elijas bien a la primera.",
            },
            {
              title: "Soporte real",
              body:
                "Te acompaño antes y después de la compra. No desaparezco.",
            },
            {
              title: "Curaduría",
              body:
                "No todo lo que existe vale la pena. Selecciono lo que rinde.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="
                rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]
                p-5 hover:shadow-[var(--card-hover-shadow)] transition-shadow
              "
            >
              <h3 className="font-semibold mb-1">{c.title}</h3>
              <p className="text-[color:var(--fg)/.8]">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUÉ HAGO */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Qué hago</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Asesoramiento para elegir notebooks, smartphones y periféricos.",
            "Armado de combos por presupuesto o necesidad puntual.",
            "Gestión de pedidos y seguimiento transparente.",
            "Acompañamiento post-venta y garantías.",
          ].map((item) => (
            <li
              key={item}
              className="
                rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]
                px-4 py-3
              "
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* LÍNEA DE TIEMPO */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Un poco de historia</h2>
        <ol className="relative pl-6">
          {[
            {
              year: "2021",
              text: "Nace BairesTech: ventas pequeñas, foco 100% en la experiencia.",
            },
            {
              year: "2022",
              text: "Sumo logística y acuerdos con proveedores para mejorar tiempos.",
            },
            {
              year: "2023",
              text: "Catálogo curado y primeras alianzas con servicios técnicos.",
            },
            {
              year: "2024–hoy",
              text:
                "Consolidación del e-commerce y soporte post-venta más sólido.",
            },
          ].map((i, idx) => (
            <li key={i.year} className="mb-4">
              <div className="absolute left-1 top-1.5 h-[calc(100%-0.5rem)] w-px bg-[var(--card-border)]" />
              <span className="absolute -left-0.5 mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--brand-500)]" />
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
                <div className="text-sm text-[color:var(--fg)/.7]">{i.year}</div>
                <div className="font-medium">{i.text}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA FINAL */}
      <section
        className="
          rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)]
          p-6 md:p-8 text-center space-y-4
        "
      >
        <h2 className="text-2xl font-bold">¿Trabajamos juntos?</h2>
        <p className="text-[color:var(--fg)/.8] max-w-2xl mx-auto">
          Si querés armar tu setup, renovar el celular o equipar tu equipo,
          escribime y te doy una mano con la elección.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/contact" variant="primary" size="md">
            Contacto
          </Button>
          <Button href="/home" variant="outline" size="md">
            Ver productos
          </Button>
        </div>
      </section>

      {/* Breadcrumb simple (opcional) */}
      <nav aria-label="breadcrumbs" className="text-sm text-[color:var(--fg)/.6]">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/landing" className="link">
              Inicio
            </Link>
          </li>
          <li>/</li>
          <li>Sobre mí</li>
        </ol>
      </nav>
    </main>
  );
}
