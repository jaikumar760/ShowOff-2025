import axios from 'axios';
import { Badge, CircleCheckBig } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Label } from './ui/label';
interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clerkUserId: string | null;
    FirstName: string | null;
    LastName: string | null;
    SKill: string | null;
    LinkdinId: string | null;
    GithubId: string | null;
    newUser: boolean;
  }
  interface TextProps {
    value: string;
  }
const ProfileCompletedOrNotWarn = ({value}:TextProps) => {
    const [newuser,setNewUser]=useState(false)
    useEffect(()=>{

        async function getProfile() {
          try {
            const res=await axios.get("/api/getprofile");
            const user:User=res.data.user
            setNewUser(user.newUser)
          } catch (error) {
            console.log(error)
          }
        }
        getProfile()
      },[])
  return (
    <div>
      {newuser && <><Label className='text-[#F59E0B] flex justify-center items-center text-center'>{value}</Label>
        </>}
    </div>
  )
}

export default ProfileCompletedOrNotWarn
