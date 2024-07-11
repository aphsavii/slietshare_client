import React, { useState, useRef, useEffect, useContext } from "react";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Send,
  User,
  Smile,
} from "lucide-react";
import { SocketContext } from "@/api/sockets/socket";

// import EmojiPicker from "emoji-picker-react";
const EmojiPicker = React.lazy(() => import("emoji-picker-react"));
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";
import { Button } from "@/shadcn/ui/Button";
import { useSelector } from "react-redux";
import postService from "@/api/services/postService";
import { timeAgo, trimText } from "@/helpers";
import toast from "react-hot-toast";
const Post = ({post}) => {
  const socket = useContext(SocketContext);
  const { user } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(post?.isLiked);
  const [likeCount, setLikeCount] = useState(post.likesCount);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setCommnets] = useState(post.comments);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const headLineLength = screen.width < 768 ? 35 : 70;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLike = async () => {
    if (!liked) {
      setLiked(!liked);
      setLikeCount(likeCount + 1);
      socket.emit("post:like", {
        postId: post._id,
        sender: {
          fullName: user.fullName,
          avatarUrl: user.avatarUrl,
          regno: user.regno,
          trade: user.trade,
          batch: user.batch,
        },
        to: post.createdBy.regno.toString(),
      });
    } else {
      setLikeCount(likeCount - 1);
      setLiked(!liked);
      await postService.postUnlike(post._id);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    socket.emit("post:comment", {
      postId: post._id,
      sender: {
        fullName: user?.fullName,
        avatarUrl: user.avatarUrl,
        regno: user.regno,
        trade: user.trade,
        batch: user.batch,
      },
      to: post.createdBy.regno.toString(),
      content: newComment,
    });
    if (newComment.trim()) {
      comments.unshift({
        userDetails: {
          fullName: user?.fullName,
          avatarUrl: user.avatarUrl,
          regno: user.regno,
          trade: user.trade,
          batch: user.batch,
          headLine: user.headLine,
        },
        content: newComment.trim(),
      });
      setNewComment("");
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewComment(newComment + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const sharePost = () => {
    const postUrl = location.origin+"/post/"+post._id;
    navigator.clipboard.writeText(postUrl);
    toast.success("Post link copied");
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
              <p className="text-sm text-gray-600 -mt-1">
                {trimText(post?.createdBy?.headLine, headLineLength)}
              </p>
              <p className="text-xs  text-gray-500">
                {timeAgo(post.createdAt)}
              </p>
            </div>
          </div>
          <p className="text-gray-800 mb-4 ml-2">{post?.title}</p>
          <div className="mb-4">
            <img src={post?.mediaUrl[0]} className="w-full h-auto rounded-lg" />
          </div>
          <div className="flex justify-between text-gray-500 text-sm">
            <span>{likeCount} likes</span>
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
              onClick={sharePost}
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
                      <React.Suspense
                        fallback={
                          <div className="p-1 bg-white ">Loading...</div>
                        }
                      >
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
                <div
                  key={index}
                  className="bg-white py-3 px-4 rounded-md shadow "
                >
                  <div className="flex justify-between">
                    <div className="flex items-center ">
                      <Avatar className="h-7 w-7  md:h-10 md:w-10 cursor-pointer">
                        <AvatarImage src={comment.userDetails.avatarUrl} />
                        <AvatarFallback>
                          <User color="#6b7280" size={24} />
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-base text-gray-800 ml-1">
                        {comment.userDetails.fullName}
                        <p className="text-xs text-gray-500 font-normal -mt-0.5">
                          {comment.userDetails.headLine}
                        </p>
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 ">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-800 mt-0.5 text-sm ml-8 md:ml-11">
                    {comment.content}
                  </p>
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
