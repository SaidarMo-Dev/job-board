import { useEffect, useState } from "react";
import { ChangeEmailModal } from "../AccontModals/ChangeEmailModal";
import VerificationCodeModal from "../AccontModals/VerificationCodeModal";

type stepType = "first" | "second" | "none";

interface ChangeEmailProps {
  open: boolean;
  onClose: () => void;
}
export default function ChangeEmail({ open, onClose }: ChangeEmailProps) {
  const [step, setStep] = useState<stepType>("first");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    if (open) {
      setStep("first");
    } else {
      setStep("none");
    }
  }, [open, setStep]);

  function handleClose() {
    setStep("none");
    onClose();
  }

  return (
    <>
      <ChangeEmailModal
        open={step === "first"}
        onClose={() => handleClose()}
        onNext={(email) => {
          setNewEmail(email);
          setStep("second");
        }}
      />

      <VerificationCodeModal
        open={step === "second"}
        newEmail={newEmail}
        onBack={() => setStep("first")}
        onComplete={() => {
          setStep("none");
          onClose();
        }}
      />
    </>
  );
}
