/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/mymoney',
  assetPrefix: '/mymoney/',
  generateBuildId: async () => {
    return 'nextjs-build';
  },
  generateEtags: false
}

module.exports = nextConfig
