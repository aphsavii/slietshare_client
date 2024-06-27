import React, { useState } from "react";
import { Button } from "/shadcn/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "@/redux/slices/userProfile";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import SkillTagRemovable from "../Tags/SkillTagRemovable";
import { updateUserData } from "@/redux/slices/userProfile";
import userService from "@/api/services/userService";
import toast from "react-hot-toast";

function EditSkills() {
  let userData = useSelector((state) => state.userProfile.userData);
  const[loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const setDialogType = (type) => {
    dispatch(setDialog(type));
  };
  const [skills, setSkills] = useState(userData.skills);
  const [skillInput, setSkillInput] = useState("");
  const [proficiencyInput, setProficiencyInput] = useState("");

  const removeSkill = (index) => {
    let newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const addSkill = () => {
    if (skillInput == "") {
      toast.error("Please enter skill");
      return;
    }
    if (proficiencyInput == "") {
      toast.error("Please select proficiency");
      return;
    }
    let newSkills = [...skills];
    newSkills.push({ skill: skillInput, proficiency: proficiencyInput });
    setSkills(newSkills);
    setSkillInput("");
  };

  const onSave= async() =>{
    try {
        setLoading(true);
        const res = await userService.editMyProfile({skills})
        dispatch(updateUserData({...userData,...res}));
        toast.success("Skills updated successfully");
        setLoading(false);
        setDialogType(null);
    } catch (error) {
      toast.error("Error updating skills");
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
      <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-xl lg:min-w-[720px] lg:max-w-4xl mx-auto absolute z-41">
        <div className="w-full">
          <h2 className="text-lightblack text-lg lg:text-xl mb-5  font-medium">
            Add Skills
          </h2>
          <div className="flex flex-wrap gap-y-3 justify-between md:justify-normal">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Skill"
              className="w-full md:w-fit lg:min-w-[500px] p-1 px-2 rounded shadow appearance-none border focus:outline-none focus:ring-2 focus:ring-primaryBlue"
              type="text"
            />
            <select
              onChange={(e) => setProficiencyInput(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-2 lg:ml-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            >
              <option value="">Select Proficiency</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <Button
              onClick={addSkill}
              className="ml-2"
              variant="outline"
              size="responsive"
            >
              Add
            </Button>
          </div>
          <div className="mt-5 border-t py-3 md:py-5 flex flex-wrap gap-x-3 lg:gap-x-5 gap-y-2 lg:gap-y-3">
            {skills.length > 0 &&
              skills.map((skill, index) => (

                <SkillTagRemovable
                  proficiency={skill.proficiency}
                  key={index}
                  text={skill?.skill}
                  crossFunc={() => removeSkill(index)}
                />
              ))}
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
          <Button onClick={onSave} loading={loading} variant="primary" className="px-4 py-2">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditSkills;
