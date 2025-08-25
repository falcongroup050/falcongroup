'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { AnimatedSection } from '@/components/animated/animated-section'
import { fadeInUp, staggerContainer, scaleOnHover } from '@/lib/motion'

interface TeamMember {
  name: string
  title: string
  description: string
  contact: string[]
  image: string
}

interface TeamSectionProps {
  t: ReturnType<typeof useTranslations<'about'>>
}

export function TeamSection({ t }: TeamSectionProps) {
  const teamMembers: TeamMember[] = [
    {
      name: t('team.companyDirector.name'),
      title: t('team.companyDirector.title'),
      description: t('team.companyDirector.description'),
      contact: t.raw('team.companyDirector.contact'),
      image: t.raw('team.companyDirector.img_link'),
    },
    {
      name: t('team.deputyDirector.name'),
      title: t('team.deputyDirector.title'),
      description: t('team.deputyDirector.description'),
      contact: t.raw('team.deputyDirector.contact'),
      image: t.raw('team.deputyDirector.img_link'),
    },
    {
      name: t('team.financialDirector.name'),
      title: t('team.financialDirector.title'),
      description: t('team.financialDirector.description'),
      contact: t.raw('team.financialDirector.contact'),
      image: t.raw('team.financialDirector.img_link'),
    },
    {
      name: t('team.operationsManager.name'),
      title: t('team.operationsManager.title'),
      description: t('team.operationsManager.description'),
      contact: t.raw('team.operationsManager.contact'),
      image: t.raw('team.operationsManager.img_link'),
    },
  ]

  return (
    <section className='py-20 bg-muted/50'>
      <div className='container'>
        <AnimatedSection className='text-center space-y-4 mb-16'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold'
            variants={fadeInUp}
          >
            {t('team.title')}
          </motion.h2>
          <motion.p
            className='text-xl text-muted-foreground max-w-2xl mx-auto'
            variants={fadeInUp}
          >
            {t('team.subtitle')}
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              {...scaleOnHover}
              className={
                index === 0
                  ? 'md:col-span-3 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : ''
              }
            >
              <div className={index === 0 ? 'lg:col-start-2 lg:col-end-3' : ''}>
                <Card className='text-center h-full hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-background to-muted/30'>
                  <CardHeader className='flex flex-col items-center'>
                    <motion.div
                      className='w-32 h-32 rounded-full overflow-hidden border-4 border-naples-yellow/50 shadow-md mb-4'
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={member.image || '/placeholder.svg'}
                        alt={member.name}
                        width={200}
                        height={200}
                        className='object-cover w-full h-full'
                      />
                    </motion.div>
                    <CardTitle className='text-xl font-bold'>
                      {member.name}
                    </CardTitle>
                    <CardDescription className='text-naples-yellow font-semibold'>
                      {member.title}
                    </CardDescription>

                    <div className='flex flex-col justify-center gap-1 mb-2'>
                      {member.contact.map((contact, i) => (
                        <a
                          key={i}
                          href={`tel:${contact.replaceAll(' ', '')}`}
                          target='_blank'
                          dir='ltr'
                          rel='noopener noreferrer'
                          className='hover:underline text-sm'
                        >
                          {contact}
                        </a>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
