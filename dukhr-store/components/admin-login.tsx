"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface AdminLoginProps {
  onLogin: (password: string) => void
  onClose: () => void
  error?: string
}

export default function AdminLogin({ onLogin, onClose, error }: AdminLoginProps) {
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f9]" dir="rtl">
      <Card className="w-full max-w-md relative">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
          title="العودة للموقع"
        >
          <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </button>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#004a99]">🔐 دخول الإدارة</CardTitle>
          <p className="text-gray-600">أدخل كلمة السر للوصول لوحة التحكم</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة السر"
                className="text-center"
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded border border-red-200">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full bg-[#0073e6] hover:bg-[#004a99]">
              دخول
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
