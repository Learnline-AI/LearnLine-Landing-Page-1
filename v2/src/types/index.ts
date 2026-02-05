// Common component prop types

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Feature card type
export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
}

// Comparison row type for toggle section
export interface ComparisonRowProps {
  label: string
  currentWayValue: string
  betterWayValue: string
  currentWayVariant: 'warning' | 'neutral'
  betterWayVariant: 'success' | 'neutral'
}

// Learning loop step type
export interface LearningLoopStep {
  id: string
  label: string
  description?: string
  angle: number // Position in degrees around the circle
}

// Toggle state
export type ToggleState = 'current' | 'better'
