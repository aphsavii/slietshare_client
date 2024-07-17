import { isMobile } from "@/helpers";
import React from "react";
import Post from "@/components/Post/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FeedService from "@/api/services/FeedService";
import PostSkeleton from "@/components/skeletons/PostSkeleton.jsx";
import PostSidebar from "@/components/post-sidebar/PostSidebar";

function Feed() {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) =>
      FeedService.getFeedPosts({ pageParam, limit: 5 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (error) console.error(error);
    if (status === "success" && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, error, status, hasNextPage]);


  return (
    <div className="container min-h-[600px] md:min-h-[800px] mx-auto px-5 py-10">
      <div className="w-full flex gap-5 relative lg:justify-around lg:gap-10 lg:px-40">
        <div id="post-container" className="w-full lg:w-4/6 border ">
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
            {data && !hasNextPage && (
              <p className="text-center text-gray-500">No more posts</p>
            )}
          </div>
        </div>
        {!isMobile() && (
          <div
            id="suggested-profiles"
            className="w-1/3 border min-h-[140px] h-fit bg-white sticky right-0 top-0 rounded-lg hidden lg:block"
          >
            <PostSidebar />
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
