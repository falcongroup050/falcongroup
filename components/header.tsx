'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleOnHover,
  staggerContainer,
} from '@/lib/motion'
import { motion } from 'framer-motion'
import { Menu, Moon, Sun, Truck } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useState } from 'react'
import { LanguageToggle } from './language-toggle'
import Image from 'next/image'

export function Header() {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('services'), href: `/${locale}/services` },
    { name: t('contact'), href: `/${locale}/contact` },
    { name: t('achievements'), href: `/${locale}/achievements` },
    { name: t('portfolio'), href: `/${locale}/portfolio` },
  ]

  return (
    <motion.header
      className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      initial='initial'
      animate='animate'
      variants={fadeInDown}
    >
      <div className='container flex h-16 items-center justify-between'>
        {/* Logo */}
        <motion.div variants={fadeInLeft}>
          <Link
            href={`/${locale}`}
            className='flex items-center space-x-2 rtl:space-x-reverse'
          >
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
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className='hidden md:flex items-center space-x-6 rtl:space-x-reverse'
          variants={staggerContainer}
        >
          {navigation.map((item) => (
            <motion.div key={item.name} variants={fadeInUp} {...scaleOnHover}>
              <Link
                href={item.href}
                className='text-sm font-medium transition-colors hover:text-naples-yellow'
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Actions */}
        <motion.div
          className='flex items-center space-x-2 rtl:space-x-reverse'
          variants={fadeInRight}
        >
          {/* Language Switcher */}
          <LanguageToggle />

          {/* Theme Toggle */}
          <motion.div {...scaleOnHover}>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className='md:hidden'>
              <motion.div {...scaleOnHover}>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-4 w-4' />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side={locale === 'ar' ? 'left' : 'right'}>
              <SheetTitle className='sr-only'>Menu</SheetTitle>
              <motion.div
                className='flex flex-col space-y-4 mt-8'
                initial='initial'
                animate='animate'
                variants={staggerContainer}
              >
                {navigation.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={fadeInLeft}
                    {...scaleOnHover}
                  >
                    <Link
                      href={item.href}
                      className='text-lg font-medium transition-colors hover:text-naples-yellow'
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </motion.header>
  )
}
