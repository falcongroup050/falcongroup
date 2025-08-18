'use client'

import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

export function LanguageToggle() {
  const locale = useLocale()
  const pathName = usePathname()

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => {
        const newLocale = locale === 'en' ? 'ar' : 'en'
        const newPath = pathName.replace(`/${locale}`, `/${newLocale}`)
        window.location.pathname = newPath
      }}
    >
      <Languages className='h-4 w-4' />
      <span className='sr-only'>Toggle language</span>
      <span className='ml-1 text-xs'>{locale.toUpperCase()}</span>
      {/* <p>{pathName}</p> */}
    </Button>
  )
}
