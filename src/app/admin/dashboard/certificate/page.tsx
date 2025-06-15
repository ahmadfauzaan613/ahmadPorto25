'use client'

import { useCertificate } from '@/app/hooks/certificate/useCertificate'
import DialogDelete from '@/components/DialogDelete'
import Table from '@/components/Table'
import TiltleAdmin from '@/components/TiltleAdmin'
import { ICertificateType } from '@/types/CertificateType'
import { CellContext, createColumnHelper } from '@tanstack/react-table'
import { Edit2, Trash2 } from 'lucide-react'
import React from 'react'

export default function Certificate() {
  const { data, isLoading } = useCertificate()

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
      cell: (item) => new Date(item.getValue()).toLocaleDateString(),
    }),
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: CellContext<ICertificateType, unknown>) => (
        <div className="flex gap-2">
          <button className="p-1 text-blue-600 hover:text-blue-800" aria-label="Edit" title="Edit">
            <Edit2 size={16} />
          </button>

          <DialogDelete
            onConfirm={() => {}}
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
    <TiltleAdmin tilte="CERTIFICATE" addButton={true} onClick={() => {}}>
      <Table data={data ?? []} columns={columns} isLoading={isLoading} />
    </TiltleAdmin>
  )
}
