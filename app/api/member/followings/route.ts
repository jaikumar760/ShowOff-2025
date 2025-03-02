import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse,NextRequest } from "next/server";
export async function GET(req:NextRequest) {
    try {
        const id=req.nextUrl.searchParams.get("id")
        const user = await currentUser();
        if( user?.id && id){
            const Followings=await db.following.findMany({where:{
                userId:id
                }
            })
        
        return NextResponse.json({followings:Followings},{status:200})
    }
        return NextResponse.json({status:404}) 
    } catch (error) {
        console.log("error from get current user")
        return NextResponse.json(error)
    }
}