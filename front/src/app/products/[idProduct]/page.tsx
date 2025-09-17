'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/products.services";
import { Product } from "@/interfaces/interfaces";
import { useCart } from "@/context/CartContext";


    export default function ProductDetail() {
        const params = useParams()
        
        const [product, setProduct] = useState<Product>();
        const {addToCart} = useCart();

        useEffect (() => {
            const fetchProductById = async () => {
         const product = await getProductById(params.idProduct as string);
         setProduct(product)
        };

        fetchProductById();
        }, [params.idProduct]);
        
        const handleAddCart = () => {
            if(product){
                addToCart(product);
            }
        }
    
    return (
        <div>
            <h1>Este es mi id capturado: {}</h1>
        </div>
    );
}