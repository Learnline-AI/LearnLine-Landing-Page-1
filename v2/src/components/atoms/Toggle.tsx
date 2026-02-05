import { motion } from 'framer-motion'

interface ToggleProps {
  isOn: boolean
  onToggle: () => void
}

export function Toggle({ isOn, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center bg-white border-2 border-black p-1 cursor-pointer"
      style={{ boxShadow: '4px 4px 0px 0px black' }}
      aria-label={isOn ? 'Switch to Current Way' : 'Switch to Better Way'}
    >
      {/* Background track with labels */}
      <div className="relative flex items-center">
        {/* Current Way label */}
        <span
          className={`font-plus-jakarta font-extrabold text-xs uppercase tracking-[0.5px] px-4 py-2 z-10 transition-colors duration-200 ${
            !isOn ? 'text-black' : 'text-black/40'
          }`}
        >
          Current Way
        </span>

        {/* Better Way label */}
        <span
          className={`font-plus-jakarta font-extrabold text-xs uppercase tracking-[0.5px] px-4 py-2 z-10 transition-colors duration-200 ${
            isOn ? 'text-black' : 'text-black/40'
          }`}
        >
          Better Way
        </span>

        {/* Sliding indicator - coral for Current Way, green for Better Way */}
        <motion.div
          className={`absolute top-0 bottom-0 border-2 border-black ${isOn ? 'bg-toggle-green' : 'bg-coral'}`}
          initial={false}
          animate={{
            left: isOn ? '50%' : '0%',
            width: '50%',
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          style={{ zIndex: 0 }}
        />
      </div>
    </button>
  )
}
