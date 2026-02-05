import { motion, useMotionValue, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface Position {
  label: string
  angle: number // degrees from 12 o'clock (0 = up)
}

interface RotatableDialProps {
  onPositionChange: (position: string) => void
  initialPosition?: string
  targetPosition?: string
}

const POSITIONS: Position[] = [
  { label: 'Grade', angle: 0 },        // 12 o'clock (arrow points up)
  { label: 'Diagnose', angle: 90 },    // 3 o'clock (arrow points right)
  { label: 'Remediate', angle: 180 },  // 6 o'clock (arrow points down)
  { label: 'Practice', angle: 270 },   // 9 o'clock (arrow points left)
]

const POSITION_ANGLES: Record<string, number> = {
  'Grade': 0,
  'Diagnose': 90,
  'Remediate': 180,
  'Practice': 270,
}

function getPositionFromAngle(angle: number): string {
  // Normalize angle to 0-360
  const normalized = ((angle % 360) + 360) % 360

  // Find closest position
  if (normalized >= 315 || normalized < 45) return 'Grade'
  if (normalized >= 45 && normalized < 135) return 'Diagnose'
  if (normalized >= 135 && normalized < 225) return 'Remediate'
  return 'Practice'
}

function snapToNearest(angle: number): number {
  // Normalize to 0-360
  const normalized = ((angle % 360) + 360) % 360

  // Find nearest 90-degree position
  const positions = [0, 90, 180, 270]
  let nearest = positions[0]
  let minDiff = Math.min(normalized, 360 - normalized) // Handle wrap-around for 0

  for (const pos of positions) {
    let diff = Math.abs(normalized - pos)
    // Handle wrap-around (e.g., 350 is close to 0)
    if (diff > 180) diff = 360 - diff

    if (diff < minDiff) {
      minDiff = diff
      nearest = pos
    }
  }

  // Return the angle that's closest in the current rotation space
  // to avoid jumping (e.g., from 350 to 0 instead of -10)
  const currentRound = Math.floor(angle / 360) * 360
  const candidates = [currentRound + nearest, currentRound + nearest - 360, currentRound + nearest + 360]

  let closestCandidate = candidates[0]
  let minCandidateDiff = Math.abs(angle - candidates[0])

  for (const c of candidates) {
    const diff = Math.abs(angle - c)
    if (diff < minCandidateDiff) {
      minCandidateDiff = diff
      closestCandidate = c
    }
  }

  return closestCandidate
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

export function RotatableDial({
  onPositionChange,
  initialPosition = 'Grade',
  targetPosition,
}: RotatableDialProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const lastAngle = useRef(0)

  // Motion value for rotation (in degrees)
  const rotation = useMotionValue(POSITION_ANGLES[initialPosition] || 0)
  const [currentPosition, setCurrentPosition] = useState(initialPosition)

  useEffect(() => {
    if (!targetPosition || targetPosition === currentPosition) return

    const currentRotation = rotation.get()
    const currentNormalized = ((currentRotation % 360) + 360) % 360
    const targetAngle = POSITION_ANGLES[targetPosition]

    let delta = targetAngle - currentNormalized
    if (delta <= 0) delta += 360
    const nextAngle = currentRotation + delta

    animate(rotation, nextAngle, {
      type: "spring",
      stiffness: 150,
      damping: 20,
      mass: 0.5,
    })
  }, [currentPosition, rotation, targetPosition])

  // Track position changes
  useEffect(() => {
    const unsubscribe = rotation.on("change", (value) => {
      const position = getPositionFromAngle(value)
      if (position !== currentPosition) {
        setCurrentPosition(position)
        onPositionChange(position)
      }
    })
    return unsubscribe
  }, [currentPosition, onPositionChange, rotation])

  // Calculate angle from center of dial to pointer
  const getAngleFromCenter = (clientX: number, clientY: number): number => {
    if (!containerRef.current) return 0

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = clientX - centerX
    const deltaY = clientY - centerY

    // atan2 returns angle from positive X axis, we want from negative Y axis (up)
    // So we rotate by 90 degrees
    const radians = Math.atan2(deltaY, deltaX)
    const degrees = (radians * 180) / Math.PI + 90

    return degrees
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    isDragging.current = true
    lastAngle.current = getAngleFromCenter(e.clientX, e.clientY)

    // Capture pointer for smooth dragging
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return

    const newAngle = getAngleFromCenter(e.clientX, e.clientY)
    let delta = newAngle - lastAngle.current

    // Handle wrap-around (when crossing from 180 to -180 or vice versa)
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360

    rotation.set(rotation.get() + delta)
    lastAngle.current = newAngle
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false

    // Release pointer capture
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)

    // Get current rotation and snap to nearest position with physics
    const currentRotation = rotation.get()
    const targetRotation = snapToNearest(currentRotation)

    // Animate to snapped position with spring physics
    animate(rotation, targetRotation, {
      type: "spring",
      stiffness: 150,
      damping: 20,
      mass: 0.5,
    })
  }

  // Label positioning - outside the dial
  const getLabelStyle = (angle: number) => {
    const radians = ((angle - 90) * Math.PI) / 180 // Convert to math angle (0 = right)
    const distance = isDesktop ? 175 : 135
    const x = Math.cos(radians) * distance
    const y = Math.sin(radians) * distance

    return {
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
    }
  }

  // Handle label click - animate dial to that position
  const handleLabelClick = (targetPosition: string) => {
    const targetAngle = POSITION_ANGLES[targetPosition]

    // Animate to target with spring physics
    animate(rotation, targetAngle, {
      type: "spring",
      stiffness: 150,
      damping: 20,
      mass: 0.5,
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] select-none"
    >
      {/* Outer dashed circle */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 420 420"
      >
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

        {/* Spoke lines to each position */}
        {POSITIONS.map((pos, index) => {
          const radians = ((pos.angle - 90) * Math.PI) / 180
          const endX = 210 + Math.cos(radians) * 100
          const endY = 210 + Math.sin(radians) * 100

          return (
            <line
              key={index}
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

      {/* Position labels (clickable, outside the dial) */}
      {POSITIONS.map((pos) => (
        <div
          key={pos.label}
          className="absolute left-1/2 top-1/2 cursor-pointer"
          style={getLabelStyle(pos.angle)}
          onClick={() => handleLabelClick(pos.label)}
        >
          <span
            className={`
              font-plus-jakarta font-extrabold
              text-sm md:text-lg
              uppercase tracking-[0.5px]
              transition-all duration-300
              hover:text-coral
              ${currentPosition === pos.label
                ? 'text-coral scale-110'
                : 'text-black'
              }
            `}
          >
            {pos.label}
          </span>
        </div>
      ))}

      {/* Rotatable center circle with arrow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[140px] h-[140px] md:w-[180px] md:h-[180px]
          bg-coral border-[4px] border-black rounded-full
          flex items-center justify-center z-10
          cursor-grab active:cursor-grabbing
          touch-none"
        style={{
          rotate: rotation,
          boxShadow: '0px 0px 8px rgba(0,0,0,0.2)'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Arrow pointing up (rotates with the circle) */}
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
    </div>
  )
}
