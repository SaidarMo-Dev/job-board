import "./App.css";
import { ToastContextProvider } from "./contexts/ToastContext";
import { ToastContainer, Zoom } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
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
  );
}

export default App;
