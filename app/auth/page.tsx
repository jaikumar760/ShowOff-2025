"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
const Page = () => {
    const router=useRouter();
  return (
    <div className='justify-center h-full flex flex-col min-h-[80vh]  items-center'>
      <Button variant="link" onClick={()=>{
        router.push("/auth/sign-up")
      }}> Move to Signup page</Button>
      <Button onClick={()=>{
        router.push("/auth/sign-in")
      }} variant="link">Move to Signin page</Button>
    </div>
  )
}

export default Page
