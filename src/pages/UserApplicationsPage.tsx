import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UserApplications() {
  return (
    <div className="bg-neutral-50 h-dvh">
      <div className="custom-container">
        <h2 className="font-semibold text-5xl pt-10">Applications</h2>
        <p className="text-lg text-gray-600 mt-2">
          Track your job application progress
        </p>
        <Tabs defaultValue="all" className="w-full mt-7">
          <TabsList className="w-full grid grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="submitted">Submited</TabsTrigger>
            <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          <TabsContent value="all"> hello</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
