'use client'

import React from 'react'
import { useAbout } from '../hooks/about/useAbout'
import Image from 'next/image'
import { result } from 'lodash'
import { motion } from 'framer-motion'

export default function About() {
  const { data, isLoading } = useAbout()
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loader"></span>
      </div>
    )
  }
  return (
    <motion.div className="h-full w-full px-4 sm:px-6 lg:px-8 py-5 mt-10" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <div>
        <motion.h1 className="text-[#f04c1c] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[96px]" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          ABOUT
        </motion.h1>

        <motion.div className="bg-black w-full h-[30vh] sm:h-[35vh] md:h-[40vh] my-7 relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
          <Image src="/images/IMG_3070.JPG" alt="Gambar dari Pinterest" fill className="object-cover object-top" />
        </motion.div>
      </div>

      <motion.p className="text-[#f04c1c] text-base sm:text-lg md:text-xl leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
        {result(data, 'data.text', '')}
      </motion.p>
    </motion.div>
  )
}
