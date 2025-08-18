import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { routing } from '@/src/i18n/routing'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Cairo, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import type React from 'react'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })
const cairo = Cairo({ subsets: ['arabic', 'latin'] })

export const metadata = {
  title: 'Falcon Logistics',
  description: 'International logistics solutions with multilingual support.',
  icons: {
    icon: '/favicon_io/favicon.ico',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const messages = await getMessages()
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={locale === 'en' ? inter.className : cairo.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
          >
            <div className='min-h-screen flex flex-col'>
              <Header />
              <main className='flex-1'>{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
