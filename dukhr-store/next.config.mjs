/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['via.placeholder.com'],
    unoptimized: true
  },
  // إزالة output: 'export' للنشر على Vercel
  // output: 'export',
  trailingSlash: true,
  // إزالة basePath للنشر على Vercel
  // basePath: process.env.NODE_ENV === 'production' ? '/zakhr-store' : '',
}

export default nextConfig
