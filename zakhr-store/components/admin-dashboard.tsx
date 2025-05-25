"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmployeeManagement from "./employee-management"
import ProductManagement from "./product-management"
import OrderManagement from "./order-management"
import CustomerManagement from "./customer-management"
import ActivityLogComponent from "./activity-log"
import LiveStats from "./live-stats"
import StoreSettings from "./store-settings"
import type { Employee, Product, Order, Customer, ActivityLog } from "@/types"

interface AdminDashboardProps {
  onLogout: () => void
  products: Product[]
  orders: Order[]
  customers: Customer[]
  activities: ActivityLog[]
  onUpdateProduct: (product: Product) => void
  onDeleteProduct: (productId: number) => void
  onAddProduct: (product: Omit<Product, "id" | "likes" | "reviews">) => void
  onUpdateOrderStatus: (orderId: number, status: Order["status"]) => void
  addActivity: (type: string, description: string, details?: string) => void
}

export default function AdminDashboard({
  onLogout,
  products,
  orders,
  customers,
  activities,
  onUpdateProduct,
  onDeleteProduct,
  onAddProduct,
  onUpdateOrderStatus,
  addActivity,
}: AdminDashboardProps) {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@zakhr-store.com",
      phone: "0551234567",
      position: "مدير المبيعات",
      salary: 5000,
      hireDate: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "فاطمة علي",
      email: "fatima@zakhr-store.com",
      phone: "0559876543",
      position: "موظفة خدمة عملاء",
      salary: 3500,
      hireDate: "2024-03-01",
      status: "active",
    },
  ])

  const handleLogout = () => {
    addActivity("admin_logout", "تم تسجيل خروج المدير")
    onLogout()
  }

  const stats = {
    totalProducts: products.length,
    totalEmployees: employees.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    totalRevenue: orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.total, 0),
    totalCustomers: customers.length,
  }

  return (
    <div className="min-h-screen bg-[#f0f4f9]" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#004a99] to-[#0073e6] text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">🏪 لوحة تحكم متجر ذخر</h1>
            <p className="text-blue-200">إدارة شاملة ومتقدمة للمتجر</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-[#004a99]"
          >
            تسجيل خروج
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* إحصائيات سريعة محسنة */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <div className="text-sm opacity-90">📦 المنتجات</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.totalEmployees}</div>
              <div className="text-sm opacity-90">👥 الموظفين</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <div className="text-sm opacity-90">🛒 الطلبات</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
              <div className="text-sm opacity-90">⏳ معلقة</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm opacity-90">💰 الإيرادات</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <div className="text-sm opacity-90">👤 العملاء</div>
            </CardContent>
          </Card>
        </div>

        {/* التبويبات الرئيسية */}
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="live">📊 مباشر</TabsTrigger>
            <TabsTrigger value="orders">🛒 الطلبات ({stats.pendingOrders})</TabsTrigger>
            <TabsTrigger value="products">📦 المنتجات</TabsTrigger>
            <TabsTrigger value="customers">👥 العملاء</TabsTrigger>
            <TabsTrigger value="employees">🏢 الموظفين</TabsTrigger>
            <TabsTrigger value="activity">📝 الأنشطة</TabsTrigger>
            <TabsTrigger value="settings">⚙️ الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            <LiveStats orders={orders} products={products} customers={customers} activities={activities} />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement orders={orders} onUpdateOrderStatus={onUpdateOrderStatus} />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement
              products={products}
              onUpdateProduct={onUpdateProduct}
              onDeleteProduct={onDeleteProduct}
              onAddProduct={onAddProduct}
            />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManagement customers={customers} orders={orders} />
          </TabsContent>

          <TabsContent value="employees">
            <EmployeeManagement employees={employees} onUpdateEmployees={setEmployees} />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityLogComponent activities={activities} />
          </TabsContent>

          <TabsContent value="settings">
            <StoreSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
