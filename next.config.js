/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/versus/:path*",
        destination: "/versus/:path*/result",
      },
    ];
  },
};

module.exports = nextConfig;
