import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Button } from '../atoms/Button'
import { SocialProof } from '../molecules/SocialProof'
import { ProductMockup } from '../molecules/ProductMockup'
import { FeatureCard } from '../molecules/FeatureCard'

// Feature cards for Schools & Tutoring Centres - 8 cards, subtle angles, spaced out
const FEATURE_CARDS_BASE = [
  { label: 'Instant Grading', rotation: -3, landingY: 25, left: '3%' },
  { label: 'Handwriting Recognition', rotation: 4, landingY: 55, left: '14%' },
  { label: 'Progress Reports', rotation: -2, landingY: 20, left: '30%' },
  { label: 'Mastery Tracking', rotation: 5, landingY: 60, left: '42%' },
  { label: 'Gap Detection', rotation: -4, landingY: 30, left: '56%' },
  { label: 'Zero Grading Time', rotation: 3, landingY: 55, left: '68%' },
  { label: 'Parent Insights', rotation: -3, landingY: 25, left: '80%' },
  { label: 'Adaptive Learning', rotation: 4, landingY: 60, left: '90%' },
]

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function HeroSection() {
  // Randomize the fall order on each page load
  const featureCards = useMemo(() => {
    // Create random delays for 8 cards (0.2s to 1.6s)
    const delays = shuffleArray([0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6])
    return FEATURE_CARDS_BASE.map((card, index) => ({
      ...card,
      delay: delays[index],
    }))
  }, [])

  const [wiggleCounters, setWiggleCounters] = useState<Record<string, number>>({})

  const triggerWiggle = (label: string) => {
    setWiggleCounters((prev) => ({
      ...prev,
      [label]: (prev[label] ?? 0) + 1,
    }))
  }

  return (
    <section className="pt-32 pb-8 px-4 lg:px-8 relative overflow-visible">
      {/* Feature Cards - Positioned absolutely to fall from top */}
      {/* This container spans the full hero and cards fall through it */}
      <div className="absolute inset-0 overflow-visible hidden lg:block">
        <div className="max-w-[1400px] mx-auto relative h-full">
          {/* Cards landing zone - positioned at bottom of hero */}
          <div className="absolute bottom-0 left-0 right-0 h-[130px] z-20 pointer-events-auto">
            {featureCards.map((card) => (
              <div
                key={card.label}
                className="absolute pointer-events-auto z-20"
                style={{ left: card.left, top: 0 }}
              >
                <FeatureCard
                  label={card.label}
                  rotation={card.rotation}
                  delay={card.delay}
                  landingY={card.landingY}
                  interactive
                  onWiggle={() => triggerWiggle(card.label)}
                  wiggleKey={wiggleCounters[card.label] ?? 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        {/* Main Hero Content - higher z-index so cards fall behind */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 relative z-10">
          {/* Left Side - Text Content */}
          <motion.div
            className="flex-1 max-w-[700px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Headline */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="font-plus-jakarta font-extrabold text-5xl md:text-7xl lg:text-[85px] leading-[1] tracking-[-3px] lg:tracking-[-5px] text-black">
                The world
                <br />
                needs training
                <br />
                <span className="inline">with </span>
                <span className="font-playfair italic text-coral lowercase">
                  impact.
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.div variants={itemVariants} className="max-w-[576px] mb-8">
              <p className="font-plus-jakarta font-bold text-lg md:text-2xl leading-[1.6] text-black/60">
                Transform homework into adaptive mastery learning.{' '}
                <span className="text-gray-900">Same 20 minutes</span>,
                measurable outcomes daily.
              </p>
            </motion.div>

            {/* CTA Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <Button variant="primary" href="#demo">
                Request a Demo
              </Button>
              <SocialProof count="+12K" label="students" />
            </motion.div>
          </motion.div>

          {/* Right Side - Product Mockup */}
          <div className="flex-1 relative w-full lg:w-auto lg:max-w-[500px]">
            <ProductMockup />

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-white border-2 border-black shadow-brutal p-4 flex items-center gap-3 -rotate-3 z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <div className="w-10 h-10 bg-toggle-green border-2 border-black flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-black">
                  <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <span className="block font-plus-jakarta font-extrabold text-[9px] uppercase tracking-[0.9px] text-black/30">
                  Logic System
                </span>
                <span className="block font-plus-jakarta font-extrabold text-sm text-black">
                  ADAPTIVE_V2
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Spacer for cards landing zone */}
        <div className="mt-16 h-[130px] hidden lg:block" />

        {/* Mobile: Simple flex layout (no falling animation) */}
        <div className="mt-12 lg:hidden flex flex-wrap justify-center gap-3">
          {featureCards.slice(0, 5).map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <FeatureCard
                label={card.label}
                rotation={card.rotation / 2}
                landingY={0}
                variant="static"
                interactive
                onWiggle={() => triggerWiggle(card.label)}
                wiggleKey={wiggleCounters[card.label] ?? 0}
                className="shadow-brutal-sm px-4 py-2"
                labelClassName="text-[10px] tracking-[1px]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
