import React, { useState } from "react";
import { Button } from "@/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog, updateUserData } from "@/redux/slices/userProfile";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import userService from "@/api/services/userService";
import toast from "react-hot-toast";
import { getLastRouteSegment } from "@/helpers";
function EditSocialLinks() {
  const userData = useSelector((state) => state.userProfile.userData);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    github: userData?.socialLinks?.github || "",
    portfolio: userData?.socialLinks?.portfolio || "",
    twitter: userData?.socialLinks?.twitter || "",
    leetcode: userData?.socialLinks?.leetcode || "",
    codeforces: userData?.socialLinks?.codeforces || "",
    codechef: userData?.socialLinks?.codechef || "",
    gfg: userData?.socialLinks?.gfg || "",
  });
  const [errors, setErrors] = useState({});

  useBodyScrollLock();

  const validateProfile = async (link, platform) => {
    platform = platform.toLowerCase();
    if(platform == "portfolio" || platform == "github" || platform == "twitter" || platform == "codechef") return true;
    const userName = getLastRouteSegment(link);
    try {
      const res = await userService.validateProfile(
        userName,
        platform.toLowerCase()
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  const validateLink = async (name, value) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, [name]: null }));
      return;
    }

    const isValid = await validateProfile(value, name);
    if (!isValid) {
      setErrors((prev) => ({ ...prev, [name]: "Invalid link" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
    validateLink(name, value);
  };

  const setDialogType = (type) => {
    dispatch(setDialog(type));
  };

  const onSave = async () => {
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) {
      toast.error("Please correct the invalid links before saving.");
      return;
    }

    try {
      setLoading(true);
      const res = await userService.editMyProfile({ socialLinks });
      dispatch(updateUserData({ ...userData, ...res }));
      toast.success("Social Links updated successfully");
      setLoading(false);
      setDialogType(null);
    } catch (error) {
      toast.error("Error updating social links");
      setLoading(false);
    }
  };

  const renderInput = (name, label) => (
    <div className="mb-4">
      <label
        htmlFor={`${name}-edit`}
        className="block text-gray-700 font-medium text-base lg:text-lg mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        id={`${name}-edit`}
        name={name}
        value={socialLinks[name]}
        onChange={handleInputChange}
        className={`w-full lg:min-w-[600px] p-2 rounded shadow appearance-none border focus:outline-none focus:ring-2 ${
          errors[name]
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-primaryBlue"
        }`}
      />
      {errors[name] && (
        <p className="mt-1 text-red-500 text-xs">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center z-40 md:items-center md:pt-0">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setDialogType(null)}
      ></div>
      <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:max-w-4xl mx-auto absolute z-41 overflow-auto max-h-[90vh]">
        <div className="w-full">
          <h2 className="text-lightblack text-lg lg:text-xl mb-4 font-medium">
            Add Profile Links
          </h2>
          {renderInput("github", "Github")}
          {renderInput("portfolio", "Portfolio")}
          {renderInput("twitter", "Twitter")}
          {renderInput("leetcode", "Leetcode")}
          {renderInput("codeforces", "Codeforces")}
          {renderInput("codechef", "Codechef")}
          {renderInput("gfg", "GFG")}
        </div>
        <p className="mt-4 text-xs text-gray-500">
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
          <Button
            loading={loading}
            onClick={onSave}
            variant="primary"
            className="px-4 py-2"
            disabled={Object.values(errors).some((error) => error !== null)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditSocialLinks;
