import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { Button } from "@/shadcn/ui/Button";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setChatSeen } from "@/redux/slices/chats";
import { Socket } from "socket.io-client";
import { SocketContext } from "@/api/sockets/socket";
import { useContext } from "react";

const ChatHeader = ({ chat, onBack }) => {
  const socket = useContext(SocketContext);
  
  return (
    <div className="bg-gray-100 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" className="md:hidden mr-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={chat.avatarUrl} />
          <AvatarFallback>
            {chat.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{chat.fullName}</h2>
          <p className="text-xs text-gray-500">{}</p>
        </div>
      </div>
      <Button variant="ghost">
        <MoreVertical className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatHeader;
