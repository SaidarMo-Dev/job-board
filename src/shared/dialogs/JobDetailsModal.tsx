"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TabType } from "../types/TabType";
import { useQuery } from "@tanstack/react-query";
import { getJobById } from "@/features/jobs/jobApi";
import { JobDetailsTab } from "../components/JobsDetailsTab";

interface JobDetailsModalProps {
  jobId: number;
  onClose: () => void;
}

export function JobDetailsModal({ jobId, onClose }: JobDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("details");

  const jobInfo = useQuery({
    queryKey: ["getJobById"],
    queryFn: () => getJobById(jobId),
  }).data?.data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-xl font-semibold text-foreground">
            Senior Frontend Developer
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border bg-muted/30">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "details"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Details
              {activeTab === "details" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("applicants")}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "applicants"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Applicants
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                24
              </span>
              {activeTab === "applicants" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === "details" && <JobDetailsTab job={jobInfo} />}
          {/* 
          {activeTab === "history" && <JobHistoryTab />}
          {activeTab === "applicants" && <JobApplicantsTab />} */}
        </div>
      </div>
    </div>
  );
}
