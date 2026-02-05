import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface PreviewWindowProps {
  title?: string
  children?: ReactNode
  rotation?: number
  onMinimizeClick?: () => void
}

export function PreviewWindow({
  title = 'PREVIEW_MODE.mov',
  children,
  rotation = 3.93,
  onMinimizeClick,
}: PreviewWindowProps) {
  const [isShaking, setIsShaking] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const shakeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (shakeTimeoutRef.current !== null) {
        window.clearTimeout(shakeTimeoutRef.current)
      }
    }
  }, [])

  const handleCloseClick = () => {
    if (isShaking) return
    setIsShaking(true)
    if (shakeTimeoutRef.current !== null) {
      window.clearTimeout(shakeTimeoutRef.current)
    }
    shakeTimeoutRef.current = window.setTimeout(() => {
      setIsShaking(false)
    }, 350)
  }

  const handleMaximizeClick = () => {
    setIsMaximized((prev) => !prev)
  }

  return (
    <div className={`preview-window-shell ${isShaking ? 'preview-window-shell--shake' : ''}`}>
      <motion.div
        className="bg-white border-2 border-black"
        style={{
          boxShadow: '8px 8px 0px 0px black',
          transform: `rotate(${rotation}deg)`
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Header Bar */}
        <div className="bg-coral border-b-2 border-black px-4 py-3 flex items-center justify-between">
          <span className="font-plus-jakarta font-extrabold text-[10px] uppercase tracking-[1px] text-black/60">
            {title}
          </span>
          <div className="flex gap-2">
            {/* Minimize */}
            <div
              className="w-4 h-4 bg-white border-2 border-black flex items-center justify-center"
              onClick={onMinimizeClick}
            >
              <div className="w-2 h-[2px] bg-black" />
            </div>
            {/* Maximize */}
            <div
              className="w-4 h-4 bg-white border-2 border-black flex items-center justify-center"
              onClick={handleMaximizeClick}
            >
              <div className="w-2 h-2 border border-black" />
            </div>
            {/* Close */}
            <div
              className={`w-4 h-4 bg-black border-2 border-black flex items-center justify-center preview-close-btn ${
                isShaking ? 'preview-close-btn--flash' : ''
              }`}
              onClick={handleCloseClick}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-white">
                <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`p-3 md:p-4 min-h-[250px] md:min-h-[300px] preview-window-content ${
            isMaximized ? 'preview-window-content--max' : ''
          }`}
        >
          {children || (
            <div className="bg-coral-light border-2 border-black w-full h-full min-h-[200px] flex items-center justify-center">
              <span className="font-plus-jakarta font-extrabold text-sm uppercase tracking-[1.4px] text-black/40">
                Preview Content
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
