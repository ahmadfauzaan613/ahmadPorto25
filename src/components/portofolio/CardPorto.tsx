'use client'
import { usePorto } from '@/app/hooks/portofolio/usePorto'
import { IPortofolioType } from '@/types/Portofolio'
import { result } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CardPorto() {
  const { data, isLoading } = usePorto()
  const [expandedItems, setExpandedItems] = React.useState<{ [key: number]: boolean }>({})
  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const shouldTruncate = (text: string) => text.length > 120
  const getDisplayedText = (text: string, isExpanded: boolean) => (isExpanded || !shouldTruncate(text) ? text : `${text.slice(0, 120)}...`)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loader"></span>
      </div>
    )
  }
  return result(data, 'data', []).map((Item: IPortofolioType, idx: number) => (
    <div className="border border-[#f04c1c]  overflow-hidden shadow-md hover:shadow-lg transition" key={idx}>
      <div className="border-b  border-[#f04c1c] w-full h-[20vh] sm:h-[25vh]">
        <Image src={Item.image} alt={`logo-${idx}`} className="w-full h-full object-cover" width={500} height={300} />
      </div>

      <div className="px-4 py-3">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f04c1c]">{Item.name}</p>
        <div className="text-sm sm:text-base pt-2 text-[#f04c1c]">
          <AnimatePresence initial={false}>
            <motion.div key={expandedItems[idx] ? 'expanded' : 'collapsed'} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: 'anticipate' }}>
              {getDisplayedText(Item.description, expandedItems[idx])}
            </motion.div>
          </AnimatePresence>

          {shouldTruncate(Item.description) && (
            <button onClick={() => toggleExpand(idx)} className="mt-1 underline text-[#f04c1c] hover:text-[#c73d16] transition text-xs sm:text-sm">
              {expandedItems[idx] ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 gap-2">
        <div className="flex items-center flex-wrap gap-2">
          {result(Item, 'logo', []).map((item, idx) => (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded" key={idx}>
              <Image src={result(item, 'file', '')} alt={`logo-${idx}`} width={500} height={500} className="w-full h-full object-fill rounded" />
            </div>
          ))}
        </div>

        <Link href={Item.link} target="_blank" className="text-[#f04c1c] hover:font-bold text-sm sm:text-base">
          Visit
        </Link>
      </div>
    </div>
  ))
}
