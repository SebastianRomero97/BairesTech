import { getAllProducts } from "@/services/products.services";
import HeroBanner from "@/components/Ui/Banners";
import FeaturedProducts from "@/components/Ui/featured-products";
import FeaturedImagesCarousel from "@/components/Ui/Carrucel.Product";
import ProductsGrid from "@/components/Ui/products-grid";

export default async function Home() {
  const products = await getAllProducts();
   const featured = products

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <HeroBanner />
  <FeaturedProducts products={products} />

  <section className="px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Explorá por imágenes</h2>
      <FeaturedImagesCarousel products={featured} speed={45} height={280} cardWidth={340} />
    </section>
    <ProductsGrid
        products={products}
        cols={3}             
        variant="default"     
        title="Todos los productos"
      />

    </main>
  );
}
