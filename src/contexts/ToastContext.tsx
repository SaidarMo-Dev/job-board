import { createContext, useContext, useState } from "react";
import InformationToast from "../components/Toasts/InformationToast";

interface ToastInfoType {
  title: string;
  description: string;
}

type ToastContextType = {
  handleShowCloseToast: (toastnfo: ToastInfoType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState({ title: "", description: "" });

  function handleShowCloseToast(toastInfo: ToastInfoType) {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);

    setToastInfo(toastInfo);
  }

  return (
    <ToastContext.Provider value={{ handleShowCloseToast }}>
      <InformationToast
        isOpen={open}
        title={toastInfo.title}
        description={toastInfo.description}
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
