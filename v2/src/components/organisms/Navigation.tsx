import { useState } from 'react'
import { motion } from 'framer-motion'
import { Logo } from '../atoms/Logo'
import { Button } from '../atoms/Button'
import { NavLinks } from '../molecules/NavLinks'
import { MobileMenu } from '../molecules/MobileMenu'
import { useScrollPosition } from '../../hooks/useScrollPosition'

const NAV_LINKS = [
  { label: 'METHOD', href: '#method' },
  { label: 'CURRICULUM', href: '#curriculum' },
  { label: 'COMMUNITY', href: '#community' },
  { label: 'REVIEWS', href: '#reviews' },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScrollPosition()
  const hasScrolled = scrollY > 0

  return (
    <>
      <motion.header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white border-2 border-black px-8 py-[18px] max-w-[1366px] w-[90vw]"
        animate={{
          boxShadow: hasScrolled ? '8px 8px 0px 0px black' : 'none',
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links */}
          <NavLinks links={NAV_LINKS} />

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" href="/login">
              Log in
            </Button>
            <Button variant="primary" href="/waitlist">
              Join Waitlist
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  )
}
