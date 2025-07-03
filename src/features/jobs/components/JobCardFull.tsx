import { Building2, Clock, DollarSign, MapPin, Users } from "lucide-react";
import type { JobProps } from "../../../types/JobProps";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useMemo, useState } from "react";
import { Separator } from "../../../components/ui/separator";
import { Badge } from "../../../components/ui/badge";
import type { JobResponse } from "../jobTypes";
import { date } from "zod";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";

export default function JobCardFull({ jobInfo }: { jobInfo: JobResponse }) {
  const [selectedJob, setSelectedJob] = useState<JobResponse | null>();

  const description = useMemo(() => {
    const words = jobInfo.description.split(" ");
    return words.length >= 10
      ? words.slice(0, 9).join(" ") + "..."
      : jobInfo.description;
  }, [jobInfo.description]);

  return (
    <>
      <Card
        key={jobInfo.title}
        className={`hover:shadow-md transition-shadow cursor-pointer hover:bg-neutral-50 duration-300`}
        onClick={() => setSelectedJob(jobInfo)}
      >
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start justify-between">
            <div className="items-start space-x-4 flex-1 flex">
              <img
                src="/public/images/logov2.png"
                alt={`${jobInfo.companyName} logo`}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {jobInfo.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-2 flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  {jobInfo.companyName}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {jobInfo.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {jobInfo.jobType}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {jobInfo.maxSalary} - {jobInfo.minSalary}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 line-clamp-2">{description}</p>
                <div className="flex flex-wrap gap-2">
                  {jobInfo.skills.map((skill) => (
                    <Badge
                      key={skill.Id}
                      variant={"secondary"}
                      className="bg-sky-200"
                    >
                      {skill.Name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right ml-4 flex flex-row-reverse sm:flex-col mt-5 sm:mt-0 justify-between w-full sm:w-auto">
              <p className="text-sm text-gray-500 mb-2">
                {getDaysSincePosted(jobInfo.datePosted)} day ago
              </p>
              <Button
                size="sm"
                className="bg-sky-600 hover:bg-sky-700 cursor-pointer w-40"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <img
                    src="/public/images/logov2.png"
                    alt={`${selectedJob.companyName} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-xl">
                      {selectedJob.title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {selectedJob.companyName}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedJob(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {selectedJob.location}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedJob.jobType}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {selectedJob.maxSalary} - {selectedJob.minSalary}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Posted {getDaysSincePosted(selectedJob.datePosted)} days ago
                </span>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill) => (
                    <Badge
                      key={skill.Id}
                      variant={"secondary"}
                      className="bg-sky-200"
                    >
                      {skill.Name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>3+ years of experience in relevant field</li>
                  <li>Strong problem-solving skills</li>
                  <li>Excellent communication abilities</li>
                  <li>Bachelor's degree or equivalent experience</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-sky-600">Apply Now</Button>
                <Button variant="outline">Save Job</Button>
                <Button variant="outline">Share</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
