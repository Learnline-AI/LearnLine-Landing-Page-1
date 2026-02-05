import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Step {
  label: string
  angle: number
  distance: number
}

interface LearningLoopProps {
  activeTab: string
}

const STEPS: Step[] = [
  { label: 'Plan', angle: -90, distance: 160 },      // 12 o'clock
  { label: 'Learn', angle: -45, distance: 160 },     // 1:30
  { label: 'Diagnose', angle: 0, distance: 175 },    // 3 o'clock
  { label: 'Adapt', angle: 45, distance: 160 },      // 4:30
  { label: 'Practice', angle: 90, distance: 165 },   // 6 o'clock
  { label: 'Test', angle: 135, distance: 160 },      // 7:30
  { label: 'Improve', angle: 180, distance: 175 },   // 9 o'clock
  { label: 'Track', angle: -135, distance: 160 },    // 10:30
]

// Map tabs to arrow rotation angles
const TAB_ROTATIONS: Record<string, number> = {
  'STUDENT': 0,      // Arrow points up (12 o'clock)
  'TEACHER': 90,     // Arrow points right (3 o'clock)
  'PARENT': 180,     // Arrow points down (6 o'clock)
  'SCHOOL': 270,     // Arrow points left (9 o'clock)
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export function LearningLoop({ activeTab }: LearningLoopProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const arrowRotation = TAB_ROTATIONS[activeTab] || 0

  const getDistance = (baseDistance: number) => {
    return isDesktop ? baseDistance : baseDistance * 0.76
  }

  return (
    <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
      {/* Connecting lines/circle (subtle) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 420 420"
      >
        {/* Outer connecting circle */}
        <circle
          cx="210"
          cy="210"
          r="145"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeDasharray="8 8"
          opacity="0.15"
        />

        {/* Connecting lines from center to each step (static) */}
        {STEPS.map((step, index) => {
          const angleRad = (step.angle * Math.PI) / 180
          const endX = 210 + Math.cos(angleRad) * 100
          const endY = 210 + Math.sin(angleRad) * 100

          return (
            <line
              key={`line-${index}`}
              x1="210"
              y1="210"
              x2={endX}
              y2={endY}
              stroke="black"
              strokeWidth="2"
              opacity="0.2"
            />
          )
        })}
      </svg>

      {/* Center circle with rotating arrow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[140px] h-[140px] md:w-[180px] md:h-[180px]
          bg-coral border-[4px] border-black rounded-full
          flex items-center justify-center z-10"
        style={{ boxShadow: '0px 0px 8px rgba(0,0,0,0.2)' }}
        animate={{ rotate: arrowRotation }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Arrow/cursor icon pointing up */}
        <svg
          className="w-8 h-16 md:w-10 md:h-20"
          viewBox="0 0 40 80"
          fill="none"
        >
          <path
            d="M20 0L35 30H25V80H15V30H5L20 0Z"
            fill="black"
          />
        </svg>
      </motion.div>

      {/* Step labels positioned radially (text follows spoke direction) */}
      {STEPS.map((step) => {
        const distance = getDistance(step.distance)

        return (
          <div
            key={step.label}
            className="absolute left-1/2 top-1/2 select-none"
            style={{
              transform: `
                translate(-50%, -50%)
                rotate(${step.angle}deg)
                translateX(${distance}px)
              `,
            }}
          >
            <span
              className="font-plus-jakarta font-extrabold text-sm md:text-lg uppercase tracking-[0.5px] text-black"
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
