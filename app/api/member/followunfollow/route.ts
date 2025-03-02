import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse, NextRequest } from "next/server";
//for follow
export async function POST(req: NextRequest) {
  try {
    const { Id } = await req.json();
    const user = await currentUser();
    if (user?.id) {
      const userIFollow = await db.user.findUnique({
        where: {
          id: Id,
        },
      });
      const me = await db.user.findUnique({
        where: {
          clerkUserId: user.id,
        },
      });
      const isAlreadyFollowing = await db.follower.findFirst({
        where: {
          followerId: me?.id,
          user: {
            id: Id,
          },
        },
      });
      if (isAlreadyFollowing) {
        return NextResponse.json(
          { followed: true, message: "Already following" },
          { status: 200 }
        );
      }
      if(me?.id && me?.imageUrl){
        await db.user.update({
            where: { id: Id },
            data: {
              followers: {
                create: {
                    followerId:me?.id ,
                    imageUrl:me?.imageUrl,
                    FirstName:me.FirstName,
                    LastName:me.LastName,
                    SKill:me.SKill
                },
              },
            },
          });
      }
      if(userIFollow?.id && userIFollow?.imageUrl){
        await db.user.update({where:{id:me?.id},data:{
            followings:{
                create:{
                    followingId:userIFollow.id,
                    imageUrl:userIFollow.imageUrl,
                    FirstName:userIFollow.FirstName,
                    LastName:userIFollow.LastName,
                    SKill:userIFollow.SKill
                }
            }
        }})
      }
    }
    return NextResponse.json({ followed: false }, { status: 200 });
  } catch (error) {
    console.log("error from get current user");
    return NextResponse.json(error);
  }
}
//for unfollow

export async function DELETE(req: NextRequest) {
  try {
    const { Id } = await req.json();
    const user = await currentUser();

    if (user?.id) {
      const userIFollow = await db.user.findUnique({
        where: {
          id: Id,
        },
      });

      const me = await db.user.findUnique({
        where: {
          clerkUserId: user.id,
        },
      });

      const isFollowing = await db.follower.findFirst({
        where: {
          followerId: me?.id,
          userId: Id,
        },
      });

      if (!isFollowing) {
        return NextResponse.json(
          { followed: false, message: "Not following" },
          { status: 200 }
        );
      }

      if (me?.id) {
        await db.follower.deleteMany({
          where: {
            followerId: me.id,
            userId: Id,
          },
        });

        await db.following.deleteMany({
          where: {
            followingId: Id,
            userId: me.id,
          },
        });
      }

      return NextResponse.json({ followed: false }, { status: 200 });
    }

    return NextResponse.json( { status: 404 });
  } catch (error) {
    console.log("error from get current user");
    return NextResponse.json({ error: "Failed to unfollow user" }, { status: 500 });
  }
}
