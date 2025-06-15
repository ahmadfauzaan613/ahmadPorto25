'use client'

import React from 'react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'

interface TableProps<T, TValue> {
  data: T[]
  columns: ColumnDef<T, TValue>[]
  isLoading?: boolean
}

export default function Table<T, TValue>({ data, columns, isLoading }: TableProps<T, TValue>) {
  const numberingColumn: ColumnDef<T, unknown> = {
    id: 'number',
    header: 'No',
    cell: ({ row }) => row.index + 1,
    size: 50,
  }

  const table = useReactTable({
    data,
    columns: [numberingColumn, ...columns],
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loader"></span>
      </div>
    )
  }

  if (!data.length) {
    return <div className="text-center py-10">No data available.</div>
  }

  return (
    <div className="mt-10 overflow-x-auto">
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
