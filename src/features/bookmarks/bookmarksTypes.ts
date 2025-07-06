import type { JobResponse } from "../jobs/jobTypes";

export interface bookmarkResponse {
  bookmarkId: number;
  dateBooked: Date;
  job: JobResponse;
}

export interface bookmarkState {
  bookmarkedJobs: bookmarkResponse[] | null;
  savedJobIds: Set<number> | null;
  loading: boolean;
  error: {
    fetch: string | null;
    saved: string | null;
    remove: string | null;
  };
}
