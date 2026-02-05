import { ComparisonRow } from './ComparisonRow'

interface ComparisonTableProps {
  isBetterWay: boolean
  activeCount: number
}

const COMPARISONS = [
  { label: 'LEARNING MEASURED', current: 'NEVER', better: 'EVERY SESSION' },
  { label: 'GAP DETECTION', current: 'AFTER EXAMS', better: '3 MINUTES' },
  { label: 'TEACHER TIME', current: '2HR GRADING', better: '0 GRADING' },
  { label: 'COST TO PARENTS', current: '+₹5000 TUITION', better: '10X CHEAPER' },
]

export const COMPARISON_COUNT = COMPARISONS.length

export function ComparisonTable({ isBetterWay, activeCount }: ComparisonTableProps) {
  return (
    <div
      className="bg-white border-2 border-black overflow-hidden"
      style={{ boxShadow: '8px 8px 0px 0px black' }}
    >
      {/* Header Bar - changes color based on toggle state */}
      <div className={`px-4 py-3 border-b-2 border-black flex items-center justify-between transition-colors duration-300 ${isBetterWay ? 'bg-toggle-green' : 'bg-coral'}`}>
        <span className="font-plus-jakarta font-extrabold text-xs uppercase tracking-[1px] text-black">
          ADAPTIVE_TECH
        </span>
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-badge-red border border-black/30" />
          <div className="w-3 h-3 rounded-full bg-[#FFE066] border border-black/30" />
          <div className="w-3 h-3 rounded-full bg-toggle-green border border-black/30" />
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="px-4 py-2">
        {COMPARISONS.map((comparison, index) => (
          <ComparisonRow
            key={comparison.label}
            label={comparison.label}
            currentValue={comparison.current}
            betterValue={comparison.better}
            isBetterWay={index < activeCount}
          />
        ))}
      </div>
    </div>
  )
}
