/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    // ESLint hatalarını build esnasında atlayalım
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript hatalarını build esnasında atlayalım
    ignoreBuildErrors: true,
  },
  // Client componentlere sahip dinamik rotalar için SSR kullanıyoruz
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig; 