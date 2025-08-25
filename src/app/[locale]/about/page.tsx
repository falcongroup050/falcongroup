'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { History, Target, Shield, Users, Award, Globe } from 'lucide-react'
import Image from 'next/image'
import { AnimatedSection } from '@/components/animated/animated-section'
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleOnHover,
} from '@/lib/motion'
import { TeamSection } from '@/components/about-page/team-section' // Import the new TeamSection

// Enhanced animation variants
const heroVariants = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
}

const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, 0],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

const counterAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'backOut',
      type: 'spring',
    },
  },
}

const imageHoverEffect = {
  whileHover: {
    scale: 1.05,
    rotateY: 5,
    rotateX: 2,
    transition: { duration: 0.4 },
  },
}

export default function AboutPage() {
  const t = useTranslations('about')

  const features = [
    {
      icon: History,
      title: t('history.title'),
      description: t('history.content'),
      color: 'text-blue-500',
    },
    {
      icon: Target,
      title: t('approach.title'),
      description: t('approach.content'),
      color: 'text-green-500',
    },
    {
      icon: Shield,
      title: t('commitment.title'),
      description: t('commitment.content'),
      color: 'text-naples-yellow',
    },
  ]

  const stats = [
    { icon: Users, value: '20+', label: t('achievements.stats.years') },
    { icon: Globe, value: '100+', label: t('achievements.stats.projects') },
    { icon: Award, value: '50+', label: t('achievements.stats.clients') },
    { icon: Shield, value: '24/7', label: t('achievements.stats.support') },
  ]

  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='relative py-20 bg-gradient-to-br from-eerie-black to-slate-gray text-white overflow-hidden'>
        <div className='container relative z-10'>
          <motion.div
            className='max-w-3xl mx-auto text-center space-y-6'
            initial='initial'
            animate='animate'
            variants={heroVariants}
          >
            <motion.h1
              className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-naples-yellow bg-clip-text text-transparent'
              variants={fadeInDown}
            >
              {t('title')}
            </motion.h1>

            <motion.p
              className='text-xl text-naples-yellow font-semibold'
              variants={fadeInUp}
            >
              {t('subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className='py-20'>
        <div className='container'>
          {/* Story Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20'>
            <AnimatedSection variants={staggerContainer} className='space-y-6'>
              <motion.h2
                className='text-3xl font-bold bg-gradient-to-r from-foreground to-naples-yellow bg-clip-text text-transparent'
                variants={fadeInLeft}
              >
                {t('history.title')}
              </motion.h2>

              <motion.p
                className='text-lg text-muted-foreground leading-relaxed'
                variants={fadeInLeft}
              >
                {t('history.content')}
              </motion.p>

              <motion.p
                className='text-lg text-muted-foreground leading-relaxed'
                variants={fadeInLeft}
              >
                {t('approach.content')}
              </motion.p>

              {/* Achievement badges */}
              <motion.div
                className='flex flex-wrap gap-3'
                variants={fadeInLeft}
              >
                {t.raw('badges').map((badge: string, index: number) => (
                  <motion.div
                    key={badge}
                    className='px-3 py-1 bg-naples-yellow/10 text-naples-yellow rounded-full text-sm font-medium border border-naples-yellow/20'
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(255, 183, 3, 0.2)',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {badge}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>

            <AnimatedSection variants={fadeInRight} className='relative'>
              <motion.div
                className='relative group'
                {...imageHoverEffect}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className='relative overflow-hidden rounded-2xl shadow-2xl'>
                  <Image
                    src='/about-page.jpeg'
                    alt='Falcon Group Facility'
                    width={600}
                    height={400}
                    className='rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110'
                  />

                  {/* Overlay gradient */}
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                    transition={{ duration: 0.4 }}
                  />

                  {/* Floating badge */}
                  <motion.div
                    className='absolute top-4 right-4 bg-naples-yellow text-eerie-black px-3 py-1 rounded-full text-sm font-semibold shadow-lg'
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {t('excellence')}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Features Grid */}
          <AnimatedSection className='mb-20'>
            <motion.h2
              className='text-3xl font-bold text-center mb-12'
              variants={fadeInUp}
            >
              {t('features.title')}
            </motion.h2>

            <motion.div
              className='grid grid-cols-1 md:grid-cols-3 gap-8'
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={fadeInUp} {...scaleOnHover}>
                  <Card className='text-center h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30'>
                    <CardHeader>
                      <motion.div
                        className='mx-auto w-16 h-16 bg-gradient-to-br from-naples-yellow/20 to-naples-yellow/5 rounded-full flex items-center justify-center mb-4 shadow-lg'
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          boxShadow: '0 10px 30px rgba(255, 183, 3, 0.3)',
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.2,
                            rotate: -5,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <feature.icon
                            className={`h-8 w-8 ${feature.color}`}
                          />
                        </motion.div>
                      </motion.div>

                      <CardTitle className='text-xl font-bold'>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <CardDescription className='text-base leading-relaxed'>
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Stats Section */}
          <AnimatedSection className='mb-20'>
            <motion.div
              className='bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-8 backdrop-blur-sm border border-border/50'
              variants={fadeInUp}
              whileHover={{
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className='text-2xl font-bold text-center mb-8'
                variants={fadeInUp}
              >
                {t('achievements.title')}
              </motion.h3>

              <motion.div
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'
                variants={staggerContainer}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className='text-center group'
                    variants={counterAnimation}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className='mx-auto w-12 h-12 bg-gradient-to-br from-naples-yellow/20 to-naples-yellow/5 rounded-full flex items-center justify-center mb-3 group-hover:shadow-lg'
                      whileHover={{
                        rotate: 360,
                        backgroundColor: 'rgba(255, 183, 3, 0.3)',
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className='h-6 w-6 text-naples-yellow' />
                    </motion.div>

                    <motion.div
                      className='text-2xl font-bold text-naples-yellow'
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.1,
                        type: 'spring',
                        bounce: 0.4,
                      }}
                    >
                      {stat.value}
                    </motion.div>

                    <div className='text-sm text-muted-foreground font-medium'>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Team Section */}
          <TeamSection t={t} />
        </div>
      </section>
    </div>
  )
}
