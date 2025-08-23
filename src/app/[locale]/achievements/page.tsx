'use client'

import { AnimatedSection } from '@/components/animated/animated-section'
import { CTASection } from '@/components/home-page/cta'
import { fadeInDown, fadeInUp, staggerContainer } from '@/lib/motion'
import { storage } from '@/utils/supabase/storage/client'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'

// async function getAchievementsImages() {
//   const { data, error } = await storage.from('achievements').list('', {
//     limit: 100,
//     offset: 0,
//     sortBy: { column: 'name', order: 'asc' },
//   })

//   if (error) {
//     console.error('Error fetching achievements images:', error)
//     return []
//   }

//   return data
// }

export default function AchievementsPage() {
  const t = useTranslations('achievements')

  // Dynamically construct achievements data from translations
  const achievementsData = t.raw('timeline.data') as Array<{
    year: string
    activities: string[]
  }>

  const yearVariants = {
    hidden: { opacity: 0, x: -100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        when: 'beforeChildren', // Animate parent first
      },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 360,
      transition: { duration: 0.8, type: 'spring', bounce: 0.5 },
    },
  }

  const activityItemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='relative py-12 md:py-20 bg-gradient-to-br from-eerie-black to-slate-gray text-white overflow-hidden'>
        {/* Animated background elements */}
        <motion.div
          className='absolute top-10 md:top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-naples-yellow/10 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className='absolute bottom-10 md:bottom-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl'
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        <div className='container relative z-10 px-4'>
          <AnimatedSection
            className='max-w-3xl mx-auto text-center space-y-4 md:space-y-6'
            variants={staggerContainer}
          >
            <motion.h1
              className='text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-naples-yellow bg-clip-text text-transparent px-4'
              variants={fadeInDown}
            >
              {t('title')}
            </motion.h1>

            <motion.p
              className='text-lg md:text-xl text-naples-yellow font-semibold px-4'
              variants={fadeInUp}
            >
              {t('subtitle')}
            </motion.p>

            {/* Animated divider */}
            <motion.div
              className='mx-auto w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-naples-yellow to-transparent rounded-full'
              variants={fadeInUp}
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Achievements Timeline Section */}
      <section className='py-12 md:py-20 bg-background relative'>
        <div className='container px-4'>
          <AnimatedSection className='text-center space-y-4 mb-12 md:mb-16'>
            <motion.h2
              className='text-2xl md:text-3xl lg:text-4xl font-bold px-4'
              variants={fadeInUp}
            >
              {t('timeline.title')}
            </motion.h2>
            <motion.p
              className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4'
              variants={fadeInUp}
            >
              {t('timeline.subtitle')}
            </motion.p>
          </AnimatedSection>

          <div className='relative max-w-4xl mx-auto'>
            {/* Vertical Timeline Line - Hidden on mobile, shown on desktop */}
            <motion.div
              className='hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-naples-yellow/20 rounded-full'
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {/* Mobile Timeline Line - Left aligned */}
            <motion.div
              className='md:hidden absolute left-6 top-0 w-1 bg-naples-yellow/20 rounded-full'
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            <div className='space-y-8 md:space-y-16'>
              {achievementsData.map((achievement, index) => (
                <motion.div
                  key={achievement.year}
                  className={`flex items-start w-full ${
                    // Desktop: alternating layout, Mobile: always left-aligned
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  } md:items-center`}
                  initial='hidden'
                  whileInView='show'
                  viewport={{ once: true, amount: 0.1 }}
                  variants={yearVariants}
                >
                  {/* Year Marker with Large Image */}
                  <div className='md:w-1/2 flex md:justify-center relative'>
                    {/* Small circular marker for mobile */}
                    <div className='md:hidden w-8 h-8 bg-naples-yellow rounded-full flex items-center justify-center shadow-lg'>
                      <img
                        src='/placeholder.svg?height=20&width=20'
                        alt='Achievement milestone'
                        className='h-5 w-5'
                      />
                    </div>

                    {/* Large image for desktop */}
                    <div className='hidden md:block'>
                      <img
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/acheivments/${achievement.year}.jpeg`}
                        alt='Achievement milestone'
                        className='w-[300px] h-[250px] object-cover rounded-lg shadow-xl border-4 border-naples-yellow/20'
                      />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      index % 2 === 0
                        ? 'md:pr-8 md:text-right'
                        : 'md:pl-8 md:text-left'
                    }`}
                  >
                    <motion.div
                      className='bg-card p-4 md:p-6 rounded-lg shadow-xl border border-border/50 backdrop-blur-sm'
                      variants={fadeInUp}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3
                        className='text-xl md:text-2xl font-bold text-naples-yellow mb-3 md:mb-4'
                        variants={fadeInUp}
                      >
                        {achievement.year}
                      </motion.h3>
                      <motion.ul
                        className='space-y-2 md:space-y-3 text-muted-foreground text-sm md:text-base'
                        variants={staggerContainer}
                      >
                        {achievement.activities.map(
                          (activity, activityIndex) => (
                            <motion.li
                              key={activityIndex}
                              className='flex items-start'
                              variants={activityItemVariants}
                            >
                              <motion.div
                                className='flex-shrink-0 mt-1'
                                whileHover={{ scale: 1.2, rotate: 15 }}
                                transition={{ duration: 0.3 }}
                              >
                                <TrendingUp className='h-3 w-3 md:h-4 md:w-4 text-naples-yellow mr-2 rtl:mr-0 rtl:ml-2' />
                              </motion.div>
                              <span className='leading-relaxed'>
                                {activity}
                              </span>
                            </motion.li>
                          )
                        )}
                      </motion.ul>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
