import { useRef, useState } from "react";

export function useVerificationCode(length: number = 6) {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(length).fill("")
  );

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  function handleCodeChange(index: number, value: string) {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  }

  function handleCodePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    if (paste.length === 6 && paste.every((c) => /^\d$/.test(c))) {
      setVerificationCode(paste);
    }
  }

  const code = verificationCode.join("");

  return {
    verificationCode,
    setVerificationCode,
    handleCodeChange,
    handleKeyDown,
    handleCodePaste,
    inputsRef,
    code,
  };
}
