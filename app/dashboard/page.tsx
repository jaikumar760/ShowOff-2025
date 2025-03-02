"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { BriefcaseBusiness } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ImLinkedin } from 'react-icons/im'
import { IoLogoYoutube } from 'react-icons/io'
import { SiGithub, SiIndeed } from 'react-icons/si'
const Page = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col justify-center text-center w-full gap-3 items-center min-h-[80vh]'>
        <Label className='text-xl'>Find <span className='text-[#F59E0B]'>Oppurtunities and Material </span>based on your <span className='text-primary'>Profile</span></Label>
            <Button className='flex justify-center items-center gap-1' onClick={()=>{
              router.push("/dashboard/jobs")
            }} variant="ghost"> <BriefcaseBusiness size={30} />Jobs</Button>
            <Button className='flex justify-center items-center gap-1' onClick={()=>{
              router.push("/dashboard/youtube")
            }} variant="ghost"> <IoLogoYoutube size={20} />Projects</Button>
            <Button className='flex justify-center items-center gap-1' onClick={()=>{
              router.push("/dashboard/github")
            }} variant="ghost"> <SiGithub size={30} />Repositories</Button>
    </div>
  )
}

export default Page