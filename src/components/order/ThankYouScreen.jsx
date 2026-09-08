import { CheckCircle2 } from 'lucide-react'

export default function ThankYouScreen({ guestName, onNewOrder }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-orange-50 to-white">
      <img
        src="/thanks.jpg"
        alt="Afiyet olsun"
        className="w-40 h-40 object-cover rounded-full shadow-lg mb-6"
      />
      <CheckCircle2 className="text-orange-500 mb-3" size={40} />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        BAŞŞŞIMLA BERABER {guestName}!
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