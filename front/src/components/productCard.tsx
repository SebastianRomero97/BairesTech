import { Product } from "@/interfaces/interfaces"
import Image from "next/image";
interface CardProps {
    product: Product;
}

const ProductCard = ({product}: CardProps) =>{
    return (
        <div key ={product.id}>
            {/*<img src={product.image} alt=""/>*/}
            <Image
            src={product.image}
            alt={`Image product ${product.name}`}
            width={360}
            height={300}
            />
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
        </div>
    )
}

export default ProductCard;