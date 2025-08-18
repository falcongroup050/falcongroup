'use client'

import { About } from '@/components/home-page/about'
import { CTASection } from '@/components/home-page/cta'
import Hero from '@/components/home-page/hero'
import { Services } from '@/components/home-page/services'

export default function HomePage() {
  return (
    <div className='flex flex-col'>
      <Hero />

      <Services />

      <About />

      <CTASection />
    </div>
  )
}
