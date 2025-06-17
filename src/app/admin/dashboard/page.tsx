'use client'
import { useCreateHome } from '@/app/hooks/home/useCreateHome'
import { useHome } from '@/app/hooks/home/useHome'
import { useUpdateHome } from '@/app/hooks/home/useUpdateHome'
import InputAdmin from '@/components/Admin/home/InputAdmin'
import DialogConfirm from '@/components/DialogConfirm'
import ErrorDialog from '@/components/ErrorDialog'
import SuccessDialog from '@/components/SuccessDialog'
import TiltleAdmin from '@/components/TiltleAdmin'
import { Button } from '@/components/ui/button'
import { IHomeType, IHomeUpdateType } from '@/types/HomeType'
import { result } from 'lodash'
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
  const { data, isLoading } = useHome()
  const [available, setAvailable] = useState(false)
  const [open, setOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldInput, setFieldInput] = useState<IHomeType>({
    role: '',
    dataLink: [],
  })
  useEffect(() => {
    if (data) {
      setFieldInput({
        role: result(data, 'data.role', ''),
        dataLink: result(data, 'data.dataLink', []),
      })
    }
  }, [data])

  const handleLinkChange = (index: number, value: string) => {
    setFieldInput((prev) => {
      const updatedLinks = [...prev.dataLink]
      updatedLinks[index] = { ...updatedLinks[index], url: value }
      return { ...prev, dataLink: updatedLinks }
    })
  }

  // CREATE DATA
  const payloadCreate: IHomeType = {
    role: fieldInput?.role,
    dataLink: fieldInput?.dataLink,
  }
  const { mutate: createHome } = useCreateHome()

  // UPDATE DATA
  const payloadUpdate: IHomeUpdateType = {
    id: result(data, 'data.id', ''),
    payload: {
      role: result(fieldInput, 'role', ''),
      dataLink: result(fieldInput, 'dataLink', []),
    },
  }

  const { mutate: updateHome } = useUpdateHome()

  const handleButton = async () => {
    try {
      if (data === null) {
        await createHome(payloadCreate)
      } else {
        await updateHome(payloadUpdate)
        setAvailable(!available)
      }
      setOpen(false)
      setShowSuccess(true)
    } catch (error) {
      console.error(error)
      setOpen(false)
      setErrorMsg('Failed to save data. Please try again.')
      setShowError(true)
    }
  }

  return (
    <TiltleAdmin tilte="HOME" addButton={false} onClick={() => {}}>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <InputAdmin
            disabled={!available}
            placeholder="Role"
            label="Role"
            value={fieldInput.role}
            onChange={(e) =>
              setFieldInput((prev) => ({
                ...prev,
                role: e.target.value,
              }))
            }
          />
          <div>
            <p className="text-xl mt-3">Link</p>
            <div className="mt-3">
              {fieldInput.dataLink.map((item, index) => (
                <InputAdmin key={index} disabled={!available} label={item.type} placeholder={item.type} value={item.url} onChange={(e) => handleLinkChange(index, e.target.value)} />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-6 mt-6">
            <Button className="w-28" onClick={() => setAvailable(!available)}>
              {!available ? 'Edit' : 'Cancel'}
            </Button>
            <Button className="w-28" disabled={!available} onClick={() => setOpen(!open)}>
              {data === null ? 'Create' : 'Update'}
            </Button>
          </div>
        </>
      )}
      <DialogConfirm open={open} setOpen={setOpen} handleConfirm={handleButton} />
      <SuccessDialog open={showSuccess} onClose={() => setShowSuccess(false)} />
      <ErrorDialog open={showError} onClose={() => setShowError(false)} message={errorMsg} />
    </TiltleAdmin>
  )
}
