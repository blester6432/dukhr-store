"use client"

import type React from "react"

import { useState } from "react"
import type { CartItem } from "@/types"

interface CartSectionProps {
  cart: CartItem[]
  cartTotal: number
  onRemoveFromCart: (productId: number) => void
  onUpdateQuantity: (productId: number, quantity: number) => void
  onOrderSubmit: (orderData: any) => void
}

export default function CartSection({
  cart,
  cartTotal,
  onRemoveFromCart,
  onUpdateQuantity,
  onOrderSubmit,
}: CartSectionProps) {
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert("السلة فارغة! الرجاء إضافة منتجات قبل إرسال الطلب.")
      return
    }

    const phoneRegex = /^05[0-9]{8}$/
    if (!phoneRegex.test(customerPhone)) {
      alert("رقم الجوال غير صحيح. يجب أن يبدأ بـ 05 ويحتوي على 10 أرقام.")
      return
    }

    // إرسال البيانات كاملة
    onOrderSubmit({
      customerName,
      customerPhone,
      customerEmail,
      items: cart,
      total: cartTotal,
    })

    setCustomerName("")
    setCustomerPhone("")
    setCustomerEmail("")
  }

  return (
    <section className="bg-white p-5 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#004a99] mb-5 text-center">سلة المشتريات</h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#f3f7fb]">
              <th className="border border-gray-300 p-2 text-[#004a99]">المنتج</th>
              <th className="border border-gray-300 p-2 text-[#004a99]">الكمية</th>
              <th className="border border-gray-300 p-2 text-[#004a99]">السعر للوحدة</th>
              <th className="border border-gray-300 p-2 text-[#004a99]">الإجمالي</th>
              <th className="border border-gray-300 p-2 text-[#004a99]">حذف</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan={5} className="border border-gray-300 p-4 text-center">
                  السلة فارغة
                </td>
              </tr>
            ) : (
              cart.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2 text-center">{item.name}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                      className="w-16 text-center border border-gray-300 rounded p-1"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">{item.price.toLocaleString()} ر.س</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {(item.price * item.quantity).toLocaleString()} ر.س
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition-colors"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-right font-bold text-lg text-[#0073e6] mb-4">الإجمالي: {cartTotal.toLocaleString()} ر.س</div>

      <form onSubmit={handleOrderSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-[#004a99]">تأكيد الطلب</h3>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="الاسم الكامل"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="tel"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          placeholder="رقم الجوال (مثال: 0551234567)"
          required
          pattern="^05[0-9]{8}$"
          title="رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="البريد الإلكتروني"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-[#0073e6] hover:bg-[#004a99] text-white font-bold p-3 rounded-md transition-colors"
        >
          إرسال الطلب
        </button>
      </form>
    </section>
  )
}
