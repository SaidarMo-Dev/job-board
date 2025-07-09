import { createTransform } from "redux-persist";
import type { BookmarkState, PersistedBookmarkState } from "./bookmarksTypes";

export const savedJobIdsTransform = createTransform<
  BookmarkState,
  PersistedBookmarkState,
  { whitelist: ["bookmarkReducer"] }
>(
  (inbound) => {
    return {
      savedJobIds: inbound.savedJobIds ? Array.from(inbound.savedJobIds) : [],
    };
  },
  (outbound) => ({
    savedJobIds: outbound.savedJobIds
      ? new Set<number>(outbound.savedJobIds)
      : new Set<number>(),
    bookmarkedJobs: null,
    loading: false,
    totalRecord: 0,
    error: {
      fetch: null,
      saved: null,
      remove: null,
    },
  }),
  { whitelist: ["bookmarkReducer"] }
);
