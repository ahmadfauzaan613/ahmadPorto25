import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IDialogAdd } from '@/types/DialogType'
import { Button } from './ui/button'

export default function DialogAdd({ children, open, setOpen, handleAdd }: IDialogAdd) {
  return (
    <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle className="text-center">Add Data</DialogTitle>
        </DialogHeader>
        {children}
        <div className="flex justify-end gap-2 mt-4">
          <DialogTrigger asChild>
            <Button className="px-3 py-1 text-sm bg-gray-200 rounded">Cancel</Button>
          </DialogTrigger>
          <Button onClick={handleAdd} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
            Add Data
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
