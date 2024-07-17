import React, { useState, useRef } from "react";
import { X, Image, Users, Globe, ChevronDown, User } from "lucide-react";
import { Button } from "@/shadcn/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import EmojiPicker from "../emoji-picker/EmojiPicker";
import postService from "@/api/services/postService";
import toast from "react-hot-toast";
import { trimText } from "@/helpers";

const CreatePost = ({ onClose }) => {
  const [postText, setPostText] = useState("");
  const [visibility, setVisibility] = useState("Anyone");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const createPost = async () => {
    if(!postText.trim() && !selectedImage) {
        toast.error("Title and Media is required");
        return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", postText);
      if (selectedImage) {
        const file = await fetch(selectedImage).then((res) => res.blob());
        formData.append("media", file);
      }
      const upload = await postService.createPost(formData);
      if (upload) {
        toast.success("Post created successfully");
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post");
    } finally {
      setIsUploading(false);
    }
  };
  useBodyScrollLock();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Create a post</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
          <Avatar className="h-7 w-7  md:h-10 md:w-10 cursor-pointer">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>
                  <User color="#6b7280" size={24} />
                </AvatarFallback>
              </Avatar>
            <div>
              <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-gray-500">{trimText(user.headLine,50)}</p>
            </div>
          </div>

          <textarea
            className="w-full h-32 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What do you want to talk about?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />

          {selectedImage && (
            <div className="mt-4 relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full h-auto rounded-md"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current.click()}
              >
                <Image className="h-6 w-6 text-gray-600" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <EmojiPicker setText={setPostText} />
            </div>
            <Button
              disabled={!postText.trim() && !selectedImage}
              variant="primary"
              onClick={createPost}
              loading={isUploading}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
