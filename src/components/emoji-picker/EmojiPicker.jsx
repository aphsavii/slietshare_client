import React from "react";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/shadcn/ui/Button";

function Emoji_Picker({ setText = () => null }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

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
  }, [user]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  return (
    <>
      <div className="relative" ref={emojiPickerRef}>
        <Button type="" onClick={toggleEmojiPicker} variant="ghost" size="icon">
          <Smile className="cursor-pointer " size={24} />
        </Button>
        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 z-10 animate-in fade-in duration-200">
            <React.Suspense
              fallback={<div className="p-1 bg-white ">Loading...</div>}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </React.Suspense>
          </div>
        )}
      </div>
    </>
  );
}

export default Emoji_Picker;
