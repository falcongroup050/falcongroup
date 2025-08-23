import { fadeInUp } from '@/lib/motion'
import { motion } from 'framer-motion'

const socialMediaLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/15wbhb1464/?mibextid=wwXIfr',
    icon: () => (
      <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
      </svg>
    ),
  },
  // {
  //   name: 'Twitter',
  //   url: 'https://twitter.com/yourhandle',
  //   icon: () => (
  //     <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
  //       <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
  //     </svg>
  //   ),
  // },
  // {
  //   name: 'Instagram',
  //   url: 'https://instagram.com/yourprofile',
  //   icon: () => (
  //     <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
  //       <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.875 2.026-1.297 3.323-1.297s2.448.422 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.404h-1.297V6.287h1.297v1.297zm-4.346 9.404c-2.026 0-3.708-1.682-3.708-3.708s1.682-3.708 3.708-3.708 3.708 1.682 3.708 3.708-1.682 3.708-3.708 3.708z' />
  //     </svg>
  //   ),
  // },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/falcon-group-754586380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    icon: () => (
      <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@FalconGroup-eg-2025',
    icon: () => (
      <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:info@falcongroup-eg.com',
    icon: () => (
      <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
        <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
        <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
      </svg>
    ),
  },
]

export default function SocialMediaIcons() {
  return (
    <motion.div className='space-y-4' variants={fadeInUp}>
      <div className='flex space-x-4 rtl:space-x-reverse'>
        {socialMediaLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target='_blank'
            rel='noopener noreferrer'
            className='group'
            variants={fadeInUp}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <motion.div
              className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 group-hover:border-naples-yellow group-hover:bg-naples-yellow transition-all duration-300'
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className='text-naples-yellow group-hover:text-gray-900 transition-colors'>
                <social.icon />
              </div>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
