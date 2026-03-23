import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getApiBaseUrl } from "@/config/api";

export async function GET() {
  
  const store = await cookies();
  const token = store.get("token")?.value;

  
  if (!token) return NextResponse.json([], { status: 200 });

  const r = await fetch(`${getApiBaseUrl()}/orders`, {
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

  const { products } = await req.json();

  const r = await fetch(`${getApiBaseUrl()}/orders`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ products }),
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
