'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variants?: any
  delay?: number
}

export function AnimatedSection({
  children,
  className = '',
  variants = staggerContainer,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial='initial'
      whileInView='animate'
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
