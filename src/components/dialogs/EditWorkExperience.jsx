import { useState } from "react";
import { Button } from "/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { updateUserData } from "@/redux/slices/userProfile";
import userService from "@/api/services/userService";
import toast from "react-hot-toast";

function EditWorkExperience() {
  let userData = useSelector((state) => state.userProfile.userData);
  const dispatch = useDispatch();

  const setDialogType = (type) => {
    dispatch(setDialog(type));
  };

  const [workExperience, setWorkExperience] = useState(userData?.workExperience || []);

  const [loading, setLoading] = useState(false);
  const [ongoing, setOngoing] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");


  const onAdd = async () => {
    setLoading(true);
    
    const finalEndDate = ongoing ? "Present" : endDate;
  
    if(!company || !position || !startDate || !finalEndDate || !description) {
      setLoading(false);
      return toast.error("All fields are required");
    }
  
    let data = {
      company,
      position,
      startDate,
      endDate: finalEndDate,
      description,
    };
  
    console.log(data);
    const experience = [...workExperience, data];   
    try {
      const res = await userService.editMyProfile({workExperience:experience});
      setLoading(false);
      toast.success("Work Experience added successfully");
      dispatch(updateUserData({...userData,...res}));
      console.log({...userData,...res});
      setDialogType(null);
    } catch (error) {
      setLoading(false);
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
    <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:min-w-[600px] lg:max-w-4xl mx-auto absolute z-41">
      <div className="w-full">
      <h2 className="text-gray-700 text-lg lg:text-xl mb-5  font-medium">Add Work Experience</h2>
        <div>

          <div className="mb-5">
            <label htmlFor="company" className="text-gray-700 text-sm lg:text-base font-medium block mb-2">
              Company
            </label>
            <input
            onChange={(e)=>setCompany(e.target.value)}
              type="text"
              id="company"
              className="w-full border shadow focus:outline-none focus:ring-2 focus:ring-primaryBlue rounded-lg px-4 py-2"
              placeholder="Company"
            />
            <label htmlFor="position" className="text-gray-700 text-sm lg:text-base font-medium block mt-3 mb-2"> Position</label>
            <input onChange={(e)=>setPosition(e.target.value)} type="text" id="position" className="w-full border shadow focus:outline-none focus:ring-2 focus:ring-primaryBlue rounded-lg px-4 py-2" placeholder="Position" />

            <label htmlFor="startate" className="text-gray-700 text-sm lg:text-base font-medium block mt-3 mb-2"> Start Date</label>
            <input onChange={(e)=>setStartDate(e.target.value)} type="date" id="startate" className="w-full border shadow focus:outline-none focus:ring-2 focus:ring-primaryBlue rounded-lg px-4 py-2" placeholder="Start Date" />

            {!ongoing && <div id="endDate-block">
            <label htmlFor="endate" className="text-gray-700 text-sm lg:text-base font-medium block mt-3 mb-2"> End Date</label>
            <input defaultValue={""} onChange={(e)=>setEndDate(e.target.value)} type="date" id="endate" className="w-full border shadow focus:outline-none focus:ring-2 focus:ring-primaryBlue rounded-lg px-4 py-2" placeholder="End Date" />
            </div>}

            <input onChange={(e)=>{
              setOngoing(e.target.checked);
            }} className="mt-5" type="checkbox" name="ongoing" id="ongoing" /> <label htmlFor="ongoing" className="text-gray-600 text-sm lg:text-base font-medium">Currently Ongoing</label>

            <label htmlFor="" className="text-gray-700 text-sm lg:text-base font-medium block mt-3 mb-2">Description</label>
            <textarea onChange={(e)=>setDescription(e.target.value)} className="w-full border shadow focus:outline-none focus:ring-2 focus:ring-primaryBlue rounded-lg px-4 py-2" placeholder="Description" rows="4"></textarea>
            </div>
        </div>
      </div>
      <div className="mt-3">
        <Button
          className="px-4 py-2 mr-3"
          variant="outline"
          onClick={() => setDialogType(null)}
        >
          Cancel
        </Button>
        <Button loading={loading} onClick={onAdd} variant="primary" className="px-4 py-2">
          Add
        </Button>
      </div>
    </div>
  </div>
  )
}

export default EditWorkExperience;
