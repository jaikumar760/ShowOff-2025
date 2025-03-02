/* eslint-disable @next/next/no-img-element */
"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    

    async function RegisterIfNot() {
      try {
        const res = await axios.post("/api/register");
      } catch (error) {
        console.log("error");
      }
    }
    RegisterIfNot();
    if (user?.id) {
      const newSocket = io('https://showoffsocketserver.onrender.com', { autoConnect: false });
      setSocket(newSocket);
      newSocket.connect();
      newSocket.on("profile_status",(verified)=>{
        if(verified){
          toast('Incomplete Profile', {
            icon: '⚠️',
          });
        }
      })
      newSocket.emit("clerkuserId", user.id)
      newSocket.on(
        "user_online_status",
        (data: { userId: string;imageUrl:string;username:string; clerkuserId:string;status: boolean }) => {
          if (data.status && !(data.clerkuserId===user.id)) {
            toast.custom((t) => (
              <div
                className={`${
                  t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={data.imageUrl}
                        alt="S"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {data.username}
                      </p>
                      <p className="mt-1 text-sm text-green-500">
                        Online Now
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            ))
          }
        }
      );
      return () => {
        newSocket.off("user_online_status")
        newSocket.off("profile_status")
        newSocket.disconnect();
      };
    }
  }, [ user?.id]);
;

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
