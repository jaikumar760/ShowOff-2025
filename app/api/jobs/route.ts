import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse,NextRequest } from "next/server";
import { JobTransform } from "@/Hooks/ForJobAPI";
import axios from "axios";
export async function GET(req:NextRequest) {
    try {
        const user = await currentUser();
        if(user?.id){
                const me=await db.user.findFirst({where:{
                    clerkUserId:user.id
                }})
            if(me?.SKill && me.location){
               const res=await axios.get(`https://serpapi.com/search?engine=google_jobs&q=${JobTransform(me?.SKill)}&api_key=${process.env.API_KEY}&location=${JobTransform(me.location)}`)
                return NextResponse.json({job:res.data.jobs_results},{status:200})
            }
            }
        return NextResponse.json({message:"Unauthorized"},{status:200})
    } catch (error) {
        console.log("error from get current user")
        return NextResponse.json(error)
    }
}