/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Disable sharp for Linux VPS compatibility
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
};

module.exports = nextConfig;
