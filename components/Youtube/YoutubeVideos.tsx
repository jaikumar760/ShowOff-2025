/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { transformSkill } from "@/Hooks/projectTitleForGithub";
import { VideoCard } from "./VideoCard";
// Interface for video data (customize as needed)
interface YoutubeVideo {
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
interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkUserId: string | null;
  FirstName: string | null;
  LastName: string | null;
  SKill: string | null;
  LinkdinId: string | null;
  GithubId: string | null;
}
const YoutubeSearch = () => {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [skill, setSkill] = useState<string | null>(null);
  const apiKey = "AIzaSyBo1qW_M9HpkA35IB0DKJ1FYUSR2_lmRBM";

  useEffect(() => {
    const handleSubmit = async (myskill: string) => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get<{ items: YoutubeVideo[] }>(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${myskill}&type=video&key=${apiKey}&maxResults=20`
        );
        setVideos(response.data.items);
      } catch (error) {
        setError("catch error");
      } finally {
        setIsLoading(false);
      }
    };
    async function getProfile() {
      try {
        const res = await axios.get("/api/getprofile");
        const user: User = res.data.user;
        setSkill(user.SKill);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
    if (skill) {
      handleSubmit(transformSkill(skill));
    }
  }, [skill]);
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="flex flex-shrink justify-center mt-2 items-center">
      {isLoading && (
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      )}
      {error && <p>Error: {error}</p>}
      {videos.length > 0 && (
        <ul className="space-y-2">
          {videos.map((video) => (
            <li key={video.id.videoId}>
              <VideoCard video={video}/>
            </li>
          ))}
        </ul>
      )}
      {videos.length === 0  && skill && !isLoading && <p>No videos found.</p>}
      
    </div>
  );
};

export default YoutubeSearch;
