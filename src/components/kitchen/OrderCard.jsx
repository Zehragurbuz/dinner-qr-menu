import { Clock, CheckCircle } from 'lucide-react'

function formatTime(isoString) {
  const date = new Date(isoString)
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
}

export default function OrderCard({ order, onServe }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800">{order.guest_name}</h3>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={14} />
          {formatTime(order.created_at)}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-700 flex-1">
        <div>
          <span className="font-semibold">🍔 Hamburger:</span>{' '}
          {order.burger_doneness}
          {order.burger_toppings?.length > 0 && (
            <span> — {order.burger_toppings.join(', ')}</span>
          )}
          {order.burger_sauce && <span> — Sos: {order.burger_sauce}</span>}
        </div>

        <div>
          <span className="font-semibold">🍟 Yan:</span> {order.side_potato}
          {order.side_rib_corn && <span> + Kaburga Mısır</span>}
        </div>

        {order.drink_choice && (
          <div>
            <span className="font-semibold">🥤 İçecek:</span> {order.drink_choice}
          </div>
        )}

        {(order.coffee_temperature || order.coffee_syrup || order.coffee_milk) && (
          <div>
            <span className="font-semibold">☕ Kahve:</span>{' '}
            {[order.coffee_temperature, order.coffee_syrup, order.coffee_milk]
              .filter(Boolean)
              .join(', ')}
          </div>
        )}

        {order.special_note && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-yellow-800 text-xs mt-2">
            📝 {order.special_note}
          </div>
        )}
      </div>

      <button
        onClick={() => onServe(order.id)}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-2.5 rounded-xl hover:bg-green-600 transition-colors"
      >
        <CheckCircle size={18} />
        Servis Edildi
      </button>
    </div>
  )
}