// إعدادات الموقع
export const siteConfig = {
  name: "متجر ذخر",
  description: "متجر إلكتروني متكامل للمنتجات التقنية",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123",
}
