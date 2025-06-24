import { IExperienceType } from '@/types/ExperienceType'
import React from 'react'

export default function CardExperience({ company, role, description, location, startDate, endDate }: IExperienceType) {
  return (
    <div className="p-4 sm:p-5 border-2 border-[#f04c1c] shadow-sm hover:shadow-md transition">
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#f04c1c]">{company}</p>
      <p className="text-base sm:text-lg md:text-xl text-[#f04c1c]">{role}</p>
      <p className="text-sm sm:text-base py-3 text-[#f04c1c]">{description}</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-[#f04c1c]">{location}</p>
        <p className="text-[#f04c1c]">
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  )
}
