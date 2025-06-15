import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IDialogConfirm } from '@/types/DialogType'
import { Button } from './ui/button'

export default function DialogConfirm({ open, setOpen, handleConfirm }: IDialogConfirm) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>Are you sure you want to create/update this data?</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <DialogTrigger asChild>
            <Button className="px-3 py-1 text-sm bg-gray-200 rounded">Cancel</Button>
          </DialogTrigger>
          <Button onClick={handleConfirm} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
