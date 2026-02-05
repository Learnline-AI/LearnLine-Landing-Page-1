import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatableDial } from '../molecules/RotatableDial'
import { PreviewWindow } from '../molecules/PreviewWindow'

const BASE_URL = import.meta.env.BASE_URL

// Preview content for each dial position (placeholders - to be customized later)
function GradePreview() {
  return (
    <div className="bg-coral-light border-2 border-black p-0 h-full min-h-[200px] flex items-center justify-center overflow-hidden">
      <img
        src={`${BASE_URL}assets/images/grade-preview.png`}
        alt="Grade preview showing feedback on student work"
        className="preview-grade-image w-full h-full object-contain"
      />
    </div>
  )
}

function DiagnosePreview() {
  return (
    <div className="bg-coral-light border-2 border-black p-6 h-full min-h-[200px] flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke="black" strokeWidth="2" />
          <path d="M16 10v6l4 2" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span className="font-plus-jakarta font-extrabold text-sm uppercase tracking-[1px] text-black">
        Diagnose
      </span>
      <p className="font-plus-jakarta text-xs text-black/60 mt-2 text-center max-w-[200px]">
        Identify learning gaps and areas for improvement
      </p>
    </div>
  )
}

function RemediatePreview() {
  return (
    <div className="bg-coral-light border-2 border-black p-6 h-full min-h-[200px] flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M8 24l8-16 8 16" stroke="black" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 20h8" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span className="font-plus-jakarta font-extrabold text-sm uppercase tracking-[1px] text-black">
        Remediate
      </span>
      <p className="font-plus-jakarta text-xs text-black/60 mt-2 text-center max-w-[200px]">
        Targeted interventions to address specific weaknesses
      </p>
    </div>
  )
}

function PracticePreview() {
  return (
    <div className="bg-coral-light border-2 border-black p-6 h-full min-h-[200px] flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 16a10 10 0 0120 0" stroke="black" strokeWidth="2" />
          <path d="M16 16l4-8" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2" fill="black" />
        </svg>
      </div>
      <span className="font-plus-jakarta font-extrabold text-sm uppercase tracking-[1px] text-black">
        Practice
      </span>
      <p className="font-plus-jakarta text-xs text-black/60 mt-2 text-center max-w-[200px]">
        Reinforce learning with personalized practice exercises
      </p>
    </div>
  )
}

export function HowItWorksSection() {
  const [activePosition, setActivePosition] = useState('Grade')
  const [dialTargetPosition, setDialTargetPosition] = useState<string | undefined>(undefined)

  const handleDialChange = (position: string) => {
    setActivePosition(position)
    setDialTargetPosition(undefined)
  }

  const handleMinimizeAdvance = () => {
    const order = ['Grade', 'Diagnose', 'Remediate', 'Practice']
    const currentIndex = order.indexOf(activePosition)
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % order.length
    const nextPosition = order[nextIndex]

    setActivePosition(nextPosition)
    setDialTargetPosition(nextPosition)
  }

  const renderPreviewContent = () => {
    switch (activePosition) {
      case 'Grade':
        return <GradePreview />
      case 'Diagnose':
        return <DiagnosePreview />
      case 'Remediate':
        return <RemediatePreview />
      case 'Practice':
        return <PracticePreview />
      default:
        return <GradePreview />
    }
  }

  return (
    <section className="py-16 md:py-24 px-4 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-plus-jakarta font-extrabold text-4xl md:text-5xl lg:text-[70px] leading-[1.05] tracking-[-2px] lg:tracking-[-3px] text-black">
            How It{' '}
            <span className="font-playfair italic text-coral">Works</span>.
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Side - Rotatable Dial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <RotatableDial
              onPositionChange={handleDialChange}
              initialPosition="Grade"
              targetPosition={dialTargetPosition}
            />
          </motion.div>

          {/* Right Side - Preview Window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-[400px] md:max-w-[450px]"
          >
            <PreviewWindow
              title="Instant Grading with on page highlights!"
              rotation={4.5}
              onMinimizeClick={handleMinimizeAdvance}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePosition}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                >
                  {renderPreviewContent()}
                </motion.div>
              </AnimatePresence>
            </PreviewWindow>
          </motion.div>
        </div>

        {/* Hint text for interaction */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8 text-black/40 text-sm font-plus-jakarta"
        >
          Drag the dial to explore
        </motion.p>
      </div>
    </section>
  )
}
