'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { scaleOnHover } from '@/lib/motion'

import type { ButtonProps } from '@/components/ui/button'

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
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
