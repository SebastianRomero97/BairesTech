"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/orders.services";
import { confirmDialog, toastSuccess, notifyError } from "@/Alerts/notify";
import EmptyCart from "@/components/cart/EmptyCart";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import { currencyAR } from "@/lib/currency";
import { CartAPI } from "@/types/cart";

export default function CartPage() {
  const router = useRouter();
  const { dataUser } = useAuth();

  const token =
    typeof dataUser === "object" &&
    dataUser !== null &&
    "token" in dataUser &&
    typeof (dataUser as { token?: unknown }).token === "string"
      ? ((dataUser as { token?: string }).token ?? undefined)
      : undefined;

  const { cartItems, clearCart, getIdItems, getItemCount, getTotal, removeFromCart } =
    useCart() as CartAPI;

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
      await createOrder (getIdItems(), token);
      toastSuccess("¡Pedido creado!");
      clearCart();
      router.replace("/dashboard");
    } catch (e) {
      const message = e instanceof Error ? e.message : "No se pudo completar la compra";
      notifyError(message);
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
        <EmptyCart />
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] divide-y divide-[var(--card-border)] overflow-hidden">
            {cartItems.map((item) => (
              <CartItemRow key={item.id} item={item} onRemove={removeFromCart} />
            ))}
          </div>

          <CartSummary
            itemCount={itemCount}
            total={total}
            onCheckout={handleCheckout}
            onClear={handleClear}
          />
        </section>
      )}
    </main>
  );
}
