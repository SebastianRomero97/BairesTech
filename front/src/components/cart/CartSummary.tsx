"use client";

import Button from "@/components/Ui/button";
import { currencyAR } from "@/lib/currency";

type Props = {
  itemCount: number;
  total: number;
  onCheckout: () => void;
  onClear: () => void;
};

export default function CartSummary({ itemCount, total, onCheckout, onClear }: Props) {
  return (
    <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
      <h2 className="text-lg font-semibold mb-4">Resumen</h2>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Productos ({itemCount})</span>
          <span>{currencyAR(total)}</span>
        </div>
        <div className="h-px bg-[var(--card-border)] my-2" />
        <div className="flex items-center justify-between text-lg">
          <strong>Total</strong>
          <strong className="text-xl">{currencyAR(total)}</strong>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Button variant="primary" onClick={onCheckout} minWidth="100%">
          Finalizar compra
        </Button>
        <Button variant="outline" onClick={onClear} minWidth="100%">
          Vaciar carrito
        </Button>
        <Button variant="secondary" href="/home" minWidth="100%">
          Seguir comprando
        </Button>
      </div>
    </aside>
  );
}
