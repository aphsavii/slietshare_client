import React, { useState } from "react";
import { Button } from "/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import { Edit2 } from "lucide-react";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import userService from "@/api/services/userService";
import { useForm } from "react-hook-form";
import { updateUserData } from "@/redux/slices/userProfile";
import toast from "react-hot-toast";
import { updateUserAuthData } from "@/redux/slices/auth";

function EditBasicInfo() {
  let userData = useSelector((state) => state.userProfile.userData);
  let userAuth = useSelector((state)=>state.auth.user);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(userData?.avatarUrl);

  const setDialogType = (type) => {
    dispatch(setDialog(type));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("avatar", file);
    }
  };

  const onSave = async (data) => {
    try {
      if (!isValid) return;
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }     
      const response = await userService.editBasicInfo(formData);

      dispatch(updateUserData({ ...userData, ...response }));
      if(response?.avatarUrl) dispatch(updateUserAuthData({...userAuth,avatarUrl:response?.avatarUrl}));
      toast.success("Profile updated successfully");
      setDialogType(null);
    } catch (error) {
      toast.error(error.toString());
      console.log(error);
    }
  };

  useBodyScrollLock();
  return (
    <>
      <div className="fixed inset-0 flex items-start justify-center z-40 pt-40 md:items-center md:pt-0">
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setDialogType(null)}
        ></div>
        <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:max-w-4xl mx-auto absolute z-41">
          <form onSubmit={handleSubmit(onSave)}>
            {/* modal body */}
            <div className="w-full">
              <h2 className="text-lightblack text-lg lg:text-xl mb-5  font-medium">
                Edit Personal Info
              </h2>
              <div
                id="profile-image-edit"
                className={`h-16 w-16 md:h-24 md:w-24 border bg-cover bg-no-repeat bg-center rounded-full relative`}
                style={{ backgroundImage: `url(${imagePreview})` }}
              >
                <label className="h-6 w-6  border bg-gray-200 p-0.5 absolute rounded-full right-0 bottom-0 cursor-pointer flex items-center justify-center">
                  <Edit2 size={12} />
                  <input
                    multiple={false}
                    type="file"
                    id="avatar-edit"
                    name="avatar-edit"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <label
                htmlFor=""
                className="block mt-5 text-gray-700 font-medium   text-base lg:text-lg  mb-1"
              >
                Pronouns
              </label>
              <select
                className="shadow relative appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                name="pronouns-edit"
                id="pronouns-edit"
                defaultValue={userData?.pronouns}
                {...register("pronouns", { required: "Pronouns is required" })}
              >
                <option value="">Select your pronouns</option>
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="They/Them">They/Them</option>
              </select>
              {errors?.pronouns && (
                <p className="absolute ml-1 mt-0.5 text-xs text-alert">
                  {errors?.pronouns?.message}
                </p>
              )}
              <label
                htmlFor="headline"
                className="block mt-5 text-gray-700 font-medium   text-base lg:text-lg  mb-1"
              >
                Headline
              </label>
              <textarea
                className="p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                name="headline"
                id="headline"
                cols="25"
                rows="3"
                value={userData?.headLine}
                {...register("headLine", { required: "heeadline is required" })}
              ></textarea>
              {errors?.headLine && (
                <p className="absolute ml-1 mt-0.5 text-xs text-alert">
                  {errors?.headLine?.message}
                </p>
              )}
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
              <Button
                loading={isSubmitting}
                variant="primary"
                className="px-4 py-2"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBasicInfo;
