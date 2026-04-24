import { useRef } from "react";
import { useUploadCompanyBanner } from "../hooks/useUploadCompanyBanner";
import { validateImage } from "@/utils/fileValidation";
import { toast } from "react-toastify";
import { Camera } from "lucide-react";

const CompanyBanner = ({
  companyId,
  bannerUrl,
}: {
  companyId: number;
  bannerUrl?: string;
}) => {
  console.log("test banner component render");

  const fileRef = useRef<HTMLInputElement | null>(null);
  const { upload, isPending } = useUploadCompanyBanner();

  const handleSelect = () => fileRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file, "banner");
    if (error) {
      e.target.value = "";
      toast.error(error);
      return;
    }

    upload(companyId, file);

    e.target.value = "";
  };

  return (
    <div className="relative w-full h-48  overflow-hidden border">
      <img
        src={bannerUrl || "/images/default-banner.webp"}
        className="w-full h-full object-cover"
      />

      {/* Overlay edit button */}
      <button
        onClick={handleSelect}
        type="button"
        className="absolute top-4 right-4 bg-card/90 backdrop-blur text-foreground px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:bg-card transition-colors flex items-center gap-2"
      >
        <Camera className="w-4 h-4" />
        Change Cover
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />

      {isPending && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-white">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default CompanyBanner;
