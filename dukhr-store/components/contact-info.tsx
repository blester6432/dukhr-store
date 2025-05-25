"use client"

import { useState } from "react"
import { Phone, Mail, X, MessageCircle } from "lucide-react"

export default function ContactInfo() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const [showEmail, setShowEmail] = useState(false)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    alert(`تم نسخ ${type} بنجاح!`)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50" dir="rtl">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#0073e6] hover:bg-[#004a99] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title="تواصل معنا"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50" dir="rtl">
      <div className="bg-white rounded-lg shadow-xl border-2 border-[#0073e6] w-72 max-w-[90vw]">
        {/* Header */}
        <div className="bg-[#0073e6] text-white p-3 rounded-t-lg flex justify-between items-center">
          <h3 className="font-bold text-sm">📞 تواصل معنا</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#004a99] p-1 rounded transition-colors"
            title="إغلاق"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          {/* رقم الهاتف */}
          <div>
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Phone className="h-4 w-4" />
              اتصل بنا
            </button>
            {showPhone && (
              <div className="mt-2 p-2 bg-green-50 rounded border animate-in fade-in duration-300">
                <div className="text-center">
                  <div className="font-bold text-green-700 text-sm">+971 544 102 607</div>
                  <div className="flex gap-1 mt-1 justify-center">
                    <button
                      onClick={() => copyToClipboard("+971544102607", "رقم الهاتف")}
                      className="text-xs bg-green-100 hover:bg-green-200 px-2 py-1 rounded"
                    >
                      📋
                    </button>
                    <a href="tel:+971544102607" className="text-xs bg-green-100 hover:bg-green-200 px-2 py-1 rounded">
                      📞
                    </a>
                    <a
                      href="https://wa.me/971544102607"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-green-100 hover:bg-green-200 px-2 py-1 rounded"
                    >
                      💬
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div>
            <button
              onClick={() => setShowEmail(!showEmail)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Mail className="h-4 w-4" />
              راسلنا
            </button>
            {showEmail && (
              <div className="mt-2 p-2 bg-blue-50 rounded border animate-in fade-in duration-300">
                <div className="text-center">
                  <div className="font-bold text-blue-700 text-xs break-all">faresalbasuni9@gmail.com</div>
                  <div className="flex gap-1 mt-1 justify-center">
                    <button
                      onClick={() => copyToClipboard("faresalbasuni9@gmail.com", "البريد الإلكتروني")}
                      className="text-xs bg-blue-100 hover:blue-green-200 px-2 py-1 rounded"
                    >
                      📋
                    </button>
                    <a
                      href="mailto:faresalbasuni9@gmail.com"
                      className="text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded"
                    >
                      📧
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
