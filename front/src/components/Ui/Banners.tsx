"use client";

import Image from "next/image";
import Button from "@/components/Ui/button";

export default function HeroBanner() {
  return (
    <section
      className="
        relative overflow-hidden rounded-3xl border border-[var(--card-border)]
        bg-[url('/Banner.png')] bg-cover bg-center
        shadow px-6 md:px-10 py-10 md:py-14
      "
    >
      <div
        className="pointer-events-none absolute -bottom-24 left-0 right-0 h-48
                   bg-[radial-gradient(60%_140%_at_50%_100%,rgba(78,151,255,.35)_0%,transparent_70%)]"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">

        <div className="space-y-4">
          <h1
            className="font-[var(--font-heading)] 
                       text-3xl md:text-4xl lg:text-5xl 
                       font-bold leading-tight text-white"
          >
            Lo mejor en tecnología está acá en{" "}
            <span className="text-[#0a66c2]">BairesTech</span>
          </h1>
          <p className="text-gray-200 text-base md:text-lg">
            Equipate con lo último y con soporte de primera.
          </p>
          <div className="flex gap-3">
            <Button href="#catalogo" variant="primary" size="md">
              Ver catálogo
            </Button>
          </div>
        </div>
        <div className="relative h-full flex items-end">
          <Image
            src="/vendedor.png"
            alt="Asesor BairesTech"
            fill
            className="object-contain object-bottom scale-150"
            priority
          />
        </div>
      </div>
    </section>
  );
}
