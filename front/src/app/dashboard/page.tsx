"use client";

import Button from "@/components/Ui/button";
import { useAuth } from "@/context/AuthContext";
import {User} from "@/interfaces/user.interface"
export default function Dashboard() {

 

interface AuthContextType {
  dataUser: { user: User } | User | null | undefined;
}
  const { dataUser } = useAuth() as AuthContextType;
 const user: User = (dataUser as { user: User })?.user ?? (dataUser as User) ?? {};
  const name: string = user.name ?? user.firstName ?? "—";
  const address: string =
    user.address ??
    user.direction ??
    user.shippingAddress ??
    "No cargada";

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">
          Hola, {name !== "—" ? name : "usuario"} 👋
        </h1>
        <p className="text-[color:var(--fg)/.75]">
          Este es tu panel. Acá ves tus datos principales.
        </p>
      </header>

     
      <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-[color:var(--fg)/.7]">Usuario</div>
            <div className="text-lg font-medium">{name}</div>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm text-[color:var(--fg)/.7]">Lugar de entrega</div>
            <div className="text-lg font-medium">{address}</div>
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <Button variant="secondary" href="/home">Seguir comprando</Button>
          <Button variant="primary" href="/cart">Ir al carrito</Button>
        </div>
      </section>
    </main>
  );
}
