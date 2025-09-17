import { Product } from "@/interfaces/interfaces"
import Image from "next/image";
import Button from "@/components/Ui/button";

interface CardProps {
    product: Product;
}

const ProductCard = ({product}: CardProps) =>{

    return (
       <article className="
        group rounded-2xl border border-[var(--card-border)]
        bg-[var(--card-bg)] text-[var(--card-fg)]
        shadow transition-[box-shadow,transform] duration-200
        hover:shadow-[var(--card-hover-shadow)] hover:-translate-y-0.5
        focus-within:shadow-[var(--card-hover-shadow)]
        overflow-hidden
      ">

        
      
      
<div className="relative w-full aspect-square bg-[color:var(--btn-bg)/.06] rounded-t-2xl">
  <Image
    src={product.image}
    alt={`Image product ${product.name}`}
    fill
    className="object-contain p-3"  
    sizes="(min-width:1280px) 25vw, (min-width:640px) 33vw, 100vw"
  />
</div>

             <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg leading-snug">{product.name}</h3>

            <p className="text-sm text-[color:var(--card-fg)/0.75] line-clamp-2">
          {product.description}
        </p>

 <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">
            <p>{product.price}</p>
            </span>
                     <Button
            size="sm"
            variant="primary"
            href={`/products/${product.id}`}
            minWidth="8rem"
          >
            Ver detalle
          </Button>
            </div>
        </div>
     </article>
    )
}

export default ProductCard;