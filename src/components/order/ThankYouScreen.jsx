import { CheckCircle2 } from 'lucide-react'

export default function ThankYouScreen({ guestName, onNewOrder }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-orange-50 to-white">
      <CheckCircle2 className="text-orange-500 mb-4" size={64} />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Teşekkürler, {guestName}!
      </h1>
      <p className="text-gray-500 mb-8">
        Siparişin mutfağa iletildi, hazırlanıyor 🍔☕
      </p>
      <button
        onClick={onNewOrder}
        className="text-sm text-orange-500 font-medium underline"
      >
        Yeni sipariş ver
      </button>
    </div>
  )
}