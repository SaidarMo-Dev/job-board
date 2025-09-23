"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Globe, MapPin, Plus } from "lucide-react";
import {
  CompanySchema,
  type CompanyFormValues,
} from "../schemas/CompanySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { addCompany } from "../companyApi";
import Loader from "@/components/Loaders/Loader";
import InlineError from "@/components/InlineError";

export function AddCompanyDialog({
  onCreate,
  triggerLabel = "Add New Company",
}: {
  onCreate: (id: number) => void;
  triggerLabel?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanySchema),
  });

  const onSubmit = async (data: CompanyFormValues) => {
    setLoading(true);
    try {
      const res = await addCompany(data);
      toast.success("Added Successfully", {
        position: "bottom-left",
      });
      setOpen(false);
      onCreate(res.data);
    } catch (err) {
      setError(extractAxiosErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary">
          <Plus className="h-4 w-4 mr-1.5" />
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg overflow-auto max-h-screen">
        <DialogHeader>
          {error && <InlineError message={error} />}
          <DialogTitle>Create Company</DialogTitle>
          <DialogDescription>
            Add a new company. It will be selected for this job after saving.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="new-company-name">
              Name
            </label>
            <div className="relative">
              <Input
                {...register("companyName")}
                id="new-company-name"
                placeholder="Company name"
                className="pl-9"
              />
              <Building2 className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors?.companyName && (
              <p className="text-sm text-destructive">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium"
              htmlFor="new-company-website"
            >
              Email
            </label>
            <div className="relative">
              <Input
                {...register("email")}
                id="new-company-email"
                placeholder="example@gmail.com"
                className="pl-9"
              />
              <Globe className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors?.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium"
              htmlFor="new-company-website"
            >
              Website
            </label>
            <div className="relative">
              <Input
                {...register("websiteUrl")}
                id="new-company-website"
                placeholder="https://example.com"
                className="pl-9"
              />
              <Globe className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors?.websiteUrl && (
              <p className="text-sm text-destructive">
                {errors.websiteUrl.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium"
              htmlFor="new-company-location"
            >
              Location
            </label>
            <div className="relative">
              <Input
                {...register("location")}
                id="new-company-location"
                placeholder="City, Country or Remote"
                className="pl-9"
              />
              <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors?.location && (
              <p className="text-sm text-destructive">
                {errors.location.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="new-company-desc">
              Description
            </label>
            <Textarea
              {...register("description")}
              id="new-company-desc"
              placeholder="Short description about the company..."
              rows={4}
            />
          </div>
          {errors?.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
          <div className="mt-3 flex justify-end space-x-2">
            <Button
              type="submit"
              className="flex items-center justify-center"
              disabled={loading}
            >
              Save Company
              {loading && (
                <Loader variant="dots" color="text-white" size="sm" />
              )}
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
