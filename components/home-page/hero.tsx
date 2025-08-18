import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  fadeInDown,
  fadeInUp,
  floatingAnimation,
  floatingAnimationReverse,
} from '@/lib/motion'
import { AnimatedSection } from '../animated/animated-section'
import { AnimatedButton } from '../animated/animated-button'

export default function Hero() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className='relative bg-[url("/hero.png")] bg-center bg-no-repeat bg-cover text-white py-20 lg:py-32 overflow-hidden'>
      <div className='absolute inset-0 bg-black/80' />

      {/* Animated background elements */}
      <motion.div
        className='absolute top-20 left-10 w-72 h-72 bg-naples-yellow/5 rounded-full blur-3xl'
        {...floatingAnimation}
      />
      <motion.div
        className='absolute bottom-20 right-10 w-96 h-96 bg-naples-yellow/3 rounded-full blur-3xl'
        {...floatingAnimationReverse}
      />

      <div className='container relative z-10'>
        <AnimatedSection className='max-w-4xl mx-auto text-center space-y-8'>
          <motion.div variants={fadeInDown}>
            <Badge
              variant='outline'
              className='w-fit mx-auto text-primary border-primary dark:border-primary lg:mx-0'
            >
              {t('home.hero.badge')}
            </Badge>
          </motion.div>

          <motion.h1
            className='text-4xl md:text-6xl font-bold leading-tight'
            variants={fadeInUp}
          >
            {t('home.hero.title')}
          </motion.h1>

          <motion.p
            className='text-xl md:text-2xl text-naples-yellow font-semibold'
            variants={fadeInUp}
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.p
            className='text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed'
            variants={fadeInUp}
          >
            {t('home.hero.description')}
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row gap-4 justify-center'
            variants={fadeInUp}
          >
            <AnimatedButton
              asChild
              size='lg'
              className='bg-naples-yellow text-eerie-black hover:bg-naples-yellow/90'
            >
              <Link href={`/${locale}/contact`}>
                {t('home.hero.contact')}
                <ArrowRight className='ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180' />
              </Link>
            </AnimatedButton>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
