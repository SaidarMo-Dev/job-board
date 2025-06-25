import { useState } from "react";
import { ChangeEmailModal } from "../AccontModals/ChangeEmailModal";
import VerificationCodeModal from "../AccontModals/VerificationCodeModal";

type stepType = "first" | "second" | "none";

interface ChangeEmailProps {
  open: boolean;
}
export default function ChangeEmail({ open }: ChangeEmailProps) {
  const [step, setStep] = useState<stepType>(open ? "first" : "none");
  const [newEmail, setNewEmail] = useState("");

  return (
    <>
      <ChangeEmailModal
        open={step === "first"}
        onClose={() => setStep("none")}
        onNext={(email) => {
          setNewEmail(email);
          setStep("second");
        }}
      />

      <VerificationCodeModal
        open={step === "second"}
        newEmail={newEmail}
        onBack={() => setStep("first")}
        onComplete={() => setStep("none")}
      />
    </>
  );
}
