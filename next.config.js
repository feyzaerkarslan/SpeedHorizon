/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: '/speedhorizon',
  assetPrefix: '/speedhorizon',
};

module.exports = nextConfig; 