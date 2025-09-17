export const createOrder = async (product: number[], token: string) => {
    try {
        const res = await fetch(`http://localhost:3007/orders`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({product}),
        });

        const orders = await res.json();
        return orders;
    } catch (error) {
        throw new Error(error as string);
    }
}