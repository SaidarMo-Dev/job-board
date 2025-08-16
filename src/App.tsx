import "./App.css";
import { ToastContextProvider } from "./contexts/ToastContext";
import { ToastContainer, Zoom } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "nprogress/nprogress.css";
import { setupAxiosInterceptors } from "./api/axiosInstance";
import { enableMapSet } from "immer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

enableMapSet();

const queryClient = new QueryClient();

function App() {
  setupAxiosInterceptors(store.dispatch);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="">
            {/* Toast provider */}
            <ToastContextProvider>
              <ToastContainer
                position="top-center"
                autoClose={2000}
                theme="colored"
                transition={Zoom}
                hideProgressBar={true}
              />
              <AppRoutes />
            </ToastContextProvider>
          </div>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
