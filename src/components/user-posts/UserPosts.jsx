import React from "react";
import Post from "@/components/Post/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import postService from "@/api/services/postService";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useDispatch } from "react-redux";
import { toggleCreatePost } from "@/redux/slices/popups";
function UserPosts({ regno }) {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["userPosts"],
    queryFn: ({ pageParam = 1 }) =>
      postService.getUserPosts({ pageParam, limit: 3, regno }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  const { ref, inView } = useInView();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) console.error(error);
    if (status === "success" && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, error, status, hasNextPage]);

  return (
    <div id="post-container" className="lg:w-[60%] border ">
      {!data?.pages && <PostSkeleton />}
      {data?.pages &&
        data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </React.Fragment>
        ))}
      <div className="" ref={ref}>
        {isFetchingNextPage && <PostSkeleton />}
        {data?.pages[0].length === 0 && (
          <div className="py-20">
            <p className="text-center text-gray-500">
              No posts
            </p>
            <p className="text-center text-gray-500">
              You are most welcome to{" "}
              <span
                onClick={() => dispatch(toggleCreatePost())}
                className="text-primaryBlue underline cursor-pointer"
              >
                create one
              </span>
            </p>
          </div>
        )}
        {data?.pages[0].length>0 && !hasNextPage && (
          <div className="py-10">
            <p className="text-center text-gray-500">No more posts</p>
            <p className="text-center text-gray-500">
              You are most welcome to{" "}
              <span
                onClick={() => dispatch(toggleCreatePost())}
                className="text-primaryBlue underline cursor-pointer"
              >
                create one
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPosts;
