"use client";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/orders.services";
const Cart = () => {
 const {
    cartItems,clearCart,getIdItems,getItemCount,getTotal,removeFromCart,
 } = useCart();

 const {dataUser} = useAuth()

 const handleCheckout = async() => {
try {
    await createOrder(getIdItems(), dataUser?.token);
    clearCart();
} catch (error) {
    console.log("error en ka compra", error);
}
 }





    return <div> cart</div>
};

export default Cart;