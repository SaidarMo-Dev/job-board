import {
  EarthLock,
  FolderKanban,
  HandCoins,
  Handshake,
  MicVocal,
  PaintBucket,
  ShieldCheck,
} from "lucide-react";

import { Solution } from "../Solution";

export function Solutions() {
  return (
    <section className="p-20 bg-slate-100">
      <div className="custom-container
      
      ">
        <div>
          {" "}
          {/* Title */}
          <div className="text-center font-bold text-4xl tracking-wide">
            <h2>One Platform</h2>
            <h2>
              Many <span className="text-sky-500">Solutions</span>
            </h2>
          </div>
          {/* Solutions */}
          <div className="grid grid-cols-4 gap-5 mt-10">
            <Solution
              solutionName="Marketing & Communication"
              jobsCount={12}
              icon={<MicVocal color="#e53935" width="25px" height="25px" />}
            />

            <Solution
              solutionName="Design & Development"
              jobsCount={12}
              icon={<PaintBucket color="#7b1fa2" width="25px" height="25px" />}
            />

            <Solution
              solutionName="Human Research & Development"
              jobsCount={12}
              icon={<EarthLock color="#2979ff" width="25px" height="25px" />}
            />

            <Solution
              solutionName="Finance & Management"
              jobsCount={12}
              icon={<HandCoins color="#ffab40" width="25px" height="25px" />}
            />

            <Solution
              solutionName="Armforce Guide & Security"
              jobsCount={12}
              icon={<ShieldCheck color="#6200ea" width="25px" height="25px" />}
            />

            <Solution
              solutionName="Business & Consulting"
              jobsCount={12}
              icon={<Handshake color="#29b6f6" width="25px" height="25px" />}
            />

            <Solution
              solutionName="Customer Support Care"
              jobsCount={12}
              icon={<MicVocal color="#009688" width="25px" height="25px" />}
            />

            <Solution
              solutionName="Project Management"
              jobsCount={12}
              icon={<FolderKanban color="#e040fb" width="25px" height="25px" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
