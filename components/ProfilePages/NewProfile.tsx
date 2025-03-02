"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import axios from "axios";
import { CalendarDaysIcon, CheckIcon, MapPinIcon } from "lucide-react"
import Loader from "../Loader";
import { Card } from "../ui/card";
import Link from "next/link";
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
  clerkUserId: string;
  followedAt: Date;
  imageUrl: string;
}

interface Following {
  id: string;
  clerkUserId: string;
  followedAt: Date;
  imageUrl: string;
}
interface ChildComponentProps {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewProfile: React.FC<ChildComponentProps> = ({ editing, setEditing }) => {
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [skill, setSkill] = useState<string | undefined>("");
  const [newUser, setNewUser] = useState(false);
  // const [linkedinId, setLinkedinId] = useState<string | undefined>("");
  // const [githubId, setGithubId] = useState<string | undefined>("");
  const [location, setLocation] = useState<string | undefined>("");
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [totalPost, setTotalPost] = useState<number | undefined>();
  const [createdAt, setCreatedAt] = useState<Date>();
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followings, setFollowings] = useState<Following[]>([]);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        const res = await axios.get("/api/getprofile");
        const user: User = res.data.user;
        setId(user.id)
        setFirstName(user.FirstName);
        setLastName(user.LastName);
        // setGithubId(user.GithubId);
        // setLinkedinId(user.LinkdinId);
        setSkill(user.SKill);
        setNewUser(user.newUser);
        setLocation(user.location);
        setImageUrl(user.imageUrl);
        setCreatedAt(user.createdAt);
        setTotalPost(user.posts.length);
        setFollowers(user.followers);
        setFollowings(user.followings);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Card className="sm:w-10/12  w-full">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="md:flex gap-8">
        <div className="mb-6 md:mb-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
            <img src={imageUrl} width={160} height={160} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex-1 grid gap-4">
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold">{firstName +" "+lastName}</h1>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span>{location}</span>
              </div>
            </div>
            <Button onClick={()=>{
              setEditing(true)
            }} className="hidden md:inline-flex">
              Edit Profile
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
            <Link href={`/member/${id}/followers`} prefetch={true}>
                  <div className="text-2xl font-bold">{followers.length}</div>
                </Link>
              <div className="text-muted-foreground text-sm">Followers</div>
            </div>
            <div>
            <Link href={`/member/${id}/followings`} prefetch={true}>
                  <div className="text-2xl font-bold">{followings.length}</div>
                </Link>
              <div className="text-muted-foreground text-sm">Following</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{totalPost}</div>
              <div className="text-muted-foreground text-sm">Posts</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground text-sm">
              <CalendarDaysIcon className="w-4 h-4 mr-1" />
              <span>Joined on {createdAt && new Date(createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
          {!newUser ? (
            <div className="flex items-center text-muted-foreground text-sm">
              <CheckIcon className="w-4 h-4 mr-1 text-green-500" />
              <span>Verified</span>
            </div>
          ) : (
            <div>
              {/* Render something else if the user is not verified */}
              <span className="text-red-500">Not Verified</span>
            </div>
          )}
        </div>
          </div>
          <div className="grid gap-2">
            <h2 className="text-lg font-semibold">Skill</h2>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#F59E0B]">{skill}</Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden fixed bottom-4 left-4 right-4">
        <Button onClick={()=>{
          setEditing(true)
        }} className="w-full">Edit Profile</Button>
      </div>
    </div>
    </Card>
  )
}
export default NewProfile
