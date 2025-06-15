import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SuccessDialog({ open, onClose, message = 'Operation was successful.' }: { open: boolean; onClose: () => void; message?: string }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2">
            <CheckCircle2 className="text-green-500 w-10 h-10" />
            <span className="text-lg font-semibold text-green-700">Success</span>
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">{message}</p>
        <div className="mt-4">
          <Button onClick={onClose} className="bg-green-600 text-white hover:bg-green-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
