'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Ship,
  Package,
  Warehouse,
  Truck,
  type LucideIcon,
  ArrowRight,
} from 'lucide-react'
import { AnimatedSection } from '@/components/animated/animated-section'
import { fadeInLeft, fadeInUp, scaleOnHover } from '@/lib/motion'
import { useLocale, useTranslations } from 'next-intl'
import { AnimatedButton } from '../animated/animated-button'
import Link from 'next/link'

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export function Services() {
  const t = useTranslations()
  const locale = useLocale()

  const services: Service[] = [
    {
      icon: Ship,
      title: t('home.services.shipping.title'),
      description: t('home.services.shipping.description'),
    },
    {
      icon: Package,
      title: t('home.services.freight.title'),
      description: t('home.services.freight.description'),
    },
    {
      icon: Warehouse,
      title: t('home.services.warehousing.title'),
      description: t('home.services.warehousing.description'),
    },
    {
      icon: Truck,
      title: t('home.services.transportation.title'),
      description: t('home.services.transportation.description'),
    },
  ]

  return (
    <section className='py-20 bg-background'>
      <div className='container'>
        <AnimatedSection className='text-center space-y-4 mb-16'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold'
            variants={fadeInUp}
          >
            {t('home.services.title')}
          </motion.h2>
          <motion.p
            className='text-xl text-muted-foreground max-w-2xl mx-auto'
            variants={fadeInUp}
          >
            {t('home.services.subtitle')}
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </AnimatedSection>

        <div className='flex justify-center mt-10'>
          <motion.div variants={fadeInLeft}>
            <AnimatedButton
              asChild
              className='bg-naples-yellow text-eerie-black hover:bg-naples-yellow/90'
            >
              <Link href={`/${locale}/services`}>
                {locale === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                <ArrowRight className='ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180' />
              </Link>
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div variants={fadeInUp} {...scaleOnHover}>
      <Card className='text-center hover:shadow-lg transition-shadow h-full'>
        <CardHeader>
          <motion.div
            className='mx-auto w-16 h-16 bg-naples-yellow/10 rounded-full flex items-center justify-center mb-4'
            whileHover={{
              backgroundColor: 'rgba(255, 183, 3, 0.2)',
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: 5,
                transition: { duration: 0.3 },
              }}
            >
              <service.icon className='h-8 w-8 text-naples-yellow' />
            </motion.div>
          </motion.div>
          <CardTitle className='text-xl'>{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className='text-base'>
            {service.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}
