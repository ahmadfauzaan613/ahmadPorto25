import React from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'

export default function DatePicker({ date, onChange }: { date: string; onChange: (val: string) => void }) {
  const parsedDate = date ? new Date(date) : undefined
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className="w-full justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {parsedDate ? format(parsedDate, 'PPP') : <span>Choose a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={parsedDate}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              onChange(selectedDate.toISOString())
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
