import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { ListCollapse, FileUp, Telescope, ImageUp, TextQuote } from "lucide-react";
import { Link } from "react-router-dom";
function Menu() {
  return (
    <Popover className="">
      <PopoverTrigger className="">
        {" "}
        <ListCollapse className="text-white h-4 w-4 md:h-7 md:w-7 " />
      </PopoverTrigger>
      <PopoverContent className="bg-white w-40 md:w-[200px] py-5 px-2 md:px-4">
        <ul className="text-sm md:text-base text-gray-700">
          <Link>
            <li className="py-2 border-b hover:text-primaryBlue cursor-pointer">
              <Telescope className="inline text-gray-500 mr-1 h-5 w-5" />{" "}
              <span>Explore</span>
            </li>
          </Link>
          {/* <Link>
            <li className='py-2 border-b hover:text-primaryBlue cursor-pointer'>
            <TextQuote className='inline text-gray-500 mr-1 h-5 w-5'/> <span>Create Tweet</span>
            </li>
          </Link> */}
          <Link>
            <li className='py-2 border-b hover:text-primaryBlue cursor-pointer'>
            <ImageUp className='inline text-gray-500 mr-1 h-5 w-5'/> <span>Create Post</span>
            </li>
          </Link>
          <Link to={"/qs/upload"}>
            <li className="py-2 border-b hover:text-primaryBlue cursor-pointer">
              <FileUp className="inline text-gray-500 mr-1 h-5 w-5" />{" "}
              <span>Upload Question</span>
            </li>
          </Link>
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export default Menu;
