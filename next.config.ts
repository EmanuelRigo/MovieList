import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    BACKEND_URL: process.env.BACKEND_URL,
    SECRET_KEY: process.env.SECRET_KEY
  }
};

export default nextConfig;
