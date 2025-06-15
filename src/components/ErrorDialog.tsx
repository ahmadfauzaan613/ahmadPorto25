import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ErrorDialog({ open, onClose, message = 'Something went wrong.' }: { open: boolean; onClose: () => void; message?: string }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2">
            <XCircle className="text-red-500 w-10 h-10" />
            <span className="text-lg font-semibold text-red-700">Error</span>
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">{message}</p>
        <div className="mt-4">
          <Button onClick={onClose} className="bg-red-600 text-white hover:bg-red-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
