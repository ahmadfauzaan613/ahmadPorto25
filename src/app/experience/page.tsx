'use client'
import React from 'react'
import { useExperience } from '../hooks/useExperience'
import CardExperience from '@/components/CardExperience'

export default function Experience() {
  const { data, isLoading } = useExperience()
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime)
    const isEpoch = date.getTime() === 0

    if (isEpoch) return 'Present'

    return date.toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    })
  }
  return isLoading ? (
    ''
  ) : (
    <div className="mt-10">
      <p className="text-9xl font-bold text-[#f04c1c]">EXPERIENCE</p>
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
