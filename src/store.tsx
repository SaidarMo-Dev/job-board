import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./features/auth/authSlice";
import jobSliceReducer from "./features/jobs/jobSlice";
import countrySliceReducer from "./features/countries/countrySlice";
import bookmarkSliceReducer from "./features/bookmarks/bookmarksSlice";
import dashboardStatsSliceReducer from "./features/dashboard_stats/dashboardStatsSlice";
import applicationSliceReducer from "./features/jobApplications/applicationSlice";

import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";
import { savedJobIdsTransform } from "./features/bookmarks/bookmarkPersistTransform";

const rootReducer = combineReducers({
  authReducer: authSliceReducer,
  countryReducer: countrySliceReducer,
  jobReducer: jobSliceReducer,
  bookmarkReducer: bookmarkSliceReducer,
  dashboardStatsReducer: dashboardStatsSliceReducer,
  applicationReducer: applicationSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
  tranforms: [savedJobIdsTransform],
  whitelist: ["authReducer", "bookmarkReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
