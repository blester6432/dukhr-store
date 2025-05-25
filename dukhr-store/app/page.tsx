"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import ProductsSection from "@/components/products-section"
import CartSection from "@/components/cart-section"
import ContactSection from "@/components/contact-section"
import ContactInfo from "@/components/contact-info"
import AdminLogin from "@/components/admin-login"
import AdminDashboard from "@/components/admin-dashboard"
import Notification from "@/components/notification"
import Footer from "@/components/footer"
import { useStoreData } from "@/hooks/use-store-data"
import type { CartItem } from "@/types"

const ADMIN_PASSWORD = "admin123"

export default function Home() {
  const [activeSection, setActiveSection] = useState<"products" | "cart" | "contact" | "admin">("products")
  const [cart, setCart] = useState<CartItem[]>([])
  const [notification, setNotification] = useState<string>("")
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminLoginError, setAdminLoginError] = useState("")

  const {
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
  } = useStoreData()

  useEffect(() => {
    // تسجيل زيارة الموقع
    addActivity("site_visit", "زائر جديد دخل الموقع")
  }, [])

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(""), 3000)
  }

  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true)
      setAdminLoginError("")
      addActivity("admin_login", "تم تسجيل دخول المدير بنجاح")
      showNotification("تم تسجيل الدخول بنجاح!")
    } else {
      setAdminLoginError("كلمة السر غير صحيحة")
      addActivity("admin_login_failed", "محاولة دخول فاشلة للإدارة")
    }
  }

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false)
    setActiveSection("products")
    showNotification("تم تسجيل الخروج")
  }

  const handleCloseAdminLogin = () => {
    setActiveSection("products")
    setAdminLoginError("")
  }

  const addToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const existingItem = cart.find((item) => item.id === productId)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ])
    }
    addActivity("cart_updated", `تم إضافة ${product.name} إلى السلة`)
    showNotification(`تمت إضافة "${product.name}" إلى السلة.`)
  }

  const removeFromCart = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    setCart(cart.filter((item) => item.id !== productId))
    if (product) {
      addActivity("cart_updated", `تم حذف ${product.name} من السلة`)
    }
    showNotification("تم حذف المنتج من السلة.")
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return
    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    addActivity("cart_updated", `تم تحديث كمية المنتج في السلة`)
  }

  const likeProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      addActivity("product_liked", `تم الإعجاب بالمنتج: ${product.name}`)
    }
    showNotification("تم إضافة الإعجاب!")
  }

  const handleOrderSubmit = async (orderData: any) => {
    const result = await submitOrder(orderData)

    if (result.success) {
      setCart([])
      showNotification(result.message || "تم إرسال طلبك بنجاح!")
    } else {
      showNotification("حدث خطأ في إرسال الطلب")
    }
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  // عرض شاشة تسجيل دخول الإدارة
  if (activeSection === "admin" && !isAdminLoggedIn) {
    return <AdminLogin onLogin={handleAdminLogin} onClose={handleCloseAdminLogin} error={adminLoginError} />
  }

  // عرض لوحة تحكم الإدارة
  if (activeSection === "admin" && isAdminLoggedIn) {
    return (
      <AdminDashboard
        onLogout={handleAdminLogout}
        products={products}
        orders={orders}
        customers={customers}
        activities={activities}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
        onAddProduct={addProduct}
        onUpdateOrderStatus={updateOrderStatus}
        addActivity={addActivity}
      />
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f9]" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0073e6] mx-auto mb-4"></div>
          <p className="text-[#004a99] font-semibold">جاري تحميل المتجر...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f9]" dir="rtl">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} cartCount={cartCount} />

      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mx-5 mt-5 rounded">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <main className="flex-grow p-5 max-w-4xl mx-auto w-full">
        {activeSection === "products" && (
          <ProductsSection
            products={products}
            customers={customers}
            onAddToCart={addToCart}
            onLikeProduct={likeProduct}
            onAddReview={addReview}
            onDeleteReview={deleteReview}
          />
        )}

        {activeSection === "cart" && (
          <CartSection
            cart={cart}
            cartTotal={cartTotal}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onOrderSubmit={handleOrderSubmit}
          />
        )}

        {activeSection === "contact" && (
          <ContactSection onSubmit={() => showNotification("شكرًا لتواصلك معنا! سنرد عليك قريبًا.")} />
        )}
      </main>

      <ContactInfo />
      <Notification message={notification} />
      <Footer />
    </div>
  )
}
