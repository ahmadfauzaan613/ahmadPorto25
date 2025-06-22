'use client'

import { usePorto } from '@/app/hooks/portofolio/usePorto'
import { useCreatePorto } from '@/app/hooks/portofolio/usePortoAdd'
import { useDeletePorto } from '@/app/hooks/portofolio/usePortoDelete'
import { useUpdatePorto } from '@/app/hooks/portofolio/usePortoUpdate'
import DialogAdd from '@/components/DialogAdd'
import DialogDelete from '@/components/DialogDelete'
import DialogEdit from '@/components/DialogEdit'
import ErrorDialog from '@/components/ErrorDialog'
import SuccessDialog from '@/components/SuccessDialog'
import Table from '@/components/Table'
import TiltleAdmin from '@/components/TiltleAdmin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IPortoCreate } from '@/types/Portofolio'
import { CellContext, createColumnHelper } from '@tanstack/react-table'
import { result } from 'lodash'
import { Edit2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Portofolio() {
  const { data, isLoading } = usePorto()
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedData, setSelectedData] = useState<IPortoCreate>({
    id: null,
    name: '',
    description: '',
    image: null,
    link: '',
    logo: [],
  })
  const [logosUpdate, setLogosUpdate] = useState<LogoItem[]>([{ file: null }])
  const [selectedDataLogo, setSelectedDataLogo] = useState<{ file: string }[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleOpenEdit = () => {
    setOpenEdit(true)
    setLogosUpdate([])
  }

  const columnHelper = createColumnHelper<IPortoCreate>()
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
        const value = item.getValue() as string | null
        return value ? <Image src={value} alt="image" width={64} height={64} className="object-cover rounded" /> : <span className="text-gray-400 italic">No image</span>
      },
    }),
    columnHelper.accessor('logo', {
      header: 'Logo',
      cell: (item) => {
        const logos = (item.getValue() as { file: string }[]) || []
        return logos.length === 0 ? (
          <span className="text-gray-400 italic">No logo</span>
        ) : (
          <div className="flex gap-2">
            {logos.map((logo, index) => (
              <Image key={index} src={logo.file} alt={`logo-${index}`} width={40} height={40} className="object-contain rounded" />
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
      cell: ({ row }: CellContext<IPortoCreate, unknown>) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedId(row.original.id)
              handleOpenEdit()
              setSelectedData(row.original)
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

  const [filterValue, setFilterValue] = useState<IPortoCreate>({
    id: NaN,
    name: '',
    description: '',
    image: null,
    link: '',
    logo: [],
  })

  const initialValue: IPortoCreate = {
    id: NaN,
    name: '',
    description: '',
    image: null,
    link: '',
    logo: [],
  }

  const handleOpenAdd = () => {
    setOpenAdd(true)
    setFilterValue(initialValue)
    setLogos([])
  }

  useEffect(() => {
    if (selectedId !== null && data && result(data, 'data', []).length > 0) {
      const selected = (result(data, 'data', []) as IPortoCreate[]).find((item) => item.id === selectedId)
      if (selected) {
        setFilterValue(selected)
      }
    }
  }, [selectedId, data])

  const fields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image', label: 'Image', type: 'Uploadimage' },
    { key: 'link', label: 'Link', type: 'text' },
  ] as const

  type LogoItem = {
    file: File | null
  }

  const [logos, setLogos] = useState<LogoItem[]>([{ file: null }])
  const handleFileChange = (index: number, file: File | null) => {
    const updated = [...logos]
    updated[index].file = file
    setLogos(updated)
  }
  const handleAddLogo = () => {
    setLogos((prev) => [...prev, { file: null }])
  }
  const handleDeleteLogo = (index: number) => {
    setLogos((prev) => prev.filter((_, i) => i !== index))
  }
  const payloadData: IPortoCreate = {
    id: NaN,
    name: result(filterValue, 'name', ''),
    description: result(filterValue, 'description', ''),
    image: null,
    link: result(filterValue, 'link', ''),
    logo: [],
  }

  const { mutate: createPorto } = useCreatePorto()
  const handleSubmit = async () => {
    try {
      const logoFiles = logos.map((item) => item.file).filter((file): file is File => file !== null)

      await createPorto({
        payload: payloadData,
        image: filterValue.image,
        logo: logoFiles,
      })

      setOpenAdd(false)
      setShowSuccess(true)
      setLogos([{ file: null }])
    } catch (error) {
      console.error(error)
      setOpenAdd(false)
      setErrorMsg('Failed to save data. Please try again.')
      setShowError(true)
    }
  }
  // UPDATE

  useEffect(() => {
    const initialLogo = result(selectedData, 'logo', []) as { file: string }[]
    setSelectedDataLogo(initialLogo)
  }, [selectedData])
  const combinedLogos = [
    ...selectedDataLogo,
    ...logosUpdate
      .filter((item) => item.file instanceof File)
      .map((item) => ({
        file: item.file?.name || '',
      })),
  ]
  const handleFileChangeUpdate = (index: number, file: File | null) => {
    const updated = [...logosUpdate]
    updated[index].file = file
    setLogosUpdate(updated)
  }
  const handleAddLogoUpdate = () => {
    setLogosUpdate((prev) => [...prev, { file: null }])
  }
  const handleDeleteLogoUpdate = (index: number) => {
    setLogosUpdate((prev) => prev.filter((_, i) => i !== index))
  }
  const handleDeleteSelectedDataLogo = (index: number) => {
    setSelectedDataLogo((prev) => prev.filter((_, i) => i !== index))
  }

  const logoFiles = logosUpdate.map((item) => item.file).filter((file): file is File => file !== null)

  const payloadUpdate: IPortoCreate = {
    id: selectedId,
    name: filterValue.name,
    description: filterValue.description,
    image: filterValue.image,
    link: filterValue.link,
    logo: combinedLogos,
  }

  const { mutate: updatePorto } = useUpdatePorto()

  const handleUpdate = async () => {
    try {
      await updatePorto({
        id: String(selectedId ?? ''),
        payload: {
          ...payloadUpdate,
          image: filterValue.image instanceof File ? null : null,
        },
        image: filterValue.image instanceof File ? filterValue.image : null,
        logo: logoFiles,
      })
      setShowSuccess(true)
      setOpenEdit(false)
    } catch (error: unknown) {
      console.error(error)
      setErrorMsg('Update failed.')
      setShowError(true)
      setOpenEdit(false)
    }
  }

  return (
    <TiltleAdmin tilte="PORTOFOLIO" addButton={true} onClick={handleOpenAdd}>
      <Table data={result(data, 'data', [])} columns={columns} isLoading={isLoading} />
      <DialogEdit
        open={openEdit}
        setOpen={setOpenEdit}
        onReset={() => {
          if (selectedId && data) {
            const selected = (result(data, 'data', []) as IPortoCreate[]).find((item) => item.id === selectedId)
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
                    <p>{result(selectedData, 'image', null)}</p>
                    <Input
                      id={key}
                      type="file"
                      placeholder={`${label.toLowerCase()}`}
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null
                        setFilterValue((prev) => ({
                          ...prev,
                          [key]: file,
                        }))
                      }}
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="block">Logo</Label>
            <Button type="button" onClick={handleAddLogoUpdate} className="mt-2 px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">
              + Tambah Logo
            </Button>
          </div>

          {selectedDataLogo.map((logo, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <Input value={logo.file} disabled className="w-full outline-none capitalize" />
              <Button type="button" variant="destructive" size="sm" onClick={() => handleDeleteSelectedDataLogo(index)} className="text-sm px-2 py-1">
                Hapus
              </Button>
            </div>
          ))}

          {logosUpdate.map((logo, index) => (
            <div key={`new-${index}`} className="flex items-center gap-2">
              <Input type="file" accept="image/*" onChange={(e) => handleFileChangeUpdate(index, e.target.files?.[0] ?? null)} className="w-full" />
              <Button type="button" variant="destructive" size="sm" onClick={() => handleDeleteLogoUpdate(index)} className="text-sm px-2 py-1">
                Hapus
              </Button>
            </div>
          ))}
        </div>
      </DialogEdit>
      <DialogAdd open={openAdd} setOpen={setOpenAdd} handleAdd={handleSubmit}>
        <div className="space-y-4">
          {fields.map((field) => {
            const { key, label, type } = field
            switch (type) {
              case 'Uploadimage':
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null
                        setFilterValue((prev) => ({
                          ...prev,
                          [key]: file,
                        }))
                      }}
                      placeholder={`${label.toLowerCase()}`}
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
          <div className="space-y-4 ">
            <div className="flex items-center justify-between">
              <Label className="block">Logo</Label>
              <Button type="button" onClick={handleAddLogo} className="mt-2 px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">
                + Tambah Logo
              </Button>
            </div>

            {logos.map((logo, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <Input id={`logo-${index}`} type="file" accept="image/*" onChange={(e) => handleFileChange(index, e.target.files?.[0] ?? null)} className="w-full" />
                <Button type="button" variant="destructive" size="sm" onClick={() => handleDeleteLogo(index)} className="text-sm px-2 py-1">
                  Hapus
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogAdd>
      <SuccessDialog open={showSuccess} onClose={() => setShowSuccess(false)} />
      <ErrorDialog open={showError} onClose={() => setShowError(false)} message={errorMsg} />
    </TiltleAdmin>
  )
}
