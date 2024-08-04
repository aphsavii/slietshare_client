import React, { useState } from "react";
import { Check, CheckCheck } from "lucide-react";
import { formatTimestamp } from "@/helpers";

const ChatMessage = ({ message, isOwnMessage }) => {  
  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] px-4 py-1 rounded-lg ${
          isOwnMessage ? "bg-blue-200 text-black" : "bg-gray-200"
        }`}
      >
        <p>{message.content}</p>
        <div className="flex items-center justify-end mt-1">
          <p className="text-[10px] md:text-xs opacity-70 mr-1">
            {formatTimestamp(+message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
