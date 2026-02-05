import { motion, AnimatePresence } from 'framer-motion'

interface ComparisonRowProps {
  label: string
  currentValue: string
  betterValue: string
  isBetterWay: boolean
}

export function ComparisonRow({
  label,
  currentValue,
  betterValue,
  isBetterWay,
}: ComparisonRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b-2 border-black last:border-b-0">
      {/* Label */}
      <span className="font-plus-jakarta font-extrabold text-xs md:text-sm uppercase tracking-[0.5px] text-black">
        {label}
      </span>

      {/* Animated Badge */}
      <div className="relative min-w-[120px] md:min-w-[140px] h-8 flex items-center justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={isBetterWay ? 'better' : 'current'}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`px-3 py-1.5 border-2 border-black font-plus-jakarta font-extrabold text-[10px] md:text-xs uppercase tracking-[0.5px] text-black ${
              isBetterWay ? 'bg-toggle-green' : 'bg-badge-red'
            }`}
            style={{ boxShadow: '3px 3px 0px 0px black' }}
          >
            {isBetterWay ? betterValue : currentValue}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
