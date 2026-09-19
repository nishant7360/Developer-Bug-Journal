import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ProfileActivityTabs() {
  return (
    <Tabs defaultValue="questions" className="mt-8">
      <TabsList>
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="answers">Answers</TabsTrigger>
      </TabsList>
      <TabsContent value="questions" className="mt-4">
        <p className="text-sm text-muted-foreground">
          Coming soon — need to confirm the backend endpoint for this.
        </p>
      </TabsContent>
      <TabsContent value="answers" className="mt-4">
        <p className="text-sm text-muted-foreground">
          Coming soon — need to confirm the backend endpoint for this.
        </p>
      </TabsContent>
    </Tabs>
  );
}
