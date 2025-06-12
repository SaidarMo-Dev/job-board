import "./App.css";
import { ToastContextProvider } from "./contexts/ToastContext";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="bg-slate-50">
      <ToastContextProvider>
        <AppRoutes />
      </ToastContextProvider>
    </div>
  );
}

export default App;
