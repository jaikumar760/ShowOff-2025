"use client";
import { BicepsFlexed, CalendarDays, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkUserId: string | undefined;
  imageUrl: string;
  FirstName: string | undefined;
  LastName: string | undefined;
  SKill: string | undefined;
  LinkdinId: string | undefined;
  GithubId: string | undefined;
  newUser: boolean;
  location: string | undefined;
  followers: Follower[];
  followings: Following[];
}

interface Follower {
  id: string;
  clerkuserId: string;
  followedAt: Date;
  imageUrl: string;
}
interface Following {
  id: string;
  clerkuserId: string;
  followedAt: Date;
  imageUrl: string;
}
interface MemberPormp {
  member: User;
}
export const MemberCard: FC<MemberPormp> = ({ member }) => {
  const router = useRouter();
  return (
    <Card className="p-4 w-full">
      <CardContent className="w-full">
        <div>
          <div className="flex items-center ">
            <Avatar className="cursor-pointer "
              onClick={() => {
                router.push(`/member/${member.id}`);
              }}
            >
              <AvatarImage src={member.imageUrl} />
              <AvatarFallback>{}</AvatarFallback>
            </Avatar>
            <Button onClick={() => {
                router.push(`/member/${member.id}`);
              }} variant="link" className="text-sm font-semibold">
              @
              {member.FirstName &&
                member.LastName &&
                member.FirstName + "_" + member.LastName}
            </Button>
          </div>
          <div className="items-center ">
            <span className="text-xs text-[#F59E0B] ">{member.SKill}</span>
          </div>
          <div className="w-full space-y-2 my-1">
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {new Date(member.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
