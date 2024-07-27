import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import UserPosts from "../user-posts/UserPosts";
import UserUploadedQuestions from "../user-questions/UserUploadedQuestions";
function ProfileTabs({ regno }) {
  return (
    <Tabs defaultValue="post" className="">
      <TabsList className="flex w-full justify-start  h-12 bg-transparent gap-x-3">
        <TabsTrigger
          value="post"
          className="w-fit px-4 py-1.5 rounded-3xl data-[state=active]:bg-primaryBlue disabled:border-2 data-[state=active]:text-white lg:text-lg"
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          value="question"
          className="w-fit px-4 py-1.5 rounded-3xl data-[state=active]:bg-primaryBlue disabled:border-2 data-[state=active]:text-white lg:text-lg"
        >
          Uploaded Questions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="post" className="w-full flex justify-center py-5">
        <UserPosts regno={regno} />
      </TabsContent>
      <TabsContent value="question">
        <UserUploadedQuestions regno={regno} />
      </TabsContent>
    </Tabs>
  );
}

export default ProfileTabs;
