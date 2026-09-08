export default function OptionSelector({ label, options, value, onChange }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
                ${
                  isActive
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-300 active:bg-gray-100'
                }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}