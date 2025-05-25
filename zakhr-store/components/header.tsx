"use client"

interface HeaderProps {
  activeSection: "products" | "cart" | "contact" | "admin"
  setActiveSection: (section: "products" | "cart" | "contact" | "admin") => void
  cartCount: number
}

export default function Header({ activeSection, setActiveSection, cartCount }: HeaderProps) {
  return (
    <header className="bg-[#004a99] p-3 text-white text-center">
      <h1 className="text-2xl font-bold mb-2">متجر ذخر</h1>
      <nav className="flex justify-center gap-3 flex-wrap">
        <button
          onClick={() => setActiveSection("products")}
          className={`px-4 py-2 font-bold rounded-md transition-colors ${
            activeSection === "products" ? "bg-[#003366]" : "bg-[#0073e6] hover:bg-[#004a99]"
          }`}
        >
          المنتجات
        </button>
        <button
          onClick={() => setActiveSection("cart")}
          className={`px-4 py-2 font-bold rounded-md transition-colors ${
            activeSection === "cart" ? "bg-[#003366]" : "bg-[#0073e6] hover:bg-[#004a99]"
          }`}
        >
          السلة ({cartCount})
        </button>
        <button
          onClick={() => setActiveSection("contact")}
          className={`px-4 py-2 font-bold rounded-md transition-colors ${
            activeSection === "contact" ? "bg-[#003366]" : "bg-[#0073e6] hover:bg-[#004a99]"
          }`}
        >
          تواصل معنا
        </button>
        <button
          onClick={() => setActiveSection("admin")}
          className={`px-4 py-2 font-bold rounded-md transition-colors ${
            activeSection === "admin" ? "bg-[#003366]" : "bg-[#0073e6] hover:bg-[#004a99]"
          }`}
        >
          🔐 الإدارة
        </button>
      </nav>
    </header>
  )
}
