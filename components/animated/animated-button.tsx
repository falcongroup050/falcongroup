'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { scaleOnHover } from '@/lib/motion'

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}

export function AnimatedButton({
  children,
  className,
  asChild,
  size,
  variant,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div {...scaleOnHover}>
      <Button
        asChild={asChild}
        size={size}
        variant={variant}
        className={className}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}
