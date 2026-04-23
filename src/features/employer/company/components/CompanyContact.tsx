"use client";

import { Pen, MapPin, Phone, Mail } from "lucide-react";
import type { BaseCompanyComponentsProps } from "../types/baseCompanyComponentsType";
import { useEmployerCompanyQuery } from "../../hooks/useEmployerCompanyQuery";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { CompanyFormValues } from "../schemas/companySchema";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import ErrorField from "@/shared/components/ErrorField";

export function CompanyContact({
  isEditing,
  setIsEditing,
}: BaseCompanyComponentsProps) {
  const { data: company } = useEmployerCompanyQuery();

  const {
    register,
    formState: { errors },
  } = useFormContext<CompanyFormValues>();

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-foreground">
          Contact &amp; Location
        </h2>
        <button
          type="button"
          className="text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setIsEditing?.(true)}
        >
          <Pen className="w-4 h-4" />
        </button>
      </div>
      {isEditing ? (
        <div className="space-y-2">
          <div className="space-y-1.5">
            <Label>Country</Label>
            <Input
              {...register("country")}
              type="text"
              placeholder="Enter company country..."
              className="rounded-xl"
            />
            {errors.country && <ErrorField message={errors.country.message} />}
          </div>
          <div className="space-y-1.5">
            <Label>Address</Label>
            <Textarea
              {...register("address")}
              placeholder="Enter company address..."
              className="rounded-xl"
            />
            {errors.address && <ErrorField message={errors.address.message} />}
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input
              {...register("phoneNumber")}
              type="text"
              placeholder="Enter phone"
              className="rounded-xl"
            />
            {errors.phoneNumber && (
              <ErrorField message={errors.phoneNumber.message} />
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input
              {...register("email")}
              type="text"
              placeholder="Enter Email..."
              className="rounded-xl"
            />
            {errors.email && <ErrorField message={errors.email.message} />}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {!company?.country && !company?.address
                  ? "Not provided"
                  : company?.country + " " + company?.address}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground flex-shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <a
                href={`tel:${company?.phoneNumber}`}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {company?.phoneNumber || "No Phone provided!"}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground flex-shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <a
                href={`mailto:${company?.email}`}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {company?.email || "No email provided"}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
