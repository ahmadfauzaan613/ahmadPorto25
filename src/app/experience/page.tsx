'use client'
import React from 'react'
import { useExperience } from '../hooks/experience/useExperience'
import CardExperience from '@/components/CardExperience'
import { result } from 'lodash'
import { IExperienceType } from '@/types/ExperienceType'
import { motion } from 'framer-motion'

export default function Experience() {
  const { data, isLoading } = useExperience()
  const certificates = result(data, 'data', []) as IExperienceType[]
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime)
    const isEpoch = date.getTime() === 0

    if (isEpoch) return 'Present'

    return date.toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <motion.div className="mt-10 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <motion.h1 className="text-[#f04c1c] font-bold text-4xl sm:text-5xl md:text-6xl xl:text-[96px]" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        EXPERIENCE
      </motion.h1>

      {data && certificates.length === 0 ? (
        <motion.p className="text-[#f04c1c] mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
          Kosong
        </motion.p>
      ) : (
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5"
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
          {certificates.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <CardExperience id={item.id} createdAt={item.createdAt} updatedAt={item.updatedAt} company={item.company} role={item.role} description={item.description} location={item.location} startDate={formatDate(item.startDate)} endDate={formatDate(item.endDate)} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
