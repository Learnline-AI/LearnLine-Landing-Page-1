import { motion } from 'framer-motion'

export function StudentDashboardPreview() {
  return (
    <motion.div
      className="bg-white border-2 border-black rounded-3xl p-8 relative"
      style={{ boxShadow: '4px 4px 0px 0px black' }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-toggle-green border border-black" />
          <div className="w-2.5 h-2.5 rounded-full border border-black opacity-20" />
          <div className="w-2.5 h-2.5 rounded-full border border-black opacity-20" />
        </div>
        <span className="font-plus-jakarta font-extrabold text-[9px] tracking-[1.8px] uppercase text-gray-400">
          student.Dashboard.04
        </span>
      </div>

      {/* Level Indicator + Progress */}
      <div className="flex items-center gap-6 mb-6">
        {/* Circular Progress */}
        <div className="relative w-20 h-20">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="#f3f4f6"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="#ABD6C2"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${0.7 * 2 * Math.PI * 35} ${2 * Math.PI * 35}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-inter font-black italic text-xl">B1</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1">
          <div className="w-full h-3 bg-gray-100 border-2 border-black overflow-hidden">
            <div className="h-full bg-toggle-green w-[70%]" />
          </div>
          <p className="mt-2 font-inter font-black text-[10px] tracking-[1px] uppercase text-gray-400">
            Fluency Milestone
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <div className="flex-1 bg-gray-50 border-2 border-black rounded-xl p-3.5">
          <p className="font-plus-jakarta font-extrabold text-lg">14</p>
          <p className="font-inter font-black text-[8px] tracking-[0.8px] uppercase text-gray-400">
            Day Streak
          </p>
        </div>
        <div className="flex-1 bg-gray-50 border-2 border-black rounded-xl p-3.5">
          <p className="font-plus-jakarta font-extrabold text-lg">1.2k</p>
          <p className="font-inter font-black text-[8px] tracking-[0.8px] uppercase text-gray-400">
            Speak Points
          </p>
        </div>
      </div>

      {/* Bottom skeleton bars */}
      <div className="flex justify-between mt-6 pt-6 border-t border-gray-100">
        <div className="w-20 h-2 bg-gray-100 rounded" />
        <div className="w-12 h-2 bg-gray-100 rounded" />
      </div>
    </motion.div>
  )
}
