export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  likes: number
  reviews: Review[]
}

export interface Review {
  text: string
  rating: number
  customerEmail: string
  createdAt: string
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Employee {
  id: number
  name: string
  email: string
  phone: string
  position: string
  salary: number
  hireDate: string
  status: "active" | "inactive"
}

export interface Order {
  id: number
  customerName: string
  customerEmail: string
  customerPhone: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  createdAt: string
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  joinDate: string
  purchasedProducts: number[]
  totalSpent: number
}

export interface ActivityLog {
  id: number
  type: string
  description: string
  details?: string
  timestamp: string
  userId?: string
}
