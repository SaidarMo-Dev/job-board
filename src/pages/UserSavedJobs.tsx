import SavedJobCard from "@/features/jobs/components/SavedJobCard";
import NoSavedJobs from "@/features/bookmarks/Components/NoSavedJobs";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { selectBookmarkedJobs } from "@/features/bookmarks/bookmarksSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { getUserSavedJobsThunk } from "@/features/bookmarks/bookmarksThunk";
import { toast } from "react-toastify";
import CustomPagination from "@/components/CustomPagination";
import { useAppSelector } from "@/hooks/useAppSelector";
import PageLoader from "@/components/Loaders/PageLoader";
import type { PaginationInfo } from "@/features/admin/users/usersTypes";

export default function UserSavedJobs() {
  const bookmarkedJobs = useSelector(selectBookmarkedJobs);
  const [page, setPage] = useState(1);

  const loading = useAppSelector(
    (state) => state.bookmarkReducer.loading
  ).fetch;

  const userId = useSelector(
    (state: RootState) => state.authReducer.currentUser?.id
  );

  const dispatch = useDispatch<AppDispatch>();
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  useEffect(() => {
    if (!userId) return;

    const params = new URLSearchParams();
    params.set("userId", userId?.toString());
    params.set("page", page.toString());

    dispatch(getUserSavedJobsThunk({ Page: page }))
      .unwrap()
      .then((data) => {
        setPagination({
          pageSize: data.pageSize,
          currentPage: data.currentPage,
          hasNextPage: data.hasNextPage,
          hasPreviousPage: data.hasPreviusPage,
          totalRecords: data.totalRecords,
          totalPages: data.totalPages,
        });
      })
      .catch((error) => {
        toast.error(error ?? "Somethig went wrong!");
      });
  }, [dispatch, userId, page]);

  return (
    <div className="bg-neutral-50 pb-10">
      <div className="custom-container">
        <h2 className="font-semibold text-3xl pt-10">Saved Jobs</h2>
        <p className="text-lg text-gray-600 mt-2">
          Keep track of jobs you're interested in
        </p>

        <Separator className="!w-[40%] bg-neutral-300 my-6" />

        {loading ? (
          <PageLoader message="getting saved jobs..." />
        ) : (
          <div>
            {bookmarkedJobs !== null ? (
              <>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarkedJobs &&
                    bookmarkedJobs.map((bookmarkedJob) => {
                      return (
                        <SavedJobCard
                          job={bookmarkedJob.job}
                          savedSection={true}
                        />
                      );
                    })}
                </div>
                {bookmarkedJobs.length > 10 && (
                  <div className="flex justify-center items-center w-full my-5">
                    <CustomPagination
                      onChange={(page) => setPage(page)}
                      pagination={pagination ?? undefined}
                    />
                  </div>
                )}
              </>
            ) : (
              <NoSavedJobs />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
