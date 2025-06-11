import { createContext, useContext, useState } from "react";
import InformationToast from "../components/Toasts/InformationToast";

interface ToastInfoType {
  title: string;
  description: string;
}

type ToastContextType = {
  handleShowCloseToast: (toastInfo: ToastInfoType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState({ title: "", description: "" });

  function handleShowCloseToast(toastInfo: ToastInfoType) {
    setToastInfo(toastInfo);
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }
  return (
    <ToastContext.Provider value={{ handleShowCloseToast }}>
      <InformationToast
        isOpen={isOpen}
        onClose={handleClose}
        title={toastInfo.title}
        description={toastInfo.description}
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const toast = useContext(ToastContext);
  if (!toast) throw new Error("useToast must be used within a Provider");

  return toast;
};
