"use client";

import Image from "next/image";
import Button from "@/components/Ui/button";
import type { Product } from "@/interfaces/interfaces";

interface FeaturedProductCardProps {
  product: Product;
  reverse?: boolean;    
}

export default function FeaturedProductCard({ product, reverse }: FeaturedProductCardProps) {
  return (
    <article
      className="
        relative overflow-hidden rounded-3xl border border-[var(--card-border)]
        bg-[var(--card-bg)] text-[var(--card-fg)] shadow
      "
    >
  
      <div className="pointer-events-none absolute inset-0
                      bg-[radial-gradient(80%_60%_at_100%_0%,rgba(78,151,255,.18),transparent_60%)]
                      opacity-70" />

      <div
        className={[
          "relative grid gap-8 items-center p-6 md:p-10",
          "md:grid-cols-2",
          reverse ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : "",
          "z-10",
        ].join(" ")}
      >
      
        <div className="space-y-4">
          
          <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            {product.name}
          </h2>

          <p className="text-[color:var(--fg)/0.85] max-w-prose">
            {product.description}
          </p>

          <div className="flex items-center gap-6">
            <p className="text-2xl font-bold">${product.price}</p>
            <div className="flex gap-3">
              <Button href={`/products/${product.id}`} variant="primary" size="sm">
                Ver detalle
              </Button>
            </div>
          </div>
        </div>

   
        <div className="relative h-56 sm:h-64 md:h-72 lg:h-80">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 560px, 100vw"
            priority
          />
        </div>
      </div>
    </article>
  );
}
