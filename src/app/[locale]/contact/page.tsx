'use client'

import { AnimatedButton } from '@/components/animated/animated-button'
import { AnimatedSection } from '@/components/animated/animated-section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleOnHover,
  staggerContainer,
} from '@/lib/motion'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useState } from 'react'
import SocialMediaIcons from '@/components/SocialMediaIcons'

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

const formFieldVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const successVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'backOut',
      type: 'spring',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
}

const contactInfoVariants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const mapPulseAnimation = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export default function ContactPage() {
  const t = useTranslations('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address'),
      content: t('footer.location') + '\n' + t('footer.subtext'),
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      content: '+20 100 207 1300',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      content: 'info@falcongroup.com',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      content: t('contact.info.hoursContent'),
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

        {/* Floating contact icons */}
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            className={`absolute w-12 h-12 ${info.bgColor} rounded-full flex items-center justify-center opacity-20`}
            style={{
              top: `${15 + index * 20}%`,
              right: `${5 + index * 15}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5,
            }}
          >
            <info.icon className={`h-6 w-6 ${info.color}`} />
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
              {t('contact.title')}
            </motion.h1>

            <motion.p
              className='text-xl text-naples-yellow font-semibold'
              variants={fadeInUp}
            >
              {t('contact.subtitle')}
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

      {/* Contact Section */}
      <section className='py-20 relative overflow-hidden'>
        {/* Background pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0 bg-gradient-to-br from-naples-yellow/20 to-transparent' />
        </div>

        <div className='container relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <AnimatedSection variants={fadeInLeft}>
              <div>
                <Card className='shadow-2xl border-0 bg-gradient-to-br from-background to-muted/30'>
                  <CardHeader>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CardTitle className='text-2xl bg-gradient-to-r from-foreground to-naples-yellow bg-clip-text text-transparent'>
                        {t('contact.form.submit')}
                      </CardTitle>
                      <CardDescription className='text-base'>
                        {t('contact.form.subtitle')}
                      </CardDescription>
                    </motion.div>
                  </CardHeader>

                  <CardContent>
                    <AnimatePresence mode='wait'>
                      {submitted ? (
                        <motion.div
                          key='success'
                          variants={successVariants}
                          initial='initial'
                          animate='animate'
                          exit='exit'
                          className='text-center py-8'
                        >
                          <motion.div
                            className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 2,
                              ease: 'easeInOut',
                            }}
                          >
                            <CheckCircle2 className='h-10 w-10 text-green-600' />
                          </motion.div>

                          <motion.h3
                            className='text-2xl font-bold text-green-600 mb-3'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            Message Sent!
                          </motion.h3>

                          <motion.p
                            className='text-muted-foreground text-lg'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            {t('contact.form.success')}
                          </motion.p>
                        </motion.div>
                      ) : (
                        <motion.form
                          key='form'
                          onSubmit={handleSubmit}
                          className='space-y-6'
                          variants={staggerContainer}
                          initial='initial'
                          animate='animate'
                        >
                          <motion.div
                            className='grid grid-cols-1 md:grid-cols-2 gap-4'
                            variants={formFieldVariants}
                          >
                            <motion.div
                              className='space-y-2'
                              whileFocus={{ scale: 1.02 }}
                            >
                              <Label htmlFor='name'>
                                {t('contact.form.name')}
                              </Label>
                              <Input
                                id='name'
                                required
                                className='transition-all duration-300 focus:ring-2 focus:ring-naples-yellow/50'
                              />
                            </motion.div>

                            <motion.div
                              className='space-y-2'
                              whileFocus={{ scale: 1.02 }}
                            >
                              <Label htmlFor='email'>
                                {t('contact.form.email')}
                              </Label>
                              <Input
                                id='email'
                                type='email'
                                required
                                className='transition-all duration-300 focus:ring-2 focus:ring-naples-yellow/50'
                              />
                            </motion.div>
                          </motion.div>

                          <motion.div
                            className='grid grid-cols-1 md:grid-cols-2 gap-4'
                            variants={formFieldVariants}
                          >
                            <motion.div
                              className='space-y-2'
                              whileFocus={{ scale: 1.02 }}
                            >
                              <Label htmlFor='phone'>
                                {t('contact.form.phone')}
                              </Label>
                              <Input
                                id='phone'
                                type='tel'
                                className='transition-all duration-300 focus:ring-2 focus:ring-naples-yellow/50'
                              />
                            </motion.div>

                            <motion.div
                              className='space-y-2'
                              whileFocus={{ scale: 1.02 }}
                            >
                              <Label htmlFor='company'>
                                {t('contact.form.company')}
                              </Label>
                              <Input
                                id='company'
                                className='transition-all duration-300 focus:ring-2 focus:ring-naples-yellow/50'
                              />
                            </motion.div>
                          </motion.div>

                          <motion.div
                            className='space-y-2'
                            variants={formFieldVariants}
                          >
                            <Label htmlFor='service'>
                              {t('contact.form.service')}
                            </Label>
                            <Select>
                              <SelectTrigger className='transition-all duration-300 focus:ring-2 focus:ring-naples-yellow/50'>
                                <SelectValue placeholder='Select a service' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='shipping'>
                                  Shipping Services
                                </SelectItem>
                                <SelectItem value='freight'>
                                  Freight Management
                                </SelectItem>
                                <SelectItem value='warehousing'>
                                  Warehousing Solutions
                                </SelectItem>
                                <SelectItem value='transportation'>
                                  Transportation
                                </SelectItem>
                                <SelectItem value='other'>Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </motion.div>

                          <motion.div
                            className='space-y-2'
                            variants={formFieldVariants}
                          >
                            <Label htmlFor='message'>
                              {t('contact.form.message')}
                            </Label>
                            <Textarea
                              id='message'
                              rows={4}
                              required
                              className='transition-all duration-300 focus:ring-2 focus:ring-naples-yellow/50 resize-none'
                            />
                          </motion.div>

                          <motion.div variants={formFieldVariants}>
                            <AnimatedButton className='w-full bg-naples-yellow text-eerie-black hover:bg-naples-yellow/90 group'>
                              <motion.span
                                animate={
                                  isSubmitting ? { opacity: [1, 0.5, 1] } : {}
                                }
                                transition={{
                                  duration: 1,
                                  repeat: isSubmitting ? Infinity : 0,
                                }}
                              >
                                {isSubmitting
                                  ? 'Sending...'
                                  : t('contact.form.submit')}
                              </motion.span>

                              <motion.div
                                className='ml-2 rtl:ml-0 rtl:mr-2'
                                animate={isSubmitting ? { rotate: 360 } : {}}
                                transition={{
                                  duration: 1,
                                  repeat: isSubmitting ? Infinity : 0,
                                  ease: 'linear',
                                }}
                              >
                                <Send className='h-4 w-4 rtl:rotate-180' />
                              </motion.div>
                            </AnimatedButton>
                          </motion.div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection variants={fadeInRight} className='space-y-8'>
              {/* Contact Info Card */}
              <motion.div {...scaleOnHover}>
                <Card className='shadow-2xl border-0 bg-gradient-to-br from-background to-muted/30'>
                  <CardHeader>
                    <CardTitle className='text-2xl bg-gradient-to-r from-foreground to-naples-yellow bg-clip-text text-transparent'>
                      {t('contact.info.title')}
                    </CardTitle>
                    <CardDescription className='text-base'>
                      {t('contact.info.subtitle')}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className='space-y-6'>
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        className='flex items-start space-x-4 rtl:space-x-reverse group'
                        variants={contactInfoVariants}
                        whileHover={{ x: 5, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <motion.div
                          className={`w-12 h-12 ${info.bgColor} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                          }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <info.icon className={`h-6 w-6 ${info.color}`} />
                        </motion.div>

                        <div className='group-hover:text-naples-yellow transition-colors duration-300'>
                          <h3 className='font-semibold text-lg'>
                            {info.title}
                          </h3>
                          {info.content.includes('+20') ? (
                            <Link
                              dir='ltr'
                              href={`tel:${info.content.replaceAll(' ', '')}`}
                            >
                              {info.content}
                            </Link>
                          ) : (
                            <p className='text-muted-foreground whitespace-pre-line'>
                              {info.content}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    <SocialMediaIcons />
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
