import { NextResponse } from "next/server";

const API = process.env.BACKEND_URL || "http://localhost:3007";

export async function POST(req: Request) {
  const payload = await req.json();

  const r = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await r.json();

  if (!r.ok) {
    return NextResponse.json(
      { ok: false, message: data?.message || "Login inválido" },
      { status: r.status }
    );
  }

  // el back ya devuelve { login:true, user, token }
  const res = NextResponse.json({ ok: true, user: data.user });

  // guardamos el token en cookie httpOnly (mismo nombre que usa tu back)
  res.cookies.set("token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // ponelo true si servís por HTTPS
    path: "/",
  });

  return res;
}
