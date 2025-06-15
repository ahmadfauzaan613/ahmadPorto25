import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IInput } from '@/types/Input'
import React from 'react'

export default function InputAdmin({ label, onChange, value, placeholder, disabled }: IInput) {
  return (
    <div className="mt-3">
      <Label className="text-sm">{label}</Label>
      <Input type="text" placeholder={placeholder} disabled={disabled} className="mt-1 rounded-none outline-none" onChange={onChange} value={value} />
    </div>
  )
}
