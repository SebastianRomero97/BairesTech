import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/config/api";

const isProd = process.env.NODE_ENV === "production";

export async function POST(req: Request) {
  const payload = await req.json();

  const r = await fetch(`${getApiBaseUrl()}/users/login`, {
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

  const res = NextResponse.json({ ok: true, user: data.user });

  res.cookies.set("token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
  });

  return res;
}
