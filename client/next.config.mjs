/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { hostname: "*.soorya-u.dev", protocol: "https" },
      {
        hostname: "gateway.pinata.cloud",
        protocol: "https",
        pathname: "/ipfs/*",
      },
    ],
  },
};

export default nextConfig;
