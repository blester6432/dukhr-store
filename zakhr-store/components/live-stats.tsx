"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface LiveStatsProps {
  orders: any[]
  products: any[]
  customers: any[]
  activities: any[]
}

export default function LiveStats({ orders, products, customers, activities }: LiveStatsProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * 10) + 1)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // محاكاة تغيير عدد المستخدمين المتصلين
      if (Math.random() > 0.8) {
        setOnlineUsers((prev) => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const todayOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt)
    const today = new Date()
    return orderDate.toDateString() === today.toDateString()
  })

  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0)

  const recentActivities = activities.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#004a99]">📊 إحصائيات مباشرة</h2>
        <div className="text-sm text-gray-600">آخر تحديث: {currentTime.toLocaleTimeString("ar-SA")}</div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{onlineUsers}</div>
            <div className="text-sm opacity-90">🟢 متصل الآن</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{todayOrders.length}</div>
            <div className="text-sm opacity-90">📦 طلبات اليوم</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{todayRevenue.toLocaleString()}</div>
            <div className="text-sm opacity-90">💰 إيرادات اليوم (ر.س)</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{customers.length}</div>
            <div className="text-sm opacity-90">👥 إجمالي العملاء</div>
          </CardContent>
        </Card>
      </div>

      {/* الأنشطة الأخيرة */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">🔥 آخر الأنشطة</h3>
          <div className="space-y-2">
            {recentActivities.length === 0 ? (
              <p className="text-gray-500 text-sm">لا توجد أنشطة حديثة</p>
            ) : (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex justify-between items-center text-sm">
                  <span>{activity.description}</span>
                  <span className="text-gray-500">{new Date(activity.timestamp).toLocaleTimeString("ar-SA")}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
