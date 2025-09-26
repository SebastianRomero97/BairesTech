export const createOrder = async (products: number[], token?: string) => {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("No hay productos para comprar");
  }
  if (!token) {
    throw new Error("Token requerido");
  }

  const res = await fetch("http://localhost:3007/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // ← SIN "Bearer "
    },
    body: JSON.stringify({ products }), // ← en plural
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
};
