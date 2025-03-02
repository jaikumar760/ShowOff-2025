import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse, NextRequest } from "next/server";
import { redirect } from "next/navigation";
export async function POST(req: NextRequest) {
  try {
    const { Id } = await req.json();
    const user = await currentUser();
    if (user?.id) {
      const me=await db.user.findUnique({where:{
        clerkUserId:user.id
      }})
      const existinguser = await db.user.findFirst({
        select: {
          followers: true,
          followings: true,
          posts: true,
          clerkUserId:true,
          imageUrl: true,
          FirstName: true,
          LastName: true,
          SKill: true,
          createdAt: true,
          newUser: true,
          GithubId: true,
          LinkdinId: true,
          location: true,
        },
        where: {
          id: Id,
          
        },
      });
      console.log("existing user");
      var Followed=false
      if (existinguser?.followers) {
        Followed = existinguser.followers.some(follower => follower.followerId === me?.id);
      }
      if(existinguser?.clerkUserId ===user.id){
        return NextResponse.json({ user: {existinguser},followed:Followed,self:true }, { status: 200 });
      }
      return NextResponse.json({ user: existinguser,followed:Followed }, { status: 200 });
    }
    return NextResponse.json({ status: 404 });
  } catch (error) {
    console.log("error from get current user");
    return NextResponse.json(error);
  }
}
