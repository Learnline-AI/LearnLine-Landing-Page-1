import { TabButton } from '../atoms/TabButton'

interface TabNavigationProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
      {tabs.map(tab => (
        <TabButton
          key={tab}
          label={tab}
          isActive={activeTab === tab}
          onClick={() => onTabChange(tab)}
        />
      ))}
    </div>
  )
}
