"use client"

import type React from "react"

import { useState } from "react"

interface ContactSectionProps {
  onSubmit: () => void
}

export default function ContactSection({ onSubmit }: ContactSectionProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <section className="bg-white p-5 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#004a99] mb-5 text-center">تواصل معنا</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="الاسم"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="البريد الإلكتروني"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="رسالتك"
          required
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-md resize-vertical"
        />
        <button
          type="submit"
          className="w-full bg-[#0073e6] hover:bg-[#004a99] text-white font-bold p-3 rounded-md transition-colors"
        >
          إرسال
        </button>
      </form>
    </section>
  )
}
