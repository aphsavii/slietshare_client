import React, { useState } from "react";
import { Button } from "/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { updateUserData } from "@/redux/slices/userProfile";
import userService from "@/api/services/userService";
import toast from "react-hot-toast";

function EditPersonalInfo() {
  let userData = useSelector((state) => state.userProfile.userData);
  const dispatch = useDispatch();

  const [mobile, setMobile] = useState(userData?.mobile);
  const [location, setLocation] = useState(userData?.location);
  const [isUpdating, setIsUpdating] = useState(false);

  const setDialogType = (type) => {
    dispatch(setDialog(type));
  };

  const onSave = async () => {
    if(mobile === userData?.mobile && location === userData?.location) return;
    try {
      setIsUpdating(true);
       const res = await userService.editMyProfile({mobile, location});
       setIsUpdating(false);
       toast.success("Profile updated successfully");
       dispatch(updateUserData({...userData,...res}));
       setDialogType(null);
    } catch (error) {
      setIsUpdating(false);
      toast.error(error.toString());
      console.log(error);
    }
  }

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
          <input onChange={(e)=>setMobile(e.target.value)} defaultValue={userData?.mobile} type="number" className="p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue px-2" name="mobile-edit" id="mobile-edit" />
          <p className=" text-warn text-[10px] lg:text-xs mt-1" >Mobile won't be made public </p>

          <label htmlFor="location-edit" className="block mt-3 text-gray-700 font-medium   text-base lg:text-lg  mb-1">Where are you from? </label>
          <input onChange={(e)=>setLocation(e.target.value)} defaultValue={userData?.location} type="text" className="p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue px-2" name="location-edit" id="location-edit" />
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
        <Button onClick={onSave} loading={isUpdating} variant="primary" className="px-4 py-2">
          Save
        </Button>
      </div>
    </div>
  </div>
  )
}

export default EditPersonalInfo
