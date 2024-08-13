import React from 'react'
import { Button } from '@/shadcn/ui/Button';
import { Smile,Send } from 'lucide-react';
import { Input } from '@/shadcn/ui/input';

const ChatInput = ({ message, setMessage, onSend }) => (
  <div className="border-t p-4 flex items-center">
    <Button variant="ghost" className="mr-2">
      <Smile className="h-5 w-5 text-gray-500" />
    </Button>
    <Input
      type="text"
      placeholder="Type a message..."
      className="flex-grow"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && onSend()}
    />
    <Button variant="ghost" className="ml-2" onClick={onSend}>
      <Send className="h-5 w-5 text-gray-500" />
    </Button>
  </div>
);


export default ChatInput;
