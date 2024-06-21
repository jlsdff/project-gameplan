/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Ignore during builds, use with caution
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
