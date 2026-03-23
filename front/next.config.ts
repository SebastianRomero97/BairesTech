// next.config.ts
import type { NextConfig } from "next";

function apiImageRemotePattern(): {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
} {
  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3007";
  try {
    const u = new URL(base);
    const entry: {
      protocol: "http" | "https";
      hostname: string;
      port?: string;
    } = {
      protocol: u.protocol === "https:" ? "https" : "http",
      hostname: u.hostname,
    };
    if (u.port) entry.port = u.port;
    return entry;
  } catch {
    return { protocol: "http", hostname: "localhost", port: "3007" };
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      apiImageRemotePattern(),
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "imgur.com" },
    ],
  },
};

export default nextConfig;
