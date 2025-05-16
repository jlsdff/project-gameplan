/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  eslint: {
    // Ignore during builds, use with caution
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
