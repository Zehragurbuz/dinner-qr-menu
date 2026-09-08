import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import OptionSelector from '../../components/order/OptionSelector'
import MultiOptionSelector from '../../components/order/MultiOptionSelector'
import ThankYouScreen from '../../components/order/ThankYouScreen'
import {
  BURGER_DONENESS,
  BURGER_TOPPINGS,
  BURGER_SAUCES,
  SIDE_POTATO_OPTIONS,
  COFFEE_TEMPERATURE,
  COFFEE_SYRUP,
  COFFEE_MILK,
  DRINK_OPTIONS,
} from '../../constants/menuOptions'
const initialFormState = {
  guestName: '',
  burgerDoneness: '',
  burgerToppings: [],
  burgerSauce: [],
  sidePotato: '',
  sideRibCorn: false,
  drinkChoice: '',
  coffeeTemperature: '',
  coffeeSyrup: '',
  coffeeMilk: '',
  specialNote: '',
}
export default function OrderForm() {
  const [form, setForm] = useState(initialFormState)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid =
    form.guestName.trim().length > 0 &&
    form.burgerDoneness &&
    form.sidePotato

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setSubmitting(true)
    setError(null)

    const { error: insertError } = await supabase.from('orders').insert({
      guest_name: form.guestName.trim(),
      burger_doneness: form.burgerDoneness,
      burger_toppings: form.burgerToppings,
      burger_sauce: form.burgerSauce,
      side_potato: form.sidePotato,
      side_rib_corn: form.sideRibCorn,
      drink_choice: form.drinkChoice || null,
      coffee_temperature: form.coffeeTemperature || null,
      coffee_syrup: form.coffeeSyrup || null,
      coffee_milk: form.coffeeMilk || null,
      special_note: form.specialNote.trim() || null,
    })

    setSubmitting(false)

    if (insertError) {
      setError('Sipariş gönderilemedi, tekrar dener misin?')
      console.error(insertError)
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <ThankYouScreen
        guestName={form.guestName}
        onNewOrder={() => {
          setForm(initialFormState)
          setSubmitted(false)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-5 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Zehra'nın Menüsü 🍔
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Siparişini seç, mutfağa gönderelim.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Misafir adı */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Adın
            </label>
            <input
              type="text"
              value={form.guestName}
              onChange={(e) => updateField('guestName', e.target.value)}
              placeholder="İsmini yaz"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500"
            />
          </div>

          <hr className="my-6 border-gray-200" />
          <h2 className="text-lg font-bold text-gray-800 mb-4">🍔 Hamburger</h2>

          <OptionSelector
            label="Pişme Derecesi"
            options={BURGER_DONENESS}
            value={form.burgerDoneness}
            onChange={(val) => updateField('burgerDoneness', val)}
          />

          <MultiOptionSelector
            label="İç Malzemeler"
            options={BURGER_TOPPINGS}
            values={form.burgerToppings}
            onChange={(val) => updateField('burgerToppings', val)}
          />

          <MultiOptionSelector
            label="Sos"
            options={BURGER_SAUCES}
            value={form.burgerSauce}
            onChange={(val) => updateField('burgerSauce', val)}
          />

          <hr className="my-6 border-gray-200" />
          <h2 className="text-lg font-bold text-gray-800 mb-4">🍟 Yan Lezzetler</h2>

          <OptionSelector
            label="Patates"
            options={SIDE_POTATO_OPTIONS}
            value={form.sidePotato}
            onChange={(val) => updateField('sidePotato', val)}
          />

          <div className="mb-6 flex items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3">
            <span className="text-sm font-semibold text-gray-700">
              Kaburga Mısır
            </span>
            <button
              type="button"
              onClick={() => updateField('sideRibCorn', !form.sideRibCorn)}
              className={`w-12 h-7 rounded-full relative transition-colors ${
                form.sideRibCorn ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  form.sideRibCorn ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <hr className="my-6 border-gray-200" />
<h2 className="text-lg font-bold text-gray-800 mb-4">🥤 İçecekler</h2>

<OptionSelector
  label="İçecek Seçimi"
  options={DRINK_OPTIONS}
  value={form.drinkChoice}
  onChange={(val) => updateField('drinkChoice', val)}
/>

          <hr className="my-6 border-gray-200" />
          <h2 className="text-lg font-bold text-gray-800 mb-4">☕ Kahve Barı</h2>

          <OptionSelector
            label="Sıcaklık"
            options={COFFEE_TEMPERATURE}
            value={form.coffeeTemperature}
            onChange={(val) => updateField('coffeeTemperature', val)}
          />

          <OptionSelector
            label="Aroma / Şurup"
            options={COFFEE_SYRUP}
            value={form.coffeeSyrup}
            onChange={(val) => updateField('coffeeSyrup', val)}
          />

          <OptionSelector
            label="Süt"
            options={COFFEE_MILK}
            value={form.coffeeMilk}
            onChange={(val) => updateField('coffeeMilk', val)}
          />

          <hr className="my-6 border-gray-200" />

          <div className="mb-8">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Özel Not
            </label>
            <textarea
              value={form.specialNote}
              onChange={(e) => updateField('specialNote', e.target.value)}
              placeholder="Alerji, ekstra istek vs."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || submitting}
            className="w-full bg-orange-500 text-white font-semibold py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed active:bg-orange-600 transition-colors"
          >
            {submitting ? 'Gönderiliyor...' : 'Siparişi Gönder'}
          </button>
        </form>
      </div>
    </div>
  )
}