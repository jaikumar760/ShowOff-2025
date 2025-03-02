"use client";
import { BicepsFlexed, CalendarDays, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Following {
    followingId: string
    id: string;
    userId: string;
    followedAt: Date;
    imageUrl: string;
    FirstName: string | undefined;
    LastName: string | undefined;
    SKill:string | undefined
}
interface followingPormp {
  following: Following;
}
export const FollowingCard: FC<followingPormp> = ({ following }) => {
  const router = useRouter();
  return (
    <Card className="p-4 w-full">
      <CardContent className="w-full">
        <div>
          <div className="flex items-center ">
            <Avatar className="cursor-pointer "
              onClick={() => {
                router.push(`/member/${following.followingId}`);
              }}
            >
              <AvatarImage src={following.imageUrl} />
              <AvatarFallback>{}</AvatarFallback>
            </Avatar>
            <Button onClick={() => {
                router.push(`/member/${following.followingId}`);
              }} variant="link" className="text-sm font-semibold">
              @
              {following.FirstName &&
                following.LastName &&
                following.FirstName + "_" + following.LastName}
            </Button>
          </div>
          <div className="items-center ">
            <span className="text-xs text-[#F59E0B] ">{following.SKill}</span>
          </div>

          <div className="w-full space-y-2 my-1">

            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {new Date(following.followedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
