// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // tu backend local
      { protocol: "http", hostname: "localhost", port: "3007" },

      // si alguna imagen viene de Imgur (lo mostró el error):
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "imgur.com" },

      // agrega aquí otros hosts reales si los usás
      // { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
