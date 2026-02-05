import { motion } from 'framer-motion'

export function TeacherDashboardPreview() {
  return (
    <motion.div
      className="bg-white border-2 border-black rounded-3xl p-8 relative"
      style={{ boxShadow: '4px 4px 0px 0px black' }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-coral border border-black" />
          <div className="w-2.5 h-2.5 rounded-full border border-black opacity-20" />
          <div className="w-2.5 h-2.5 rounded-full border border-black opacity-20" />
        </div>
        <span className="font-plus-jakarta font-extrabold text-[9px] tracking-[1.8px] uppercase text-gray-400">
          teacher.ClassView.02
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-gray-50 border-2 border-black rounded-xl p-3.5">
          <p className="font-plus-jakarta font-extrabold text-lg">28</p>
          <p className="font-inter font-black text-[8px] tracking-[0.8px] uppercase text-gray-400">
            Students
          </p>
        </div>
        <div className="flex-1 bg-toggle-green/30 border-2 border-black rounded-xl p-3.5">
          <p className="font-plus-jakarta font-extrabold text-lg">87%</p>
          <p className="font-inter font-black text-[8px] tracking-[0.8px] uppercase text-gray-400">
            On Track
          </p>
        </div>
      </div>

      {/* Student Progress List */}
      <div className="space-y-3 mb-4">
        {[
          { name: 'Arjun S.', progress: 92, color: 'bg-toggle-green' },
          { name: 'Priya M.', progress: 78, color: 'bg-toggle-green' },
          { name: 'Ravi K.', progress: 45, color: 'bg-coral' },
        ].map((student, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-black flex items-center justify-center">
              <span className="font-plus-jakarta font-bold text-xs">{student.name[0]}</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-plus-jakarta font-bold text-xs">{student.name}</span>
                <span className="font-inter font-black text-[8px] text-gray-400">{student.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full">
                <div className={`h-full ${student.color} rounded-full`} style={{ width: `${student.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Badge */}
      <div className="inline-flex items-center gap-2 bg-coral/20 border-2 border-black rounded-lg px-3 py-2">
        <div className="w-2 h-2 rounded-full bg-coral" />
        <span className="font-plus-jakarta font-bold text-xs">3 Need Attention</span>
      </div>
    </motion.div>
  )
}
