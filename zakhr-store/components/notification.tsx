interface NotificationProps {
  message: string
}

export default function Notification({ message }: NotificationProps) {
  if (!message) return null

  return (
    <div className="fixed top-5 right-5 bg-[#0073e6] text-white p-4 rounded-lg shadow-lg max-w-72 text-center font-semibold z-50 animate-in fade-in duration-500">
      {message}
    </div>
  )
}
