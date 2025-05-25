// استبدال الكود بالكامل لإصلاح مشكلة الـ API

const API_BASE_URL = typeof window !== "undefined" ? `${window.location.origin}/api` : "http://localhost:3000/api"

export class StoreAPI {
  static async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.success ? data.data : []
    } catch (error) {
      console.error("خطأ في جلب المنتجات:", error)
      // إرجاع بيانات افتراضية في حالة الخطأ
      return [
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
    }
  }

  static async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.success ? data.data : []
    } catch (error) {
      console.error("خطأ في جلب الطلبات:", error)
      return []
    }
  }

  static async addProduct(product: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("خطأ في إضافة المنتج:", error)
      return { success: false, error: error.message }
    }
  }

  static async submitOrder(order: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("خطأ في إرسال الطلب:", error)
      return { success: false, error: error.message }
    }
  }

  static async addReview(productId: number, review: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, review }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("خطأ في إضافة المراجعة:", error)
      return { success: false, error: error.message }
    }
  }
}
