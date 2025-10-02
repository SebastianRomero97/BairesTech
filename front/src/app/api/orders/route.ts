import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API = process.env.BACKEND_URL || "http://localhost:3007";

export async function GET() {
  
  const store = await cookies();
  const token = store.get("token")?.value;

  
  if (!token) return NextResponse.json([], { status: 200 });

  const r = await fetch(`${API}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}

export async function POST(req: Request) {
  const store = await cookies();
  const token = store.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { statusCode: 400, message: "Token is required" },
      { status: 400 }
    );
  }

  const { items } = await req.json(); 

  const r = await fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
