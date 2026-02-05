import { motion } from 'framer-motion'

interface TabButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        font-plus-jakarta font-extrabold text-sm uppercase tracking-[0.5px]
        px-6 py-3 border-2 border-black cursor-pointer
        transition-colors duration-200
        ${isActive ? 'bg-toggle-green' : 'bg-white hover:bg-gray-50'}
      `}
      style={{ boxShadow: '4px 4px 0px 0px black' }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.1 }}
    >
      {label}
    </motion.button>
  )
}
