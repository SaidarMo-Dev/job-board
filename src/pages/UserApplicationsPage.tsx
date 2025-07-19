import JobApplicationCard from "@/features/jobs/components/JobApplicationCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUserApplicationsThunk } from "@/features/jobApplications/applicationThunk";
import { toast } from "react-toastify";
import type { ApplicationStatusFilterType } from "@/features/jobApplications/applicationType";
import Loader from "@/components/Loaders/Loader";
import { NoApplications } from "@/features/jobApplications/components/NoApplications";
import CustomPagination from "@/components/CustomPagination";

const tabsItem = ["All", "Pending", "Accepted", "Rejected"];

export default function UserApplications() {
  const [statusTab, setTab] = useState<ApplicationStatusFilterType>("All");
  const userApplications = useAppSelector(
    (state) => state.applicationReducer.userApplications
  );

  const hasNextPage = useAppSelector(
    (state) => state.applicationReducer.hasNextPage
  );
  const [page, setPage] = useState(1);
  const loading = useAppSelector(
    (state) => state.applicationReducer.loading.fetch
  );
  const dispatch = useAppDispatch();

  // fetch applications
  useEffect(() => {
    dispatch(
      getUserApplicationsThunk({ page, size: 10, statusFilter: statusTab })
    ).then((result) => {
      if (getUserApplicationsThunk.rejected.match(result)) {
        toast.error(result.payload ?? "Something went wrong!");
      }
    });
  }, [dispatch, page, statusTab]);

  const userApplicationsList = Array.from(userApplications).map((app) => {
    return <JobApplicationCard key={app.applicationId} application={app} />;
  });

  return (
    <div className="bg-neutral-50 pb-5">
      <div className="custom-container">
        <h2 className="font-semibold text-5xl pt-10">Applications</h2>
        <p className="text-lg text-gray-600 mt-2">
          Track your job application progress
        </p>
        <Tabs
          defaultValue={statusTab}
          className="w-full mt-7"
          onValueChange={(tab) => setTab(tab as ApplicationStatusFilterType)}
        >
          <TabsList className="w-full grid grid-cols-4 lg:w-[600px]">
            {tabsItem.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab content */}

          <div className="my-3">
            {loading ? (
              <div className="w-full h-[50vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : userApplicationsList.length === 0 ? (
              <NoApplications tab={statusTab} />
            ) : (
              <TabsContent value={statusTab}>
                {/* render user applications */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {userApplicationsList}
                </div>

                {/* Navigation */}
                {userApplicationsList.length > 10 && (
                  <div className="my-5">
                    <CustomPagination
                      hasNextPage={hasNextPage}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                )}
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
