
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (user?.id) {
        const me=await db.user.findUnique({where:{clerkUserId:user.id}})
        const chatsAsSender = await db.chat.findMany({
            where: { sender: me?.id },
            select: { receiver: true },
          });
    
          const chatsAsReceiver = await db.chat.findMany({
            where: { receiver: me?.id },
            select: { sender: true },
          });
    
          const userIds = new Set<string>();
    
          chatsAsSender.forEach(chat => userIds.add(chat.receiver));
          chatsAsReceiver.forEach(chat => userIds.add(chat.sender));
    
          const users = await db.user.findMany({
            where: { id: { in: Array.from(userIds) } },
            select: { id: true, FirstName: true, LastName: true, imageUrl: true },
          });
      return NextResponse.json({ users }, { status: 200 });
    }
    return NextResponse.json({ users: null }, { status: 404 });
  } catch (error) {
    console.log("error from get current user");
    return NextResponse.json(error);
  }
}