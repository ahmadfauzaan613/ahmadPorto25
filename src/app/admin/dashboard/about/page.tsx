'use client'

import { useAbout } from '@/app/hooks/useAbout'
import Table from '@/components/Table'
import TiltleAdmin from '@/components/TiltleAdmin'
import React from 'react'

export default function AboutAdmin() {
  const { data, isLoading } = useAbout()
  return <TiltleAdmin tilte="ABOUT">{data}</TiltleAdmin>
}
