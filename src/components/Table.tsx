'use client'

import React from 'react'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'

type User = {
  id: number
  name: string
  email: string
}

const defaultData: User[] = [
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' },
  { id: 3, name: 'Charlie', email: 'charlie@mail.com' },
]

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
]

export default function Table() {
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="mt-10">
      <table className="min-w-full border border-[#f04c1c]">
        <thead className="bg-[#f04c1c] text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-left border-b border-[#f04c1c]">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b border-[#f04c1c]">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
