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
    <div className="w-full  h-[30vh] sm:h-[40vh] md:h-[50vh] relative overflow-hidden shadow hover:shadow-lg transition-all" key={idx}>
      <Image src={item.image} alt={item.name} fill className="object-contain" />
    </div>
  ))
  return <div></div>
}
