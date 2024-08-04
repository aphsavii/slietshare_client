import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { Bell } from "lucide-react";
import { useContext } from "react";
import { SocketContext } from "@/api/sockets/socket";
import NotificationTab from "./NotificationTab";
import userService from "@/api/services/userService";

function Notification({}) {
  const [notifications, setNotifications] = useState([]);
  const socket = useContext(SocketContext);
  const [notificationLength, setNotificationLength] = useState(
    notifications.length
  );

  useEffect(() => {
    try {
      userService.getUnreadNotifications().then((res) => {
        setNotifications(res);
        setNotificationLength(res.length);
      });
    } catch (error) {
      console.log(error);
    }
  },[]);

  useEffect(() => {
    if (!socket) return;
    socket.on("notification:new", (data) => {
      setNotifications([data, ...notifications]);
      setNotificationLength(notificationLength + 1);
    });
    return () => {
      socket.off("notification:new");
    };
  }, [socket]);

  const markAsRead = (notification) => {
    const updatedNotifications = notifications.map((n) => {
      if (n.message.timestamp === notification.message.timestamp) {
        return { ...n, message: { ...n.message, read: true } };
      }
      return n;
    });
    setNotifications(updatedNotifications);
  };

  return (
    <Popover className="">
      <PopoverTrigger
        onClick={() => {
          setNotificationLength(0);
          socket.emit("notification:markAsRead");
        }}
        className=""
      >
        {" "}
        <Bell className="text-white h-4 w-4 md:h-7 md:w-7 relative" />
        {notificationLength > 0 && (
          <span className="absolute h-3 w-5 md:h-4 md:w-6 bg-red-500 rounded-full top-1.5 md:top-4 text-white font-medium text-[10px] leading-3 md:text-xs">
            {notifications.length}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="bg-white  w-screen md:w-[400px] p-0 mt-2 lg:mt-3.5  ">
        <div className="absolute left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-500 hidden md:block -mt-0.5"></div>
        <ul className="">
          {notifications.length > 0 &&
            notifications.map((notification) => (
              <NotificationTab
                key={notification.message.timestamp}
                notification={notification}
                markAsRead={markAsRead}
              />
            ))}
          {notifications.length === 0 && (
            <li className="text-center text-gray-500 my-10">
              No new notifications
            </li>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export default Notification;
