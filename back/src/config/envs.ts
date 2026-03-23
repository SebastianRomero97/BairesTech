import dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production";

function requireProd(name: string, value: string | undefined): string {
  if (isProd && (!value || value.trim() === "")) {
    throw new Error(`${name} debe estar definido en producción`);
  }
  return value ?? "";
}

export const PORT: number = Number(process.env.PORT) || 3000;
export const DB_NAME: string =
  requireProd("DB_NAME", process.env.DB_NAME) || "proyecto_m4_front";
export const DB_USER: string =
  requireProd("DB_USER", process.env.DB_USER) || "postgres";
export const DB_PASSWORD: string =
  requireProd("DB_PASSWORD", process.env.DB_PASSWORD) || "admin";
export const DB_HOST: string =
  requireProd("DB_HOST", process.env.DB_HOST) || "localhost";
export const DB_PORT: number = Number(process.env.DB_PORT) || 5432;

const jwtFromEnv = process.env.JWT_SECRET;
if (isProd && (!jwtFromEnv || jwtFromEnv === "secret")) {
  throw new Error("JWT_SECRET debe ser una cadena segura distinta del valor por defecto en producción");
}
export const JWT_SECRET: string = jwtFromEnv || "secret";
