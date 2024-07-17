import React, { useState } from "react";
import { Button } from "@/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { updateUserData } from "@/redux/slices/userProfile";
import userService from "@/api/services/userService";
import toast from "react-hot-toast";

function EditSocialLinks() {
  let userData = useSelector((state) => state.userProfile.userData);
  let activeDialog = useSelector((state) => state.userProfile.dialog);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [github, setGithub] = useState(userData?.socialLinks?.github);
  const [portfolio, setPortfolio] = useState(userData?.socialLinks?.portfolio);
  const [twitter, setTwitter] = useState(userData?.socialLinks?.twitter);
  const [leetcode, setLeetcode] = useState(userData?.socialLinks?.leetcode);
  const [codeforces, setCodeforces] = useState(userData?.socialLinks?.codeforces);
  const [codechef, setCodechef] = useState(userData?.socialLinks?.codechef);
  const [gfg, setGfg] = useState(userData?.socialLinks?.gfg);


  const setDialogType = (type) => {
    dispatch(setDialog(type));
  };

  const onSave = async () => {
    try {
      setLoading(true);
      const res = await userService.editMyProfile({
          socialLinks:{
            github,
            portfolio,
            twitter,
            leetcode,
            codeforces,
            codechef,
            gfg
          }
      });
      dispatch(updateUserData({...userData, ...res}));
      toast.success("Social Links updated successfully");
      setLoading(false);
      setDialogType(null);
    } catch (error) {
      toast.error("Error updating social links");
      setLoading(false);
    }
  };

  useBodyScrollLock();
  
  return (
    <div className="fixed inset-0 flex  justify-center items-center z-40  md:items-center md:pt-0">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setDialogType(null)}
      ></div>
      <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:max-w-4xl mx-auto absolute z-41 overflow-scroll">
        <div className="w-full">
          <h2 className="text-lightblack text-lg lg:text-xl mb-3 md:mb-5  font-medium">
            Add Profile Links
          </h2>
          {/* Github */}
          <label
            htmlFor="github-edit"
            className="block mt-2 text-gray-700 font-medium   text-base lg:text-lg  mb-0.5"
          >
            Github
          </label>
          <input
          onChange={(e) => setGithub(e.target.value)}
          defaultValue={userData?.socialLinks?.github}
            type="text"
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="github-edit"
            id="github-edit"
          />

          {/* Protfolio */}
          <label
            htmlFor="portfolio-edit"
            className="block mt-2 text-gray-700 font-medium   text-base lg:text-lg  mb-0.5"
          >
            Portfolio
          </label>
          <input
          onChange={(e) => setPortfolio(e.target.value)}
            type="text"
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="portfolio-edit"
            id="portfolio-edit"
            defaultValue={userData?.socialLinks?.portfolio}
          />

          {/* Twitter */}
          <label
            type="text"
            className="block mt-2 text-gray-700 font-medium   text-base lg:text-lg  mb-0.5"
          >
            Twitter
          </label>
          <input
            onChange={(e) => setTwitter(e.target.value)}
            type="text"
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="twitter-edit"
            id="twitter-edit"
            defaultValue={userData?.socialLinks?.twitter}
          />

          {/* Leetcode */}
          <label
            htmlFor="leetcode-edit"
            className="block mt-2 text-gray-700 font-medium   text-base lg:text-lg  mb-0.5"
          >
            Leetcode
          </label>
          <input
            type="text"
            onChange={(e) => setLeetcode(e.target.value)}
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="leetcode-edit"
            id="leetcode-edit"
            defaultValue={userData?.socialLinks?.leetcode}
          />

          {/* codeforces */}
          <label
            htmlFor="codeforces-edit"
            className="block mt-2 text-gray-700 font-medium   text-base lg:text-lg  mb-0.5"
          >
            Codeforces
          </label>
          <input
            type="text"
            onChange={(e) => setCodeforces(e.target.value)}
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="codeforces-edit"
            id="codeforces-edit"
            defaultValue={userData?.socialLinks?.codeforces}
          />
          {/* codechef */}
          <label
            htmlFor="codechef-edit"
            className="block mt-2 text-gray-700 font-medium   text-base lg:text-lg  mb-0.5"
          >
            Codechef
          </label>
          <input
            type="text"
            onChange={(e) => setCodechef(e.target.value)}
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="codechef-edit"
            id="codechef-edit"
            defaultValue={userData?.socialLinks?.codechef}
          />

          {/* GFG */}
          <label
            htmlFor="codechef-edit"
            className="block mt-2 text-gray-700 font-medium   text-base lg:text-lg  mb-0.5"
          >
            GFG
          </label>
          <input
            type="text"
            onChange={(e) => setGfg(e.target.value)}
            className="lg:min-w-[600px] p-1 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            name="gfg-edit"
            id="gfg-edit"
            defaultValue={userData?.socialLinks?.gfg}
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
          <Button loading={loading} onClick={onSave} variant="primary" className="px-4 py-2">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditSocialLinks;
