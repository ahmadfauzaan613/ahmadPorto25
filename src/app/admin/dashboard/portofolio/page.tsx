'use client'

import { usePorto } from '@/app/hooks/portofolio/usePorto'
import { useCreatePorto } from '@/app/hooks/portofolio/usePortoAdd'
import { useDeletePorto } from '@/app/hooks/portofolio/usePortoDelete'
import DialogAdd from '@/components/DialogAdd'
import DialogDelete from '@/components/DialogDelete'
import ErrorDialog from '@/components/ErrorDialog'
import SuccessDialog from '@/components/SuccessDialog'
import Table from '@/components/Table'
import TiltleAdmin from '@/components/TiltleAdmin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IPortoCreate, IPortofolioType } from '@/types/Portofolio'
import { CellContext, createColumnHelper } from '@tanstack/react-table'
import { Edit2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Portofolio() {
  const { data, isLoading } = usePorto()
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [addLogoArr, setLogoArr] = useState<{ name: string }[]>([])
  const columnHelper = createColumnHelper<IPortofolioType>()

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: (item) => {
        const imageUrl = item.getValue()
        return <Image width={20} height={20} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageUrl}`} alt="Image" className="h-12 w-12 object-cover rounded" />
      },
    }),
    columnHelper.accessor('logo', {
      header: 'Logo',
      cell: (item) => {
        const logos = item.getValue() as unknown as { id: number; file: string; name: string }[]

        if (!logos || logos.length === 0) {
          return <span className="text-sm text-gray-400 italic">No logos</span>
        }

        return (
          <div className="flex gap-2">
            {logos.map((logo, index) => (
              <Image key={index} width={24} height={24} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${logo.file}`} alt={logo.name || `Logo ${index + 1}`} className="h-12 w-12 object-cover rounded" />
            ))}
          </div>
        )
      },
    }),
    columnHelper.accessor('link', {
      header: 'Link',
      cell: (item) => item.getValue(),
    }),
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: CellContext<IPortofolioType, unknown>) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedId(row.original.id)
              handleOpenEdit()
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

  const { mutate: mutateDeletePorto } = useDeletePorto()
  const handleDelete = async (id: string) => {
    try {
      await mutateDeletePorto(id)
      setShowSuccess(true)
    } catch (error) {
      console.error(error)
      setErrorMsg('Delete failed.')
      setShowError(true)
    }
  }

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [logoFiles, setLogoFiles] = useState<File[]>([])
  const [filterValue, setFilterValue] = useState<IPortoCreate>({
    name: '',
    description: '',
    image: '',
    link: '',
    logo: [],
  })

  const initialValue: IPortoCreate = {
    name: '',
    description: '',
    image: '',
    link: '',
    logo: [],
  }

  const handleOpenAdd = () => {
    setOpenAdd(true)
    setFilterValue(initialValue)
    setLogoArr([])
  }

  const fields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image', label: 'Image', type: 'Uploadimage' },
    { key: 'link', label: 'Link', type: 'text' },
  ] as const

  const handleAddLogo = () => {
    setLogoArr((prev) => [...prev, { file: '', name: '' }])
  }

  const { mutate: createPorto } = useCreatePorto()
  const handleSubmit = async () => {
    try {
      const payload: IPortoCreate = {
        ...filterValue,
        image: '',
        logo: addLogoArr.map((item) => ({
          name: item.name,
          file: '',
        })),
      }
      createPorto({
        payload,
        image: imageFile,
        files: logoFiles,
      })
      setOpenAdd(false)
      setShowSuccess(true)
    } catch (error) {
      console.error(error)
      setOpenAdd(false)
      setErrorMsg('Failed to save data. Please try again.')
      setShowError(true)
    }
  }

  return (
    <TiltleAdmin tilte="PORTOFOLIO" addButton={true} onClick={handleOpenAdd}>
      <Table data={data ?? []} columns={columns} isLoading={isLoading} />
      <DialogAdd open={openAdd} setOpen={setOpenAdd} handleAdd={handleSubmit}>
        <div className="space-y-4">
          {fields.map((field) => {
            const { key, label, type } = field
            switch (type) {
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
              case 'Uploadimage':
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      type="file"
                      accept="image/*"
                      className="mt-2 w-full outline-none capitalize"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setImageFile(file)
                          setFilterValue((prev) => ({
                            ...prev,
                            image: file.name,
                          }))
                        }
                      }}
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
        <div>
          <div className="flex justify-end">
            <Button onClick={handleAddLogo}>Add Logo</Button>
          </div>
          {addLogoArr && addLogoArr.length === 0 ? (
            <div className="border p-2 mt-3 rounded-md">
              <p>Image Kosong</p>
            </div>
          ) : (
            addLogoArr.map((item, idx) => (
              <div className="grid items-center grid-cols-2 gap-2" key={idx}>
                <div>
                  <Label htmlFor="logo">Logo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      setLogoFiles((prev) => {
                        const updated = [...prev]
                        updated[idx] = file
                        return updated
                      })
                    }}
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor={`logo-name-${idx}`}>Logo Name</Label>
                  <Input
                    id={`logo-name-${idx}`}
                    value={item.name}
                    onChange={(e) => {
                      const name = e.target.value
                      setLogoArr((prev) => {
                        const updated = [...prev]
                        updated[idx].name = name
                        return updated
                      })
                    }}
                    placeholder="Logo Name"
                    type="text"
                    className="mt-2 w-full outline-none capitalize"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </DialogAdd>
      <SuccessDialog open={showSuccess} onClose={() => setShowSuccess(false)} />
      <ErrorDialog open={showError} onClose={() => setShowError(false)} message={errorMsg} />
    </TiltleAdmin>
  )
}
