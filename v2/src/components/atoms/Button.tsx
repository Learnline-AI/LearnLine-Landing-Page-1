import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps {
  variant: 'primary' | 'ghost'
  children: ReactNode
  onClick?: () => void
  href?: string
}

export function Button({ variant, children, onClick, href }: ButtonProps) {
  const baseClasses = 'font-plus-jakarta font-extrabold text-sm uppercase cursor-pointer'

  const variantClasses = {
    primary: 'bg-coral border-2 border-black px-[34px] py-[14px] tracking-[-0.7px] text-black',
    ghost: 'bg-transparent border-none px-0 py-0 tracking-[1.2px] text-black',
  }

  const classes = `${baseClasses} ${variantClasses[variant]}`

  if (href) {
    if (variant === 'primary') {
      return (
        <motion.a
          href={href}
          className={classes}
          style={{ boxShadow: '8px 8px 0px 0px black' }}
          whileHover={{
            y: -2,
            boxShadow: '10px 10px 0px 0px black',
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.a>
      )
    }
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  if (variant === 'primary') {
    return (
      <motion.button
        className={classes}
        onClick={onClick}
        style={{ boxShadow: '8px 8px 0px 0px black' }}
        whileHover={{
          y: -2,
          boxShadow: '10px 10px 0px 0px black',
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.button>
    )
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
