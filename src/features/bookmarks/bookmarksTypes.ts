import type { JobResponse } from "../jobs/jobTypes";

export interface bookmarkResponse {
  bookmarkId: number;
  dateBooked: Date;
  job: JobResponse;
}

export interface BookmarkState {
  bookmarkedJobs: bookmarkResponse[] | null;
  savedJobIds: Set<number> | null;
  loading: {
    fetch: boolean;
    save: boolean;
    remove: boolean;
  };
  totalRecord: number;
  error: {
    fetch: string | null;
    saved: string | null;
    remove: string | null;
  };
}

export interface SavedJobIdsResponse {
  savedJobIds: number[];
}

export interface AddBookmark {
  JobId: number;
  UserId: number;
  DateBooked: Date;
}

export interface UserBookmarkRequest {
  UserId: number;
  Page: number;
  PageSize?: number;
}

export interface PersistedBookmarkState {
  savedJobIds: number[];
}
