import { useState } from "react";
import { Button } from "@/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { updateUserData } from "@/redux/slices/userProfile";
import userService from "@/api/services/userService";
import toast from "react-hot-toast";

function EditProjects() {
  let userData = useSelector((state) => state.userProfile.userData);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [description, setDescription] = useState('');

  const onSave = async () => {
    if(!projectName || !projectLink || !description) {
      return toast.error("All fields are required");
    }
    try {
      setLoading(true);
      const res = await userService.editMyProfile({
          projects:[...userData?.projects,{
            title:projectName,
            link:projectLink,
            description
          }]
      });
      dispatch(updateUserData({...userData, ...res}));
      toast.success("Projects updated successfully");
      setLoading(false);
      setDialogType(null);
    } catch (error) {
      toast.error("Error updating projects");
      setLoading(false);
    }
  };


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
    <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:min-w-[600px] lg:max-w-4xl mx-auto absolute z-41">
      <div className="w-full">
      <h2 className="text-lightblack text-lg lg:text-xl mb-5  font-medium">Add Projects</h2>
        <div>
              
            <div className="mb-5">
              <label htmlFor="projectName" className="text-gray-700 text-sm lg:text-base font-medium block mb-2">
                Project Title
              </label>
              <input
              onChange={(e) => setProjectName(e.target.value)}
                type="text"
                id="projectName"
                className="w-full border shadow focus:outline-none focus:ring-2 focus:ring-primaryBlue rounded-lg px-4 py-2"
                placeholder="Project Name"
              />
              <label htmlFor="projectLink" className="text-gray-700 text-sm lg:text-base font-medium block mt-3 mb-2"> Project Link</label>
              <input onChange={(e)=>setProjectLink(e.target.value)} type="text" id="projectLink" className="w-full border shadow focus:outline-none focus:ring-2 focus:ring-primaryBlue rounded-lg px-4 py-2" placeholder="Project Link" />
  
              <label htmlFor="description" className="text-gray-700 text-sm lg:text-base font-medium block mt-3 mb-2">Description</label>
              <textarea onChange={(e)=>setDescription(e.target.value)}  id="description" className="w-full border shadow focus:outline-none focus:ring-2 focus:ring-primaryBlue rounded-lg px-4 py-2" placeholder="Description" rows="4"></textarea>
            </div>
        </div>
      </div>
      <div className="mt-5">
        <Button
          className="px-4 py-2 mr-3"
          variant="outline"
          onClick={() => setDialogType(null)}>
          Cancel
        </Button>
        <Button onClick={onSave} loading={loading} variant="primary" className="px-4 py-2">
          Add
        </Button>
      </div>
    </div>
  </div>
  )
}

export default EditProjects;
