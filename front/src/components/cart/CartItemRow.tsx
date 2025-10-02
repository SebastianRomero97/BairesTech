"use client";

import Image from "next/image";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { currencyAR } from "@/lib/currency";
import { CartItem } from "@/types/cart";

type Props = {
  item: CartItem;
  onRemove: (id: CartItem["id"]) => void;
};

export default function CartItemRow({ item, onRemove }: Props) {
  const qty = typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1;
  const subtotal = (item.price ?? 0) * qty;

  return (
    <div className="flex items-center gap-4 p-4 transition-[box-shadow,transform] hover:shadow-[var(--card-hover-shadow)] hover:-translate-y-0.5">
      <div className="relative h-20 w-20 shrink-0 bg-[color:var(--btn-bg)/.06] rounded-lg overflow-hidden">
        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-contain p-2" />
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.id}`}
          prefetch={false}
          className="font-medium hover:underline"
          title={item.name}
        >
          {item.name}
        </Link>
        <div className="text-sm text-[color:var(--fg)/.7]">
          Cant.: {qty} · {currencyAR(item.price ?? 0)} c/u
        </div>
      </div>

      <div className="text-right">
        <div className="font-semibold">{currencyAR(subtotal)}</div>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label="Quitar"
          title="Quitar"
          className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--card-border)] hover:bg-[color:var(--btn-bg)/.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-500)]"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}
