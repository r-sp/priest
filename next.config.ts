import { type NextConfig } from "next";

const config: NextConfig = {
  experimental: {
    ppr: "incremental",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
