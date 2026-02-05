import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../atoms/Button'

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[280px] bg-white border-l-2 border-black z-50 md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-6">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-black"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Nav links */}
              <nav className="mt-12 flex flex-col gap-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-plus-jakarta font-extrabold text-sm uppercase tracking-[1.2px] text-black/40 hover:text-black transition-colors no-underline"
                    onClick={onClose}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-4">
                <Button variant="ghost" href="/login">
                  Log in
                </Button>
                <Button variant="primary" href="/waitlist">
                  Join Waitlist
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
