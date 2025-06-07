'use client'

import { useCertificate } from '@/app/hooks/useCertificate'
import Table from '@/components/Table'
import TiltleAdmin from '@/components/TiltleAdmin'
import React from 'react'

export default function Certificate() {
  const { data, isLoading } = useCertificate()
  return (
    <TiltleAdmin tilte="CERTIFICATE">
      <Table />
    </TiltleAdmin>
  )
}
