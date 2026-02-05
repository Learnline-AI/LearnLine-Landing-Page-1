import { motion, useAnimation } from 'framer-motion'
import { useMemo, useRef, useState, useEffect, type KeyboardEvent } from 'react'

interface FeatureCardProps {
  label: string
  rotation?: number
  delay?: number
  landingY?: number
  className?: string
  labelClassName?: string
  interactive?: boolean
  onWiggle?: () => void
  wiggleKey?: number
  variant?: 'falling' | 'static'
}

export function FeatureCard({
  label,
  rotation = 0,
  delay = 0,
  landingY = 0,
  className = '',
  labelClassName = '',
  interactive = false,
  onWiggle,
  wiggleKey,
  variant = 'falling',
}: FeatureCardProps) {
  const isStatic = variant === 'static'
  const [isLanded, setIsLanded] = useState(isStatic)
  const [isFalling, setIsFalling] = useState(!isStatic)
  const wiggleControls = useAnimation()
  const lastHoverWiggleAt = useRef(0)

  // Trigger "landed" state after drop animation completes
  useEffect(() => {
    if (isStatic) {
      return
    }
    const landingTime = (delay + 2.5) * 1000 // delay + drop duration
    const timer = setTimeout(() => {
      setIsLanded(true)
      setIsFalling(false)
    }, landingTime)
    return () => clearTimeout(timer)
  }, [delay, isStatic])

  // Randomize the wobble duration for organic feel
  const wobbleDuration = useMemo(() => 10 + Math.random() * 6, [])

  const startWiggle = (variantType: 'click' | 'hover') => {
    const isHover = variantType === 'hover'
    void wiggleControls.start({
      rotate: isHover ? [0, -3, 3, -2, 0] : [0, -6, 6, -4, 3, 0],
      y: isHover ? [0, -3, 1, -2, 0] : [0, -6, 2, -4, 0],
      transition: { duration: isHover ? 0.35 : 0.5, ease: 'easeInOut' },
    })
  }

  useEffect(() => {
    if (!wiggleKey) {
      return
    }
    startWiggle('click')
  }, [wiggleKey, wiggleControls])

  const handleWiggle = () => {
    if (onWiggle) {
      onWiggle()
      return
    }
    startWiggle('click')
  }

  const handleHoverWiggle = () => {
    const now = Date.now()
    if (now - lastHoverWiggleAt.current < 300) {
      return
    }
    lastHoverWiggleAt.current = now
    startWiggle('hover')
  }

  const interactiveProps = interactive
    ? {
        role: 'button' as const,
        tabIndex: 0,
        onClick: handleWiggle,
        onHoverStart: handleHoverWiggle,
        onTouchStart: handleHoverWiggle,
        onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleWiggle()
          }
        },
      }
    : {}

  return (
    <motion.div
      {...interactiveProps}
      className={`relative ${interactive ? 'cursor-pointer select-none pointer-events-auto' : ''}`}
      style={{
        // Start behind hero (z-index 1), come to front when landed (z-index 20)
        zIndex: isFalling ? 1 : 20,
      }}
      // Initial state: completely outside viewport at top
      initial={
        isStatic
          ? {
              y: landingY,
              opacity: 1,
              rotate: rotation,
              scale: 1,
            }
          : {
              y: -1200, // Start well above the viewport (off-screen)
              opacity: 1, // Fully visible from the start
              rotate: rotation - 10, // Start with extra rotation for tumbling effect
              scale: 1,
            }
      }
      // Animate based on state
      animate={
        isStatic
          ? {
              y: landingY,
              opacity: 1,
              rotate: rotation,
              scale: 1,
            }
          : isLanded
            ? {
                // After landing: gentle floating wobble
                y: [landingY, landingY - 12, landingY + 8, landingY],
                x: [0, 15, -15, 0],
                rotate: [rotation, rotation + 4, rotation - 4, rotation],
                opacity: 1,
                scale: 1,
              }
            : {
                // Landing state
                y: landingY,
                opacity: 1,
                rotate: rotation,
                scale: 1,
              }
      }
      transition={
        isStatic
          ? { duration: 0 }
          : isLanded
            ? {
                // Infinite wobble
                duration: wobbleDuration,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {
                // Drop with bounce easing - longer duration for longer fall
                delay: delay,
                duration: 2.5,
                ease: [0.16, 1, 0.3, 1], // Bouncy easing
              }
      }
    >
      <motion.div
        animate={wiggleControls}
        className={`bg-white border-2 border-black shadow-brutal px-[26px] py-[14px] whitespace-nowrap ${className}`}
      >
        <span className={`font-plus-jakarta font-extrabold text-xs uppercase tracking-[1.2px] text-black ${labelClassName}`}>
          {label}
        </span>
      </motion.div>
    </motion.div>
  )
}
