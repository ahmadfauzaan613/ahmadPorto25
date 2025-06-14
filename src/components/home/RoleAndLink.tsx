'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useHome } from '@/app/hooks/home/useHome'
import React from 'react'
import { File, FileUser, Linkedin, Mail, Phone } from 'lucide-react'
import { ButtonFunctionProps, IDataLinkType } from '@/types/HomeType'
import Link from 'next/link'

export default function RoleAndLink() {
  const { data } = useHome()

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
      <h1 className="text-8xl font-bold text-[#f04c1c] uppercase">{data?.role}</h1>
      <div className="w-full bg-black h-[50vh] mt-10"></div>
      <div className="flex justify-end gap-5 mt-8">
        {data?.dataLink.map((item: IDataLinkType, id: number) => (
          <TooltipProvider key={id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  <Button key={id} variant="ghost" className="border border-[#f04c1c] cursor-pointer rounded-full p-2">
                    <ButtonFunction data={item.type} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-[#f04c1c] capitalize">{item.type}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </React.Fragment>
  )
}
