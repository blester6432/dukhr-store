"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Order } from "@/types"

interface OrderManagementProps {
  orders: Order[]
  onUpdateOrderStatus: (orderId: number, status: Order["status"]) => void
}

export default function OrderManagement({ orders, onUpdateOrderStatus }: OrderManagementProps) {
  const [selectedStatus, setSelectedStatus] = useState<{ [key: number]: Order["status"] }>({})

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "processing":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "معلق"
      case "processing":
        return "قيد المعالجة"
      case "completed":
        return "مكتمل"
      case "cancelled":
        return "ملغي"
      default:
        return status
    }
  }

  const getStatusOptions = (currentStatus: Order["status"]) => {
    const allStatuses = [
      { value: "pending", label: "معلق", icon: "⏳" },
      { value: "processing", label: "قيد المعالجة", icon: "🔄" },
      { value: "completed", label: "مكتمل", icon: "✅" },
      { value: "cancelled", label: "ملغي", icon: "❌" },
    ]

    // إزالة الحالة الحالية من الخيارات
    return allStatuses.filter((status) => status.value !== currentStatus)
  }

  const handleStatusChange = (orderId: number, newStatus: Order["status"]) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order) return

    const confirmationMessages = {
      pending: "هل أنت متأكد من إرجاع هذا الطلب إلى حالة الانتظار؟",
      processing: "هل أنت متأكد من تحويل هذا الطلب إلى قيد المعالجة؟",
      completed: "هل أنت متأكد من تأكيد إكمال هذا الطلب؟",
      cancelled: "هل أنت متأكد من إلغاء هذا الطلب؟ هذا الإجراء يمكن التراجع عنه لاحقاً.",
    }

    if (confirm(confirmationMessages[newStatus])) {
      onUpdateOrderStatus(orderId, newStatus)
      // إزالة الحالة المحددة بعد التحديث
      setSelectedStatus((prev) => {
        const updated = { ...prev }
        delete updated[orderId]
        return updated
      })
    }
  }

  const pendingOrders = orders.filter((order) => order.status === "pending")
  const processingOrders = orders.filter((order) => order.status === "processing")
  const completedOrders = orders.filter((order) => order.status === "completed")
  const cancelledOrders = orders.filter((order) => order.status === "cancelled")

  const renderOrderCard = (order: Order, showQuickActions = false) => (
    <Card
      key={order.id}
      className={`hover:shadow-lg transition-shadow ${
        order.status === "pending" ? "border-orange-200 bg-orange-50" : ""
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">طلب رقم #{order.id}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
            {order.status === "completed" && <Badge className="bg-green-100 text-green-800">✨ مكتمل</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-semibold mb-2">معلومات العميل:</h4>
            <div className="text-sm space-y-1">
              <div>👤 {order.customerName}</div>
              <div>📧 {order.customerEmail}</div>
              <div>📱 {order.customerPhone}</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">تفاصيل الطلب:</h4>
            <div className="text-sm space-y-1">
              <div>📅 {new Date(order.createdAt).toLocaleString("ar-SA")}</div>
              <div>💰 الإجمالي: {order.total.toLocaleString()} ر.س</div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">المنتجات:</h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-white p-2 rounded border">
                <span>{item.name}</span>
                <span>
                  الكمية: {item.quantity} × {item.price.toLocaleString()} ر.س
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* أزرار التحكم المحسنة */}
        <div className="space-y-3">
          {showQuickActions && (
            <div className="flex gap-2 flex-wrap">
              {order.status === "pending" && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(order.id, "processing")}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  🔄 بدء المعالجة
                </Button>
              )}
              {order.status === "processing" && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(order.id, "completed")}
                  className="bg-green-500 hover:bg-green-600"
                >
                  ✅ إكمال الطلب
                </Button>
              )}
              {(order.status === "pending" || order.status === "processing") && (
                <Button size="sm" variant="destructive" onClick={() => handleStatusChange(order.id, "cancelled")}>
                  ❌ إلغاء الطلب
                </Button>
              )}
            </div>
          )}

          {/* خيار تغيير الحالة المتقدم */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">تغيير حالة الطلب:</span>
            <Select
              value={selectedStatus[order.id] || ""}
              onValueChange={(value) =>
                setSelectedStatus((prev) => ({ ...prev, [order.id]: value as Order["status"] }))
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="اختر حالة جديدة" />
              </SelectTrigger>
              <SelectContent>
                {getStatusOptions(order.status).map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.icon} {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedStatus[order.id] && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                    تطبيق التغيير
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>تأكيد تغيير حالة الطلب</AlertDialogTitle>
                    <AlertDialogDescription>
                      هل أنت متأكد من تغيير حالة الطلب #{order.id} من "{getStatusText(order.status)}" إلى "
                      {getStatusText(selectedStatus[order.id])}"؟
                      <br />
                      <br />
                      <strong>ملاحظة:</strong> يمكنك تغيير الحالة مرة أخرى لاحقاً إذا احتجت لذلك.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleStatusChange(order.id, selectedStatus[order.id])}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      تأكيد التغيير
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#004a99]">إدارة الطلبات</h2>
        <div className="flex gap-2">
          {pendingOrders.length > 0 && (
            <Badge className="bg-orange-500 text-white px-3 py-1">{pendingOrders.length} طلب جديد يحتاج معالجة</Badge>
          )}
          {processingOrders.length > 0 && (
            <Badge className="bg-blue-500 text-white px-3 py-1">{processingOrders.length} قيد المعالجة</Badge>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 text-lg">لا توجد طلبات حالياً</p>
            <p className="text-sm text-gray-400 mt-2">ستظهر الطلبات الجديدة هنا عند وصولها</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* الطلبات المعلقة - أولوية عالية */}
          {pendingOrders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center gap-2">
                🔔 طلبات جديدة تحتاج معالجة فورية
                <Badge className="bg-orange-500">{pendingOrders.length}</Badge>
              </h3>
              <div className="grid gap-4">{pendingOrders.map((order) => renderOrderCard(order, true))}</div>
            </div>
          )}

          {/* الطلبات قيد المعالجة */}
          {processingOrders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                🔄 طلبات قيد المعالجة
                <Badge className="bg-blue-500">{processingOrders.length}</Badge>
              </h3>
              <div className="grid gap-4">{processingOrders.map((order) => renderOrderCard(order, true))}</div>
            </div>
          )}

          {/* الطلبات المكتملة */}
          {completedOrders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                ✅ طلبات مكتملة
                <Badge className="bg-green-500">{completedOrders.length}</Badge>
                <span className="text-sm text-gray-500">(يمكن تعديل الحالة إذا لزم الأمر)</span>
              </h3>
              <div className="grid gap-4">{completedOrders.map((order) => renderOrderCard(order))}</div>
            </div>
          )}

          {/* الطلبات الملغية */}
          {cancelledOrders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                ❌ طلبات ملغية
                <Badge className="bg-red-500">{cancelledOrders.length}</Badge>
                <span className="text-sm text-gray-500">(يمكن إعادة تفعيلها)</span>
              </h3>
              <div className="grid gap-4">{cancelledOrders.map((order) => renderOrderCard(order))}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
