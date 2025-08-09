import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Globe,
  MapPin,
  Phone,
  Mail,
  VoicemailIcon as Fax,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { ROUTES } from "@/constants/routes";
import { useEffect } from "react";
import type { FormMode } from "@/types/formModes";
import { useForm } from "react-hook-form";
import {
  CompanySchema,
  type CompanyFormValues,
} from "../schemas/CompanySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCompanySaveLoading } from "../companySlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  addCompanyThunk,
  fetchCompanyByIdThunk,
  updateCompanyThunk,
} from "../companyThunk";
import { toast } from "react-toastify";

interface CompanyFormProps {
  mode: FormMode;
}

export default function CompanyForm({ mode }: CompanyFormProps) {
  const loading = useAppSelector(selectCompanySaveLoading);
  const dispatch = useAppDispatch();
  const { Id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      companyName: "",
      industry: "",
      description: "",
      websiteUrl: "",
      location: "",
      phoneNumber: "",
      email: "",
      fax: "",
    },
  });

  useEffect(() => {
    if (mode === "Edit" && Id) {
      dispatch(fetchCompanyByIdThunk({ Id: Number(Id) }))
        .unwrap()
        .then((data) => {
          reset({
            companyName: data.companyName ?? "",
            industry: data.industry ?? "",
            description: data.description ?? "",
            websiteUrl: data.websiteUrl ?? "",
            location: data.location ?? "",
            phoneNumber: data.phoneNumber ?? "",
            email: data.email ?? "",
            fax: data.fax ?? "",
          });
        })
        .catch((err) => {
          toast.error(err || "Failed to load company data");
        });
    }
  }, [Id, mode, dispatch, reset]);

  const onSubmit = async (data: CompanyFormValues) => {
    if (mode === "Add") {
      dispatch(addCompanyThunk({ data }))
        .unwrap()
        .then(() => {
          toast.success("Added Successfully");
          navigate(ROUTES.ADMIN.COMPANIES.LIST);
        })
        .catch((err) => toast.error(err));
    } else {
      dispatch(
        updateCompanyThunk({ data, companyId: Number(Id) })
      )
        .unwrap()
        .then(() => {
          toast.success("Updated Successfully");
        })
        .catch((err) => toast.error(err));
    }
  };

  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Company Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Company Name <span className="text-red-600">*</span>
            </Label>
            <Input
              {...register("companyName")}
              id="name"
              type="text"
              placeholder="Enter company name"
              className={`w-full ${errors.companyName ? "border-red-600" : ""}`}
            />
            {errors?.companyName && (
              <p className="text-sm text-red-400">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium">
              Industry
            </Label>
            <Input
              {...register("industry")}
              id="industry"
              type="text"
              placeholder="Enter industry"
              className={`w-full ${errors.industry ? "border-red-600" : ""}`}
            />
            {errors?.industry && (
              <p className="text-sm text-red-400">{errors.industry.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              {...register("description")}
              id="description"
              placeholder="Describe the company's business and services"
              rows={4}
              className={`w-full ${errors.description ? "border-red-600" : ""}`}
            />
            {errors?.description && (
              <p className="text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Website & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" /> Website URL
              </Label>
              <Input
                {...register("websiteUrl")}
                id="website"
                type="url"
                placeholder="https://example.com"
                className={`w-full ${errors.websiteUrl ? "border-red-600" : ""}`}
              />
              {errors?.websiteUrl && (
                <p className="text-sm text-red-400">
                  {errors.websiteUrl.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Location <span className="text-red-600">*</span>
              </Label>
              <Input
                {...register("location")}
                id="location"
                type="text"
                placeholder="City, State/Country"
                className={`w-full ${errors.location ? "border-red-600" : ""}`}
              />
              {errors?.location && (
                <p className="text-sm text-red-400">{errors.location.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone Number
                </Label>
                <Input
                  {...register("phoneNumber")}
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className={`w-full ${errors.phoneNumber ? "border-red-600" : ""}`}
                />
                {errors?.phoneNumber && (
                  <p className="text-sm text-red-400">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email Address <span className="text-red-600">*</span>
                </Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="contact@company.com"
                  className={`w-full ${errors.email ? "border-red-600" : ""}`}
                />
                {errors?.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fax" className="text-sm font-medium flex items-center gap-2">
                <Fax className="h-4 w-4" /> Fax Number
              </Label>
              <Input
                {...register("fax")}
                id="fax"
                type="tel"
                placeholder="+1 (555) 123-4568"
                className={`w-full ${errors.fax ? "border-red-600" : ""}`}
              />
              {errors?.fax && (
                <p className="text-sm text-red-400">{errors.fax.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button type="submit" className="sm:order-2">
              {mode === "Add"
                ? loading
                  ? "Creating Company..."
                  : "Create Company"
                : loading
                ? "Updating Company..."
                : "Update Company"}
            </Button>
            <Link to={ROUTES.ADMIN.COMPANIES.LIST} className="sm:order-1">
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-500">
            <span className="text-red-600">*</span> Required fields
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
