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
  // إزالة هذه الإعدادات للنشر على Vercel
  // output: 'export',
  // basePath: process.env.NODE_ENV === 'production' ? '/zakhr-store' : '',
  
  // إضافة إعدادات Vercel
  trailingSlash: false,
  
  // إعدادات إعادة التوجيه
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
}

export default nextConfig
