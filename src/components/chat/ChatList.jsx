import React, { useEffect } from "react";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import chatService from "@/api/services/chatService";
import { setChats } from "@/redux/slices/chats";
import { formatTimestamp, trimText } from "@/helpers";
import toast from "react-hot-toast";
import { useState } from "react";
import ChatListSkeletonLoader from "../skeletons/ChatListSkeleton";
import { isMobile } from "@/helpers";
import { Button } from "@/shadcn/ui/Button";
const ChatList = ({
  filteredChats,
  onSelectChat,
  selectedChatId,
  setVisible,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.chats);
  useEffect(() => {
    if (chats.length) return;
    setLoading(true);
    chatService
      .getRecentChats()
      .then((res) => {
        dispatch(setChats(res));
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch chats");
        setLoading(false);
      });
  }, []);
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  return (
    <ScrollArea className="h-[80vh]">
      {loading && <ChatListSkeletonLoader />}
      {(filteredChats.length ?? []) === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No chats found</p>
        </div>
      )}
      {filteredChats &&
        filteredChats.map((chat) => (
          <div
            key={chat.conversationId}
            className={`p-4 hover:bg-gray-100 cursor-pointer flex items-center ${
              selectedChatId == chat.conversationId ? "bg-gray-200" : ""
            }`}
            onClick={() => onSelectChat(chat)}
          >
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={chat.avatarUrl} />
              <AvatarFallback>
                {chat.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow min-w-0">
              <h3 className="font-semibold truncate">{chat.fullName}</h3>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage.content}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">
                {formatTimestamp(+chat.lastMessage.timestamp)}
              </span>
              {chat.isUnreadMessages && (
                <span className="bg-blue-500 text-white text-xs rounded-full h-2 w-2 mt-1">
                  {/* {chat.unreadCount} */}
                </span>
              )}
            </div>
          </div>
        ))}
     {
      (isMobile() || selectedChat) && (
        <div className="fixed bottom-0 w-full p-4 bg-white shadow-lg md:w-[200px]">
          <Button
            onClick={() => setVisible(true)}
            className="w-full"
            variant="primary"
          >
            New Message
          </Button>
        </div>
      )
     }
    </ScrollArea>
  );
};

export default ChatList;
