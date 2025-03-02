"use client";
import ChatMain from "@/components/Chat/ChatMain";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  const { user } = useUser();
  return <div>{user?.id ? <ChatMain /> : <Loader />}</div>;
};

export default Page;
