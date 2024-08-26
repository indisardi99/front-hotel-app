/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stock.adobe.com",
        port: "",
      },
    ],
    domains: [
      "assets.milestoneinternet.com",
      "www.lamasu.it",
      "www.athinasuites.com",
      "cdn.loewshotels.com",
    ],
  },
};

export default nextConfig;
