import { ConfirmEmail } from "@/features/auth/components/confirmEmail/ConfirmEmail";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export function ConfirmEmailPage() {
  useDocumentTitle("Confirm Your Email | iLink");
  return (
    <div className="custom-container">
      <div className="mt-5">
        <ConfirmEmail />
      </div>
    </div>
  );
}
