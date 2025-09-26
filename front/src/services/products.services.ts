import { Product } from "@/interfaces/interfaces";

export const getAllProducts = async () => {
    try{
    const res = await fetch(`http://localhost:3007/products`,{method: 'GET'});

    const products: Product[] = await res.json();
    
    return products;
    

} catch (error: any){

 throw new Error(error)

}
};

export const getProductById = async (id:string) => {
    try{
        const allProducts = await getAllProducts()
        const product = allProducts.find((product) => product.id.toString() === id); 
        if (!product) {
            throw new Error("No se encontro el producto");
        }
        return product;
        
    }catch (error: any) {
        throw new Error(error)
    }
}