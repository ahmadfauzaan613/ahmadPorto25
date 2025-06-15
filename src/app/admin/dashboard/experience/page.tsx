'use client'

import { useDeleteExperience } from '@/app/hooks/experience/UseExpDelete'
import { useExperience } from '@/app/hooks/experience/useExperience'
import DialogDelete from '@/components/DialogDelete'
import Table from '@/components/Table'
import TiltleAdmin from '@/components/TiltleAdmin'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IExperienceCreateType, IExperienceType, IExperienceUpdateType } from '@/types/ExperienceType'
import { CellContext, createColumnHelper } from '@tanstack/react-table'
import { Edit2, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DialogEdit from '@/components/DialogEdit'
import DatePicker from '@/components/DatePicker'
import DialogAdd from '@/components/DialogAdd'
import SuccessDialog from '@/components/SuccessDialog'
import ErrorDialog from '@/components/ErrorDialog'
import { useCreateExp } from '@/app/hooks/experience/useExpAdd'
import { useUpdateExp } from '@/app/hooks/experience/UseExpUpdate'
import { Textarea } from '@/components/ui/textarea'

export default function Experience() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const { data, isLoading } = useExperience()
  const { mutate: mutateDelete } = useDeleteExperience()
  const handleDelete = async (id: string) => {
    try {
      await mutateDelete(id)
      setShowSuccess(true)
    } catch (error) {
      console.error(error)
      setErrorMsg('Delete failed.')
      setShowError(true)
    }
  }
  const fields = [
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'startDate', label: 'Start Date', type: 'date' },
    { key: 'endDate', label: 'End Date', type: 'date' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ] as const

  const [filterValue, setFilterValue] = useState<IExperienceType>({
    id: NaN,
    company: '',
    role: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    createdAt: '',
    updatedAt: '',
  })

  const initialValue: IExperienceType = {
    id: NaN,
    company: '',
    role: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    createdAt: '',
    updatedAt: '',
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleOpenAdd = () => {
    setOpenAdd(true)
    setFilterValue(initialValue)
  }

  useEffect(() => {
    if (selectedId !== null && data && data.length > 0) {
      const selected = data.find((item) => item.id === selectedId)
      if (selected) {
        setFilterValue(selected)
      }
    }
  }, [selectedId, data])

  const columnHelper = createColumnHelper<IExperienceType>()

  const columns = [
    columnHelper.accessor('company', {
      header: 'Company',
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor('startDate', {
      header: 'Start Date',
      cell: (item) => new Date(item.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('endDate', {
      header: 'End Date',
      cell: (item) => new Date(item.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      cell: (item) => item.getValue(),
    }),
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: CellContext<IExperienceType, unknown>) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedId(row.original.id)
              handleOpen()
            }}
            className="p-1 text-blue-600 hover:text-blue-800"
            aria-label="Edit"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>

          <DialogDelete
            onConfirm={() => handleDelete(String(row.original.id))}
            trigger={
              <button className="p-1 text-red-600 hover:text-red-800" aria-label="Delete" title="Delete">
                <Trash2 size={16} />
              </button>
            }
          />
        </div>
      ),
    },
  ]

  const payloadCreate: IExperienceCreateType = {
    company: filterValue.company,
    role: filterValue.role,
    description: filterValue.description,
    startDate: filterValue.startDate,
    endDate: filterValue.endDate,
    location: filterValue.location,
  }

  const { mutate: createExp } = useCreateExp()

  const handleAdd = async () => {
    try {
      await createExp(payloadCreate)
      setShowSuccess(true)
      setOpenAdd(false)
    } catch (error) {
      console.error(error)
      setErrorMsg('Delete failed.')
      setShowError(true)
      setOpenAdd(false)
    }
  }

  const payloadUpdate: IExperienceUpdateType = {
    id: selectedId,
    company: filterValue.company,
    role: filterValue.role,
    description: filterValue.description,
    startDate: filterValue.startDate,
    endDate: filterValue.endDate,
    location: filterValue.location,
  }

  const { mutate: updateExp } = useUpdateExp()

  const handleUpdate = async () => {
    try {
      await updateExp(payloadUpdate)
      setShowSuccess(true)
      setOpen(false)
    } catch (error: unknown) {
      console.error(error)
      setErrorMsg('Update failed.')
      setShowError(true)
      setOpen(false)
    }
  }

  return (
    <TiltleAdmin tilte="EXPERIENCE" addButton={true} onClick={handleOpenAdd}>
      <Table data={data ?? []} columns={columns} isLoading={isLoading} />
      <DialogEdit
        open={open}
        setOpen={setOpen}
        onReset={() => {
          if (selectedId && data) {
            const selected = data.find((item) => item.id === selectedId)
            if (selected) {
              setFilterValue(selected)
            }
          }
        }}
        handleUpdate={handleUpdate}
      >
        <div className="space-y-4">
          {fields.map((field) => {
            const { key, label, type } = field

            switch (type) {
              case 'date':
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{label}</Label>
                    <div className="mt-2">
                      <DatePicker
                        date={filterValue[key]}
                        onChange={(val) =>
                          setFilterValue((prev) => ({
                            ...prev,
                            [key]: val,
                          }))
                        }
                      />
                    </div>
                  </div>
                )
              case 'textarea':
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{label}</Label>
                    <Textarea
                      rows={4}
                      id={key}
                      value={filterValue[key]}
                      onChange={(e) =>
                        setFilterValue((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="mt-2 w-full outline-none capitalize"
                    />
                  </div>
                )
              case 'text':
              default:
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      value={filterValue[key]}
                      onChange={(e) =>
                        setFilterValue((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="mt-2 w-full outline-none capitalize"
                    />
                  </div>
                )
            }
          })}
        </div>
      </DialogEdit>
      <DialogAdd open={openAdd} setOpen={setOpenAdd} handleAdd={handleAdd}>
        <div className="space-y-4">
          {fields.map((field) => {
            const { key, label, type } = field

            switch (type) {
              case 'date':
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{label}</Label>
                    <div className="mt-2">
                      <DatePicker
                        date={filterValue[key]}
                        onChange={(val) =>
                          setFilterValue((prev) => ({
                            ...prev,
                            [key]: val,
                          }))
                        }
                      />
                    </div>
                  </div>
                )
              case 'textarea':
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{label}</Label>
                    <Textarea
                      rows={4}
                      id={key}
                      value={filterValue[key]}
                      onChange={(e) =>
                        setFilterValue((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="mt-2 w-full outline-none capitalize"
                    />
                  </div>
                )
              case 'text':
              default:
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      value={filterValue[key]}
                      onChange={(e) =>
                        setFilterValue((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      placeholder={`${label.toLowerCase()}`}
                      className="mt-2 w-full outline-none capitalize"
                    />
                  </div>
                )
            }
          })}
        </div>
      </DialogAdd>
      <SuccessDialog open={showSuccess} onClose={() => setShowSuccess(false)} />
      <ErrorDialog open={showError} onClose={() => setShowError(false)} message={errorMsg} />
    </TiltleAdmin>
  )
}
