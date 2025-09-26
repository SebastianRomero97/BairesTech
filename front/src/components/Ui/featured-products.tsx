import FeaturedProductCard from "@/components/Ui/featured-product-card";
import type { Product } from "@/interfaces/interfaces";

const PICKS = ["iPhone 11", "Apple Watch Series 6", "AirPods Pro"];

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products
    .filter(p => PICKS.includes(p.name))
    .sort((a, b) => PICKS.indexOf(a.name) - PICKS.indexOf(b.name));

  if (featured.length === 0) return null;

  return (
    <section className="mt-12 space-y-8">
      <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold">
        Productos destacados
      </h2>

      <div className="space-y-8">
        {featured.map((product, idx) => (
       <div
  key={product.id}
  tabIndex={0}
  className="
    rounded-2xl overflow-hidden
    transition-[transform,box-shadow] duration-200
    hover:-translate-y-0.5 hover:shadow-[var(--card-hover-shadow)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-500)]
  "
>
  <FeaturedProductCard product={product} reverse={idx % 2 === 1} />
</div>

        ))}
      </div>
    </section>
  );
}
