import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileQuestionsTab from "./ProfileQuestionsTab";
import ProfileAnswersTab from "./ProfileAnswersTab";

export default function ProfileActivityTabs() {
  return (
    <Tabs defaultValue="questions" className="mt-8">
      <TabsList>
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="answers">Answers</TabsTrigger>
      </TabsList>
      <TabsContent value="questions" className="mt-4">
        <ProfileQuestionsTab />
      </TabsContent>
      <TabsContent value="answers" className="mt-4">
        <TabsContent value="answers" className="mt-4">
          <ProfileAnswersTab />
        </TabsContent>
      </TabsContent>
    </Tabs>
  );
}
