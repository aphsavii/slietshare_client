import { useState } from "react";
import { Button } from "/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { updateUserData } from "@/redux/slices/userProfile";
import userService from "@/api/services/userService";
import toast from "react-hot-toast";

function EditEducation() {
  let userData = useSelector((state) => state.userProfile.userData);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const setDialogType = (type) => {
    dispatch(setDialog(type));
  };

  const handleAddEducation = async () => {
    console.log(institution,degree,startDate,endDate);
    if(!institution || !degree || !startDate || !endDate) return toast.error("Please fill all mandatory fields.")
    setLoading(true);
    try {
      let education = {
        institute:institution,
        degree,
        startDate,
        endDate,
      };
      let res = await userService.editMyProfile({ education });
      dispatch(updateUserData({...userData,...res}));
      toast.success("Education added successfully");
      setDialogType(null);
    } catch (error) {
      toast.error("Failed to add education");
    } finally {
      setLoading(false);
    }
  }

  useBodyScrollLock();
  return (
    <div className="fixed inset-0 flex items-start justify-center z-40 pt-40 md:items-center md:pt-0">
    <div
      className="absolute inset-0 bg-black opacity-50"
      onClick={() => setDialogType(null)}
    ></div>
    <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:min-w-[600px] lg:max-w-4xl mx-auto absolute z-41">
      <div className="w-full">
      <h2 className="text-gray-700 text-lg lg:text-xl mb-5  font-medium">Add Education</h2>
        <div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-medium mb-1  lg:text-base">Institution</label>
                <input
                onChange={(e) => setInstitution(e.target.value)}
                type="text"
                className="w-full border shadow focus:ring-2 focus:ring-primaryBlue rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter institution or school name"
                />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-medium mb-1  lg:text-base">Degree</label>
                <input
                onChange={(e) => setDegree(e.target.value)}
                type="text"
                className="w-full border shadow focus:ring-2 focus:ring-primaryBlue rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter degree"
                />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-medium mb-1  lg:text-base">Start date</label>
                <input
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                className="w-full border shadow focus:ring-2 focus:ring-primaryBlue rounded-lg px-3 py-2 focus:outline-none"
                />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-medium mb-1  lg:text-base">End date</label>
                <input
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                className="w-full border shadow focus:ring-2 focus:ring-primaryBlue rounded-lg px-3 py-2 focus:outline-none"
                />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-medium mb-1  lg:text-base">Description <span className=" text-gray-400 text-xs lg:text-sm">(optional)</span></label>
                <textarea
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="w-full border shadow focus:ring-2 focus:ring-primaryBlue rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter description of your achievements in this degree"
                />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-medium mb-1  lg:text-base">Grade <span className=" text-gray-400 text-xs lg:text-sm">(optional)</span></label>
                <input
                onChange={(e) => setGrade(e.target.value)}
                type="text"
                className="w-full border shadow focus:ring-2 focus:ring-primaryBlue rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter grade"
                />
            </div>
        </div>
      </div>
      <div className="mt-5">
        <Button
          className="px-4 py-2 mr-3"
          variant="outline"
          onClick={() => setDialogType(null)}
        >
          Cancel
        </Button>
        <Button loading={loading} onClick={handleAddEducation} variant="primary" className="px-4 py-2">
          Add
        </Button>
      </div>
    </div>
  </div>
  )
}

export default EditEducation;
