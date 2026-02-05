interface NavLink {
  label: string
  href: string
}

interface NavLinksProps {
  links: NavLink[]
  className?: string
}

export function NavLinks({ links, className = '' }: NavLinksProps) {
  return (
    <nav className={`hidden md:flex items-center gap-10 ${className}`}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="font-plus-jakarta font-extrabold text-xs uppercase tracking-[1.2px] text-black/40 hover:text-black transition-colors no-underline"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
