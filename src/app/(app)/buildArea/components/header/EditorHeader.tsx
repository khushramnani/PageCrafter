'use client'
import Image from 'next/image'
import { Code, Monitor, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
const EditorHeader = () => {
  return (
    <div className='w-full flex p-4 justify-between items-center border'>
      <div className='flex gap-1'>
      <Image src={""} alt='logo' width={60} height={10}/> <span>PageCrafter</span>
      </div>

      <div className='flex gap-1'>
        <Button variant={"ghost"} className='p-4 hover:bg-indigo-300 bg-gray-600'><Monitor/></Button>
        <Button variant={"ghost"} className='p-4 hover:bg-indigo-300 bg-gray-600'><Smartphone/></Button>
      </div>

      <div className='flex gap-1'>
        <Button variant={"ghost"} className='p-4 hover:bg-indigo-300 bg-gray-600'><Code/></Button>
        <Button variant={"ghost"} className='p-4 hover:bg-indigo-300 bg-gray-600'>Save</Button>
        <Button variant={"ghost"} className='p-4 hover:bg-indigo-300 bg-gray-600'>Share</Button>
        
      </div>
    </div>
  )
}

export default EditorHeader
