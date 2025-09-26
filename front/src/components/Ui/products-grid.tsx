import ProductCard from "@/components/Ui/productCard";
import { Product } from "@/interfaces/interfaces";

type Props = {
  products: Product[];
  variant?: "default" | "wide";
  cols?: 2 | 3 | 4;
  title?: string;
};

const COLS: Record<NonNullable<Props["cols"]>, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export default function ProductsGrid({
  products,
  variant = "default",
  cols = 3,
  title = "Todos los productos",
}: Props) {
  if (!products?.length) {
    return (
      <section
        id="catalogo"
        className="space-y-4"
        style={{ scrollMarginTop: "var(--nav-h, 96px)" }}
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-center text-[color:var(--fg)/0.7]">
          No hay productos para mostrar.
        </p>
      </section>
    );
  }

  return (
    <section
      id="catalogo"
      className="space-y-4"
      style={{ scrollMarginTop: "var(--nav-h, 96px)" }}
    >
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className={`grid gap-4 ${COLS[cols]}`}>
        {products.map((p) => (
          <div
            key={p.id}
            tabIndex={0}
            className="
              rounded-2xl overflow-hidden
              transition-[transform,box-shadow] duration-200
              hover:-translate-y-0.5 hover:shadow-[var(--card-hover-shadow)]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[var(--brand-500)]
            "
          >
            <ProductCard product={p} variant={variant} />
          </div>
        ))}
      </div>
    </section>
  );
}
