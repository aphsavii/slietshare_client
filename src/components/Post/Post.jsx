import React, { useState, useRef, useEffect } from "react";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Send,
  User,
  Smile,
} from "lucide-react";

// import EmojiPicker from "emoji-picker-react";
const EmojiPicker = React.lazy(() => import("emoji-picker-react"));
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";
import { Button } from "@/shadcn/ui/Button";

const Post = ({
  post = {
    _id: "6689674bfd956cc1700c847e",
    title: "Muchas Gracias",
    mediaUrl: [
      "http://res.cloudinary.com/dkcyijvn1/image/upload/v1720280906/hzvbchkf12bx0etwsv9k.webp",
    ],
    tags: [],
    createdAt: "2024-07-06T15:48:27.075Z",
    createdBy: {
      _id: "6638c652d1e66ca36e7035bc",
      regno: 2331080,
      fullName: "Avinash kumar",
      trade: "GCS",
    },
  },
}) => {
  const [liked, setLiked] = useState(post?.isLiked);
  const [likeCount, setLikeCount] = useState(1287);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const sharePopupRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  // Dummy data
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      postData.comments.unshift({ user: "You", content: newComment.trim() });
      setNewComment("");
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewComment(newComment + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

 

  return (
    <>
      <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden relative mb-5">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <Avatar className="h-7 w-7  md:h-10 md:w-10 cursor-pointer">
              <AvatarImage src={post?.createdBy?.avatarUrl} />
              <AvatarFallback>
                <User color="#6b7280" size={24} />
              </AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <h3 className="font-semibold text-gray-800">
                {post?.createdBy?.fullName}
              </h3>
              <p className="text-sm text-gray-600 ">
                {post?.createdBy?.headLine}
              </p>
            </div>
          </div>
          <p className="text-gray-800 mb-4 ml-2">{post?.title}</p>
          <div className="mb-4">
            <img src={post?.mediaUrl[0]} className="w-full h-auto rounded-lg" />
          </div>
          <div className="flex justify-between text-gray-500 text-sm">
            <span>{post?.likesCount} likes</span>
            <span>
              {post?.comments?.length} comments • {post?.shares ?? 0} shares
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="flex justify-around p-2">
            <button
              className={`flex items-center transition-colors duration-300 ease-in-out ${
                liked ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={handleLike}
            >
              <ThumbsUp
                className={`mr-1 transition-all duration-300 ease-in-out ${
                  liked ? "fill-current" : ""
                }`}
                size={18}
              />
              Like
            </button>
            <button
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare className="mr-1" size={18} />
              Comment
            </button>
            <button
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={() => setShowSharePopup(true)}
            >
              <Share2 className="mr-1" size={18} />
              Share
            </button>
          </div>
        </div>
        {showComments && (
          <div className="p-4 bg-gray-50 transition-all duration-300 ease-in-out">
            <form onSubmit={handleCommentSubmit} className="mb-4 relative">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="2"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <div className="flex items-center justify-between mt-2">
                <div className="relative" ref={emojiPickerRef}>
                  <Smile
                    className="cursor-pointer text-primaryBlue"
                    size={24}
                    onClick={toggleEmojiPicker}
                  />
                  {showEmojiPicker && (
                    <div className="absolute bottom-full left-0 z-10 animate-in fade-in duration-200">
                      <React.Suspense fallback={<div className="p-1 bg-white ">Loading...</div>}>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </React.Suspense>
                    </div>
                  )}
                </div>
                <Button variant="primary" className="px-2.5">
                  <Send size={16} className="mr-1.5" />
                  Comment
                </Button>
              </div>
            </form>
            <div className="space-y-4">
              {post.comments.map((comment, index) => (
                <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                  <p className="font-semibold text-sm text-gray-800">
                    {comment.user}
                  </p>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
