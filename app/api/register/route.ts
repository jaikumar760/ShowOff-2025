import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse,NextRequest } from "next/server";
export async function POST(req:NextRequest) {
    try {
        const user = await currentUser();
        if(user?.id){
            const existinguser=await db.user.findFirst({where:{
                clerkUserId:user.id
            }})
            if(existinguser){
                return NextResponse.json({error:"User already exist"},{status:500})
            }
            else{
                await db.user.create({data:{
                    clerkUserId:user?.id,
                    FirstName:user.firstName,
                    LastName:user.lastName,
                    imageUrl:user.imageUrl
                }})
                console.log("resgitserd")
                return NextResponse.json({user:user},{status:200})
            }          
        }
        return NextResponse.json({message:"Unauthorized"},{status:200})
    } catch (error) {
        console.log("error from get current user")
        return NextResponse.json(error)
    }
}