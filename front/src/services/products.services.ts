import { Product } from "@/interfaces/interfaces";
import { getApiBaseUrl } from "@/config/api";

const hasMessage = (e: unknown): e is { message: string } => {
    return typeof e === 'object' && e !== null && 'message' in e;
};


export const getAllProducts = async (): Promise<Product[]> => {
    try{
    const res = await fetch(`${getApiBaseUrl()}/products`, { method: "GET" });

           if (!res.ok) {
            throw new Error(`Error al cargar productos: ${res.status}`);
        }

    const products: Product[] = await res.json();
    return products;
    

} catch (error: unknown) {
       
        const errorMessage = hasMessage(error) ? error.message : "Error desconocido al obtener productos.";
        throw new Error(errorMessage);
    }
};

export const getProductById = async (id: string): Promise<Product> => {
    try{
        const allProducts = await getAllProducts()
        const product = allProducts.find((product) => product.id.toString() === id); 
        if (!product) {
            throw new Error("No se encontro el producto");
        }
        return product;
        
    }catch (error: unknown) { 
        const errorMessage = hasMessage(error) ? error.message : "Error desconocido al buscar producto.";
        throw new Error(errorMessage);
    }
}