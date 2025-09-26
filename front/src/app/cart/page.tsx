"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/orders.services";
import { confirmDialog, toastSuccess, notifyError } from "@/Alerts/notify";
import { FiTrash2 } from "react-icons/fi";

const currencyAR = (n: number) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

export default function CartPage() {
  const router = useRouter();
  const { dataUser } = useAuth();
  const {
    cartItems,
    clearCart,
    getIdItems,
    getItemCount,
    getTotal,
    removeFromCart,
  } = useCart();

  const hasItems = (cartItems?.length ?? 0) > 0;
  const itemCount = getItemCount();
  const total = getTotal();

  async function handleCheckout() {
    if (!hasItems) return;

    const ok = await confirmDialog(
      `Vas a comprar ${itemCount} producto${itemCount !== 1 ? "s" : ""} por ${currencyAR(total)}.`,
      "¿Confirmar compra?",
      "Comprar",
      "Cancelar"
    );
    if (!ok) return;

    try {
      await createOrder(getIdItems(), (dataUser as any)?.token);
      toastSuccess("¡Pedido creado!");
      clearCart();
      router.replace("/dashboard");
    } catch (e: any) {
      notifyError(e?.message || "No se pudo completar la compra");
    }
  }

  async function handleClear() {
    if (!hasItems) return;
    const ok = await confirmDialog(
      "Se eliminarán todos los productos del carrito.",
      "¿Vaciar carrito?",
      "Vaciar",
      "Cancelar"
    );
    if (ok) clearCart();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Tu carrito</h1>

      {!hasItems ? (
        // Empty state
        <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-10 text-center space-y-4">
          <p className="text-[color:var(--fg)/.8]">
            Todavía no agregaste productos.
          </p>
          <Button variant="primary" href="/home" minWidth="10rem">
            Ir a comprar
          </Button>
        </section>
      ) : (
        // Grid: lista + resumen
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Lista de ítems */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] divide-y divide-[var(--card-border)] overflow-hidden">
            {cartItems.map((item) => {
              const qty = (item as any).quantity ?? 1;
              const subtotal = (item.price ?? 0) * qty;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 transition-[box-shadow,transform] hover:shadow-[var(--card-hover-shadow)] hover:-translate-y-0.5"
                >
                  {/* thumb */}
                  <div className="relative h-20 w-20 shrink-0 bg-[color:var(--btn-bg)/.06] rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </div>

                  {/* info */}
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

                  {/* acciones */}
                  <div className="text-right">
                    <div className="font-semibold">{currencyAR(subtotal)}</div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Quitar"
                      title="Quitar"
                      className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--card-border)] hover:bg-[color:var(--btn-bg)/.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-500)]"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resumen (sticky en desktop) */}
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
              <Button variant="primary" onClick={handleCheckout} minWidth="100%">
                Finalizar compra
              </Button>
              <Button variant="outline" onClick={handleClear} minWidth="100%">
                Vaciar carrito
              </Button>
              <Button variant="secondary" href="/home" minWidth="100%">
                Seguir comprando
              </Button>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
