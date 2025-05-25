import { NextResponse } from "next/server"

// قاعدة بيانات الطلبات المؤقتة
const orders: any[] = []

export async function GET() {
  return NextResponse.json({
    success: true,
    data: orders,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  const newOrder = {
    id: orders.length + 1,
    ...body,
    createdAt: new Date().toISOString(),
    status: "pending",
  }

  orders.push(newOrder)

  return NextResponse.json({
    success: true,
    data: newOrder,
  })
}
