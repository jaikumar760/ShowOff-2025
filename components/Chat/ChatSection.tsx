"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { ArrowDown, SendIcon } from "lucide-react";
import { EmojiPicker } from "./EmojiPicker";
import { useSocket } from "../Context/SocketContext";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageData {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  attachmentUrl?: string;
  sentAt: Date;
}

type ChatSectionProps = {
  username: string;
  imageUrl: string;
  onlineStatus: boolean;
  oldmessages: MessageData[];
};

export default function ChatSection({
  username,
  imageUrl,
  onlineStatus,
  oldmessages,
}: ChatSectionProps) {
  const id = useParams<{ id: string }>().id;
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const socket = useSocket();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (oldmessages && oldmessages.length > 0) {
      setMessages(oldmessages);
    }
  }, [oldmessages]);

  useEffect(() => {
    if (socket) {
      socket.on("receive_msg", (data: MessageData) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        scrollToLastMessage();
      });

      return () => {
        socket.off("receive_msg");
      };
    }
  }, [socket, id]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && socket) {
      socket.emit("send_msg", newMessage);
      setNewMessage("");
    }
  };

  const scrollToLastMessage = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="grid w-full bg-background">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center gap-1 border-b bg-muted/40 p-4">
          <div
            className={`rounded-full shadow-lg p-1 relative ${
              onlineStatus ? `bg-green-500 ` : `bg-red-500 `
            } `}
          >
            <Avatar>
              <AvatarImage sizes={"40"} src={imageUrl} />
              <AvatarFallback>{}</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-sm font-medium">{username}</h2>
        </div>
        <ScrollArea ref={scrollAreaRef} className="flex-1  relative max-h-[70vh] min-h-[70vh] p-4">
          {!socket?<div className="flex justify-center items-center">Please wait...</div>:<>{messages.map((message, index) => (
            <div
              key={message.id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`mb-4 flex items-start gap-3 ${
                message.receiver === id ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col gap-1">
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.receiver === id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.message}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(message.sentAt).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}</> }
          <div className="absolute bottom-2 w-full flex justify-center items-center">
          <Button className="rounded-full bg-[#F59E0B]" onClick={scrollToLastMessage}>
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
        </ScrollArea>
        <div className="border-t bg-muted/40 p-4">
          <div className="relative flex items-center gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full border rounded-lg flex items-center h-9 resize-none overflow-hidden bg-background"
            />
            <div className="absolute right-20 top-8">
              <EmojiPicker
                onChange={(value) => {
                  setNewMessage(newMessage + value);
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              />
            </div>
            <Button onClick={handleSendMessage}>
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
