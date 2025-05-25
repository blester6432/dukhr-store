"use client"

import { useState } from "react"
import type { Product, Customer } from "@/types"
import Image from "next/image"

interface ProductsSectionProps {
  products: Product[]
  customers: Customer[]
  onAddToCart: (productId: number) => void
  onLikeProduct: (productId: number) => void
  onAddReview: (productId: number, review: string, rating: number, customerEmail: string) => void
  onDeleteReview: (productId: number, reviewIndex: number) => void
}

export default function ProductsSection({
  products,
  customers,
  onAddToCart,
  onLikeProduct,
  onAddReview,
  onDeleteReview,
}: ProductsSectionProps) {
  const [reviewTexts, setReviewTexts] = useState<{ [key: number]: string }>({})
  const [reviewRatings, setReviewRatings] = useState<{ [key: number]: number }>({})
  const [reviewerEmails, setReviewerEmails] = useState<{ [key: number]: string }>({})

  const renderStars = (rating: number, interactive = false, productId?: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl transition-colors ${
          interactive ? "cursor-pointer hover:text-yellow-400" : "cursor-default"
        } ${i < rating ? "text-[#ffb400]" : "text-gray-300"}`}
        onClick={
          interactive && productId ? () => setReviewRatings({ ...reviewRatings, [productId]: i + 1 }) : undefined
        }
      >
        ★
      </span>
    ))
  }

  const hasCustomerBoughtProduct = (productId: number, email: string) => {
    const customer = customers.find((c) => c.email === email)
    if (!customer) return false
    return customer.purchasedProducts.includes(productId)
  }

  const handleReviewSubmit = (productId: number) => {
    const review = reviewTexts[productId]?.trim()
    const rating = reviewRatings[productId] || 0
    const email = reviewerEmails[productId]?.trim()

    if (!review || !email) {
      alert("يرجى كتابة المراجعة والبريد الإلكتروني")
      return
    }

    if (rating === 0) {
      alert("يرجى اختيار تقييم من 1 إلى 5 نجوم")
      return
    }

    if (!hasCustomerBoughtProduct(productId, email)) {
      alert("يمكن فقط للعملاء الذين اشتروا هذا المنتج كتابة مراجعة")
      return
    }

    onAddReview(productId, review, rating, email)
    setReviewTexts({ ...reviewTexts, [productId]: "" })
    setReviewRatings({ ...reviewRatings, [productId]: 0 })
    setReviewerEmails({ ...reviewerEmails, [productId]: "" })
  }

  const canDeleteReview = (review: any, email: string) => {
    return review.customerEmail === email
  }

  return (
    <section>
      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={160}
              className="w-full max-h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-semibold text-[#004a99] mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3 min-h-[40px]">{product.description}</p>
            <div className="flex items-center mb-2">{renderStars(product.rating)}</div>
            <div className="text-lg font-bold text-[#0073e6] mb-3">{product.price.toLocaleString()} ر.س</div>
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => onAddToCart(product.id)}
                className="bg-[#0073e6] hover:bg-[#004a99] text-white font-bold px-4 py-2 rounded-md transition-colors"
              >
                أضف إلى السلة
              </button>
              <button onClick={() => onLikeProduct(product.id)} className="text-[#e0245e] text-lg">
                ❤️ <span>{product.likes}</span>
              </button>
            </div>
            <div className="border-t pt-3">
              <strong className="block mb-2">آراء العملاء:</strong>
              <div className="mb-3 max-h-32 overflow-y-auto text-sm text-gray-700">
                {product.reviews.length === 0 ? (
                  <p className="text-gray-500 italic">لا توجد مراجعات بعد</p>
                ) : (
                  product.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded mb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {renderStars(review.rating)}
                            <span className="text-xs text-gray-500">بواسطة: {review.customerEmail}</span>
                          </div>
                          <p>{review.text}</p>
                          <span className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString("ar-SA")}
                          </span>
                        </div>
                        {canDeleteReview(review, reviewerEmails[product.id]) && (
                          <button
                            onClick={() => onDeleteReview(product.id, index)}
                            className="text-red-500 hover:text-red-700 text-xs ml-2"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  value={reviewerEmails[product.id] || ""}
                  onChange={(e) => setReviewerEmails({ ...reviewerEmails, [product.id]: e.target.value })}
                  placeholder="بريدك الإلكتروني (للتحقق من الشراء)"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm">التقييم:</span>
                  {renderStars(reviewRatings[product.id] || 0, true, product.id)}
                </div>
                <textarea
                  value={reviewTexts[product.id] || ""}
                  onChange={(e) => setReviewTexts({ ...reviewTexts, [product.id]: e.target.value })}
                  placeholder="اكتب مراجعتك هنا... (يجب أن تكون مشترياً للمنتج)"
                  className="w-full p-2 border border-gray-300 rounded-md resize-vertical"
                  rows={2}
                />
                <button
                  onClick={() => handleReviewSubmit(product.id)}
                  className="bg-[#0073e6] hover:bg-[#004a99] text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  إرسال المراجعة
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
