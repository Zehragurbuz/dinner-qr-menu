import { Check } from 'lucide-react'

export default function MultiOptionSelector({ label, options, values, onChange }) {
  const toggle = (option) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option))
    } else {
      onChange([...values, option])
    }
  }

  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = values.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium border transition-colors
                ${
                  isActive
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-300 active:bg-gray-100'
                }`}
            >
              {isActive && <Check size={14} />}
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}