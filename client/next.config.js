/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  async rewrites() {
    return [
      {
        source: '/route/:path*',
        destination: 'https://troubled-dove-trench-coat.cyclic.cloud/route/:path*'
      },
    ]
  },
}