'use client'

import { useCreateCerti } from '@/app/hooks/certificate/useAddCerti'
import { useCertificate } from '@/app/hooks/certificate/useCertificate'
import { useDeleteCerti } from '@/app/hooks/certificate/useDeleteCerti'
import { useUpdateCerti } from '@/app/hooks/certificate/useUpdateCerti'
import DialogAdd from '@/components/DialogAdd'
import DialogDelete from '@/components/DialogDelete'
import DialogEdit from '@/components/DialogEdit'
import ErrorDialog from '@/components/ErrorDialog'
import SuccessDialog from '@/components/SuccessDialog'
import Table from '@/components/Table'
import TiltleAdmin from '@/components/TiltleAdmin'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ICertificateType, ICreateCertificateType } from '@/types/CertificateType'
import { CellContext, createColumnHelper } from '@tanstack/react-table'
import { result } from 'lodash'
import { Edit2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Certificate() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const { data, isLoading } = useCertificate()

  const [filterValue, setFilterValue] = useState<ICertificateType>({
    id: NaN,
    name: '',
    description: '',
    image: '',
    createdAt: '',
    updatedAt: '',
  })

  const initialValue: ICertificateType = {
    id: NaN,
    name: '',
    description: '',
    image: '',
    createdAt: '',
    updatedAt: '',
  }

  const handleOpen = (rowData: ICertificateType) => {
    setSelectedId(rowData.id)
    setFilterValue(rowData)
    setOpenEdit(true)
  }

  const handleOpenAdd = () => {
    setOpenAdd(true)
    setFilterValue(initialValue)
  }

  // DELETE
  const { mutate: mutateDeleteCerti } = useDeleteCerti()
  const handleDelete = async (id: string) => {
    try {
      await mutateDeleteCerti(id)
      setShowSuccess(true)
    } catch (error) {
      console.error(error)
      setErrorMsg('Delete failed.')
      setShowError(true)
    }
  }

  // CREATE
  const payloadCreate: ICreateCertificateType = {
    name: filterValue.name,
    description: filterValue.description,
  }
  const { mutate: createCerti } = useCreateCerti()
  const handleAdd = async () => {
    if (!selectedImage) {
      setErrorMsg('Please select an image.')
      setShowError(true)
      return
    }
    try {
      await createCerti({ payload: payloadCreate, image: selectedImage })
      setShowSuccess(true)
      setOpenAdd(false)
    } catch (error) {
      console.error(error)
      setErrorMsg('Create Failed')
      setShowError(true)
      setOpenAdd(false)
    }
  }

  // UPDATE
  const payloadUpdate = {
    name: filterValue.name,
    description: filterValue.description,
  }
  const { mutate: updateCerti } = useUpdateCerti()
  const handleUpdate = async () => {
    if (selectedId === null) {
      setErrorMsg('No certificate selected for update.')
      setShowError(true)
      return
    }

    try {
      await updateCerti({
        id: selectedId,
        payload: payloadUpdate,
        image: selectedImage,
      })
      setShowSuccess(true)
      setOpenEdit(false)
    } catch (error) {
      console.error(error)
      setErrorMsg('Update Failed')
      setShowError(true)
      setOpenEdit(false)
    }
  }

  const columnHelper = createColumnHelper<ICertificateType>()
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
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: CellContext<ICertificateType, unknown>) => (
        <div className="flex gap-2">
          <button onClick={() => handleOpen(row.original)} className="p-1 text-blue-600 hover:text-blue-800" aria-label="Edit" title="Edit">
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

  return (
    <TiltleAdmin tilte="CERTIFICATE" addButton={true} onClick={handleOpenAdd}>
      <Table data={result(data, 'data', [])} columns={columns} isLoading={isLoading} />
      <DialogEdit
        open={openEdit}
        setOpen={setOpenEdit}
        onReset={() => {
          if (selectedId && data) {
            const selected = (result(data, 'data', []) as ICertificateType[]).find((item) => item.id === selectedId)
            if (selected) {
              setFilterValue(selected)
            }
          }
        }}
        handleUpdate={handleUpdate}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={filterValue.name}
              onChange={(e) =>
                setFilterValue((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder={`Enter Description`}
              className="mt-2 w-full outline-none capitalize"
            />
          </div>
          <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea
              rows={4}
              id="desc"
              value={filterValue.description}
              onChange={(e) =>
                setFilterValue((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder={`Enter Description`}
              className="mt-2 w-full outline-none capitalize"
            />
          </div>
          <div>
            <Label htmlFor="iamge">Image</Label>
            <Input type="file" id="iamge" placeholder={`Enter Description`} className="mt-2 w-full outline-none capitalize" />
          </div>
        </div>
      </DialogEdit>
      <DialogAdd open={openAdd} setOpen={setOpenAdd} handleAdd={handleAdd}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={filterValue.name}
              onChange={(e) =>
                setFilterValue((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder={`Enter Name`}
              className="mt-2 w-full outline-none capitalize"
            />
          </div>
          <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea
              rows={4}
              id="desc"
              value={filterValue.description}
              onChange={(e) =>
                setFilterValue((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder={`Enter Description`}
              className="mt-2 w-full outline-none capitalize"
            />
          </div>
          <div>
            <Label htmlFor="Image">Image</Label>
            <Input
              type="file"
              id="Image"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedImage(e.target.files[0])
                }
              }}
              placeholder={`Enter Description`}
              className="mt-2 w-full outline-none capitalize"
            />
          </div>
        </div>
      </DialogAdd>
      <SuccessDialog open={showSuccess} onClose={() => setShowSuccess(false)} />
      <ErrorDialog open={showError} onClose={() => setShowError(false)} message={errorMsg} />
    </TiltleAdmin>
  )
}
