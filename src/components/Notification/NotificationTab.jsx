import { timeAgo } from '@/helpers';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NotificationTab({
    notification,
    markAsRead
}) {
   const notificationText = {
        follow : "Followed you",
        like : "Liked your post",
        comment : "Commented on your post", 
    }
    const [isread, setIsread] = useState(false);
    const notificationCta = notification.message.type == "follow" ? `/user/`+notification.sender.regno : '/post/'+notification.message.postId;
    const navigate = useNavigate();

  return (
    <li key={notification.message.timestamp} className={`border-b border-gray-300 py-4 flex items-center px-3 w-full ${!notification.message.read && 'bg-blue-100'}`}>
        <div className='inline w-3 h-3 mr-3'>
           {!notification.message.read && <div className='w-3 h-3 border  bg-primaryBlue  rounded-full'></div>}
        </div>
        <Link className='w-full' to={notificationCta} onClick={()=>{
            markAsRead(notification);
            navigate(notificationCta);
            }}>
                <div className="flex w-full justify-between">
                  <div className="flex">
                    <img
                      src={notification.sender.avatarUrl}
                      alt="profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <p className="ml-2 text-sm md:text-base text-primaryBlue font-medium">
                      {notification.sender.fullName}
                    </p>
                  </div>
                  <span className="text-xs font-normal italic text-gray-700">
                    {notification.sender.trade} / {notification.sender.regno}
                  </span>
                </div>
                <div className="text-xs -mt-2 ml-10 text-gray-500 flex w-full justify-between pr-10">
                  { notificationText[notification.message.type] }
                  <span>
                    {timeAgo(notification.message.timestamp)}
                  </span>
                </div>
                </Link>
              </li>
  )
}

export default NotificationTab
