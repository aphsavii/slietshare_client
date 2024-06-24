import React, { useState } from "react";
import { Button } from "/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";

function EditPersonalInfo() {
  let userData = useSelector((state) => state.userProfile.userData);
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
      <h2 className="text-lightblack text-lg lg:text-xl mb-5  font-medium">Edit Personal Info</h2>
      <div>
          <label htmlFor="mobile-edit" className="block mt-3 text-gray-700 font-medium   text-base lg:text-lg  mb-1">Mobile </label>
          <input value={userData?.mobile} type="number" className="p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue" name="mobile-edit" id="mobile-edit" />

          <label htmlFor="location-edit" className="block mt-3 text-gray-700 font-medium   text-base lg:text-lg  mb-1">Where are you from? </label>
          <input value={userData?.location} type="text" className="p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue" name="location-edit" id="location-edit" />
      </div>
      </div>
      <div className="mt-5">
        <Button
          className="px-4 py-2 mr-3"
          variant="outline"
          onClick={() => setDialogType(null)}
        >
          {" "}
          Cancel{" "}
        </Button>
        <Button variant="primary" className="px-4 py-2">
          Save
        </Button>
      </div>
    </div>
  </div>
  )
}

export default EditPersonalInfo
