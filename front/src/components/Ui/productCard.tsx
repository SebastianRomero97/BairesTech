import { Product } from "@/interfaces/interfaces";
import Image from "next/image";
import Button from "@/components/Ui/button";

interface CardProps {
  product: Product;
  variant?: "default" | "wide";
  reverse?: boolean;         
  framed?: boolean;        
}

const currency = (n: number) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

const FeaturedProductCard = ({ product, variant = "default", reverse = false, framed = true }: CardProps) => {
  const frameClass = framed
    ? "rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]"
    : "rounded-[inherit] bg-transparent border-0"; 

  if (variant === "wide") {
    return (
      <article className={`${frameClass} text-[var(--card-fg)] overflow-hidden`}>
        <div className={`grid grid-cols-1 md:grid-cols-[minmax(280px,360px)_1fr] ${reverse ? "md:[direction:rtl]" : ""}`}>
          <div className="relative w-full h-56 md:h-full">
            <Image
              src={product.image}
              alt={`Image product ${product.name}`}
              fill
              className="object-contain md:object-cover bg-[color:var(--btn-bg)/.06]"
              sizes="(min-width:1280px) 480px, (min-width:768px) 360px, 100vw"
            />
          </div>
          <div className="p-5 md:p-6 flex flex-col gap-3">
            <h3 className="font-semibold text-xl leading-snug">{product.name}</h3>
            <p className="text-sm md:text-base text-[color:var(--card-fg)/0.8] line-clamp-3 md:line-clamp-none">
              {product.description}
            </p>
            <div className="mt-auto flex items-center justify-between gap-4">
              <span className="text-2xl font-bold">{currency(product.price)}</span>
              <div className="flex gap-2">
                <Button size="sm" variant="primary" href={`/products/${product.id}`} minWidth="8rem">Ver detalle</Button>
                <Button size="sm" variant="outline" minWidth="8rem">Agregar</Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  
  return (
    <article className={`${frameClass} text-[var(--card-fg)] overflow-hidden`}>
      <div className="relative w-full aspect-square bg-[color:var(--btn-bg)/.06]">
        <Image
          src={product.image}
          alt={`Image product ${product.name}`}
          fill
          className="object-contain p-3"
          sizes="(min-width:1280px) 25vw, (min-width:640px) 33vw, 100vw"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-base leading-snug">{product.name}</h3>
        <p className="text-sm text-[color:var(--card-fg)/0.75] line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold">{currency(product.price)}</span>
          <Button size="sm" variant="secondary" href={`/products/${product.id}`} minWidth="8rem">Ver detalle</Button>
        </div>
      </div>
    </article>
  );
};

export default FeaturedProductCard;
