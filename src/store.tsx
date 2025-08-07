import { configureStore, combineReducers, type Action } from "@reduxjs/toolkit";
import authSliceReducer, { logout } from "./features/auth/authSlice";
import jobSliceReducer from "./features/jobs/jobSlice";
import countrySliceReducer from "./features/countries/countrySlice";
import bookmarkSliceReducer from "./features/bookmarks/bookmarksSlice";
import dashboardStatsSliceReducer from "./features/dashboard_stats/dashboardStatsSlice";
import applicationSliceReducer from "./features/jobApplications/applicationSlice";
import AdminUserSliceReducer from "@/features/admin/users/userSlice";
import AdminAuthSliceReducer from "@/features/admin/auth/adminSlice";
import AdminSkillsSliceReducer from "@/features/admin/skills/skillsSlice";
import AdminCategoriesSliceReducer from "@/features/admin/categories/categorySlice";
import AdminCompaniesSliceReducer from "@/features/admin/companies/companySlice";

import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";
import { savedJobIdsTransform } from "./features/bookmarks/bookmarkPersistTransform";

const appReducer = combineReducers({
  authReducer: authSliceReducer,
  countryReducer: countrySliceReducer,
  jobReducer: jobSliceReducer,
  bookmarkReducer: bookmarkSliceReducer,
  dashboardStatsReducer: dashboardStatsSliceReducer,
  applicationReducer: applicationSliceReducer,
  AdminUserReducer: AdminUserSliceReducer,
  adminAuthReducer: AdminAuthSliceReducer,
  adminSkillsReducer: AdminSkillsSliceReducer,
  adminCategoriesReducer: AdminCategoriesSliceReducer,
  adminCompaniesReducer: AdminCompaniesSliceReducer,
});

const rootReducer = (state, action: Action<string>) => {
  if (action.type === logout.type) {
    storage.removeItem("persist:root");
    state = undefined;
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  tranforms: [savedJobIdsTransform],
  whitelist: ["authReducer", "bookmarkReducer", "adminAuthReducer"],
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
