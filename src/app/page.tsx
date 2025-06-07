import { Button } from '@/components/ui/button'
import { ButtonDownload } from '@/types/NavbarLinkType'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function Home() {
  return (
    <div className="mt-10">
      <h1 className="text-8xl font-bold text-[#f04c1c]">AHMAD FAUZAN</h1>
      <h1 className="text-8xl font-bold text-[#f04c1c]">FRONT END DEVELOPER</h1>
      <div className="w-full bg-black h-[50vh] mt-10"></div>
      <div className="flex justify-end gap-5 mt-8">
        {ButtonDownload.map((item, idx) => (
          <TooltipProvider key={idx}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button key={idx} variant={'ghost'} className="border border-[#f04c1c] cursor-pointer rounded-full p-2">
                  {item.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#f04c1c]">{item.desc}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  )
}
