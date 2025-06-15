'use client'
import React from 'react'
import { useExperience } from '../hooks/experience/useExperience'
import CardExperience from '@/components/CardExperience'

export default function Experience() {
  const { data } = useExperience()
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime)
    const isEpoch = date.getTime() === 0

    if (isEpoch) return 'Present'

    return date.toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    })
  }
  return (
    <div className="mt-10">
      <h1 className="text-[#f04c1c] font-bold text-[96px]">EXPERIENCE</h1>
      {data && data.length === 0 ? (
        <p>Kosong</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-5">
          {data?.map((item, idx) => (
            <div key={idx}>
              <CardExperience id={item.id} createdAt={item.createdAt} updatedAt={item.updatedAt} company={item.company} role={item.role} description={item.description} location={item.location} startDate={formatDate(item.startDate)} endDate={formatDate(item.endDate)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
