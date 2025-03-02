"use client";
import React, { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  BicepsFlexed,
  Flame,
  Linkedin,
  MapPin,
  MessageCircleMore,
  User,
} from "lucide-react";
interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkUserId: string | undefined;
  FirstName: string | undefined;
  LastName: string | undefined;
  SKill: string | undefined;
  LinkdinId: string | undefined;
  GithubId: string | undefined;
  newUser: boolean;
  location: string | undefined;
  imageUrl: string | undefined;
  posts: Post[];
  followers: Follower[];
  followings: Following[];
}
interface Post {
  FirstName: string | undefined;
  LastName: string | undefined;
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
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ImGithub } from "react-icons/im";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
const Page = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [skill, setSkill] = useState<string | undefined>("");
  const [linkedinId, setLinkedinId] = useState<string | undefined>("");
  const [githubId, setGithubId] = useState<string | undefined>("");
  const [location, setLocation] = useState<string | undefined>("");
  const [imageUrl, setImageUrl] = useState<string | undefined>("");

  const [totalfollowers, setTotalFollowers] = useState<number | undefined>();
  const [totalfollowings, setTotalFollowings] = useState<number | undefined>();
  const [createdAt, setCreatedAt] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followloading, Setfollowloadig] = useState(false);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        const res = await axios.post("/api/member", { Id: params.id });
        if (res.data.self) {
          router.push("/profile");
        }
        const User: User = res.data.user;
 
        setFollowed(res.data.followed);
        setFirstName(User.FirstName);
        setLastName(User.LastName);
        setGithubId(User.GithubId);
        setLinkedinId(User.LinkdinId);
        setSkill(User.SKill);
        setLocation(User.location);
        setImageUrl(User.imageUrl);
        setCreatedAt(User.createdAt);
        setTotalFollowers(User.followers.length);
        setTotalFollowings(User.followings.length);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getProfile();
  }, [params.id, router]);
  const FollowNow = async () => {
    try {
      Setfollowloadig(true);
      const res = await axios.post("/api/member/followunfollow", {
        Id: params.id,
      });
      setFollowed(res.data.followed);
      Setfollowloadig(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      Setfollowloadig(false);
    }
  };
  const UnfollowNow = async () => {
    try {
      Setfollowloadig(true);
      const res = await axios.delete("/api/member/followunfollow", {
        data: { Id: params.id },
      });
      setFollowed(res.data.followed);
      Setfollowloadig(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      Setfollowloadig(false);
    }
  };
  return (
    <div className=" flex justify-center items-center mt-2">
      {loading ? (
        <Loader />
      ) : (
        <div className="sm:w-3/12 shadow-lg w-full flex justify-center my-5">
          <Card className="w-full p-2 flex justify-center items-center flex-col ">
            <CardHeader className="font-semibold  relative w-full justify-center gap-2 flex items-center">
              <Avatar className="w-20 h-20 absolute top--10 shadow-lg rounded-full">
                <AvatarImage src={imageUrl} />
                <AvatarFallback>
                  {firstName && lastName && firstName[0] + lastName[0]}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <Label className=" mt-6">
              {firstName} {lastName}
            </Label>
            <div className="flex text-center gap-4 my-2">
              <div>
                <Link href={`/member/${params.id}/followers`} prefetch={false}>
                  <div className="text-2xl font-bold">{totalfollowers}</div>
                </Link>

                <div className="text-muted-foreground text-sm">Followers</div>
              </div>
              <div>
                <Link href={`/member/${params.id}/followings`} prefetch={false}>
                  <div className="text-2xl font-bold">{totalfollowings}</div>
                </Link>

                <div className="text-muted-foreground text-sm">Following</div>
              </div>
            </div>
            {followed ? (
              <Button
                variant="secondary"
                onClick={UnfollowNow}
                disabled={followloading}
                className="rounded-none px-20"
              >
                {followloading ? <Loader /> : "Unfollow"}
              </Button>
            ) : (
              <Button
                onClick={FollowNow}
                disabled={followloading}
                className="rounded-none px-20"
              >
                {followloading ? <Loader /> : "Follow"}
              </Button>
            )}
            <Button
              onClick={() => {
                router.push(`/member/${params.id}/chat`);
              }}
              className="bg-[#F59E0B] rounded-none flex gap-1 my-2 px-16 "
            >
              <MessageCircleMore /> Message
            </Button>
            <CardContent>
              <div className="sm:flex flex-col justify-evenly gap-4  items-center ">
                <div className="flex flex-col  justify-center   my-2  gap-2 ">
                  <div className="flex  gap-2 items-center ">
                    <Label>
                      <BicepsFlexed />
                    </Label>
                    <span className="text-xs ">{skill}</span>
                  </div>
                  <div className="flex  gap-2  items-center">
                    <Label>
                      <MapPin />
                    </Label>
                    <span className="text-xs ">{location}</span>
                  </div>
                  <div className="flex  gap-2 items-center">
                    <Label>
                      <Flame />
                    </Label>
                    <span className="text-xs ">
                      Member since{" "}
                      {createdAt && new Date(createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-center  gap-2 items-center">
                    <a target="_blank" href={githubId}>
                      <ImGithub size={30} />
                    </a>
                    <a target="_blank" href={linkedinId}>
                      <Linkedin size={30} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardDescription className="w-full"></CardDescription>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Page;
