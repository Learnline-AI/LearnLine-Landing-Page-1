import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ProductMockupProps {
  title?: string
  children?: ReactNode
}

export function ProductMockup({ title = 'PREVIEW_MODE.mov', children }: ProductMockupProps) {
  return (
    <motion.div
      className="bg-white border-2 border-black shadow-brutal p-[2px] rotate-1"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Header Bar */}
      <div className="bg-coral border-b-2 border-black px-4 py-3 flex items-center justify-between">
        <span className="font-plus-jakarta font-extrabold text-[10px] uppercase tracking-[1px] text-black/60">
          {title}
        </span>
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-white border-2 border-black flex items-center justify-center">
            <div className="w-1 h-1 bg-black" />
          </div>
          <div className="w-4 h-4 bg-white border-2 border-black flex items-center justify-center">
            <div className="w-2 h-[2px] bg-black" />
          </div>
          <div className="w-4 h-4 bg-black border-2 border-black flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-white">
              <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-10">
        <div className="bg-coral-light border-2 border-black aspect-square flex items-center justify-center">
          {children || (
            <div className="text-center p-8">
              {/* Icon placeholder */}
              <div className="w-24 h-24 mx-auto mb-4 bg-white border-2 border-black flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-black">
                  <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className="font-plus-jakarta font-extrabold text-sm uppercase tracking-[1.4px] text-black">
                Character Engine
              </span>
              <p className="font-plus-jakarta text-xs text-black/40 mt-2">
                [Waiting for Phase 3 Image Generation]
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
