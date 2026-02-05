import { Navigation } from './components/organisms/Navigation'
import { HeroSection } from './components/organisms/HeroSection'
import { HomeworkOpportunitySection } from './components/organisms/HomeworkOpportunitySection'
import { HowItWorksSection } from './components/organisms/HowItWorksSection'
import { ClearerPathsSection } from './components/organisms/ClearerPathsSection'

function App() {
  return (
    <div className="min-h-screen bg-white bg-dot-pattern">
      <Navigation />
      <HeroSection />
      <HomeworkOpportunitySection />
      <HowItWorksSection />
      <ClearerPathsSection />
    </div>
  )
}

export default App
