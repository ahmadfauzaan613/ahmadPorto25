'use client'

import { useAbout } from '@/app/hooks/about/useAbout'
import { useCreateAbout } from '@/app/hooks/about/useCreateAbout'
import { useUpdateAbout } from '@/app/hooks/about/useUpdate'
import DialogConfirm from '@/components/DialogConfirm'
import ErrorDialog from '@/components/ErrorDialog'
import SuccessDialog from '@/components/SuccessDialog'
import TiltleAdmin from '@/components/TiltleAdmin'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { IAboutType, IAboutUpdateType } from '@/types/AboutType'
import { result } from 'lodash'
import React, { useEffect, useState } from 'react'

export default function AboutAdmin() {
  const [available, setAvailable] = useState(false)
  const [open, setOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [text, setText] = useState('')
  // GET DATA
  const { data, isLoading } = useAbout()
  useEffect(() => {
    if (result(data, 'data.text', '')) {
      setText(result(data, 'data.text', ''))
    }
  }, [data])

  // CREATE DATA
  const payloadCreate: IAboutType = {
    text: text,
  }
  const { mutate: createAbout } = useCreateAbout()

  // UPDATE DATA
  const payloadUpdate: IAboutUpdateType = {
    id: result(data, 'data.id', ''),
    payload: {
      text: text,
    },
  }
  const { mutate: updateAbout } = useUpdateAbout()

  const handleButton = async () => {
    try {
      if (data === null) {
        await createAbout(payloadCreate)
      } else {
        await updateAbout(payloadUpdate)
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
    <TiltleAdmin tilte="ABOUT" addButton={false} onClick={() => {}}>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <Textarea placeholder="About" onChange={(e) => setText(e.target.value)} disabled={!available} className="outline-none my-10" rows={8} value={text} />
          <div className="flex justify-end gap-6">
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
