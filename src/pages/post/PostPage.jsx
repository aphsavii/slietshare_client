import React, {  useEffect, useState } from "react";
import { useParams } from "react-router";
import postService from "@/api/services/postService";
import { useNavigate } from "react-router";
import Post from "@/components/Post/Post";

function PostPage() {
  const { postId } = useParams("postId");
  const navigate = useNavigate;
  console.log(postId);
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    postService
      .getPostById(postId)
      .then((data) => {
        console.log(data);
        setPostData(data);
      })
      .catch((err) => {
        navigate("/not-found");
      });
  }, []);
  return (
    <>
      <div className="container  min-h-[600px] md:min-h-[800px] mx-auto flex justify-center">
        <div className="max-w-4xl px-5 py-10 ">
            {postData != null && <Post post={postData} />}
        </div>
      </div>
    </>
  );
}

export default PostPage;
