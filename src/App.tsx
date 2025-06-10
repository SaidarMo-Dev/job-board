import "./App.css";
import { ToastContextProvider } from "./contexts/ToastContext";
import { LandingPage } from "./pages/LandingPage";

function App() {
  return (
    <div className="bg-slate-50">
      <ToastContextProvider>
        <LandingPage />
      </ToastContextProvider>
    </div>
  );
}

export default App;
