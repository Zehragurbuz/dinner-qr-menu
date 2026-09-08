import { useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from '../../lib/supabaseClient'
import OrderCard from '../../components/kitchen/OrderCard'
import { ChefHat } from 'lucide-react'

export default function KitchenDisplay() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const audioRef = useRef(null)

  const playNotificationSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        // Tarayıcı otomatik ses oynatmayı engellemiş olabilir, sorun değil.
      })
    }
  }, [])

  // İlk yükleme: mevcut aktif siparişleri çek
  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .neq('status', 'served')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Siparişler çekilemedi:', error)
      } else {
        setOrders(data)
      }
      setLoading(false)
    }

    fetchOrders()
  }, [])

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('orders-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          setOrders((prev) => [...prev, payload.new])
          playNotificationSound()
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          setOrders((prev) => {
            if (payload.new.status === 'served') {
              return prev.filter((o) => o.id !== payload.new.id)
            }
            return prev.map((o) => (o.id === payload.new.id ? payload.new : o))
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [playNotificationSound])

  const handleServe = async (orderId) => {
    // Optimistic UI: kartı hemen kaldır
    setOrders((prev) => prev.filter((o) => o.id !== orderId))

    const { error } = await supabase
      .from('orders')
      .update({ status: 'served', served_at: new Date().toISOString() })
      .eq('id', orderId)

    if (error) {
      console.error('Güncelleme başarısız:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <audio
        ref={audioRef}
        src="https://cdn.freesound.org/previews/536/536108_11937282-lq.mp3"
        preload="auto"
      />

      <div className="flex items-center gap-3 mb-6">
        <ChefHat size={32} className="text-orange-500" />
        <h1 className="text-2xl font-bold text-gray-800">Mutfak Ekranı</h1>
        <span className="ml-auto bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-full">
          {orders.length} aktif sipariş
        </span>
      </div>

      {loading ? (
        <p className="text-gray-500">Yükleniyor...</p>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-400">
          <ChefHat size={48} className="mb-3" />
          <p>Şu an bekleyen sipariş yok</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onServe={handleServe} />
          ))}
        </div>
      )}
    </div>
  )
}