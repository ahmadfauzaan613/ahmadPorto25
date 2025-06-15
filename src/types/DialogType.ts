import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface IDialogDelete {
  onConfirm: () => void
  trigger: React.ReactNode
}

export interface IDialogAdd {
  children: ReactNode
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleAdd: () => void
}

export interface IDialogEdit {
  children: ReactNode
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onReset: () => void
  handleUpdate: () => void
}

export interface IDialogConfirm {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleConfirm: () => void
}
