import { isMobile } from "@/helpers";
import React from "react";
import Post from "@/components/Post/Post";
function Feed() {
  return (
    <div className="container  min-h-[600px] md:min-h-[800px] mx-auto px-5 py-10">
      <div className="w-full flex gap-5 relative">
        <div id="post-container" className="w-full lg:w-3/4 border  lg:px-32">
        <Post/>
        </div>
        {!isMobile() && <div id="suggested-profiles" className="w-1/4 border h-[240px] bg-white sticky right-0 top-0 rounded-lg">

        </div>}
      </div>
    </div>
  );
}

export default Feed;
