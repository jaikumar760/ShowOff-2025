"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  BicepsFlexed,
  Edit2,
  Flame,
  Github,
  Linkedin,
  MapPin,
  Milestone,
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
}
interface Post {
  FirstName: string | undefined;
  LastName: string | undefined;
}
interface ChildComponentProps {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
import { MdOutlineManageAccounts } from "react-icons/md";
import Loader from "./Loader";
import { Button } from "./ui/button";
const Profile: React.FC<ChildComponentProps> = ({ editing, setEditing }) => {
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [skill, setSkill] = useState<string | undefined>("");
  const [newuser, setNewUser] = useState(false);
  const [linkedinId, setLinkedinId] = useState<string | undefined>("");
  const [githubId, setGithubId] = useState<string | undefined>("");
  const [location, setLocation] = useState<string | undefined>("");
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [totalpost, setTotalPost] = useState<number | undefined>();
  const [createdAt, setCreatedAt] = useState<Date>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        const res = await axios.get("/api/getprofile");
        const user: User = res.data.user;
        setFirstName(user.FirstName);
        setLastName(user.LastName);
        setGithubId(user.GithubId);
        setLinkedinId(user.LinkdinId);
        setSkill(user.SKill);
        setNewUser(user.newUser);
        setLocation(user.location);
        setImageUrl(user.imageUrl);
        setCreatedAt(user.createdAt);
        setTotalPost(user.posts.length);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getProfile();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="sm:w-8/12 shadow-lg w-full flex justify-center ">
          <Card className="w-full p-2 flex justify-center items-center flex-col rounded-none">
            <CardHeader className="font-semibold  relative w-full justify-center gap-2 flex items-center">
              <Avatar className="w-20 h-20 absolute top--10 shadow-lg rounded-full">
                <AvatarImage src={imageUrl} />
                <AvatarFallback>
                  {firstName && lastName && firstName[0] + lastName[0]}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <Label className="mt-5">
              Welcome! {firstName} {lastName}
            </Label>
            <Separator className="my-2 shadow-lg" />
            <CardContent>
              <div className="sm:flex flex-col justify-evenly gap-4  items-center ">
                <div className="flex flex-col  justify-center   my-2  gap-2 ">
                  <div className="flex   gap-2 items-center ">
                    <Label>
                      <User />
                    </Label>
                    <span className="text-xs">
                      {firstName} {lastName}
                    </span>
                  </div>
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
                      <Linkedin />
                    </Label>
                    <span className="text-xs ">{linkedinId}</span>
                  </div>
                  <div className="flex  gap-2 items-center ">
                    <Label>
                      <Github />
                    </Label>
                    <span className="text-xs ">{githubId}</span>
                  </div>
                  <div className="flex  gap-2 items-center ">
                    <Label>
                      <Milestone />
                    </Label>
                    <span className="text-xs  ">
                      Total posts <span>{totalpost}</span>
                      
                    </span>
                  </div>
                  <div className="flex  gap-2 items-center">
                    <Label>
                      <MdOutlineManageAccounts size={23} />
                    </Label>
                    <span className="text-xs ">
                      {newuser ? "Unverified" : "Verified"}
                    </span>
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
                </div>
              </div>
            </CardContent>
            <CardDescription className="w-full">
              <Button
                className="flex justify-center rounded-none w-full items-center gap-2"
                onClick={() => {
                  setEditing(true);
                }}
              >
                Switch to {newuser ? "verify" : "Update"}
                <Edit2 />
              </Button>
            </CardDescription>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
