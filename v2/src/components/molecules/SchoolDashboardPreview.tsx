import { motion } from 'framer-motion'

export function SchoolDashboardPreview() {
  return (
    <motion.div
      className="bg-white border-2 border-black rounded-3xl p-8 relative"
      style={{ boxShadow: '4px 4px 0px 0px black' }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 border border-black" />
          <div className="w-2.5 h-2.5 rounded-full border border-black opacity-20" />
          <div className="w-2.5 h-2.5 rounded-full border border-black opacity-20" />
        </div>
        <span className="font-plus-jakarta font-extrabold text-[9px] tracking-[1.8px] uppercase text-gray-400">
          admin.SchoolMetrics.03
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-gray-50 border-2 border-black rounded-xl p-3.5">
          <p className="font-plus-jakarta font-extrabold text-lg">1,247</p>
          <p className="font-inter font-black text-[8px] tracking-[0.8px] uppercase text-gray-400">
            Students
          </p>
        </div>
        <div className="flex-1 bg-gray-50 border-2 border-black rounded-xl p-3.5">
          <p className="font-plus-jakarta font-extrabold text-lg">42</p>
          <p className="font-inter font-black text-[8px] tracking-[0.8px] uppercase text-gray-400">
            Classes
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-4">
        <p className="font-inter font-black text-[8px] tracking-[0.8px] uppercase text-gray-400 mb-3">
          Monthly Progress
        </p>
        <div className="flex items-end gap-2 h-20">
          {[40, 55, 45, 70, 85, 75, 89].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t border-2 border-black ${i === 6 ? 'bg-toggle-green' : 'bg-gray-200'}`}
                style={{ height: `${height}%` }}
              />
              <span className="font-inter font-black text-[6px] text-gray-400">
                {['J', 'F', 'M', 'A', 'M', 'J', 'J'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-toggle-green border-2 border-black rounded-lg px-4 py-2">
        <span className="font-plus-jakarta font-bold text-sm">89% Meeting Goals</span>
        <span>✓</span>
      </div>
    </motion.div>
  )
}
