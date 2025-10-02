export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
};

export type CartAPI = {
  cartItems: CartItem[];
  clearCart: () => void;
  getIdItems: () => Array< number>;
  getItemCount: () => number;
  getTotal: () => number;
  removeFromCart: (id: string | number) => void;
};
