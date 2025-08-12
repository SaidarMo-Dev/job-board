"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Globe, MapPin, Plus } from "lucide-react";
import type { CompanyOption } from "../../jobs/jobsType";
import type { addCompanyRequest } from "../companyTypes";

export function AddCompanyDialog({
  onCreate,
  triggerLabel = "Add New Company",
}: {
  onCreate: (company: CompanyOption) => void;
  triggerLabel?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<addCompanyRequest>({
    companyName: "",
    description: "",
    websiteUrl: "",
    location: "",
    phoneNumber: "",
    email: "",
  });

  const handleSave = () => {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary">
          <Plus className="h-4 w-4 mr-1.5" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Company</DialogTitle>
          <DialogDescription>
            Add a new company. It will be selected for this job after saving.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="new-company-name">
              Name
            </label>
            <div className="relative">
              <Input
                id="new-company-name"
                placeholder="Company name"
                value={draft.companyName}
                onChange={(e) =>
                  setDraft((c) => ({ ...c, name: e.target.value }))
                }
                className="pl-9"
              />
              <Building2 className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
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
                id="new-company-website"
                placeholder="https://example.com"
                value={draft.websiteUrl ?? ""}
                onChange={(e) =>
                  setDraft((c) => ({ ...c, website: e.target.value }))
                }
                className="pl-9"
              />
              <Globe className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
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
                id="new-company-location"
                placeholder="City, Country or Remote"
                value={draft.location ?? ""}
                onChange={(e) =>
                  setDraft((c) => ({ ...c, location: e.target.value }))
                }
                className="pl-9"
              />
              <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="new-company-desc">
              Description
            </label>
            <Textarea
              id="new-company-desc"
              placeholder="Short description about the company..."
              value={draft.description ?? ""}
              onChange={(e) =>
                setDraft((c) => ({ ...c, description: e.target.value }))
              }
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!draft.companyName.trim()}>
            Save Company
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
