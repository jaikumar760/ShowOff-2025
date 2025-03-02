import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse,NextRequest } from "next/server";
export async function GET(req:NextRequest) {
    try {
        const user = await currentUser();
        if(user?.id){
               const Post= await db.post.findMany({orderBy:{createdAt:"desc"}})
                return NextResponse.json({post:Post},{status:200})
            }
        return NextResponse.json({message:"Unauthorized"},{status:200})
    } catch (error) {
        console.log("error from get current user")
        return NextResponse.json(error)
    }
}