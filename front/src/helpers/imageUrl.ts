import { getApiBaseUrl } from "@/config/api";

export function toImageUrl(src?: string): string {
  if (!src) return "/placeholder.png";
  if (/^https?:\/\//i.test(src)) return src;

  const base = getApiBaseUrl();
  return `${base}/${src.replace(/^\/+/, "")}`;
}
