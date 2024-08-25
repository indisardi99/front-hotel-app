/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stock.adobe.com",
        port: "",
      },
    ],
    domains: ["assets.milestoneinternet.com", "www.lamasu.it"],
  },
};

export default nextConfig;
