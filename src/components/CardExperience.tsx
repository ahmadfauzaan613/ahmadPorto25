import { IExperienceType } from '@/types/ExperienceType'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function CardExperience({ company, role, description, location, startDate, endDate, shouldTruncate, toggleExpand, isExpanded }: IExperienceType) {
  return (
    <div className="p-4 sm:p-5 border-2 border-[#f04c1c] shadow-sm hover:shadow-md transition h-full flex flex-col justify-between">
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#f04c1c]">{company}</p>
      <p className="text-base sm:text-lg md:text-xl text-[#f04c1c]">{role}</p>
      <div className="text-sm sm:text-base py-3 text-[#f04c1c]">
        <AnimatePresence initial={false}>
          <motion.div key={isExpanded ? 'expanded' : 'collapsed'} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: 'anticipate' }}>
            {description}
          </motion.div>
        </AnimatePresence>

        {shouldTruncate && (
          <button onClick={toggleExpand} className="mt-1 underline text-[#f04c1c] hover:text-[#c73d16] transition text-sm">
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-[#f04c1c]">{location}</p>
        <p className="text-[#f04c1c]">
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  )
}
