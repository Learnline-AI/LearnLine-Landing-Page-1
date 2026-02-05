import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TabNavigation } from '../molecules/TabNavigation'
import { StudentDashboardPreview } from '../molecules/StudentDashboardPreview'
import { TeacherDashboardPreview } from '../molecules/TeacherDashboardPreview'
import { ParentDashboardPreview } from '../molecules/ParentDashboardPreview'
import { SchoolDashboardPreview } from '../molecules/SchoolDashboardPreview'
import { fadeInUp, viewportOnce, staggerContainer } from '../../utils/animations'

type TabType = 'student' | 'teacher' | 'parent' | 'school'

const tabContent: Record<TabType, { headline: string; subtext: string; bullets: string[] }> = {
  student: {
    headline: 'CLEARER PATHS TO FLUENCY.',
    subtext: 'Learn with absolute clarity on where you are and exactly where you are going next.',
    bullets: [
      'Real-time feedback on every spoken phrase',
      'Personalized learning streaks and goals',
      'Daily clarity on your fluency progress',
    ],
  },
  teacher: {
    headline: 'EMPOWER EVERY LEARNER.',
    subtext: 'See exactly where each student stands and guide them to their next breakthrough.',
    bullets: [
      'Real-time class progress dashboards',
      'Individual student gap analysis',
      'Automated intervention recommendations',
    ],
  },
  parent: {
    headline: 'WATCH THEM FLOURISH.',
    subtext: "Stay connected to your child's learning journey with clear, actionable insights.",
    bullets: [
      'Weekly progress reports delivered automatically',
      'Celebrate milestones together',
      'Know exactly how to support at home',
    ],
  },
  school: {
    headline: 'TRANSFORM YOUR INSTITUTION.',
    subtext: 'School-wide visibility into language learning outcomes across every classroom.',
    bullets: [
      'District-level analytics and reporting',
      'Curriculum alignment tracking',
      'ROI measurement on learning programs',
    ],
  },
}

const tabs = ['student', 'teacher', 'parent', 'school']

const dashboardComponents: Record<TabType, React.ComponentType> = {
  student: StudentDashboardPreview,
  teacher: TeacherDashboardPreview,
  parent: ParentDashboardPreview,
  school: SchoolDashboardPreview,
}

export function ClearerPathsSection() {
  const [activeTab, setActiveTab] = useState<TabType>('student')
  const content = tabContent[activeTab]
  const DashboardComponent = dashboardComponents[activeTab]

  return (
    <section className="bg-offwhite py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={viewportOnce}
          className="mb-12"
        >
          <TabNavigation
            tabs={tabs.map(t => t.toUpperCase())}
            activeTab={activeTab.toUpperCase()}
            onTabChange={(tab) => setActiveTab(tab.toLowerCase() as TabType)}
          />
        </motion.div>

        {/* Main Content Window */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={viewportOnce}
          className="relative"
        >
          {/* Neo-brutalist Window Frame */}
          <div
            className="bg-white border-2 border-black overflow-hidden"
            style={{ boxShadow: '8px 8px 0px 0px black' }}
          >
            {/* Coral Header Bar */}
            <div className="bg-coral h-10 border-b-2 border-black flex items-center px-4">
              <span className="font-plus-jakarta font-extrabold text-xs tracking-wider uppercase text-black/70">
                PREVIEW_MODE.mov
              </span>
              <div className="ml-auto flex gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-white/50 border border-black" />
                <div className="w-3 h-3 rounded-sm bg-white/50 border border-black" />
                <div className="w-3 h-3 rounded-sm bg-white/50 border border-black" />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                {/* Left Side - Text Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab + '-text'}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 max-w-lg"
                  >
                    {/* Small accent bar */}
                    <div className="w-16 h-3 bg-coral rounded-full mb-6" />

                    {/* Headline */}
                    <h2 className="font-plus-jakarta font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-tight tracking-[-2.8px] uppercase mb-6">
                      {content.headline}
                    </h2>

                    {/* Subtext */}
                    <p className="font-plus-jakarta font-bold text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                      {content.subtext}
                    </p>

                    {/* Bullet Points */}
                    <motion.ul
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="space-y-5"
                    >
                      {content.bullets.map((bullet, index) => (
                        <motion.li
                          key={index}
                          variants={fadeInUp}
                          className="flex items-start gap-4"
                        >
                          <div className="w-4 h-4 rounded-full bg-toggle-green border-2 border-black flex-shrink-0 mt-1" />
                          <span className="font-plus-jakarta font-bold text-base md:text-lg text-gray-800">
                            {bullet}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </AnimatePresence>

                {/* Right Side - Dashboard Preview */}
                <div className="flex-1 w-full max-w-md lg:max-w-lg relative">
                  {/* Gray background container */}
                  <div className="bg-gray-100 rounded-[40px] p-6 md:p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab + '-dashboard'}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DashboardComponent />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* LIVE Badge */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6"
                    animate={{ rotate: [10, 14, 10] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div
                      className="bg-white border-2 border-black rounded-xl px-4 py-2 rotate-12"
                      style={{ boxShadow: '2px 2px 0px 0px black' }}
                    >
                      <span className="font-inter font-black italic text-base">LIVE</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
