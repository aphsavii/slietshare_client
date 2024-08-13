import React, { useState } from "react";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { useQuery } from "@tanstack/react-query";
import userService from "@/api/services/userService";
import Loading from "@/components/Loaders/Loading";
import { useDebouncedState } from "@/hooks/useDebouncedState";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "@/redux/slices/chats";
function MessageUsers({
    visisble,
    setVisible
}) {
    const dispatch = useDispatch();
  useBodyScrollLock();
  const [searchText, setSearchText] = useDebouncedState("", 300);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["userSearch", searchText],
    queryFn: async () => await userService.searchUsers(searchText),
    enabled: searchText.length > 0,
    retry: false,
  });
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
    {visisble && <div className="fixed inset-0 flex items-start justify-center z-40 pt-40 md:items-center md:pt-0">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setVisible(false)}
      ></div>
      <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:max-w-4xl mx-auto absolute z-41">
        <div className="border-b border-gray-200 pb-3">
          <h3 className="text-lg font-semibold text-gray-700">Message Users</h3>

          <div className="border shadow rounded-md md:w-fit my-3 px-2 w-full flex">
            <Search className="h-5 w-5 text-gray-600  my-auto mr-2 mb-1.5 " />
            <input
              onChange={handleSearch}
              className=" outline-none focus:outline-none md:p-1 p-1.5 rounded-md text-base md:text-lg "
              type="text"
              placeholder="Search"
            />
          </div>
          {isLoading && <Loading />}
          {isError && <p>error</p>}
          {data && data.length == 0 && (
            <p className="text-center text-sm lg:text-lg text-red-500 ">
              404 | No user Found
            </p>
          )}
          {data &&
            data.length > 0 &&
            data.map((user) => (
              <div
                key={user.regno}
                className="flex  flex-col border-b border-gray-200 py-4"
              >
                <div className="flex w-full justify-between">
                  <div className="flex">
                    <img
                      src={user.avatarUrl}
                      alt="user"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-3">
                      <h3 className="font-semibold">{user.fullName}</h3>
                      <p className="text-gray-500">{user.regno}</p>
                    </div>
                  </div>
                  <button
                    className="text-blue-500"
                    onClick={() => {
                        dispatch(setSelectedChat(user));
                        setVisible(false);
                    }}
                  >
                    Message
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>}
    </>
  );
}

export default MessageUsers;
