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
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  Upload,
  FileText,
  X,
} from 'lucide-react'
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

export default function ContactPage() {
  const t = useTranslations('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string>('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const pdfFiles = files.filter((file) => file.type === 'application/pdf')

    if (pdfFiles.length !== files.length) {
      setError('Please upload only PDF files.')
      return
    }

    if (pdfFiles.length + uploadedFiles.length > 3) {
      setError('Maximum 3 PDF files allowed.')
      return
    }

    setUploadedFiles((prev) => [...prev, ...pdfFiles])
    setError(null)
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    }

    uploadedFiles.forEach((file, index) => {
      formData.append(`pdf-${index}`, file)
    })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitted(true)
      setUploadedFiles([])
      setSelectedService('')
    } catch (err) {
      setError('Failed to send message. Please try again.')
      console.error('Form submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
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
            repeat: Number.POSITIVE_INFINITY,
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
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
            delay: 0.5,
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
              repeat: Number.POSITIVE_INFINITY,
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
                repeat: Number.POSITIVE_INFINITY,
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

                          <AnimatedButton
                            className='mt-6 w-full bg-naples-yellow text-eerie-black hover:bg-naples-yellow/90'
                            onClick={() => {
                              setSubmitted(false)
                              setError(null)
                            }}
                          >
                            {t('contact.form.reset')}
                          </AnimatedButton>
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
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className='p-4 bg-red-50 border border-red-200 rounded-lg text-red-700'
                            >
                              {error}
                            </motion.div>
                          )}

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
                                name='name'
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
                                name='email'
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
                                name='phone'
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
                                name='company'
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
                            <Select
                              name='service'
                              onValueChange={setSelectedService}
                              value={selectedService}
                            >
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
                                <SelectItem value='hiring'>Hiring</SelectItem>
                                <SelectItem value='other'>Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </motion.div>

                          <AnimatePresence>
                            {selectedService === 'hiring' && (
                              <div className='space-y-4'>
                                <motion.div
                                  className='space-y-2'
                                  variants={formFieldVariants}
                                >
                                  <Label htmlFor='resume'>
                                    Upload Resume/CV (PDF only, max 3 files)
                                  </Label>
                                  <div className='relative'>
                                    <Input
                                      id='resume'
                                      type='file'
                                      accept='.pdf'
                                      multiple
                                      onChange={handleFileUpload}
                                      className='hidden'
                                    />
                                    <Label
                                      htmlFor='resume'
                                      className='flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-naples-yellow/50 transition-colors duration-300 bg-muted/10 hover:bg-muted/20'
                                    >
                                      <div className='text-center'>
                                        <Upload className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                                        <p className='text-sm text-muted-foreground'>
                                          Click to upload PDF files
                                        </p>
                                        <p className='text-xs text-muted-foreground mt-1'>
                                          Maximum 3 files, PDF format only
                                        </p>
                                      </div>
                                    </Label>
                                  </div>
                                </motion.div>

                                {uploadedFiles.length > 0 && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className='space-y-2'
                                  >
                                    <Label>Uploaded Files:</Label>
                                    <div className='space-y-2'>
                                      {uploadedFiles.map((file, index) => (
                                        <motion.div
                                          key={index}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          className='flex items-center justify-between p-3 bg-muted/20 rounded-lg border'
                                        >
                                          <div className='flex items-center space-x-2'>
                                            <FileText className='h-4 w-4 text-red-500' />
                                            <span className='text-sm font-medium'>
                                              {file.name}
                                            </span>
                                            <span className='text-xs text-muted-foreground'>
                                              (
                                              {(
                                                file.size /
                                                1024 /
                                                1024
                                              ).toFixed(2)}{' '}
                                              MB)
                                            </span>
                                          </div>
                                          <button
                                            aria-label='Remove file'
                                            type='button'
                                            onClick={() => removeFile(index)}
                                            className='p-1 hover:bg-red-100 rounded-full transition-colors duration-200'
                                          >
                                            <X className='h-4 w-4 text-red-500' />
                                          </button>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            )}
                          </AnimatePresence>

                          <motion.div
                            className='space-y-2'
                            variants={formFieldVariants}
                          >
                            <Label htmlFor='message'>
                              {t('contact.form.message')}
                            </Label>
                            <Textarea
                              id='message'
                              name='message'
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
                                  repeat: isSubmitting
                                    ? Number.POSITIVE_INFINITY
                                    : 0,
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
                                  repeat: isSubmitting
                                    ? Number.POSITIVE_INFINITY
                                    : 0,
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
