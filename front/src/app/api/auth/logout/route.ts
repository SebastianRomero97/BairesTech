import { NextResponse } from "next/server";

const isProd = process.env.NODE_ENV === "production";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 0,
  });
  return res;
}
