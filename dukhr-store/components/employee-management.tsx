"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Employee } from "@/types"

interface EmployeeManagementProps {
  employees: Employee[]
  onUpdateEmployees: (employees: Employee[]) => void
}

export default function EmployeeManagement({ employees, onUpdateEmployees }: EmployeeManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingEmployee) {
      // تعديل موظف
      const updatedEmployees = employees.map((emp) =>
        emp.id === editingEmployee.id ? { ...emp, ...formData, salary: Number(formData.salary) } : emp,
      )
      onUpdateEmployees(updatedEmployees)
      setEditingEmployee(null)
    } else {
      // إضافة موظف جديد
      const newEmployee: Employee = {
        id: employees.length + 1,
        ...formData,
        salary: Number(formData.salary),
        hireDate: new Date().toISOString().split("T")[0],
        status: "active",
      }
      onUpdateEmployees([...employees, newEmployee])
      setShowAddForm(false)
    }

    setFormData({ name: "", email: "", phone: "", position: "", salary: "" })
  }

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      salary: employee.salary.toString(),
    })
    setShowAddForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا الموظف؟")) {
      onUpdateEmployees(employees.filter((emp) => emp.id !== id))
    }
  }

  const toggleStatus = (id: number) => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === id ? { ...emp, status: emp.status === "active" ? "inactive" : "active" } : emp,
    )
    onUpdateEmployees(updatedEmployees)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#004a99]">إدارة الموظفين</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-[#0073e6] hover:bg-[#004a99]">
          {showAddForm ? "إلغاء" : "➕ إضافة موظف"}
        </Button>
      </div>

      {/* نموذج إضافة/تعديل موظف */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingEmployee ? "تعديل موظف" : "إضافة موظف جديد"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                placeholder="رقم الجوال"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <Input
                placeholder="المنصب"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="الراتب"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                required
              />
              <div className="md:col-span-2">
                <Button type="submit" className="w-full bg-[#0073e6] hover:bg-[#004a99]">
                  {editingEmployee ? "تحديث" : "إضافة"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* قائمة الموظفين */}
      <div className="grid gap-4">
        {employees.map((employee) => (
          <Card key={employee.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{employee.name}</h3>
                    <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                      {employee.status === "active" ? "نشط" : "غير نشط"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>📧 {employee.email}</div>
                    <div>📱 {employee.phone}</div>
                    <div>💼 {employee.position}</div>
                    <div>💰 {employee.salary.toLocaleString()} ر.س</div>
                    <div>📅 تاريخ التوظيف: {employee.hireDate}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(employee)}>
                    ✏️ تعديل
                  </Button>
                  <Button
                    size="sm"
                    variant={employee.status === "active" ? "secondary" : "default"}
                    onClick={() => toggleStatus(employee.id)}
                  >
                    {employee.status === "active" ? "إيقاف" : "تفعيل"}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(employee.id)}>
                    🗑️ حذف
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
