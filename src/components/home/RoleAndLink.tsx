'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useHome } from '@/app/hooks/home/useHome'
import React from 'react'
import { File, FileUser, Linkedin, Mail, Phone } from 'lucide-react'
import { ButtonFunctionProps, IDataLinkType } from '@/types/HomeType'
import Link from 'next/link'
import { result } from 'lodash'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function RoleAndLink() {
  const { data, isLoading } = useHome()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loader"></span>
      </div>
    )
  }

  const ButtonFunction: React.FC<ButtonFunctionProps> = ({ data }) => {
    switch (data.toLowerCase()) {
      case 'linkedin':
        return <Linkedin color="#f04c1c" />
      case 'whatsapp':
        return <Phone color="#f04c1c" />
      case 'email':
        return <Mail color="#f04c1c" />
      case 'resume':
        return <FileUser color="#f04c1c" />
      case 'portofolio':
        return <File color="#f04c1c" />
      default:
        return null
    }
  }

  return (
    <React.Fragment>
      <motion.div className="mt-10 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#f04c1c]" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          AHMAD FAUZAN
        </motion.h1>

        <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#f04c1c] uppercase" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          {result(data, 'data.role', '')}
        </motion.h1>

        <motion.div className="w-full bg-black h-[30vh] sm:h-[40vh] md:h-[50vh] mt-10 relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
          <Image src="/images/Bersoreria12814-BW.jpg" alt="Gambar dari Pinterest" fill className="object-cover" />
        </motion.div>

        <motion.div className="flex justify-end flex-wrap gap-4 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
          {result(data, 'data.dataLink', []).map((item: IDataLinkType, id: number) => (
            <TooltipProvider key={id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.url} target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" className="border border-[#f04c1c] cursor-pointer rounded-full p-2">
                        <ButtonFunction data={item.type} />
                      </Button>
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-[#f04c1c] capitalize">{item.type}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </motion.div>
      </motion.div>
    </React.Fragment>
  )
}
