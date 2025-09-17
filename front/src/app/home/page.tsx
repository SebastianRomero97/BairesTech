import ProductCard from "@/components/Ui/productCard";
import { getAllProducts } from "@/services/products.services";
import { H1, H3 } from "@/components/Ui/typography";

export default async function Home() {
  const allProducts = await getAllProducts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <H1 className="mb-2">Bienvenido a la store</H1>
        <H3 className="text-[color:var(--fg)/0.85]">Nuestros productos</H3>
      </header>

      <section
        className="
          grid gap-6
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        "
      >
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
