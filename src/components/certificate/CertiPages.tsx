'use client'
import CertiCard from '@/components/certificate/CertiCard'
import React from 'react'
import { motion } from 'framer-motion'

export default function CertiPages() {
  return (
    <motion.div className="xs:px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <motion.div className="mt-10 bg-[#f04c1c] px-4 sm:px-6 py-5" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-9xl text-white font-bold pb-2">CERTIFICATE</h1>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <CertiCard />
      </motion.div>
    </motion.div>
  )
}
