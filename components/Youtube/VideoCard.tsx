"use client";
import { CalendarDays, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { truncateText } from "@/Hooks/truncateDiscription";
import { Label } from "@radix-ui/react-dropdown-menu";
import ReactPlayer from "react-player/lazy";
interface YoutubeSearchResult {
    kind: string;
    etag: string;
    id: {
        kind: string;
        videoId: string;
    };
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
        };
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: string;
    };
}

interface VideoProp{
    video:YoutubeSearchResult
}

export const VideoCard: FC<VideoProp> = ({ video }) => {
  const router = useRouter();
  return (
    <Card className="p-2">
      <CardContent>
        <div>
          <Avatar>
            <AvatarImage src={undefined} />
            <AvatarFallback>{video.snippet.channelTitle[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h4 className="text-sm text-[#F59E0B] underline font-semibold">@{video.snippet.channelTitle}</h4>
            <div className="sm:flex w-full h-[60vh] hidden">
                <ReactPlayer
                controls
                  width="100%"
                  height="100%"
                  url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                />
              </div>
              <div className="flex justify-center items sm:hidden">
                <ReactPlayer
                controls
                  width="100%"
                  height="100%"
                  url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                />
              </div>
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank"><Label className="font-extrabold text-primary">{video.snippet.title}</Label></a>
            <p className="text-sm">{video.snippet.description}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Uploaded on {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
