'use client'
import React from 'react'
import CardPorto from '@/components/portofolio/CardPorto'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function PortoPages() {
  return (
    <motion.div className="px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <div className="my-3 px-4 sm:px-6 lg:px-8">
        <motion.div className="bg-[#f04c1c] my-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl xl:text-[96px] p-5">PORTOFOLIO</h1>
          <motion.div className="bg-black w-full h-[25vh] sm:h-[30vh] md:h-[40vh] relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
            <Image src="/images/Bersoreria12828-BW.jpg" alt="Gambar dari Pinterest" fill className="object-cover" />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <CardPorto />
        </motion.div>
      </div>
    </motion.div>
  )
}
