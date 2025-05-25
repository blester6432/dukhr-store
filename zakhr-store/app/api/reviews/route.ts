import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { productId, review } = await request.json()

  // هنا يمكنك إضافة المراجعة لقاعدة البيانات
  // أو إرسالها للموقع الآخر

  return NextResponse.json({
    success: true,
    message: "تم إضافة المراجعة بنجاح",
  })
}
