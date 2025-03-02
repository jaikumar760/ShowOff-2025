import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (user?.id) {
      const existinguser = await db.user.findFirst({
        select: {
          id:true,
          posts: true,
          imageUrl: true,
          FirstName: true,
          LastName: true,
          SKill: true,
          createdAt: true,
          newUser: true,
          GithubId: true,
          LinkdinId: true,
          location:true,
          followers:true,
          followings:true
        },
        where: {
          clerkUserId: user.id,
        },
      });
      console.log("existing user");
      return NextResponse.json({ user: existinguser }, { status: 200 });
    }
    return NextResponse.json({ user: null }, { status: 200 });
  } catch (error) {
    console.log("error from get current user");
    return NextResponse.json(error);
  }
}
