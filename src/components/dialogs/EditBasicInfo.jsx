import React, { useState } from "react";
import { Button } from "/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import { Edit2 } from "lucide-react";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";


function EditBasicInfo() {
  let userData = useSelector((state) => state.userProfile.userData);
  let activeDialog = useSelector((state) => state.userProfile.dialog);
  const dispatch = useDispatch();

  const setDialogType = (type) => {
    dispatch(setDialog(type));
  };

  useBodyScrollLock();
  return (
    <>
      <div className="fixed inset-0 flex items-start justify-center z-40 pt-40 md:items-center md:pt-0">
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setDialogType(null)}></div>
        <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:max-w-4xl mx-auto absolute z-41">
          {/* modal body */}
          <div className="w-full">
            <h2 className="text-lightblack text-lg lg:text-xl mb-5  font-medium">
              Edit Personal Info
            </h2>
            <div
              id="profile-image-edit"
              className={`h-16 w-16 md:h-24 md:w-24 border bg-cover bg-no-repeat bg-center rounded-full relative`}
              style={{ backgroundImage: `url(${userData?.avatarUrl})` }}>
              <label className="h-6 w-6  border bg-gray-200 p-0.5 absolute rounded-full right-0 bottom-0 cursor-pointer flex items-center justify-center">
                <Edit2 size={12} />
                <input
                  multiple={false}
                  type="file"
                  id="avatar-edit"
                  name="avatar-edit"
                  className="hidden"
                  onChange={(e) => {
                    let profileImageEdit =
                      document.getElementById("profile-image-edit");
                    profileImageEdit.style.backgroundImage = `url(${URL.createObjectURL(
                      e.target.files[0]
                    )})`;
                  }}
                />
              </label>
            </div>
            <label
              htmlFor=""
              className="block mt-5 text-gray-700 font-medium   text-base lg:text-lg  mb-1" >
              Pronouns
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
              name="pronouns-edit"
              id="pronouns-edit">
              <option value="">Select your pronouns</option>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
            </select>
            <label
              htmlFor="headline"
              className="block mt-5 text-gray-700 font-medium   text-base lg:text-lg  mb-1"
            >
              Headline{" "}
            </label>
            <textarea
              className="p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
              name="headline"
              id="headline"
              cols="25"
              rows="3"
            ></textarea>
          </div>

          {/* Modal Footer */}
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
    </>
  );
}

export default EditBasicInfo;
