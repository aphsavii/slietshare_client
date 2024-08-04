import React, { useEffect } from "react";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import {  useDispatch } from "react-redux";
import chatService from "@/api/services/chatService";
import { setChats } from "@/redux/slices/chats";
import { formatTimestamp, trimText } from "@/helpers";



const ChatList = ({ filteredChats, onSelectChat, selectedChatId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    chatService.getRecentChats().then((res) => {
      dispatch(setChats(res));
    });
  },[]);
  return (
    <ScrollArea className="h-[80vh]">
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
              <AvatarImage src={chat.avatarUrl}  />
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
              <span className="text-xs text-gray-400">{formatTimestamp(+chat.lastMessage.timestamp)}</span>
              {chat.isUnreadMessages && (
                <span className="bg-blue-500 text-white text-xs rounded-full h-2 w-2 mt-1">
                  {/* {chat.unreadCount} */}
                </span>
              )}
            </div>
          </div>
        ))}
    </ScrollArea>
  );
}

export default ChatList;
