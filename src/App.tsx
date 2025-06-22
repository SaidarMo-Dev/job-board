import "./App.css";
import { ToastContextProvider } from "./contexts/ToastContext";
import { ToastContainer, Zoom } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
