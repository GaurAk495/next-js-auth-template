import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wallpaperaccess.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
