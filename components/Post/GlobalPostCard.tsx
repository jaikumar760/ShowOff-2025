"use client";
import { AlertCircle, CalendarDays, Download } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { getFileType } from "@/utils/ExtensionIdetifier";
import AudioPlayer from "../AudioPlayer/audioplayer";
import Link from "next/link";
import VideoPlayer from "../VideoPlayer/videoPlayer";
interface Post {
  id: string;
  clerkuserId: string;
  comment: string;
  imageUrl: string;
  FirstName?: string;
  LastName?: string;
  createdAt: Date;
  imageFileUrl?:string
}
interface PostPromp {
  post: Post;
}

export const GlobalPostCard: FC<PostPromp> = ({ post }) => {
  const fileType = post.imageFileUrl ? getFileType(post.imageFileUrl) : null;
  return (
    <Card className="p-4 w-full">
      <CardContent className="w-full">
        <div >
          <Avatar>
            <AvatarImage src={post.imageUrl} />
            <AvatarFallback>{post.FirstName && post.FirstName[0]}</AvatarFallback>
          </Avatar>
          <div className="w-full space-y-2">
            <h4 className="text-sm font-semibold">@{post.FirstName && post.LastName && post.FirstName+"_"+post.LastName}</h4>
            {fileType === 'image' && post.imageFileUrl && (
              <Image
                src={post.imageFileUrl}
                alt="Image"
                width={300}
                height={300}
                loading="lazy"
              />
            )}
            {fileType === "video" && post.imageFileUrl && (
              <VideoPlayer src={post.imageFileUrl}/>
            )}
            <p className="text-sm">{post.comment}</p>
            {fileType === 'audio' && post.imageFileUrl && (
              <AudioPlayer audioSrc={post.imageFileUrl}/>
            )}
            {fileType === 'other' && post.imageFileUrl && (
              <Link href={post.imageFileUrl} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2 rounded-lg">
                  <Download />
                  Attachment
                </Button>
              </Link>
            )}
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Created {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <Button 
            variant="ghost"
              onClick={() => {
                
              }}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
