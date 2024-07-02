import { useState,useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "/shadcn/ui/popover";
import { Bell } from "lucide-react";
import { useContext } from "react";
import { SocketContext } from "@/api/sockets/socket";


function Notification({}) {
const [notifications, setNotifications] = useState([]);
const socket = useContext(SocketContext);

useEffect(() => {
  if (!socket) return;
  socket.on('notification:new', (data) => {
    setNotifications([...notifications, data]);
    console.log(notifications);
  });
  return () => {
    socket.off('notification:new');
  };
}, [socket]);

  return (
    <Popover className="">
      <PopoverTrigger className=''>
        {" "}
        <Bell className="text-white h-4 w-4 md:h-7 md:w-7 relative" />
       {notifications.length>0 && <span className="absolute h-3 w-5 md:h-4 md:w-6 bg-red-500 rounded-full top-1.5 md:top-4 text-white font-medium text-[10px] leading-3 md:text-xs">{notifications.length}</span>}
      </PopoverTrigger>
      <PopoverContent className="bg-white w-screen md:w-[400px] ">
        <ul>
          <li>
            notification 1
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
 
export default Notification;
