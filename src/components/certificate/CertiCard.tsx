'use client'

import { useCertificate } from '@/app/hooks/certificate/useCertificate'
import { ICertificateType } from '@/types/CertificateType'
import { result } from 'lodash'
import Image from 'next/image'
import React from 'react'

export default function CertiCard() {
  const { data, isLoading } = useCertificate()
  const dataCerti = result(data, 'data', []) as ICertificateType[]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loader"></span>
      </div>
    )
  }
  return dataCerti.map((item, idx) => (
    <div className="w-full bg-[#f04c1c] h-[50vh] relative" key={idx}>
      <Image src={item.image} alt={item.name} fill className="object-cover" />
    </div>
  ))
  return <div></div>
}
