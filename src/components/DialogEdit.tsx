import { IDialogEdit } from '@/types/DialogType'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'

export default function DialogEdit({ children, open, setOpen, onReset, handleUpdate }: IDialogEdit) {
  const handleOpenChange = (value: boolean) => {
    setOpen(value)
    if (!value) {
      onReset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle className="text-center">Update Data</DialogTitle>
        </DialogHeader>
        {children}
        <div className="flex justify-end gap-2 mt-4">
          <DialogTrigger asChild>
            <Button className="px-3 py-1 text-sm bg-gray-200 rounded">Cancel</Button>
          </DialogTrigger>
          <Button onClick={handleUpdate} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
