"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getProductById } from "@/services/products.services";
import type { Product } from "@/interfaces/interfaces";
import { useCart } from "@/context/CartContext";
import Button from "@/components/Ui/button";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id =
    typeof params.idProduct === "string"
      ? params.idProduct
      : Array.isArray(params.idProduct)
      ? params.idProduct[0]
      : "";

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const p = await getProductById(id);
        if (active) setProduct(p);
      } catch {
        if (active) setProduct(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const currency = useMemo(
    () => (n: number) =>
      n.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }),
    []
  );

  const handleAddCart = () => {
    if (!product) return;
    addToCart(product);
    router.push("/cart");
  };

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 animate-pulse">
          <div className="h-6 w-1/2 bg-[color:var(--btn-bg)/.2] rounded mb-6" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-[420px] bg-[color:var(--btn-bg)/.1] rounded-xl" />
            <div className="space-y-4">
              <div className="h-4 w-2/3 bg-[color:var(--btn-bg)/.2] rounded" />
              <div className="h-4 w-3/4 bg-[color:var(--btn-bg)/.15] rounded" />
              <div className="h-4 w-1/2 bg-[color:var(--btn-bg)/.15] rounded" />
              <div className="h-10 w-40 bg-[color:var(--btn-bg)/.25] rounded mt-6" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
          <p className="text-[color:var(--fg)/.75] mb-6">
            El producto que buscás no existe o no está disponible.
          </p>
          <Button variant="secondary" href="/home" minWidth="10rem">
            Volver
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => router.back()}
        minWidth="7rem"
      >
        Volver
      </Button>

      <article className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden shadow hover:shadow-[var(--card-hover-shadow)] transition-[box-shadow,transform] duration-200">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Imagen grande */}
          <div className="relative h-[380px] sm:h-[460px] md:h-[520px] bg-[color:var(--btn-bg)/.06]">
            <Image
              src={product.image}
              alt={`Imagen ${product.name}`}
              fill
              className="object-contain p-6"
              sizes="(min-width:1024px) 50vw, 100vw"
              priority
            />
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <h1 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold mb-2">
              {product.name}
            </h1>
            <p className="text-[color:var(--fg)/.8] leading-relaxed mb-4">
              {product.description}
            </p>

            <div className="mt-auto">
              <div className="text-3xl font-extrabold mb-6">
                {currency(product.price)}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleAddCart}
                  minWidth="12rem"
                >
                  Agregar al carrito
                </Button>
                <Button variant="outline" size="md" href="/home" minWidth="10rem">
                  Seguir comprando
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
