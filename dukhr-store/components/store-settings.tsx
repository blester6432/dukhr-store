"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function StoreSettings() {
  const [settings, setSettings] = useState({
    storeName: "متجر ذخر",
    storeDescription: "متجر إلكتروني متكامل للمنتجات التقنية",
    contactEmail: "info@zakhr-store.com",
    contactPhone: "0551234567",
    address: "الرياض، المملكة العربية السعودية",
    adminPassword: "admin123",
    allowRegistration: true,
    enableNotifications: true,
    maintenanceMode: false,
  })

  const handleSave = () => {
    // حفظ الإعدادات
    alert("تم حفظ الإعدادات بنجاح!")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#004a99]">إعدادات المتجر</h2>

      <div className="grid gap-6">
        {/* إعدادات عامة */}
        <Card>
          <CardHeader>
            <CardTitle>الإعدادات العامة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">اسم المتجر</label>
              <Input
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">وصف المتجر</label>
              <Textarea
                value={settings.storeDescription}
                onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
              <Input
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">العنوان</label>
              <Input value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات الأمان */}
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الأمان</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">كلمة سر الإدارة</label>
              <Input
                type="password"
                value={settings.adminPassword}
                onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">السماح بالتسجيل الجديد</label>
              <Switch
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات النظام */}
        <Card>
          <CardHeader>
            <CardTitle>إعدادات النظام</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">تفعيل الإشعارات</label>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">وضع الصيانة</label>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* أزرار الحفظ */}
        <div className="flex gap-4">
          <Button onClick={handleSave} className="bg-[#0073e6] hover:bg-[#004a99]">
            💾 حفظ الإعدادات
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            🔄 إعادة تحميل
          </Button>
        </div>
      </div>
    </div>
  )
}
