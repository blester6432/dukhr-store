"use client"

import { useState, useEffect } from "react"
import { StoreAPI } from "@/lib/api"
import type { Product, Order, Customer, ActivityLog } from "@/types"

// بيانات احتياطية في حالة فشل API
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "ساعة يد ذكية",
    description: "ساعة ذكية بمميزات متعددة مثل تتبع اللياقة وإشعارات الهاتف.",
    price: 399,
    image: "/placeholder.svg?height=160&width=300&text=ساعة+ذكية",
    rating: 4,
    likes: 10,
    reviews: [],
  },
  {
    id: 2,
    name: "سماعات بلوتوث",
    description: "سماعات لاسلكية بجودة صوت عالية وعمر بطارية طويل.",
    price: 149,
    image: "/placeholder.svg?height=160&width=300&text=سماعات+بلوتوث",
    rating: 5,
    likes: 20,
    reviews: [],
  },
  {
    id: 3,
    name: "هاتف ذكي",
    description: "هاتف حديث بشاشة كبيرة وكاميرا عالية الجودة.",
    price: 1200,
    image: "/placeholder.svg?height=160&width=300&text=هاتف+ذكي",
    rating: 3,
    likes: 5,
    reviews: [],
  },
]

export function useStoreData() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProducts()
    loadOrders()
    loadCustomers()
    loadActivities()
  }, [])

  const addActivity = (type: string, description: string, details?: string) => {
    const newActivity: ActivityLog = {
      id: Date.now(),
      type,
      description,
      details,
      timestamp: new Date().toISOString(),
    }
    setActivities((prev) => [newActivity, ...prev.slice(0, 99)]) // احتفظ بآخر 100 نشاط
  }

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await StoreAPI.getProducts()

      if (data && data.length > 0) {
        setProducts(data)
      } else {
        setProducts(fallbackProducts)
      }
    } catch (err) {
      console.error("خطأ في تحميل المنتجات:", err)
      setError("فشل في تحميل المنتجات، يتم عرض البيانات المحلية")
      setProducts(fallbackProducts)
    } finally {
      setLoading(false)
    }
  }

  const loadOrders = async () => {
    try {
      const data = await StoreAPI.getOrders()
      if (data && Array.isArray(data)) {
        setOrders(data)
      }
    } catch (err) {
      console.error("خطأ في تحميل الطلبات:", err)
    }
  }

  const loadCustomers = async () => {
    try {
      // محاكاة تحميل العملاء
      setCustomers([])
    } catch (err) {
      console.error("خطأ في تحميل العملاء:", err)
    }
  }

  const loadActivities = async () => {
    try {
      // محاكاة تحميل الأنشطة
      setActivities([])
    } catch (err) {
      console.error("خطأ في تحميل الأنشطة:", err)
    }
  }

  const addProduct = async (product: Omit<Product, "id" | "likes" | "reviews">) => {
    try {
      const newProduct: Product = {
        ...product,
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        likes: 0,
        reviews: [],
      }

      setProducts((prev) => [...prev, newProduct])
      addActivity("product_added", `تم إضافة منتج جديد: ${newProduct.name}`)

      const result = await StoreAPI.addProduct(newProduct)
      return { success: true, data: newProduct }
    } catch (err) {
      console.error("خطأ في إضافة المنتج:", err)
      return { success: false, error: "فشل في إضافة المنتج" }
    }
  }

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    addActivity("product_updated", `تم تحديث المنتج: ${updatedProduct.name}`)
  }

  const deleteProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    setProducts((prev) => prev.filter((p) => p.id !== productId))
    if (product) {
      addActivity("product_deleted", `تم حذف المنتج: ${product.name}`)
    }
  }

  const submitOrder = async (orderData: any) => {
    try {
      const newOrder: Order = {
        id: Math.max(...orders.map((o) => o.id), 0) + 1,
        ...orderData,
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      // إضافة الطلب للقائمة فوراً
      setOrders((prev) => [newOrder, ...prev])

      // إضافة أو تحديث العميل
      const existingCustomer = customers.find((c) => c.email === orderData.customerEmail)
      if (existingCustomer) {
        const updatedCustomer = {
          ...existingCustomer,
          purchasedProducts: [
            ...new Set([...existingCustomer.purchasedProducts, ...orderData.items.map((item: any) => item.id)]),
          ],
          totalSpent: existingCustomer.totalSpent + orderData.total,
        }
        setCustomers((prev) => prev.map((c) => (c.id === existingCustomer.id ? updatedCustomer : c)))
      } else {
        const newCustomer: Customer = {
          id: Math.max(...customers.map((c) => c.id), 0) + 1,
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
          joinDate: new Date().toISOString(),
          purchasedProducts: orderData.items.map((item: any) => item.id),
          totalSpent: orderData.total,
        }
        setCustomers((prev) => [...prev, newCustomer])
        addActivity("customer_registered", `عميل جديد: ${newCustomer.name}`)
      }

      addActivity(
        "order_created",
        `طلب جديد من ${orderData.customerName}`,
        `المبلغ: ${orderData.total.toLocaleString()} ر.س`,
      )

      // محاولة إرسال للـ API
      const result = await StoreAPI.submitOrder(newOrder)

      return {
        success: true,
        message: "تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.",
        data: newOrder,
      }
    } catch (err) {
      console.error("خطأ في إرسال الطلب:", err)
      return {
        success: true, // نعتبره نجح محلياً
        message: "تم إرسال طلبك بنجاح (وضع تجريبي)",
      }
    }
  }

  const updateOrderStatus = (orderId: number, status: Order["status"]) => {
    const order = orders.find((o) => o.id === orderId)
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
    if (order) {
      addActivity("order_updated", `تم تحديث حالة الطلب #${orderId}`, `الحالة الجديدة: ${status}`)
    }
  }

  const addReview = async (productId: number, review: string, rating: number, customerEmail: string) => {
    try {
      const newReview = {
        text: review,
        rating,
        customerEmail,
        createdAt: new Date().toISOString(),
      }

      // تحديث المراجعة محلياً فوراً
      setProducts((prev) =>
        prev.map((product) => {
          if (product.id === productId) {
            const updatedReviews = [...product.reviews, newReview]
            const avgRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
            return {
              ...product,
              reviews: updatedReviews,
              rating: Math.round(avgRating),
            }
          }
          return product
        }),
      )

      const product = products.find((p) => p.id === productId)
      if (product) {
        addActivity("review_added", `مراجعة جديدة للمنتج: ${product.name}`, `التقييم: ${rating}/5`)
      }

      const result = await StoreAPI.addReview(productId, review)
      return { success: true, message: "تم إضافة المراجعة بنجاح" }
    } catch (err) {
      console.error("خطأ في إضافة المراجعة:", err)
      return { success: true, message: "تم إضافة المراجعة محلياً" }
    }
  }

  const deleteReview = (productId: number, reviewIndex: number) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          const updatedReviews = product.reviews.filter((_, index) => index !== reviewIndex)
          const avgRating =
            updatedReviews.length > 0 ? updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length : 0
          return {
            ...product,
            reviews: updatedReviews,
            rating: Math.round(avgRating),
          }
        }
        return product
      }),
    )

    const product = products.find((p) => p.id === productId)
    if (product) {
      addActivity("review_deleted", `تم حذف مراجعة من المنتج: ${product.name}`)
    }
  }

  return {
    products,
    orders,
    customers,
    activities,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    submitOrder,
    updateOrderStatus,
    addReview,
    deleteReview,
    addActivity,
    refreshProducts: loadProducts,
    refreshOrders: loadOrders,
  }
}
