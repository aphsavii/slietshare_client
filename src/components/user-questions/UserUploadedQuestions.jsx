import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import qsService from "@/api/services/qsService";
import { Link } from "react-router-dom";
import Qs from "../QuestionSheet/Qs";
import InfinitePageLoader from "../Loaders/InfinitePageLoader";
import toast from "react-hot-toast";

function UserUploadedQuestions({ regno }) {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["userQs"],
    queryFn: ({ pageParam = 1 }) =>
      qsService.getUserQs({ pageParam, limit: 10, regno }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  const removeQs = async (qsId) => {
    try {
      await qsService.deleteQs(qsId);
      toast.success("Question paper deleted successfully");
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (error) console.error(error);
    if (status === "success" && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, error, status, hasNextPage]);
  return (
    <div id="qs-container" className="">
      {!data?.pages && <InfinitePageLoader text="Loading Questions..." />}
      <div className="flex w-full flex-wrap justify-between gap-y-10">
        {data?.pages &&
          data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.map((qs) => (
                <Qs
                  key={qs._id}
                  qsId={qs._id}
                  uploader={qs.uploadedBy.fullName.split(" ")[0]}
                  subName={qs.subName}
                  subCode={qs.subCode
                    .toUpperCase()
                    .replace(/([a-zA-Z]+)(\d+)/g, "$1-$2")}
                  qsUrl={qs.qsUrl}
                  DOE={qs?.DOE}
                  type={qs["type"]}
                  regno={qs.uploadedBy.regno}
                  isPending={qs.status == "pending" ? true : false}
                  onDelete={async () => {
                    await removeQs(qs._id);
                  }}
                />
              ))}
            </React.Fragment>
          ))}
      </div>
      <div className="" ref={ref}>
        {isFetchingNextPage && (
          <InfinitePageLoader text="Loading Questions..." />
        )}
        {data?.pages[0].length === 0 && (
          <div className="py-20">
            <p className="text-center text-gray-500">
              No Uploaded Question Sheets
            </p>
            <p className="text-center text-gray-500">
              You are most welcome to{" "}
              <Link
                to="/qs/upload"
                className="text-primaryBlue underline cursor-pointer"
              >
                upload one
              </Link>
            </p>
          </div>
        )}

        {data?.pages[0].length > 0 && !hasNextPage && (
          <div className="py-10">
            <p className="text-center text-gray-500">No more Question Sheets</p>
            <p className="text-center text-gray-500">
              You are most welcome to{" "}
              <Link
                to="/qs/upload"
                className="text-primaryBlue underline cursor-pointer"
              >
                upload one
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserUploadedQuestions;
