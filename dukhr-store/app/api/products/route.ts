import { NextResponse } from "next/server"

// بيانات المنتجات المشتركة
const products = [
  {
    id: 1,
    name: "ساعة يد ذكية",
    description: "ساعة ذكية بمميزات متعددة مثل تتبع اللياقة وإشعارات الهاتف.",
    price: 399,
    image: "/placeholder.svg?height=160&width=300&text=ساعة+ذكية",
    rating: 4,
    likes: 10,
    reviews: ["رائعة جدًا!", "خدمة ممتازة.", "سعر مناسب."],
  },
  {
    id: 2,
    name: "سماعات بلوتوث",
    description: "سماعات لاسلكية بجودة صوت عالية وعمر بطارية طويل.",
    price: 149,
    image: "/placeholder.svg?height=160&width=300&text=سماعات+بلوتوث",
    rating: 5,
    likes: 20,
    reviews: ["الصوت ممتاز.", "سهل الاستخدام."],
  },
  {
    id: 3,
    name: "هاتف ذكي",
    description: "هاتف حديث بشاشة كبيرة وكاميرا عالية الجودة.",
    price: 1200,
    image: "/placeholder.svg?height=160&width=300&text=هاتف+ذكي",
    rating: 3,
    likes: 5,
    reviews: ["كاميرا جيدة لكن البطارية تحتاج تحسين."],
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: products,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  // إضافة منتج جديد
  const newProduct = {
    id: products.length + 1,
    ...body,
    likes: 0,
    reviews: [],
  }

  products.push(newProduct)

  return NextResponse.json({
    success: true,
    data: newProduct,
  })
}
