import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExplainSection = () => {
  return (
    <div className="relative flex h-full flex-col p-4">
      <Tabs defaultValue="explain">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="explain">Explain</TabsTrigger>
          <TabsTrigger value="password">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="explain">Explaintation about Diagram</TabsContent>
        <TabsContent value="password">Get the sample code</TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplainSection;
