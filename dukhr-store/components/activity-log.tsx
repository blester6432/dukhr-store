"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ActivityLog } from "@/types"

interface ActivityLogProps {
  activities: ActivityLog[]
}

export default function ActivityLogComponent({ activities }: ActivityLogProps) {
  const [filter, setFilter] = useState<string>("all")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order_created":
        return "🛒"
      case "product_added":
        return "📦"
      case "review_added":
        return "⭐"
      case "customer_registered":
        return "👤"
      case "product_viewed":
        return "👁️"
      case "cart_updated":
        return "🛍️"
      case "admin_login":
        return "🔐"
      default:
        return "📝"
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "order_created":
        return "bg-green-500"
      case "product_added":
        return "bg-blue-500"
      case "review_added":
        return "bg-yellow-500"
      case "customer_registered":
        return "bg-purple-500"
      case "product_viewed":
        return "bg-gray-500"
      case "cart_updated":
        return "bg-orange-500"
      case "admin_login":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getActivityText = (type: string) => {
    switch (type) {
      case "order_created":
        return "طلب جديد"
      case "product_added":
        return "منتج مضاف"
      case "review_added":
        return "مراجعة جديدة"
      case "customer_registered":
        return "عميل جديد"
      case "product_viewed":
        return "عرض منتج"
      case "cart_updated":
        return "تحديث السلة"
      case "admin_login":
        return "دخول إدارة"
      default:
        return "نشاط"
    }
  }

  const filteredActivities = activities.filter((activity) => filter === "all" || activity.type === filter)

  const activityTypes = [
    { value: "all", label: "جميع الأنشطة" },
    { value: "order_created", label: "الطلبات" },
    { value: "product_viewed", label: "عرض المنتجات" },
    { value: "review_added", label: "المراجعات" },
    { value: "admin_login", label: "دخول الإدارة" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#004a99]">سجل الأنشطة</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {activityTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-2">
        {filteredActivities.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">لا توجد أنشطة للعرض</p>
            </CardContent>
          </Card>
        ) : (
          filteredActivities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getActivityColor(activity.type)} text-white`}>
                          {getActivityText(activity.type)}
                        </Badge>
                        <span className="font-medium">{activity.description}</span>
                      </div>
                      {activity.details && <div className="text-sm text-gray-600 mt-1">{activity.details}</div>}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString("ar-SA")}</div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
