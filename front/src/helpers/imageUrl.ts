export function toImageUrl(src?: string): string {
  if (!src) return "/placeholder.png";
  if (/^https?:\/\//i.test(src)) return src; 

  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3007").replace(/\/+$/, "");
  return `${base}/${src.replace(/^\/+/, "")}`;
}
