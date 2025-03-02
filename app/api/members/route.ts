import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse,NextRequest } from "next/server";
import AllMemebers from "@/components/Members/AllMembers";
export async function GET(req:NextRequest) {
    try {
        const user = await currentUser();
        if (user?.id) {
        const AllMemebers=await db.user.findMany({
            where: {
                newUser: false,
                clerkUserId: {
                    not: user.id,
                  },
            },
            select: {
                id:true,
                SKill:true,
                createdAt:true,
                imageUrl:true,
                clerkUserId: true,
                FirstName: true,
                LastName: true,
                followers: {
                    select: {
                        id: true,
                    },
                },
                followings: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        console.log("existing user")
        return NextResponse.json({member:AllMemebers},{status:200})
    }
    return NextResponse.json({member:[]},{status:200})
    } catch (error) {
        console.log("error from get current user")
        return NextResponse.json(error)
    }
}