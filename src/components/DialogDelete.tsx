import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IDialogDelete } from '@/types/DialogType'
import { Button } from './ui/button'

export default function DialogDelete({ onConfirm, trigger }: IDialogDelete) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>Are you sure you want to delete this data?</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <DialogTrigger asChild>
            <Button className="px-3 py-1 text-sm bg-gray-200 rounded">Cancel</Button>
          </DialogTrigger>
          <Button onClick={onConfirm} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
