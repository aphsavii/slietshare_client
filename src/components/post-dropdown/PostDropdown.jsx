import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import ConformationDialog from "../dialogs/ConformationDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function PostDropdown() {
  const [isDeleteting, setisDeleteting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  
  return (
    <>
      {isDialogOpen &&
        <ConformationDialog
          loading={isDeleteting}
          setIsOpen={setIsDialogOpen}
          title="Delete Post"
          description="Are you sure you want to delete this post?"
          ctaText="Delete"
        />
      }{" "}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="float-right text-gray-600 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Post Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Archive Post</DropdownMenuItem>
            <DropdownMenuItem className="">Delete Post</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default PostDropdown;
