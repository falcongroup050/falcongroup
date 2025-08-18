'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedSection } from '@/components/animated/animated-section'
import { AnimatedButton } from '@/components/animated/animated-button'
import { fadeInUp } from '@/lib/motion'
import { useLocale, useTranslations } from 'next-intl'

export function CTASection() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <AnimatedSection
      className='py-20 bg-naples-yellow'
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <div className='container text-center'>
        <div className='max-w-2xl mx-auto space-y-6'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold text-eerie-black'
            variants={fadeInUp}
          >
            {t('home.contact.title')}
          </motion.h2>

          <motion.p className='text-lg text-eerie-black/80' variants={fadeInUp}>
            {t('home.contact.description')}
          </motion.p>

          <motion.div variants={fadeInUp}>
            <AnimatedButton
              asChild
              size='lg'
              className='bg-eerie-black text-naples-yellow hover:bg-eerie-black/90'
            >
              <Link href={`/${locale}/contact`}>
                {t('home.contact.cta')}
                <ArrowRight className='ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180' />
              </Link>
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
