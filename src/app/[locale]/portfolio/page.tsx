import { CTASection } from '@/components/home-page/cta'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

type MediaItem = {
  id: number
  type: 'image' | 'video'
  src: string
  title: string
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    src: '/video1.mp4',
    title: 'Project 1 Video',
  },
  {
    id: 2,
    type: 'video',
    src: '/video2.mp4',
    title: 'Project 2 Video',
  },
  {
    id: 3,
    type: 'video',
    src: '/video3.mp4',
    title: 'Project 3 Video',
  },
  {
    id: 4,
    type: 'video',
    src: '/video4.mp4',
    title: 'Project 4 Video',
  },
  {
    id: 5,
    type: 'video',
    src: '/video5.mp4',
    title: 'Project 5 Video',
  },
  {
    id: 6,
    type: 'video',
    src: '/video6.mp4',
    title: 'Project 6 Video',
  },
  // Add more items as needed
]

const Portfolio: React.FC = () => {
  const t = useTranslations('portfolio')

  return (
    <div className=''>
      <div className='bg-gradient-to-r from-eerie-black to-slate-gray text-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-4xl mx-auto'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>
              {t('title')}
            </h1>
            <p className='text-xl md:text-2xl text-blue-100 leading-relaxed'>
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className='container py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className='bg-white rounded-lg overflow-hidden shadow'
          >
            {item.type === 'image' ? (
              <Image
                src={item.src}
                alt={item.title}
                className='w-full rounded-lg'
                width={320}
                height={240}
              />
            ) : (
              <video
                src={`https://ynvtsbhncfrqhmaefnyj.supabase.co/storage/v1/object/public/portfolio${item.src}`}
                controls
                className='w-full max-h-56 object-cover rounded-lg'
              />
            )}
          </div>
        ))}
      </div>

      <CTASection />
    </div>
  )
}

export default Portfolio
