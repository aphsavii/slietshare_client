import React, { useState } from "react";
import { Button } from "/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";

function EditSocialLinks() {
  let userData = useSelector((state) => state.userProfile.userData);
  let activeDialog = useSelector((state) => state.userProfile.dialog);
  const dispatch = useDispatch();

  const setDialogType = (type) => {
    dispatch(setDialog(type));
  };

  useBodyScrollLock();
  
  return (
    <div className="fixed inset-0 flex items-start justify-center z-40 pt-40 md:items-center md:pt-0">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setDialogType(null)}
      ></div>
      <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:max-w-4xl mx-auto absolute z-41">
        <div className="w-full">
          <h2 className="text-lightblack text-lg lg:text-xl mb-5  font-medium">
            Add Social Links
          </h2>
          {/* Github */}
          <label
            htmlFor="github-edit"
            className="block mt-3 text-gray-700 font-medium   text-base lg:text-lg  mb-1"
          >
            Github{" "}
          </label>
          <input
            type="text"
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="github-edit"
            id="github-edit"
          />

          {/* Protfolio */}
          <label
            htmlFor="portfolio-edit"
            className="block mt-3 text-gray-700 font-medium   text-base lg:text-lg  mb-1"
          >
            Portfolio{" "}
          </label>
          <input
            type="text"
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="portfolio-edit"
            id="portfolio-edit"
          />

          {/* Twitter */}
          <label
            type="text"
            className="block mt-3 text-gray-700 font-medium   text-base lg:text-lg  mb-1"
          >
            Twitter{" "}
          </label>
          <input
            type="text"
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="twitter-edit"
            id="twitter-edit"
          />

          {/* Leetcode */}
          <label
            htmlFor="leetcode-edit"
            className="block mt-3 text-gray-700 font-medium   text-base lg:text-lg  mb-1"
          >
            Leetcode{" "}
          </label>
          <input
            type="text"
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="leetcode-edit"
            id="leetcode-edit"
          />

          {/* codeforces */}
          <label
            htmlFor="codeforces-edit"
            className="block mt-3 text-gray-700 font-medium   text-base lg:text-lg  mb-1"
          >
            Codeforces{" "}
          </label>
          <input
            type="text"
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="codeforces-edit"
            id="codeforces-edit"
          />
          {/* codechef */}
          <label
            htmlFor="codechef-edit"
            className="block mt-3 text-gray-700 font-medium   text-base lg:text-lg  mb-1"
          >
            Codechef{" "}
          </label>
          <input
            type="text"
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="codechef-edit"
            id="codechef-edit"
          />
        </div>
        <p className="mt-4 text-[10px] lg:text-xs text-gray-500 ml-2">
          If you don't have any of these, leave that blank
        </p>
        <div className="mt-5">
          <Button
            className="px-4 py-2 mr-3"
            variant="outline"
            onClick={() => setDialogType(null)}
          >
            Cancel
          </Button>
          <Button variant="primary" className="px-4 py-2">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditSocialLinks;
