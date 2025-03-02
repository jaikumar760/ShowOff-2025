import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse,NextRequest } from "next/server";
export async function POST(req:NextRequest) {
    try {
        const {FirstName, LastName, SKill, LinkdinId, GithubId,Location}=await req.json();
        const user = await currentUser();
        if(user?.id){
            const existinguser=await db.user.findFirst({where:{
                clerkUserId:user.id
            }})
            if(existinguser){
                await db.user.update({where:{clerkUserId:user.id},data:{
                    FirstName, LastName, SKill, LinkdinId, GithubId,newUser:false,location:Location
                }})
                return NextResponse.json({message:"User Updated"},{status:200})
            }
        }
        return NextResponse.json({message:"Unauthorized"},{status:200})
    } catch (error) {
        console.log("error from get current user")
        return NextResponse.json(error)
    }
}