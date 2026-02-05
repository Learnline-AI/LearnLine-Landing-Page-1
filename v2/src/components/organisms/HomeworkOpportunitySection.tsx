import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Toggle } from '../atoms/Toggle'
import { COMPARISON_COUNT, ComparisonTable } from '../molecules/ComparisonTable'

// Placeholder images - replace with actual Figma exports
const CURRENT_WAY_IMAGE = 'https://www.figma.com/api/mcp/asset/2f1f8121-6aaa-4afa-a1f6-3df37755134a'
const BETTER_WAY_IMAGE = 'https://www.figma.com/api/mcp/asset/2f1f8121-6aaa-4afa-a1f6-3df37755134a'
const BETTER_WAY_VIDEO_ALPHA = '/assets/videos/better-way-alpha.webm'
const BETTER_WAY_REVERSE_VIDEO_ALPHA = '/assets/videos/better-way-reverse-alpha.webm'
const VIDEO_MASK_IMAGE = '/assets/masks/homework-illustration-mask.png'
const TRANSITION_DURATION_MS = 7500
const TRANSITION_DURATION_S = TRANSITION_DURATION_MS / 1000
const PROGRESS_EPSILON = 0.001

const clampProgress = (value: number) => Math.min(1, Math.max(0, value))

export function HomeworkOpportunitySection() {
  const [isBetterWay, setIsBetterWay] = useState(false)
  const [activeCount, setActiveCount] = useState(0)
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'reverse' | null>(null)
  const [supportsWebM, setSupportsWebM] = useState<boolean | null>(null)
  const [visibleDirection, setVisibleDirection] = useState<'forward' | 'reverse'>('forward')
  const videoForwardRef = useRef<HTMLVideoElement | null>(null)
  const videoReverseRef = useRef<HTMLVideoElement | null>(null)
  const progressRef = useRef(0)
  const activeCountRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const pendingSeekRef = useRef(0)
  const transitionTokenRef = useRef(0)

  const stopRaf = () => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  const updateActiveCount = (progress: number) => {
    const nextCount = Math.max(0, Math.min(COMPARISON_COUNT, Math.floor(progress * COMPARISON_COUNT + 1e-6)))
    if (nextCount !== activeCountRef.current) {
      activeCountRef.current = nextCount
      setActiveCount(nextCount)
    }
  }

  const setProgress = (progress: number) => {
    const clamped = clampProgress(progress)
    progressRef.current = clamped
    updateActiveCount(clamped)
  }

  const pauseVideos = () => {
    videoForwardRef.current?.pause()
    videoReverseRef.current?.pause()
  }

  const getProgressFromVideo = (direction: 'forward' | 'reverse') => {
    const video = direction === 'forward' ? videoForwardRef.current : videoReverseRef.current
    if (!video) {
      return progressRef.current
    }

    const raw = direction === 'forward'
      ? video.currentTime / TRANSITION_DURATION_S
      : 1 - video.currentTime / TRANSITION_DURATION_S
    return clampProgress(raw)
  }

  const finalizeTransition = (direction: 'forward' | 'reverse') => {
    stopRaf()
    transitionTokenRef.current += 1
    const finalProgress = direction === 'forward' ? 1 : 0
    setProgress(finalProgress)
    setIsBetterWay(finalProgress === 1)
    setTransitionDirection(null)
    if (supportsWebM === true && direction === 'forward' && videoForwardRef.current) {
      videoForwardRef.current.currentTime = TRANSITION_DURATION_S
    }
    setVisibleDirection(direction)
    pauseVideos()
  }

  const startTransition = (direction: 'forward' | 'reverse', fromProgress: number) => {
    stopRaf()
    transitionTokenRef.current += 1
    const clamped = clampProgress(fromProgress)
    setTransitionDirection(direction)
    setIsBetterWay(direction === 'forward')
    setProgress(clamped)
    pendingSeekRef.current = clamped
  }

  const handleToggle = () => {
    const currentProgress = transitionDirection
      ? supportsWebM === true
        ? getProgressFromVideo(transitionDirection)
        : progressRef.current
      : isBetterWay
        ? 1
        : 0
    const nextDirection = transitionDirection === 'forward'
      ? 'reverse'
      : transitionDirection === 'reverse'
        ? 'forward'
        : isBetterWay
          ? 'reverse'
          : 'forward'

    startTransition(nextDirection, currentProgress)
  }

  useEffect(() => {
    const video = document.createElement('video')
    const canPlay = video.canPlayType('video/webm; codecs="vp9"')
    setSupportsWebM(Boolean(canPlay))
  }, [])

  useEffect(() => {
    if (supportsWebM !== true) {
      return
    }

    videoForwardRef.current?.load()
    videoReverseRef.current?.load()
  }, [supportsWebM])

  useEffect(() => {
    if (!transitionDirection) {
      const targetProgress = isBetterWay ? 1 : 0
      setProgress(targetProgress)
      pauseVideos()
    }
  }, [isBetterWay, transitionDirection])

  useEffect(() => {
    if (!transitionDirection) {
      return
    }

    const token = transitionTokenRef.current
    const direction = transitionDirection
    const startProgress = pendingSeekRef.current

    if (supportsWebM !== true) {
      const startTime = performance.now()
      const tick = (now: number) => {
        if (transitionTokenRef.current !== token) {
          return
        }

        const elapsed = now - startTime
        const delta = elapsed / TRANSITION_DURATION_MS
        const nextProgress = direction === 'forward'
          ? startProgress + delta
          : startProgress - delta
        const clampedNext = clampProgress(nextProgress)
        setProgress(clampedNext)

        if (
          (direction === 'forward' && clampedNext >= 1 - PROGRESS_EPSILON) ||
          (direction === 'reverse' && clampedNext <= PROGRESS_EPSILON)
        ) {
          finalizeTransition(direction)
          return
        }

        rafRef.current = window.requestAnimationFrame(tick)
      }

      rafRef.current = window.requestAnimationFrame(tick)
      return
    }

    const activeVideo = direction === 'forward' ? videoForwardRef.current : videoReverseRef.current
    const inactiveVideo = direction === 'forward' ? videoReverseRef.current : videoForwardRef.current
    if (!activeVideo) {
      return
    }

    const targetProgress = startProgress
    const targetTime = direction === 'forward'
      ? targetProgress * TRANSITION_DURATION_S
      : (1 - targetProgress) * TRANSITION_DURATION_S

    const startPlayback = () => {
      if (transitionTokenRef.current !== token) {
        return
      }
      setVisibleDirection(direction)
      activeVideo.playbackRate = 1
      inactiveVideo?.pause()
      const playPromise = activeVideo.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }

      const tick = () => {
        if (transitionTokenRef.current !== token) {
          return
        }
        const progress = getProgressFromVideo(direction)
        setProgress(progress)

        if (
          (direction === 'forward' && progress >= 1 - PROGRESS_EPSILON) ||
          (direction === 'reverse' && progress <= PROGRESS_EPSILON)
        ) {
          finalizeTransition(direction)
          return
        }

        rafRef.current = window.requestAnimationFrame(tick)
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    const seekAndStart = () => {
      if (transitionTokenRef.current !== token) {
        return
      }
      const clampedTime = Math.min(Math.max(targetTime, 0), TRANSITION_DURATION_S - PROGRESS_EPSILON)
      const needsSeek = Math.abs(activeVideo.currentTime - clampedTime) > 0.01

      if (!needsSeek && activeVideo.readyState >= 2) {
        startPlayback()
        return
      }

      const handleSeeked = () => {
        startPlayback()
      }

      activeVideo.addEventListener('seeked', handleSeeked, { once: true })
      activeVideo.currentTime = clampedTime
    }

    stopRaf()
    pauseVideos()
    inactiveVideo?.pause()

    if (activeVideo.readyState >= 1) {
      seekAndStart()
    } else {
      activeVideo.addEventListener('loadedmetadata', seekAndStart, { once: true })
    }
  }, [transitionDirection, supportsWebM])

  useEffect(() => () => stopRaf(), [])

  const showVideo = supportsWebM === true && (transitionDirection !== null || isBetterWay)
  const isReverseVisible = visibleDirection === 'reverse'
  const maskStyle: CSSProperties = {
    WebkitMaskImage: `url(${VIDEO_MASK_IMAGE})`,
    maskImage: `url(${VIDEO_MASK_IMAGE})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
  }

  return (
    <section className="py-16 md:py-24 px-4 lg:px-8 bg-offwhite">
      <div className="max-w-[1400px] mx-auto">
        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Side - Video/Illustration */}
          <div className="flex-1 w-full lg:w-auto order-2 lg:order-1">
            <div className="flex flex-col items-center">
              {/* Tilted frame container */}
              <div
                className="relative -rotate-[3.68deg] w-full max-w-[580px] aspect-[4/3]"
              >
                {supportsWebM === true ? (
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${showVideo ? 'opacity-100' : 'opacity-0'}`}
                    style={maskStyle}
                    aria-hidden={!showVideo}
                  >
                    <video
                      ref={videoForwardRef}
                      poster={BETTER_WAY_IMAGE}
                      muted
                      playsInline
                      preload="auto"
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ${
                        isReverseVisible ? 'opacity-0' : 'opacity-100'
                      }`}
                      onEnded={(e) => {
                        const video = e.currentTarget
                        video.pause()
                      }}
                    >
                      <source src={BETTER_WAY_VIDEO_ALPHA} type="video/webm" />
                    </video>
                    <video
                      ref={videoReverseRef}
                      poster={BETTER_WAY_IMAGE}
                      muted
                      playsInline
                      preload="auto"
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ${
                        isReverseVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      onEnded={(e) => {
                        const video = e.currentTarget
                        video.pause()
                      }}
                    >
                      <source src={BETTER_WAY_REVERSE_VIDEO_ALPHA} type="video/webm" />
                    </video>
                  </div>
                ) : null}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${showVideo ? 'opacity-0' : 'opacity-100'}`}
                  style={maskStyle}
                >
                  <img
                    src={isBetterWay ? BETTER_WAY_IMAGE : CURRENT_WAY_IMAGE}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Right Side - Headline + Comparison Table */}
          <div className="flex-1 w-full lg:w-auto order-1 lg:order-2">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="font-plus-jakarta font-extrabold text-4xl md:text-5xl lg:text-[70px] leading-[1.05] tracking-[-2px] lg:tracking-[-3px] text-black">
                Every homework
                <br />
                hour is a{' '}
                <span className={`font-playfair italic lowercase transition-colors duration-300 ${isBetterWay ? 'text-green-deep' : 'text-coral'}`}>
                  mastery
                </span>
                <br />
                opportunity.
              </h2>
            </motion.div>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ComparisonTable isBetterWay={isBetterWay} activeCount={activeCount} />
            </motion.div>
          </div>
        </div>

        {/* Toggle - centered below both columns */}
        <div className="flex justify-center mt-12">
          <Toggle isOn={isBetterWay} onToggle={handleToggle} />
        </div>

      </div>
    </section>
  )
}
