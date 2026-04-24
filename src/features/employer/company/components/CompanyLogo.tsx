import { useRef } from "react";
import { useUploadCompanyLogo } from "../hooks/useUploadCompanyLogo";
import { validateImage } from "@/utils/fileValidation";
import { toast } from "react-toastify";
import { Pen } from "lucide-react";

const CompanyLogo = ({
  companyId,
  logoUrl,
}: {
  companyId: number;
  logoUrl?: string;
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { upload, isPending } = useUploadCompanyLogo();

  const handleSelect = () => fileRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file, "logo");
    if (error) {
      e.target.value = "";
      toast.error(error);
      return;
    }

    upload(companyId, file);

    e.target.value = "";
  };

  return (
    <div className="relative w-24 h-24">
      <div className="w-full h-full rounded-2xl bg-card p-1 shadow-md border border-border">
        <img
          src={logoUrl || "/images/default-company.webp"}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <button
        type="button"
        onClick={handleSelect}
        className="absolute -bottom-2 -right-2 p-1.5 rounded-full border bg-card"
      >
        <Pen className="w-3 h-3" />
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />

      {isPending && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
          <span className="text-white text-xs">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default CompanyLogo;
