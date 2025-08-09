import { Link } from "react-router";

import { Mail, Phone, Globe, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { CompanyManagement } from "../companyTypes";

export type CompanyInfoDialogProps = {
  open: boolean;
  company: CompanyManagement | null;
  onClose: (value: boolean) => void;
};

export default function CompanyInfoDialog({
  open,
  company,
  onClose,
}: CompanyInfoDialogProps) {
  if (!company) return null;
  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent
        aria-describedby="company-info-description"
        className={[
          // sizing
          "max-w-[min(96vw,720px)] p-0 overflow-hidden rounded-xl",
          // animation
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "duration-200",
        ].join(" ")}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <DialogTitle className="truncate">
                {company.companyName}
              </DialogTitle>
              <DialogDescription
                id="company-info-description"
                className="sr-only"
              >
                Company overview dialog containing the mission statement and
                contact details.
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Hero / Mission */}
        <section className="px-6 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold tracking-tight">
                Our Mission
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {company.description ?? "No description provided!"}
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-6" />

        {/* Contact Grid */}
        <section className="px-6 pb-6">
          <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {company.email ? (
              <a
                href={`mailto:${company.email}`}
                className="group flex items-start gap-3 rounded-lg border bg-background p-3 transition-colors hover:bg-accent"
                aria-label="Send email"
              >
                <Mail className="mt-0.5 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="truncate text-sm font-medium">
                    {company.email}
                  </div>
                </div>
              </a>
            ) : null}

            {company.phoneNumber ? (
              <a
                href={`tel:${company.phoneNumber.replace(/[^+\d]/g, "")}`}
                className="group flex items-start gap-3 rounded-lg border bg-background p-3 transition-colors hover:bg-accent"
                aria-label="Call phone"
              >
                <Phone className="mt-0.5 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="truncate text-sm font-medium">
                    {company.phoneNumber}
                  </div>
                </div>
              </a>
            ) : null}

            {company.websiteUrl ? (
              <Link
                to={company.websiteUrl}
                target="_blank"
                className="group flex items-start gap-3 rounded-lg border bg-background p-3 transition-colors hover:bg-accent"
                aria-label="Visit website"
              >
                <Globe className="mt-0.5 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Website</div>
                  <div className="truncate text-sm font-medium">
                    {company.websiteUrl}
                  </div>
                </div>
              </Link>
            ) : null}

            {company.location ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  company.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border bg-background p-3 transition-colors hover:bg-accent"
                aria-label="Open address in maps"
              >
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Address</div>
                  <div className="text-sm font-medium">{company.location}</div>
                </div>
              </a>
            ) : null}
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {company.websiteUrl ? (
              <Button asChild>
                <Link to={company.websiteUrl} target="_blank">
                  Visit Website
                </Link>
              </Button>
            ) : null}
            {company.email ? (
              <Button variant="outline" asChild>
                <a href={`mailto:${company.email}`}>Email Us</a>
              </Button>
            ) : null}
            {company.phoneNumber ? (
              <Button variant="outline" asChild>
                <a href={`tel:${company.phoneNumber.replace(/[^+\d]/g, "")}`}>
                  Call
                </a>
              </Button>
            ) : null}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
