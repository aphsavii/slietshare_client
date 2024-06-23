import React from "react";
import { Button } from "/shadcn/ui/Button";
import { getIcons } from "@/constant";
import {
  MapPin,
  Mail,
  Phone,
  BriefcaseBusiness,
  GraduationCap,
  FolderGit2,
  ExternalLink,
  Link,
  Edit,
} from "lucide-react";
function Me() {
  return (
    <div className="container px-4 flex min-h-[600px] md:min-h-[800px] mx-auto ">
      <div className=" mx-auto  w-full flex flex-col lg:flex-row py-10 md:py-16 px-3 lg:px-0">
        <div className="max-w-[400px] flex flex-col gap-5 lg:gap-8">
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <div className="h-16 w-16 md:h-24 md:w-24 border border-black border-1 rounded-full"></div>
            <h3 className="text-xl lg:text-2xl font-bold mt-5 text-lightBlack">
              Aviansh Kumar
            </h3>
            <h4 className="text-xs lg:text-sm text-lightBlack">GCS/2331080</h4>
            <p className="text-xs lg:text-sm my-2 text-grayish">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              expedita veritatis ipsa tenetur saepe. At deleniti doloribus
              facilis. Eius, illum.
            </p>
            <Button className=" my-2  " variant="primary">
              Follow
            </Button>
          </div>

          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-lightBlack mb-3 md:mb-4">
                Personal Information <Edit className="inline ml-1 float-right cursor-pointer" size={16} />
              </h2>
              <div className="py-1 text-xs lg:text-sm text-grayish">
                <Mail className="inline mr-4 text-primaryBlue" size={16} />
                <span>2010215@sliet.ac.in</span>
              </div>
              <div className="py-1 text-xs lg:text-sm text-grayish">
                <Phone className="inline mr-4 text-primaryBlue" size={16} />
                <span>8709073864</span>
              </div>
              <div className="py-1 text-xs lg:text-sm text-grayish">
                <MapPin className="inline mr-4 text-primaryBlue" size={16} />
                <span>Patna, Bihar</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:px-8 mt-5 md:mt-0 flex flex-col gap-5 md:gap-8">
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
            <h2>
              <BriefcaseBusiness className="inline mr-2 font-semibold" />
              <span className="">Work experience <Edit className="inline ml-1 float-right cursor-pointer" size={16} /></span>
            </h2>
            <div className="mt-3">
              <div className="py-3">
                <div className="flex items-center">
                  <div className="bg-[url('/assets/icons/building.png')] h-10 w-10 bg-center bg-cover rounded-sm mr-4 mt-1"></div>
                  <div>
                    <h2 className="text-base lg:text-lg font-medium">
                      Software Engineer Intern
                    </h2>
                    <div className="text-[10px] md:text-xs font-light leading-3">
                      <span>Vaizle </span>
                      <span className="mx-1">•</span>2010215
                      <span> June 2023 - Present</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs lg:text-sm mt-3 font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis saepe accusantium delectus recusandae fugiat ea
                  deleniti? Consequatur saepe placeat repellat impedit ipsam
                  dolores tempora quasi nobis temporibus quae, natus
                  perferendis.
                </p>
              </div>
            </div>
          </div>

          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
            <h2>
              <FolderGit2 className="inline mr-2 font-semibold" />
              <span className="">Projects </span>
            </h2>
            <div className="mt-3">
              <div className="py-3">
                <div className="flex items-center">
                  <div>
                    <a href="">
                      <h2 className="text-base lg:text-lg font-medium">
                        SlietShare{" "}
                        <ExternalLink className="inline ml-1 mb-1" size={15} />
                      </h2>
                    </a>
                    <div className="text-[10px] md:text-xs font-light leading-3">
                      <span> June 2023 - Present</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs lg:text-sm mt-3 font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis saepe accusantium delectus recusandae fugiat ea
                  deleniti? Consequatur saepe placeat repellat impedit ipsam
                  dolores tempora quasi nobis temporibus quae, natus
                  perferendis.
                </p>
              </div>
            </div>
          </div>

          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
            <h2>
              <GraduationCap className="inline mr-2 font-semibold" />
              <span className="">Education</span>
            </h2>
            <div className="mt-3">
              <div className="py-3">
                <div className="flex items-center">
                  <div className="bg-[url('/assets/icons/building.png')] h-10 w-10 bg-center bg-cover rounded-sm mr-4 mt-1"></div>
                  <div>
                    <h2 className="text-base lg:text-lg font-medium">
                      Btech in Computer Science
                    </h2>
                    <div className="text-[10px] md:text-xs font-light leading-3">
                      <span>SLIET Longowal </span>
                      <span className="mx-1">•</span>
                      <span> June 2023 - June 2026</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs lg:text-sm mt-3 font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis saepe accusantium delectus recusandae fugiat ea
                  deleniti? Consequatur saepe placeat repellat impedit ipsam
                  dolores tempora quasi nobis temporibus quae, natus
                  perferendis.
                </p>
              </div>
            </div>
          </div>

          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray w-full text-lg lg:text-xl font-semibold text-lightBlack">
            <h2>
              <Link className="inline mr-2 font-semibold" />
              <span className="">Links</span>
            </h2>
            <div className="mt-3">
              <div className="py-3">
                <div className="flex  gap-3 flex-col">
                  <div className="flex">
                      <div
                        className={`bg-[url('${getIcons()['linkedin']}')] h-10 w-10 bg-center bg-cover rounded-sm mr-4 mt-1`}
                      ></div>
                    <div>
                      <h2 className="text-base lg:text-lg font-medium">
                        Linkedin
                        <ExternalLink className="inline ml-1 mb-1" size={15} />
                      </h2>
                      <div className="text-[10px] md:text-xs font-light leading-3 text-blue-600">
                        https://linkedin.com/in/aphsavii
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                      <div
                        className={`bg-[url('${getIcons()['github']}')] h-10 w-10 bg-center bg-cover rounded-sm mr-4 mt-1`}
                      ></div>
                    <div>
                      <h2 className="text-base lg:text-lg font-medium">
                        Github
                        <ExternalLink className="inline ml-1 mb-1" size={15} />
                      </h2>
                      <div className="text-[10px] md:text-xs font-light leading-3 text-blue-600">
                        https://github.com/aphsavii
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                      <div
                        className={`bg-[url('${getIcons()['leetcode']}')] h-10 w-10 bg-center bg-cover rounded-sm mr-4 mt-1`}
                      ></div>
                    <div>
                      <h2 className="text-base lg:text-lg font-medium">
                        Leetcode
                        <ExternalLink className="inline ml-1 mb-1" size={15} />
                      </h2>
                      <div className="text-[10px] md:text-xs font-light leading-3 text-blue-600">
                        https://leetcode.com/aphsavii
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Me;
