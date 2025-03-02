"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSocket } from "../Context/SocketContext";
import axios from "axios";
import Loader from "../Loader";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  imageUrl: string;
  FirstName: string | undefined;
  LastName: string | undefined;
}

export default function MessagePage() {
  const socket = useSocket();
  const [users, setUser] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter()
  useEffect(() => {
    const getAllChattedMember=async()=>{
      try {
        setIsLoading(true)
        const res=await axios.get("/api/allchattedusers")
        const alluser:User[]=res.data.users
        setUser(alluser)
        setIsLoading(false)
      } catch (error) {
        alert("error fetching messages")
        setIsLoading(false)
      }
    }
    getAllChattedMember()
    socket?.emit("Give_Me_allChatted_users");
    socket?.on("current_online_usersID", (users: string[]) => {
      setOnlineUsers(new Set(users));
    });
    return () => {
      socket?.off("Give_Me_allChatted_users");
      socket?.off("Get_your_chatted_data");
      socket?.off("current_online_usersID");
    };
  }, [socket]);

  if(isLoading){
    return <div className="w-full flex justify-center items-center"><Loader/></div>
  }
  else if(!users && !isLoading){
    return <div className="w-full flex justify-center items-center">No conversation yet.</div>
  }
  return (
    <div className="w-full h-full flex flex-col">
      <header className="bg-background px-4 py-3 border-b flex items-center justify-between md:px-6">
        <h1 className="text-lg font-semibold">Messages</h1>
      </header>
      <div className="flex-1 overflow-auto bg-muted">
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user) => (
            <Card key={user.id} onClick={()=>{
                router.push(`/member/${user.id}/chat`)
            }} className="bg-background p-4 flex items-center gap-4">
              <Avatar className="relative">
                <AvatarImage src={user.imageUrl || "/placeholder-user.jpg"} />
                <AvatarFallback>
                  {user.FirstName?.charAt(0)}{user.LastName?.charAt(0)}
                </AvatarFallback>
                <span
                  className={`absolute bottom-0 right-0 rounded-full w-3 h-3 border-2 border-background ${
                    onlineUsers.has(user.id) ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{`${user.FirstName} ${user.LastName}`}</div>
                <div className="text-sm text-muted-foreground">
                  {onlineUsers.has(user.id) ? "Online" : "Offline"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
