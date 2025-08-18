'use client'

import { AnimatedButton } from '@/components/animated/animated-button'
import { AnimatedSection } from '@/components/animated/animated-section'
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/motion'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export function About() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className='py-20 bg-muted/50'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <AnimatedSection variants={staggerContainer} className='space-y-6'>
            <motion.h2
              className='text-3xl md:text-4xl font-bold'
              variants={fadeInLeft}
            >
              {t('home.about.title')}
            </motion.h2>

            <motion.p
              className='text-lg text-muted-foreground leading-relaxed'
              variants={fadeInLeft}
            >
              {t('home.about.description')}
            </motion.p>

            <motion.p
              className='text-lg text-muted-foreground leading-relaxed'
              variants={fadeInLeft}
            >
              {t('home.about.approach')}
            </motion.p>

            <motion.div
              className='flex items-center space-x-2 rtl:space-x-reverse'
              variants={fadeInLeft}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className='h-5 w-5 text-naples-yellow' />
              </motion.div>
              <span className='font-semibold'>
                20+ {locale === 'ar' ? 'سنة من الخبرة' : 'Years of Experience'}
              </span>
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <AnimatedButton
                asChild
                className='bg-naples-yellow text-eerie-black hover:bg-naples-yellow/90'
              >
                <Link href={`/${locale}/about`}>
                  {locale === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                  <ArrowRight className='ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180' />
                </Link>
              </AnimatedButton>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection variants={fadeInRight} className='relative'>
            <motion.div
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className='relative overflow-hidden rounded-lg shadow-lg'
            >
              <Image
                src='/about.jpeg'
                alt='Falcon Group Logistics'
                width={600}
                height={400}
                className='rounded-lg shadow-lg object-cover'
              />
              <motion.div
                className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0'
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
