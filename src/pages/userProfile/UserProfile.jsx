import React, { useState, useEffect, useContext } from "react";
import { Button } from "/shadcn/ui/Button";
import { getIcons } from "@/constant";
import userService from "@/api/services/userService";
import { useParams } from "react-router";
import {
  MapPin,
  Mail,
  Send,
  BriefcaseBusiness,
  GraduationCap,
  FolderGit2,
  ExternalLink,
  Link,
  Wrench,
  UserRound,
} from "lucide-react";
import SkillTag from "@/components/Tags/SkillTag";
import toast from "react-hot-toast";
import { textCapitalize, toMonthYear } from "@/helpers";
import { SocketContext } from "@/api/sockets/socket";

function UserProfile() {
  const { regno } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    userService
      .getUserDetails(regno)
      .then((data) => {
        console.log(data);
        setUserData(data);
      })
      .catch((error) => {
        toast.error("Error fetching user data");
        console.log(error);
      });
  }, [regno]);

  const follow = async () => {
    setLoading(true);
    try {
      await userService.follow(regno);
      setUserData({
        ...userData,
        isFollowing: true,
        followers: ++userData.followers,
      });
      socket.emit("notification:set", { to: regno, type: "follow" });
      toast.success("You are now following " + userData.fullName.split(" ")[0]);
    } catch (error) {
      toast.error("Error following user");
    } finally {
      setLoading(false);
    }
  };
  const unFollow = async () => {
    setLoading(true);
    try {
      await userService.unfollow(regno);
      setUserData({
        ...userData,
        isFollowing: false,
        followers: --userData.followers,
      });
      toast.success("You have unfollowed " + userData.fullName.split(" ")[0]);
    } catch (error) {
      toast.error("Error unfollowing user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 flex min-h-[600px] md:min-h-[800px] mx-auto ">
      <div className=" mx-auto  w-full flex flex-col lg:flex-row py-10 md:py-16 px-3 lg:px-0">
        <div className="lg:max-w-[450px] min-w-64 lg:min-w-80 flex flex-col gap-5 ">
          <div className="py-5 px-5 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <div
              className={`h-16 w-16 md:h-24 md:w-24 border  bg-cover bg-no-repeat bg-center rounded-full`}
              style={{ backgroundImage: `url(${userData?.avatarUrl})` }}
            ></div>
            <h3 className="text-xl lg:text-2xl  font-bold mt-5 text-lightBlack">
              {userData?.fullName + " "}
              {userData?.pronouns && (
                <span
                  id="pronouns"
                  className="text-gray-500 text-xs  font-normal"
                >
                  ({userData.pronouns})
                </span>
              )}
              {userData?.role == "admin" && (
                <img
                  title="Admin"
                  className="h-5 w-5 inline ml-2 cursor-pointer text-xs"
                  alt="admin"
                  src="/assets/icons/admin.webp"
                />
              )}
            </h3>
            <h4 className="text-xs lg:text-sm text-lightBlack">
              {userData.trade}/{userData.regno}
            </h4>
            <p className="text-sm lg:text-base my-2 text-grayish">
              {userData?.headLine}
            </p>
            <div className="flex mt-5 mb-2 justify-between items-center">
              <span className="text-xs lg:text-sm text-grayish">
                {" "}
                {userData?.followers} followers
              </span>
              {!userData?.isFollowing && (
                <Button
                  className=""
                  onClick={follow}
                  loading={loading}
                  variant="primary"
                >
                  Follow
                </Button>
              )}
              {userData?.isFollowing && (
                <div className="flex items-center">
                <Button  className="mr-2.5"  variant="primary"> <Send size={20} /></Button>
                <Button
                  className=""
                  onClick={unFollow}
                  loading={loading}
                  variant="outline"
                >
                  Unfollow
                </Button>
                </div>
              )}
            </div>
          </div>
          {/* Personal Info */}
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-lightBlack mb-3 md:mb-4">
                Personal Information
              </h2>
              <div className="py-1 text-xs lg:text-sm text-grayish">
                <Mail className="inline mr-4 text-primaryBlue" size={16} />
                <span>{userData?.email}</span>
              </div>
              {/* <div className="py-1 text-xs lg:text-sm text-grayish">
                <Phone className="inline mr-4 text-primaryBlue" size={16} />
                <span>8709073864</span>
              </div> */}
              {userData?.location && (
                <div className="py-1 text-xs lg:text-sm text-grayish">
                  <MapPin className="inline mr-4 text-primaryBlue" size={16} />
                  <span>{userData?.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          {userData.socialLinks && (
            <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
              <h2>
                <Link size={20} className="inline mr-2 font-semibold" />
                <span className="">Links</span>
              </h2>
              <div className="mt-3">
                <div className="py-3">
                  <div className="flex  gap-3 flex-col">
                    {Object.keys(userData.socialLinks).map(
                      (platform, index) =>
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
                                  alt={platform}
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
                                  <span>{userData.socialLinks[platform]}</span>
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
          )}
        </div>

        <div className="w-full lg:px-8 mt-5 lg:mt-0 flex flex-col gap-5 ">
          {/* About */}
          {userData?.about && (
            <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
              <h2>
                <UserRound size={20} className="inline mr-2 font-semibold" />
                <span className="">About</span>
              </h2>
              <div className="py-3 text-xs lg:text-sm font-normal">
                {userData?.about}
              </div>
            </div>
          )}

          {/* Work Experiencce */}
          {userData?.workExperience && (
            <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
              <h2>
                <BriefcaseBusiness
                  size={20}
                  className="inline mr-2 font-semibold"
                />
                <span className="">Work experience</span>
              </h2>
              <div className="mt-3">
                {userData.workExperience.map((exp, index) => (
                  <div key={index} className="py-3">
                    <div className="flex items-center">
                      <div className="bg-[url('/assets/icons/building.png')] h-10 w-10 bg-center bg-cover rounded-sm mr-4 mt-1"></div>
                      <div>
                        <h2 className="text-base lg:text-lg font-medium">
                          {exp.position}
                        </h2>
                        <div className="text-[10px] md:text-xs font-light leading-3">
                          <span>{exp.company} </span>
                          <span className="mx-1">•</span>{" "}
                          {toMonthYear(exp.startDate)} -{" "}
                          {toMonthYear(exp.endDate)}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs lg:text-sm mt-3 font-normal">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {userData?.projects && (
            <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
              <h2>
                <FolderGit2 size={20} className="inline mr-2 font-semibold" />
                <span className="">Projects</span>
              </h2>
              <div className="mt-3">
                {userData.projects.map((project, index) => (
                  <div key={index} className="py-3">
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
            </div>
          )}

          {/* Education */}
          {userData?.education && (
            <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
              <h2>
                <GraduationCap
                  size={20}
                  className="inline mr-2 font-semibold"
                />
                <span className="">Education</span>
              </h2>
              <div className="mt-3">
                {userData.education.map((edu, index) => (
                  <div key={index} className="py-3">
                    <div className="flex items-center">
                      <div className="bg-[url('/assets/icons/building.png')] h-10 w-10 bg-center bg-cover rounded-sm mr-4 mt-1"></div>
                      <div>
                        <h2 className="text-base lg:text-lg font-medium">
                          {edu?.degree}
                        </h2>
                        <div className="text-[10px] md:text-xs font-light leading-3">
                          <span>{edu.institute} </span>
                          <span className="mx-1">•</span>
                          <span>
                            {" "}
                            {edu.startDate} - {edu.endDate}
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
            </div>
          )}

          {/* Skills */}
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
            <h2>
              <Wrench size={20} className="inline mr-2 font-semibold" />
              <span className="">Skills</span>
            </h2>
            <div className="py-3 flex flex-wrap gap-x-3 lg:gap-x-5 gap-y-2 lg:gap-y-3">
              {userData?.skills &&
                userData?.skills.map((skill) => (
                  <SkillTag
                    text={skill?.skill}
                    proficiency={skill?.proficiency}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
