"use client";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChatSection from "./ChatSection";
import { useSocket } from "../Context/SocketContext";
interface MessageData {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  attachmentUrl?: string;
  sentAt: Date;
}
const ChatMain: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [imageUrl, setImageurl] = useState("");
  const socket = useSocket();
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [oldmessages, setOldMessages] = useState<MessageData[]>([]);
  useEffect(() => {
    if (user?.id && socket) {
      socket.connect();
      socket.emit("set_user_id", id);
      socket.on(
        "user-detail",
        (data: { username: string; imageUrl: string }) => {
          setUsername(data.username);
          setImageurl(data.imageUrl);
        }
      );
      socket.on("Giving_old_chats", (data) => {
        setOldMessages(data);
      });
      socket.emit("Give_Me_old_chats");
      socket.emit("check_already_online_status")
      socket.on("already_online_status", (status) => {
        setOnlineStatus(status);
      });
      socket.on(
        "user_online_status",
        (data: { userId: string; status: boolean }) => {
          if (data.userId === id) {
            setOnlineStatus(data.status);
          }
        }
      );
    }

    return () => {
      if (socket) {
        socket.off("Giving_old_chats");
        socket.off("online_status");
        socket.off("user-detail");
      }
    };
  }, [id, socket, user?.id]);
  return (
    <div>
      <ChatSection
        username={username}
        oldmessages={oldmessages}
        onlineStatus={onlineStatus}
        imageUrl={imageUrl}
      />
    </div>
  );
};

export default ChatMain;
