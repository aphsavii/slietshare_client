import React, { useState, useEffect, useContext, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/shadcn/ui/input";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { useDebouncedState } from "@/hooks/useDebouncedState";
import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessage from "@/components/chat/ChatMessage";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import userService from "@/api/services/userService";
import { SocketContext } from "@/api/sockets/socket";
import { addMessage, removeUnread, setChats, setChatSeen, setMessages } from "@/redux/slices/chats";
import { Button } from "@/shadcn/ui/Button";
import { CircleCheck, Eye } from "lucide-react";
import chatService from "@/api/services/chatService";
import toast from "react-hot-toast";
import { setSelectedChat } from "@/redux/slices/chats";

const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const socket = useContext(SocketContext);
  const chats = useSelector((state) => state.chats.chats);
  const [filteredChats, setFilteredChats] = useState(chats);
  const [searchText, setSearchText] = useDebouncedState("", 200);
  const allMessages = useSelector((state) => state.chats.messages);
  const messagesEndRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const selectedChatRef = useRef(null);

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  const isRead = useSelector(
    (state) => state.chats.chatSeen[selectedChat?.regno]
  );
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  const onSelectChat = (chat) => {
    dispatch(setSelectedChat(chat));
    if(!chat) return;
    if(chat.isUnreadMessages){
      dispatch(removeUnread(chat.regno));
      socket.emit("conversation:read", chat.regno);
    }
    // console.log(chat);
    // if (!selectedChat) return;
    if (!allMessages[chat.regno]) {
      chatService
        .getConversation(chat.regno)
        .then((res) => {
          dispatch(
            setMessages({ regno: chat.regno, messages: res.conversation })
          );
        })
        .catch((error) => {
          toast.error("Failed to fetch messages");
          console.log(error);
        });
    }
  };
  // const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (!selectedChat) return;
    scrollToBottom();
  }, [allMessages, selectedChat]);

  useEffect(() => {
    const regno = new URLSearchParams(location.search).get("user");
    if (!regno) return;
    console.log(regno)
    userService
      .searchUsers(regno)
      .then((res) => {
        if (res.length > 0) {
          dispatch(setSelectedChat(res[0]));
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch user");
        console.log(error);
      });

    chatService
      .getConversation(regno)
      .then((res) => {
        dispatch(setMessages({ regno, messages: res.conversation }));
      })
      .catch((error) => {
        toast.error("Failed to fetch messages");
        console.log(error);
      });
  }, [location]);

  useEffect(() => {
    if (!socket) return;

    // Scokets events
    socket.on("message:received", (data) => {
      const regno = data.messageId.split("-")[0];
      // dispatch(setChats())

      dispatch(addMessage({ regno, message: data }));
      if (selectedChatRef.current?.regno == regno) {
        socket.emit("conversation:read", regno);
      }
    });
    socket.on("chat:seen", (data) => {
      dispatch(setChatSeen({ regno: data, seen: true }));
    });
    return () => {
      socket.off("message:received");
      socket.off("chat:seen");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter((chat) =>
        chat.user.fullName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchText, chats]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const currentTimestamp = Date.now();

    const newMessage = {
      messageId: `${user.regno}-${currentTimestamp}`,
      content: message,
      timestamp: currentTimestamp,
      sender: {
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        regno: user.regno,
        trade: user.trade,
        batch: user.batch,
      },
      to: selectedChat.regno,
    };
    setMessage("");
    dispatch(addMessage({ regno: selectedChat.regno, message: newMessage }));
    socket.emit("message:send", newMessage);

    dispatch(setChatSeen({ regno: selectedChat.regno, seen: false }));
  };

  useBodyScrollLock();

  return (
    <div className="mx-auto h-[92vh]">
      <div className="container h-full px-0 bg-white rounded-lg shadow-lg overflow-hidden flex">
        <div
          className={`w-full md:w-1/3 border-r ${
            selectedChat ? "hidden md:block" : ""
          }`}
        >
          <div className="p-4">
            <Input
              type="text"
              placeholder="Search chats..."
              startadornment={<Search className="w-4 h-4 text-gray-400 mr-2" />}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <ChatList
            filteredChats={filteredChats}
            onSelectChat={onSelectChat}
            selectedChatId={selectedChat}
          />
        </div>

        <div
          className={`w-full md:w-2/3 flex flex-col ${
            selectedChat ? "" : "hidden md:flex"
          }`}
        >
          {selectedChat ? (
            <>
              <ChatHeader
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
              />
              <ScrollArea className="flex-grow" ref={scrollAreaRef}>
                <div className="flex flex-col p-4">
                  {allMessages[selectedChat.regno] &&
                    allMessages[selectedChat.regno].map((msg) => (
                      <ChatMessage
                        key={msg.messageId}
                        message={msg}
                        isOwnMessage={msg.messageId.includes(user.regno)}
                      />
                    ))}
                  {allMessages[selectedChat.regno] &&
                    allMessages[selectedChat.regno][
                      allMessages[selectedChat.regno].length - 1
                    ].messageId.includes(user.regno) && (
                      <div className="w-full flex justify-end -mt-3 items-center  text-[11px] md:text-[13px] gap-0.5  text-gray-400 pr-1">
                        {isRead == true ? (
                          <>
                            <Eye className="text-blue-500 h-3 w-3 md:h-5 md:w-5  " />
                            seen
                          </>
                        ) : (
                          <CircleCheck className="text-blue-500 h-3 w-3 md:h-4 md:w-4" />
                        )}
                      </div>
                    )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <div className="p-4 bg-white">
                <ChatInput
                  message={message}
                  setMessage={setMessage}
                  onSend={handleSendMessage}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full flex-col">
              <p className="text-gray-500">Select a chat to start messaging</p>
              <Button size="responsive" variant="primary" className="my-2">
                Select Person
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
