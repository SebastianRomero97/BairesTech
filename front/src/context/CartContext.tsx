"use client";

import { Product } from "@/interfaces/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface CartContextProps {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  getTotal: () => number;
  getIdItems: () => number[];
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotal: () => 0,
  getIdItems: () => [],
  getItemCount: () => 0,
});

interface CartProviderProps {
  children: React.ReactElement;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { dataUser } = useAuth();
  const [cartItems, setCartItems] = useState<Product[]>([]);


  useEffect(() => {
    if (!dataUser) return;
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartItems, dataUser]);


  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!dataUser) {
      setCartItems([]);
      localStorage.removeItem("cart");
      return;
    }

    const cartData = localStorage.getItem("cart");
    setCartItems(cartData ? JSON.parse(cartData) : []);
  }, [dataUser]);

  const addToCart = (product: Product) => {
    if (!dataUser) {
      alert("Primero tenés que loguearte");
      return;
    }
    const exists = cartItems.some((item) => item.id === product.id);
    if (exists) {
      alert("Ese producto ya está en el carrito");
      return;
    }
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + (item.price ?? 0), 0);

  const getItemCount = () => cartItems.length;

  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  };

  const getIdItems = () => cartItems.map((item) => item.id);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        getIdItems,
        addToCart,
        removeFromCart,
        getTotal,
        clearCart,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  return context;
};
