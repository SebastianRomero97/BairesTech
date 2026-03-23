const DEFAULT_API_BASE = "http://localhost:3007";

/**
 * URL base del API (sin barra final).
 * En producción definir NEXT_PUBLIC_API_BASE_URL (y opcionalmente BACKEND_URL en rutas server-only).
 */
export function getApiBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.BACKEND_URL ||
    DEFAULT_API_BASE;
  return raw.replace(/\/+$/, "");
}
