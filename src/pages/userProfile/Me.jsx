import React, { useState, useEffect } from "react";
import { Button } from "/shadcn/ui/Button";
import { getIcons } from "@/constant";
import userService from "@/api/services/userService";
import {
  MapPin,
  Mail,
  Phone,
  BriefcaseBusiness,
  GraduationCap,
  FolderGit2,
  ExternalLink,
  Link,
  Wrench,
  UserRound,
  Edit,
  Delete,
} from "lucide-react";
import SkillTag from "@/components/Tags/SkillTag";
import toast from "react-hot-toast";
import { textCapitalize, toMonthYear } from "@/helpers";
import EditProfileDialog from "@/components/dialogs/EditProfileDialog";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "@/redux/slices/userProfile";
import { setDialog } from "@/redux/slices/userProfile";

function Me() {
  // edit dialog types :basic, personal, about, work, project, education, skills
  let userData = useSelector((state) => state.userProfile.userData);
  let activeDialog = useSelector((state) => state.userProfile.dialog);
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if(userData?._id) return;
    userService
      .getMyProfile()
      .then((data) => {
        console.log(data);
        dispatch(updateUserData(data));
      })
      .catch((error) => {
        toast.error("Error fetching user data");
        console.log(error);
      });
  }, []);
  const setActiveDialog = (type) => {
    dispatch(setDialog(type));
  };

  const deleteWorkExperience = async (index) => {
    setDeleting('work');
    try {
      let newWorkExperience = [...userData.workExperience];
      newWorkExperience.splice(index, 1);
      const res = await userService.editMyProfile({ workExperience: newWorkExperience });
      dispatch(updateUserData({ ...userData, ...res }));
      toast.success("Work experience deleted successfully");
    } catch (error) {
      toast.error("Error deleting work experience");
    }
    finally{
      setDeleting(false);
    }
  }

  const deleteProject = async (index) => {
    setDeleting('project');
    try {
      let newProjects = [...userData.projects];
      newProjects.splice(index, 1);
      const res = await userService.editMyProfile({ projects: newProjects });
      dispatch(updateUserData({ ...userData, ...res }));
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Error deleting project");
    }
    finally{
      setDeleting(false);
    }
  }

  const deleteEducation = async (index) => {
    setDeleting('education');
    try {
      let newEducation = [...userData.education];
      newEducation.splice(index, 1);
      const res = await userService.editMyProfile({ education: newEducation });
      dispatch(updateUserData({ ...userData, ...res }));
      toast.success("Education deleted successfully");
    } catch (error) {
      toast.error("Error deleting education");
    }
    finally{
      setDeleting(false);
    }
  }

  return (
    <>
      {activeDialog !== null && <EditProfileDialog />}
      <div className="container px-4 flex min-h-[600px] md:min-h-[800px] mx-auto ">
        <div className=" mx-auto  w-full flex flex-col lg:flex-row py-10 md:py-16 px-3 lg:px-0">
          <div className="lg:max-w-[400px] min-w-64 lg:min-w-80 flex flex-col gap-5 ">
            <div className="py-5 px-6 bg-white h-fit rounded-xl border  border-lightGray relative">
              <Edit
                onClick={() => setActiveDialog("basic")}
                className="float-right cursor-pointer"
                size={18}
              />
              <div
                className={`h-16 w-16 md:h-24 md:w-24 border  bg-cover bg-no-repeat bg-center rounded-full`}
                style={{ backgroundImage: `url(${userData?.avatarUrl})` }}
              ></div>
              <h3 className="text-xl lg:text-2xl font-bold mt-5 text-lightBlack">
                {userData?.fullName}{" "}
                {userData?.pronouns && (
                  <span
                    id="pronouns"
                    className="text-gray-500 text-xs lg:text-sm font-normal"
                  >
                    ({userData.pronouns})
                  </span>
                )}
              </h3>
              <h4 className="text-xs lg:text-sm text-lightBlack ">
                {userData.trade}/{userData.regno}
              </h4>
              <p className="text-sm lg:text-base my-2 text-grayish">
                {userData?.headLine}
              </p>
              <div className="flex my-2 justify-between items-center">
                <span className="text-xs lg:text-sm text-grayish">
                  {" "}
                  0 Followers
                </span>
              </div>
            </div>
            {/* Personal Info */}
            <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-lightBlack mb-3 md:mb-4">
                  Personal Information
                  <Edit
                    onClick={() => setActiveDialog("personal")}
                    className="float-right cursor-pointer"
                    size={18}
                  />
                </h2>
                <div className="py-1 text-xs lg:text-sm text-grayish">
                  <Mail className="inline mr-4 text-primaryBlue" size={16} />
                  <span>{userData?.email}</span>
                </div>
                {userData?.mobile && (
                  <div className="py-1 text-xs lg:text-sm text-grayish">
                    <Phone className="inline mr-4 text-primaryBlue" size={16} />
                    <span>{userData?.mobile}</span>
                  </div>
                )}
                {userData?.location && (
                  <div className="py-1 text-xs lg:text-sm text-grayish">
                    <MapPin
                      className="inline mr-4 text-primaryBlue"
                      size={16}
                    />
                    <span>{userData?.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            {
              <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
                <h2>
                  <Link size={20} className="inline mr-2 font-semibold" />
                  <span className="">Links</span>
                  <Edit
                    onClick={() => setActiveDialog("links")}
                    className="float-right cursor-pointer"
                    size={18}
                  />
                </h2>
                <div className="mt-3">
                  <div className="py-3">
                    <div className="flex  gap-3 flex-col">
                      {userData.socialLinks &&
                        Object.keys(userData.socialLinks).map(
                          (platform,index) =>
                            userData.socialLinks[platform] &&
                            platform !== "_id" && (
                              <a key={index} href={userData.socialLinks[platform]}>
                                <div target="_blank" className="flex">
                                  <div
                                    className={` h-10 w-10 bg-center bg-cover rounded-sm mr-4 my-1.5`}
                                  >
                                    <img
                                      className="h-full w-full object-cover"
                                      src={getIcons()[platform]}
                                      alt="github"
                                    />
                                  </div>
                                  <div>
                                    <h2 className="text-base lg:text-lg font-medium">
                                      {textCapitalize(platform)}
                                      <ExternalLink
                                        className="inline ml-1 mb-1"
                                        size={15}
                                      />
                                    </h2>
                                    <div className="text-[10px] md:text-xs font-light leading-3 text-blue-600">
                                      <span>
                                        {userData.socialLinks[platform]}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            )
                        )}
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          <div className="w-full lg:px-8 mt-5 lg:mt-0 flex flex-col gap-5 ">
            {/* About */}
            {
              <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
                <h2>
                  <UserRound size={20} className="inline mr-2 font-semibold" />
                  <span className="">About</span>
                  <Edit
                    onClick={() => setActiveDialog("about")}
                    className="float-right cursor-pointer"
                    size={18}
                  />
                </h2>
                <div className="py-3 text-xs lg:text-sm font-normal">
                  {userData?.about && userData?.about}
                </div>
              </div>
            }

            {/* Work Experiencce */}
            {
              <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
                <h2>
                  <BriefcaseBusiness
                    size={20}
                    className="inline mr-2 font-semibold"
                  />
                  <span className="">Work experience</span>
                </h2>
                <div className="mt-3">
                  {userData?.workExperience &&
                    userData.workExperience.map((exp, index) => (
                      <div key={index} className="py-3">
                        <Button loading={deleting=="work"} onClick={() => deleteWorkExperience(index)} className="float-right p-1" variant="outline" size="icon">
                         {!deleting &&<img className="w-4 h-4" src="assets/icons/delete.svg" alt="del" />}
                        </Button>
                        <div className="flex items-center">
                          <div className="bg-[url('/assets/icons/building.png')] h-10 w-10 bg-center bg-cover rounded-sm mr-4 mt-1"></div>
                          <div>
                            <h2 className="text-base lg:text-lg font-medium">
                             <span> {exp.position}</span>  
                            </h2>
                            <div className="text-[10px] md:text-xs font-light leading-3">
                              <span>{exp.company} </span>
                              <span className="mx-1">•</span>
                              <span>
                                {" "}
                                {toMonthYear(exp.startDate)} -{" "}
                                {toMonthYear(exp.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs lg:text-sm mt-3 font-normal">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                </div>
                <span
                  onClick={() => setActiveDialog("work")}
                  className="text-primaryBlue text-xs lg:text-sm font-normal mt-2 ml-5 cursor-pointer"
                >
                  + Add one{" "}
                </span>
              </div>
            }

            {/* Projects */}
            {
              <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
                <h2>
                  <FolderGit2 size={20} className="inline mr-2 font-semibold" />
                  <span className="">Projects</span>
                </h2>
                <div className="mt-3">
                  {userData?.projects &&
                    userData.projects.map((project,index) => (
                      
                      <div key={index} className="py-3">
                        <Button loading={deleting=="project"} onClick={() => deleteProject(index)} className="float-right p-1" variant="outline" size="icon">
                         {!deleting &&<img className="w-4 h-4" src="assets/icons/delete.svg" alt="del" />}
                        </Button>
                        <div className="flex items-center">
                          <div>
                            <a href={project?.link}>
                              <h2 className="text-base lg:text-lg font-medium">
                                {project.title}
                                <ExternalLink
                                  className="inline ml-1 mb-1"
                                  size={15}
                                />
                              </h2>
                            </a>
                          </div>
                        </div>
                        <p className="text-xs lg:text-sm mt-1 font-normal">
                          {project.description}
                        </p>
                      </div>
                 
                    ))}
                </div>
                <span
                  onClick={() => setActiveDialog("projects")}
                  className="text-primaryBlue text-xs lg:text-sm font-normal mt-2 ml-5 cursor-pointer"
                >
                  + Add one{" "}
                </span>
              </div>
            }

            {/* Education */}
            {
              <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
                <h2>
                  <GraduationCap
                    size={20}
                    className="inline mr-2 font-semibold"
                  />
                  <span className="">Education</span>
                </h2>
                <div className="mt-3">
                  {userData?.education &&
                    userData.education.map((edu,index) => (
                      <div key={index} className="py-3">
                        <Button loading={deleting=="education"} onClick={() => deleteEducation(index)} className="float-right p-1" variant="outline" size="icon">
                         {!deleting &&<img className="w-4 h-4" src="assets/icons/delete.svg" alt="del" />}
                        </Button>
                        <div className="flex items-center">
                          <div className="bg-[url('/assets/icons/building.png')] h-10 w-10 bg-center bg-cover rounded-sm mr-4 mt-1"></div>
                          <div>
                            <h2 className="text-base lg:text-lg font-medium">{edu?.degree}</h2>
                            <div className="text-[10px] md:text-xs font-light leading-3">
                              <span>{edu.institute} </span>
                              <span className="mx-1">•</span>
                              <span>
                                {toMonthYear(edu.startDate)} - {toMonthYear(edu.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs lg:text-sm mt-3 font-normal">
                          {edu?.description}
                        </p>
                      </div>
                    ))}
                </div>
                <span
                  onClick={() => setActiveDialog("education")}
                  className="text-primaryBlue text-xs lg:text-sm font-normal mt-2 ml-5 cursor-pointer"
                >
                  + Add one{" "}
                </span>
              </div>
            }

            {/* Skills */}
            <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
              <h2>
                <Wrench size={20} className="inline mr-2 font-semibold" />
                <span className="">Skills</span>
                <Edit
                  onClick={() => setActiveDialog("skills")}
                  className="float-right cursor-pointer"
                  size={18}
                />
              </h2>
              <div className="py-3 flex flex-wrap gap-x-3 lg:gap-x-5 gap-y-2 lg:gap-y-3">
                {userData?.skills &&
                  userData?.skills.map((skill) => (
                    <SkillTag
                    key={skill?.skill}
                      text={skill?.skill}
                      proficiency={skill?.proficiency}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Me;
