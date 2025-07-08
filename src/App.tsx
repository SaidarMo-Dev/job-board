import "./App.css";
import { ToastContextProvider } from "./contexts/ToastContext";
import { ToastContainer, Zoom } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "nprogress/nprogress.css";
import { setupAxiosInterceptors } from "./api/axiosInstance";
function App() {
  setupAxiosInterceptors(store.dispatch);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="">
          <ToastContextProvider>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              theme="colored"
              transition={Zoom}
              hideProgressBar={true}
            />
            <AppRoutes />
          </ToastContextProvider>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
