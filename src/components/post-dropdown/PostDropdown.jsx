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
import postService from "@/api/services/postService";
import toast from "react-hot-toast";

export function PostDropdown({postId, removePost}) {
  const [isDeleteting, setisDeleteting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeletePost = async () => {
    setisDeleteting(true);
    try {
      await postService.deletePost(postId);
      setIsDialogOpen(false);
      removePost(true);
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setisDeleteting(false);
    }
  }

  return (
    <>
      {isDialogOpen &&
        <ConformationDialog
          loading={isDeleteting}
          setIsOpen={setIsDialogOpen}
          title="Delete Post"
          description="Are you sure you want to delete this post?"
          ctaText="Delete"
          onConfirm={handleDeletePost}
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
            {/* <DropdownMenuItem>Archive Post</DropdownMenuItem> */}
            <DropdownMenuItem className="" onClick={()=>setIsDialogOpen(true)}>Delete Post</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default PostDropdown;
