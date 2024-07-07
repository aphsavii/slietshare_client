import React, { useState, useRef, useEffect } from 'react';
import { ThumbsUp, MessageSquare, Share2, Send, Search, X, Check } from 'lucide-react';
import PostSkeleton from '@/components/skeletons/PostSkeleton.jsx';

const Post = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1287);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const sharePopupRef = useRef(null);

  // Dummy data
  const [postData, setPostData] = useState([]);

  const allUsers = [
    { id: 1, name: "Alice Johnson", avatar: "/api/placeholder/32/32" },
    { id: 2, name: "Bob Williams", avatar: "/api/placeholder/32/32" },
    { id: 3, name: "Carol Davis", avatar: "/api/placeholder/32/32" },
    { id: 4, name: "David Brown", avatar: "/api/placeholder/32/32" },
    { id: 5, name: "Eva Martinez", avatar: "/api/placeholder/32/32" },
    { id: 6, name: "Frank Thompson", avatar: "/api/placeholder/32/32" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (sharePopupRef.current && !sharePopupRef.current.contains(event.target)) {
        setShowSharePopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sharePopupRef]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      postData.comments.unshift({ user: "You", content: newComment.trim() });
      setNewComment('');
    }
  };

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUsers(prev => 
      prev.some(u => u.id === user.id)
        ? prev.filter(u => u.id !== user.id)
        : [...prev, user]
    );
  };

  const handleSendShare = () => {
    console.log("Sharing post with:", selectedUsers.map(u => u.name).join(", "));
    setShowSharePopup(false);
    setSelectedUsers([]);
  };

  return (
    <>
    {postData.length == 0 && <PostSkeleton/> }
   { postData.length > 0 && <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img 
            src="/api/placeholder/40/40" 
            alt={postData?.user?.name} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{postData?.user?.name}</h3>
            <p className="text-sm text-gray-600">{postData?.user?.title}</p>
          </div>
        </div>
        <p className="text-gray-800 mb-4">{postData?.content}</p>
        <div className="mb-4">
          <img 
            src={postData?.image} 
            alt="AI and Data Analysis Visualization" 
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex justify-between text-gray-500 text-sm">
          <span>{likeCount} likes</span>
          <span>{postData?.comments?.length} comments • {postData?.shares} shares</span>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="flex justify-around p-2">
          <button 
            className={`flex items-center transition-colors duration-300 ease-in-out ${liked ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            onClick={handleLike}
          >
            <ThumbsUp 
              className={`mr-1 transition-all duration-300 ease-in-out ${liked ? 'fill-current' : ''}`} 
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
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="2"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button 
              type="submit" 
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out flex items-center"
            >
              <Send size={16} className="mr-2" />
              Comment
            </button>
          </form>
          <div className="space-y-4">
            {postData.comments.map((comment, index) => (
              <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                <p className="font-semibold text-sm text-gray-800">{comment.user}</p>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {showSharePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={sharePopupRef} className="bg-white rounded-lg p-4 w-80 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share Post</h3>
              <button onClick={() => setShowSharePopup(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto mb-4">
              {filteredUsers.map(user => (
                <div 
                  key={user.id} 
                  className={`flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-md ${
                    selectedUsers.some(u => u.id === user.id) ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-center">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  {selectedUsers.some(u => u.id === user.id) && (
                    <Check className="text-blue-500" size={20} />
                  )}
                </div>
              ))}
            </div>
            {selectedUsers.length > 0 && (
              <button 
                onClick={handleSendShare}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out flex items-center justify-center"
              >
                <Send size={16} className="mr-2" />
                Send to {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>
      )}
    </div>}
    </>
  );
};

export default Post;