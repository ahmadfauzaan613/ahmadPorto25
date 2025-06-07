import { PrismaClient } from '@/generated/prisma'
import { IDataLinkType } from '@/types/HomeType'
import { ParamType } from '@/types/ParamType'
import { writeFile, unlink } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

const prisma = new PrismaClient()

export async function GET(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }
  try {
    const getAboutDBDetail = await prisma.home.findUnique({
      where: { id },
    })
    return NextResponse.json(getAboutDBDetail, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }
  try {
    const deleted = await prisma.home.delete({ where: { id } })
    return NextResponse.json(deleted, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Gagal Menghapus data' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: ParamType) {
  const id = Number(params.id)
  const formData = await req.formData()
  const jsonString = formData.get('json')?.toString() ?? ''
  const file = formData.get('file') as File | null

  try {
    // Ambil data lama
    const existing = await prisma.home.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 })
    }

    const parsed = JSON.parse(jsonString) as {
      role: string
      dataLink: IDataLinkType[]
    }

    const { role, dataLink } = parsed

    let fileUrl: string | null = null

    if (file) {
      // Hapus file lama jika ada
      const oldDataLink = existing.dataLink as unknown as IDataLinkType[]
      const oldFile = oldDataLink?.[0]?.file
      if (oldFile) {
        const oldPath = path.join(process.cwd(), 'public', oldFile)
        await unlink(oldPath).catch(() => {}) // ignore error jika file tidak ada
      }

      // Simpan file baru
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${Date.now()}-${file.name}`
      const filePath = path.join(process.cwd(), 'public/upload', fileName)

      await writeFile(filePath, buffer)
      fileUrl = `/upload/${fileName}`
    } else {
      // ✅ assign file lama ke fileUrl
      const oldDataLink = existing.dataLink as unknown as IDataLinkType[]
      fileUrl = oldDataLink?.[0]?.file ?? null
    }

    const updatedLinks = dataLink.map((link: IDataLinkType) => ({
      ...link,
      file: fileUrl,
    }))

    const updatedData = await prisma.home.update({
      where: { id },
      data: {
        role,
        dataLink: updatedLinks,
      },
    })

    return NextResponse.json(updatedData, { status: 200 })
  } catch (err) {
    console.error('[UPDATE ERROR]', err)
    return NextResponse.json({ error: 'Update gagal' }, { status: 500 })
  }
}
