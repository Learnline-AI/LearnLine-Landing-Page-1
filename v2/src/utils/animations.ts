import type { Variants } from 'framer-motion'

// Fade in with upward movement
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

// Fade in with downward movement
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

// Scale fade in
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  }
}

// Stagger container for children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Stagger container with faster stagger
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

// Spring transition for layout animations
export const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 25
}

// Hover lift effect for cards
export const hoverLift = {
  y: -8,
  transition: { duration: 0.2 }
}

// Neo-brutalist hover (shadow expands)
export const hoverBrutal = {
  y: -4,
  boxShadow: '12px 12px 0px 0px black',
  transition: { duration: 0.2 }
}

// Viewport settings for scroll-triggered animations
export const viewportOnce = {
  once: true,
  margin: '-100px'
}
