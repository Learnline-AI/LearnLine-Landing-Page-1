import { motion } from 'framer-motion'

export function ParentDashboardPreview() {
  return (
    <motion.div
      className="bg-white border-2 border-black rounded-3xl p-8 relative"
      style={{ boxShadow: '4px 4px 0px 0px black' }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 border border-black" />
          <div className="w-2.5 h-2.5 rounded-full border border-black opacity-20" />
          <div className="w-2.5 h-2.5 rounded-full border border-black opacity-20" />
        </div>
        <span className="font-plus-jakarta font-extrabold text-[9px] tracking-[1.8px] uppercase text-gray-400">
          parent.ChildProgress.01
        </span>
      </div>

      {/* Child Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-200 to-purple-400 border-2 border-black flex items-center justify-center">
          <span className="font-plus-jakarta font-extrabold text-lg">S</span>
        </div>
        <div>
          <p className="font-plus-jakarta font-extrabold text-lg">Sanya's Progress</p>
          <div className="flex items-center gap-2">
            <span className="font-inter font-black text-sm text-gray-400">A2</span>
            <span className="text-toggle-green">→</span>
            <span className="font-inter font-black text-sm text-toggle-green">B1</span>
          </div>
        </div>
      </div>

      {/* This Week Calendar */}
      <div className="mb-4">
        <p className="font-inter font-black text-[8px] tracking-[0.8px] uppercase text-gray-400 mb-2">
          This Week
        </p>
        <div className="flex gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <div
              key={i}
              className={`
                w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center
                ${i < 5 ? 'bg-toggle-green' : i === 5 ? 'bg-coral' : 'bg-gray-100'}
              `}
            >
              <span className="font-plus-jakarta font-bold text-xs">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement */}
      <div className="bg-toggle-green/30 border-2 border-black rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-toggle-green border-2 border-black flex items-center justify-center">
          <span className="text-lg">🏆</span>
        </div>
        <div>
          <p className="font-plus-jakarta font-bold text-sm">New Milestone Unlocked!</p>
          <p className="font-inter text-xs text-gray-500">Completed 50 conversations</p>
        </div>
      </div>
    </motion.div>
  )
}
