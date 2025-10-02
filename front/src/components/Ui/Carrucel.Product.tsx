"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Product } from "@/interfaces/interfaces";
import { toImageUrl } from "@/helpers/imageUrl";

type Props = {
  products: Product[];
  speed?: number;
  height?: number | string;
  cardWidth?: number;
  hrefBuilder?: (p: Product) => string;
};

export default function FeaturedImagesCarousel({
  products,
  speed = 40,
  height = 280,
  cardWidth = 340,
  hrefBuilder = (p) => `/products/${p.id}`,
}: Props) {

  const items = useMemo(() => products ?? [], [products]);
  const list = useMemo(() => (items.length ? [...items, ...items] : []), [items]);

  const animationDuration = useMemo(() => {
    return `${(cardWidth * items.length) / speed}s`;
  }, [cardWidth, items.length, speed]);

  const [broken, setBroken] = useState<Record<string | number, boolean>>({});

  if (items.length === 0) {
    return (
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] grid place-items-center text-[color:var(--card-fg)/.7]"
        style={{ height }}
      >
        No hay imágenes para mostrar
      </div>
    );
  }


  const rowStyle: React.CSSProperties & { ["--duration"]?: string } = {
    ["--duration"]: animationDuration,
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]"
      style={{ height }}
    >

      <div className="flex h-full gap-6 animate-carousel pause-on-hover" style={rowStyle}>
        {list.map((p, i) => {
          const src = broken[p.id] ? "/placeholder.png" : toImageUrl(p.image);
          return (
            <Link
              href={hrefBuilder(p)}
              prefetch={false}
              key={`${p.id}-${i}`}
              className="group relative shrink-0 h-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:shadow-[var(--card-hover-shadow)] transition-shadow"
              style={{ width: cardWidth }}
              title={p.name}
            >
              <div className="relative w-full h-full bg-[color:var(--btn-bg)/.06]">
                <Image
                  src={src}
                  alt={p.name}
                  fill
                  className="object-contain p-3"
                  sizes="(min-width:1280px) 25vw, (min-width:640px) 33vw, 100vw"
                  onError={() => setBroken((s) => ({ ...s, [p.id]: true }))}
                  priority={i < 3}
                />
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-sm truncate text-[color:var(--card-fg)/0.9] pointer-events-none">
                {p.name}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--bg-color)]/90 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--bg-color)]/90 to-transparent" />
    </div>
  );
}
