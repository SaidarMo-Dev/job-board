import { ChevronRight, type LucideProps } from "lucide-react";

type LucideIcon = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

interface JobInfo {
  textColor: string;
  hoverTextColor: string;
  title: string;
  decription: string;
  mainColor: string;
  icon: LucideIcon;
  footerIcon: LucideIcon;
  footerDescription: string;
  footerBg: string;
}

export default function ExploreJobCard({ jobInfo }: { jobInfo: JobInfo }) {
  return (
    <div
      className={`border bg-white p-6 border-gray-200 rounded-md ${jobInfo.hoverTextColor} hover:shadow-md duration-200 mb-5 hover:-translate-y-1.5`}
    >
      <div className="flex gap-4 items-center">
        <div
          className={`${jobInfo.footerBg} rounded-md p-2 ${jobInfo.textColor}`}
        >
          <jobInfo.icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{jobInfo.title}</h3>

          <p className="text-gray-700 text-sm">{jobInfo.footerDescription}</p>
        </div>
      </div>
      {/* footer */}
      <div className="flex items-center justify-between mt-4">
        <div
          className={`flex items-center rounded-full py-1 px-2 gap-2 ${jobInfo.footerBg} ${jobInfo.textColor}`}
        >
          <jobInfo.footerIcon className="w-3 h-3" />
          <h4 className="text-xs font-bold">{jobInfo.footerDescription}</h4>
        </div>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
