"use client";

import Button from "@/components/Ui/button";

export default function EmptyCart() {
  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-10 text-center space-y-4">
      <p className="text-[color:var(--fg)/.8]">Todavía no agregaste productos.</p>
      <Button variant="primary" href="/home" minWidth="10rem">
        Ir a comprar
      </Button>
    </section>
  );
}
