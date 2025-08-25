import Image from "next/image";
import { mockProducts } from "@/helpers/mockProduct";
import ProductCard from "@/components/productCard";


export default function Home() {
  return (
   <div>
   <h1>Bienvenido a la store</h1>
   <h3>Nuestros productos</h3>
<section>
  {mockProducts.map((product) => {
    return <ProductCard product={product} key={product.name}/>
    
  })}
</section>

   </div>
  );
}
