import LinkedinIcon from "@/shared/components/LinkedinIcon";
import TwitterIcon from "@/shared/components/TwitterIcon";
import { Globe, Pen } from "lucide-react";
import type { BaseCompanyComponentsProps } from "../types/baseCompanyComponentsType";
import { Input } from "@/components/ui/input";
import type { CompanyFormValues } from "../schemas/companySchema";
import { useFormContext } from "react-hook-form";
import ErrorField from "@/shared/components/ErrorField";

export default function CompanyLinks({
  isEditing,
  setIsEditing,
}: BaseCompanyComponentsProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CompanyFormValues>();

  const [websiteUrl, linkedInUrl, twitterUrl] = watch([
    "websiteUrl",
    "linkedInUrl",
    "twitterUrl",
  ]);

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-foreground">Online Presence</h2>
        <button
          type="button"
          className="text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setIsEditing?.(true)}
        >
          <Pen className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {/* Website */}
        {isEditing ? (
          <div className="space-y-1.5">
            <Input
              {...register("websiteUrl")}
              type="text"
              placeholder="website url"
              className="rounded-xl"
            />
            {errors.websiteUrl && (
              <ErrorField message={errors.websiteUrl.message} />
            )}
          </div>
        ) : (
          <a
            target="_blank"
            href={websiteUrl}
            className="bg-card rounded-lg  border border-border p-3 flex items-center gap-2"
          >
            <Globe className="w-5 h-5" />
            <div className="flex items-start flex-col">
              <span className="text-xs text-neutral-500">Website</span>
              <span className="text-sm text-primary break-all">
                {websiteUrl || "Not provided"}
              </span>
            </div>
          </a>
        )}
        {/* Linkedin */}
        {isEditing ? (
          <div className="space-y-1.5">
            <Input
              {...register("linkedInUrl")}
              type="text"
              placeholder="linkedin url..."
              className="rounded-xl"
            />
            {errors.linkedInUrl && (
              <ErrorField message={errors.linkedInUrl.message} />
            )}
          </div>
        ) : (
          <a
            target="_blank"
            href={linkedInUrl}
            className="bg-card rounded-lg  border border-border p-3 flex items-center gap-2"
          >
            <LinkedinIcon size={20} className="text-primary" />
            <div className="flex items-start flex-col">
              <span className="text-xs text-neutral-500">Linkedin</span>
              <span className="text-sm break-all">
                {linkedInUrl || "Not provided"}
              </span>
            </div>
          </a>
        )}

        {/* Twitter */}
        {isEditing ? (
          <div className="space-y-1.5">
            <Input
              {...register("twitterUrl")}
              type="text"
              placeholder="twitter url..."
              className="rounded-xl "
            />
            {errors.twitterUrl && (
              <ErrorField message={errors.twitterUrl.message} />
            )}
          </div>
        ) : (
          <a
            target="_blank"
            href={twitterUrl}
            className="bg-card rounded-lg  border border-border p-3 flex items-center gap-2"
          >
            <TwitterIcon size={20} className="text-primary" />
            <div className="flex items-start flex-col">
              <span className="text-xs text-neutral-500">Twitter</span>
              <span className="text-sm break-all">
                {twitterUrl || "Not provided"}
              </span>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
