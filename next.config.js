/** @type {import('next').NextConfig} */
/** @type {improt('next-contentlayer').withContentlayer} */


const nextConfig = {
  experimental: {
    appDir: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/versus/:path*",
  //       destination: "/versus/:path*/result",
  //     },
  //   ];
  // },
};
const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer({
  reactStrictMode: true,
});




module.exports = nextConfig;
