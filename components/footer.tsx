'use client'

import { AnimatedSection } from '@/components/animated/animated-section'
import { fadeInUp, scaleOnHover } from '@/lib/motion'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import SocialMediaIcons from './SocialMediaIcons'

export function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  const navigation = [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.about'), href: `/${locale}/about` },
    { name: t('navigation.services'), href: `/${locale}/services` },
    { name: t('navigation.contact'), href: `/${locale}/contact` },
    { name: t('navigation.achievements'), href: `/${locale}/achievements` },
  ]

  const services = [
    t('home.services.shipping.title'),
    t('home.services.freight.title'),
    t('home.services.warehousing.title'),
    t('home.services.transportation.title'),
  ]

  const contactInfo = [
    {
      icon: MapPin,
      text: t('footer.location'),
      subtext: t('footer.subtext'),
    },
    { icon: Phone, text: t('footer.phone') },
    { icon: Mail, text: t('footer.email') },
  ]

  return (
    <motion.footer
      className='bg-eerie-black text-white relative overflow-hidden'
      initial='initial'
      whileInView='animate'
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      {/* Background decorative elements */}
      <motion.div
        className='absolute top-0 left-0 w-48 h-48 bg-naples-yellow/5 rounded-full blur-3xl'
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className='absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl'
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className='container py-12 relative z-10'>
        <AnimatedSection className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <motion.div className='space-y-4' variants={fadeInUp}>
            <motion.div className='flex items-center space-x-2 rtl:space-x-reverse'>
              <motion.div
                className='flex items-center justify-center w-8 h-8 bg-naples-yellow rounded-lg'
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Image
                  src='/logo.svg'
                  alt='Logo'
                  width={38}
                  height={38}
                  className='object-contain'
                />
              </motion.div>
              <span className='font-bold text-xl text-naples-yellow'>
                Falcon Group
              </span>
            </motion.div>
            <motion.p className='text-sm text-gray-300' variants={fadeInUp}>
              {t('footer.description')}
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className='space-y-4' variants={fadeInUp}>
            <h3 className='font-semibold text-naples-yellow'>
              {t('footer.links')}
            </h3>
            <div className='space-y-2'>
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={fadeInUp}
                  {...scaleOnHover}
                >
                  <Link
                    href={item.href}
                    className='block text-sm hover:text-naples-yellow transition-colors'
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div className='space-y-4' variants={fadeInUp}>
            <h3 className='font-semibold text-naples-yellow'>
              {t('footer.services')}
            </h3>
            <div className='space-y-2 text-sm text-gray-300'>
              {services.map((service, index) => (
                <motion.p
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 5, color: '#FFB703' }}
                >
                  {service}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div className='space-y-4' variants={fadeInUp}>
            <h3 className='font-semibold text-naples-yellow'>
              {t('footer.contact')}
            </h3>
            <div className='space-y-2'>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className='flex items-center space-x-2 rtl:space-x-reverse text-sm group'
                  variants={fadeInUp}
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <info.icon className='h-4 w-4 text-naples-yellow group-hover:text-white transition-colors' />
                  </motion.div>
                  <div>
                    {info.text.includes('+20') ? (
                      <Link
                        dir='ltr'
                        href={`tel:${info.text.replaceAll(' ', '')}`}
                      >
                        {info.text}
                      </Link>
                    ) : (
                      <span
                        dir='ltr'
                        className='group-hover:text-white transition-colors'
                      >
                        {info.text}
                      </span>
                    )}

                    {info.subtext && (
                      <span className='block text-xs text-gray-400 group-hover:text-gray-200 transition-colors'>
                        {info.subtext}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <SocialMediaIcons />
          </motion.div>
        </AnimatedSection>

        <motion.div
          className='border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300'
          variants={fadeInUp}
        >
          <p>&copy; 2025 Falcon Group. {t('footer.rights')}</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
