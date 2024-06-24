import React, { useState } from "react";
import { Button } from "/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";

function EditAbout() {
  let userData = useSelector((state) => state.userProfile.userData);
  let activeDialog = useSelector((state) => state.userProfile.dialog);
  const dispatch = useDispatch();

  useBodyScrollLock();

  const setDialogType = (type) => {
    dispatch(setDialog(type));
  };
  return (
    <div className="fixed inset-0 flex items-start justify-center z-40 pt-40 md:items-center md:pt-0">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setDialogType(null)}
      ></div>
      <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:max-w-4xl mx-auto absolute z-41">
        <div className="w-full">
          <h2 className="text-lightblack text-lg lg:text-xl mb-5  font-medium">
            Edit About
          </h2>
          <label
            htmlFor="about-edit"
            className="block mt-5 text-gray-700 font-medium   text-base lg:text-lg  mb-1"
          >
            About{" "}
          </label>
          <textarea
            className="p-1 w-64 h-32  lg:w-[500px] lg:h-64 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="about-edit"
            id="about-edit"
          ></textarea>
        </div>
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

export default EditAbout;
