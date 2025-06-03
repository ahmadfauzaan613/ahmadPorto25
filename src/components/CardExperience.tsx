import { IExperienceType } from '@/types/ExperienceType'
import React from 'react'

export default function CardExperience({ company, role, description, location, startDate, endDate }: IExperienceType) {
  return (
    <div className="p-2 border-2 border-[#f04c1c]">
      <p className="text-2xl font-bold text-[#f04c1c]">{company}</p>
      <p className="text-xl text-[#f04c1c]">{role}</p>
      <p className="text-sm py-3 text-[#f04c1c]">{description}</p>
      <div className="flex items-center justify-between">
        <p className="text-[#f04c1c]">{location}</p>
        <div className="flex items-center">
          <p className="text-[#f04c1c]">
            {startDate} - {endDate}
          </p>
        </div>
      </div>
    </div>
  )
}
