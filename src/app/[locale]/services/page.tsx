'use client'

import { AnimatedButton } from '@/components/animated/animated-button'
import { CTASection } from '@/components/home-page/cta'
import {
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from '@/lib/motion'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle,
  Package,
  Ship,
  Truck,
  Warehouse,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

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

const serviceCardVariants = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const featureItemVariants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
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

const iconFloatAnimation = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 5, 0],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export default function ServicesPage() {
  const t = useTranslations('services')

  const services = [
    {
      icon: Ship,
      title: t('shipping.title'),
      description: t('shipping.description'),
      features: t.raw('shipping.features') as string[],
      image: t.raw('shipping.image_url'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Package,
      title: t('freight.title'),
      description: t('freight.description'),
      features: t.raw('freight.features') as string[],
      image: t.raw('freight.image_url'),
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Warehouse,
      title: t('warehousing.title'),
      description: t('warehousing.description'),
      features: t.raw('warehousing.features') as string[],
      image: t.raw('warehousing.image_url'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Truck,
      title: t('transportation.title'),
      description: t('transportation.description'),
      features: t.raw('transportation.features') as string[],
      image: t.raw('transportation.image_url'),
      color: 'text-naples-yellow',
      bgColor: 'bg-naples-yellow/10',
    },
  ]

  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='relative py-20 bg-gradient-to-br from-eerie-black to-slate-gray text-white overflow-hidden'>
        {/* Animated background elements */}
        <motion.div
          className='absolute top-10 left-10 w-64 h-64 bg-naples-yellow/10 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className='absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl'
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating service icons */}
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`absolute w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center opacity-20`}
            style={{
              top: `${20 + index * 15}%`,
              right: `${10 + index * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5,
            }}
          >
            <service.icon className={`h-8 w-8 ${service.color}`} />
          </motion.div>
        ))}

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

            {/* Animated divider */}
            <motion.div
              className='mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-naples-yellow to-transparent rounded-full'
              variants={fadeInUp}
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className='py-20 relative overflow-hidden'>
        {/* Background pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0 bg-gradient-to-br from-naples-yellow/20 to-transparent' />
        </div>

        <div className='container relative z-10'>
          <div className='space-y-32'>
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial='initial'
                whileInView='animate'
                viewport={{ once: true, margin: '-100px' }}
                variants={serviceCardVariants}
              >
                {/* Content Section */}
                <motion.div
                  className={`space-y-6 ${
                    index % 2 === 1 ? 'lg:col-start-2' : ''
                  }`}
                  variants={staggerContainer}
                >
                  {/* Service Header */}
                  <motion.div
                    className='flex items-center space-x-4 rtl:space-x-reverse'
                    variants={fadeInLeft}
                  >
                    <motion.div
                      className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center shadow-lg`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      }}
                      {...iconFloatAnimation}
                    >
                      <service.icon className={`h-8 w-8 ${service.color}`} />
                    </motion.div>

                    <motion.h2
                      className='text-3xl font-bold bg-gradient-to-r from-foreground to-naples-yellow bg-clip-text text-transparent'
                      whileHover={{ scale: 1.02 }}
                    >
                      {service.title}
                    </motion.h2>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    className='text-lg text-muted-foreground leading-relaxed'
                    variants={fadeInLeft}
                  >
                    {service.description}
                  </motion.p>

                  {/* Features List */}
                  <motion.div className='space-y-4' variants={staggerContainer}>
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className='flex items-center space-x-3 rtl:space-x-reverse group'
                        variants={featureItemVariants}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.2,
                            rotate: 360,
                            color: '#FFB703',
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className='h-5 w-5 text-naples-yellow flex-shrink-0' />
                        </motion.div>
                        <span className='group-hover:text-naples-yellow transition-colors duration-300'>
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Learn More Button */}
                  <motion.div variants={fadeInLeft}>
                    <AnimatedButton
                      asChild
                      variant='outline'
                      className='border-naples-yellow text-naples-yellow hover:bg-naples-yellow hover:text-eerie-black group'
                    >
                      <Link href='#contact'>
                        {t('learnMore')}
                        <motion.div
                          className='ml-2 rtl:ml-0 rtl:mr-2'
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <ArrowRight className='h-4 w-4 rtl:rotate-180' />
                        </motion.div>
                      </Link>
                    </AnimatedButton>
                  </motion.div>
                </motion.div>

                {/* Image Section */}
                <motion.div
                  className={`relative ${
                    index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                  variants={index % 2 === 0 ? fadeInRight : fadeInLeft}
                >
                  <motion.div
                    className='relative group'
                    {...imageHoverEffect}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className='relative overflow-hidden rounded-2xl shadow-2xl'>
                      <Image
                        src={service.image || '/placeholder.svg'}
                        alt={service.title}
                        width={400}
                        height={300}
                        className='rounded-2xl object-cover w-full max-h-[600px] transition-transform duration-500 group-hover:scale-110'
                      />

                      {/* Overlay gradient */}
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                        transition={{ duration: 0.4 }}
                      />

                      {/* Service badge */}
                      <motion.div
                        className={`absolute top-4 left-4 ${service.bgColor} backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold shadow-lg border border-white/20`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className={service.color}>
                          {t('premiumService')}
                        </span>
                      </motion.div>
                    </div>

                    {/* Decorative floating elements */}
                    <motion.div
                      className={`absolute -bottom-6 -right-6 w-20 h-20 ${service.bgColor} rounded-full blur-2xl`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
