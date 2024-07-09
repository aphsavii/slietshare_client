import React from "react";
import { Search, X, Check } from "lucide-react";
import { useState } from "react";


function SharePost({ postId }) {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const handleSendShare = () => {
    console.log(
      "Sharing post with:",
      selectedUsers.map((u) => u.name).join(", ")
    );
    setShowSharePopup(false);
    setSelectedUsers([]);
  };
  
  const allUsers = [
    { id: 1, name: "Alice Johnson", avatar: "/api/placeholder/32/32" },
    { id: 2, name: "Bob Williams", avatar: "/api/placeholder/32/32" },
    { id: 3, name: "Carol Davis", avatar: "/api/placeholder/32/32" },
    { id: 4, name: "David Brown", avatar: "/api/placeholder/32/32" },
    { id: 5, name: "Eva Martinez", avatar: "/api/placeholder/32/32" },
    { id: 6, name: "Frank Thompson", avatar: "/api/placeholder/32/32" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={sharePopupRef}
        className="bg-white rounded-lg p-4 w-80 max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Share Post</h3>
          <button
            onClick={() => setShowSharePopup(false)}
            className="text-gray-500 hover:text-gray-700"
          >
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
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="max-h-60 overflow-y-auto mb-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-md ${
                selectedUsers.some((u) => u.id === user.id) ? "bg-blue-100" : ""
              }`}
              onClick={() => handleUserSelect(user)}
            >
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm">{user.name}</span>
              </div>
              {selectedUsers.some((u) => u.id === user.id) && (
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
            Send to {selectedUsers.length} user
            {selectedUsers.length > 1 ? "s" : ""}
          </button>
        )}
      </div>
    </div>
  );
}

export default SharePost;
