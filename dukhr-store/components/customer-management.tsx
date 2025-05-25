"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Customer, Order } from "@/types"

interface CustomerManagementProps {
  customers: Customer[]
  orders: Order[]
}

export default function CustomerManagement({ customers, orders }: CustomerManagementProps) {
  const getCustomerStats = (customer: Customer) => {
    const customerOrders = orders.filter((order) => order.customerEmail === customer.email)
    const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0)
    const completedOrders = customerOrders.filter((order) => order.status === "completed").length

    return {
      totalOrders: customerOrders.length,
      completedOrders,
      totalSpent,
      lastOrderDate: customerOrders.length > 0 ? customerOrders[0].createdAt : null,
    }
  }

  const getCustomerLevel = (totalSpent: number) => {
    if (totalSpent >= 5000) return { level: "VIP", color: "bg-purple-500", icon: "👑" }
    if (totalSpent >= 2000) return { level: "ذهبي", color: "bg-yellow-500", icon: "🥇" }
    if (totalSpent >= 500) return { level: "فضي", color: "bg-gray-400", icon: "🥈" }
    return { level: "برونزي", color: "bg-orange-600", icon: "🥉" }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#004a99]">إدارة العملاء</h2>

      {customers.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">لا يوجد عملاء مسجلين حالياً</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {customers.map((customer) => {
            const stats = getCustomerStats(customer)
            const level = getCustomerLevel(stats.totalSpent)

            return (
              <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      👤 {customer.name}
                      <Badge className={`${level.color} text-white`}>
                        {level.icon} {level.level}
                      </Badge>
                    </CardTitle>
                    <div className="text-sm text-gray-500">
                      عميل منذ: {new Date(customer.joinDate).toLocaleDateString("ar-SA")}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">معلومات الاتصال:</h4>
                      <div className="text-sm space-y-1">
                        <div>📧 {customer.email}</div>
                        <div>📱 {customer.phone}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">إحصائيات الشراء:</h4>
                      <div className="text-sm space-y-1">
                        <div>🛒 إجمالي الطلبات: {stats.totalOrders}</div>
                        <div>✅ الطلبات المكتملة: {stats.completedOrders}</div>
                        <div>💰 إجمالي المبلغ: {stats.totalSpent.toLocaleString()} ر.س</div>
                        {stats.lastOrderDate && (
                          <div>📅 آخر طلب: {new Date(stats.lastOrderDate).toLocaleDateString("ar-SA")}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {customer.purchasedProducts.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">المنتجات المشتراة:</h4>
                      <div className="flex flex-wrap gap-2">
                        {customer.purchasedProducts.map((productId) => (
                          <Badge key={productId} variant="outline">
                            منتج #{productId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
