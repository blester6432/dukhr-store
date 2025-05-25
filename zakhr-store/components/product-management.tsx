"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/types"
import Image from "next/image"

interface ProductManagementProps {
  products: Product[]
  onUpdateProduct: (product: Product) => void
  onDeleteProduct: (productId: number) => void
  onAddProduct: (product: Omit<Product, "id" | "likes" | "reviews">) => void
}

export default function ProductManagement({
  products,
  onUpdateProduct,
  onDeleteProduct,
  onAddProduct,
}: ProductManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingProduct) {
      // تعديل منتج
      const updatedProduct: Product = {
        ...editingProduct,
        ...formData,
        price: Number(formData.price),
        image: formData.image || "/placeholder.svg?height=160&width=300&text=" + encodeURIComponent(formData.name),
      }
      onUpdateProduct(updatedProduct)
      setEditingProduct(null)
    } else {
      // إضافة منتج جديد
      const newProduct = {
        ...formData,
        price: Number(formData.price),
        image: formData.image || "/placeholder.svg?height=160&width=300&text=" + encodeURIComponent(formData.name),
      }
      onAddProduct(newProduct)
      setShowAddForm(false)
    }

    setFormData({ name: "", description: "", price: "", image: "" })
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
    })
    setShowAddForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      onDeleteProduct(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#004a99]">إدارة المنتجات</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-[#0073e6] hover:bg-[#004a99]">
          {showAddForm ? "إلغاء" : "➕ إضافة منتج"}
        </Button>
      </div>

      {/* نموذج إضافة/تعديل منتج */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProduct ? "تعديل منتج" : "إضافة منتج جديد"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="اسم المنتج"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Textarea
                placeholder="وصف المنتج"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="السعر (ر.س)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <Input
                placeholder="رابط الصورة (اختياري)"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <Button type="submit" className="w-full bg-[#0073e6] hover:bg-[#004a99]">
                {editingProduct ? "تحديث المنتج" : "إضافة المنتج"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* قائمة المنتجات */}
      <div className="grid gap-4">
        {products.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">لا توجد منتجات حالياً</p>
              <Button onClick={() => setShowAddForm(true)} className="mt-4 bg-[#0073e6] hover:bg-[#004a99]">
                إضافة أول منتج
              </Button>
            </CardContent>
          </Card>
        ) : (
          products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-bold text-[#0073e6]">{product.price.toLocaleString()} ر.س</span>
                      <span>⭐ {product.rating}/5</span>
                      <span>❤️ {product.likes}</span>
                      <span>💬 {product.reviews.length} مراجعة</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                      ✏️ تعديل
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                      🗑️ حذف
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
