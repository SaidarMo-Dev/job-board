import {
  EarthLock,
  FolderKanban,
  HandCoins,
  Handshake,
  MicVocal,
  PaintBucket,
  ShieldCheck,
} from "lucide-react";

import { Solution } from "./Solution";

export function Solutions() {
  return (
    <section className="py-20 bg-slate-100">
      <div className="custom-container">
        <div>
          {" "}
          {/* Title */}
          <div className="text-center font-bold text-4xl tracking-wide">
            <h2>One Platform</h2>
            <h2 className="mt-0.5">
              Many <span className="text-sky-500">Solutions</span>
            </h2>
          </div>
          {/* Solutions */}
          <div className="grid grid-cols-4 gap-5 mt-15">
            <Solution
              solutionName={"Marketing &\nCommunication"}
              jobsCount={12}
              icon={<MicVocal color="#e53935" width="25px" height="25px" />}
            />

            <Solution
              solutionName={`Design &\nDevelopment`}
              jobsCount={12}
              icon={<PaintBucket color="#7b1fa2" width="25px" height="25px" />}
            />

            <Solution
              solutionName={"Human Research &\nDevelopment"}
              jobsCount={12}
              icon={<EarthLock color="#2979ff" width="25px" height="25px" />}
            />

            <Solution
              solutionName={"Finance &\nManagement"}
              jobsCount={12}
              icon={<HandCoins color="#ffab40" width="25px" height="25px" />}
            />

            <Solution
              solutionName={"Armforce Guide &\nSecurity"}
              jobsCount={12}
              icon={<ShieldCheck color="#6200ea" width="25px" height="25px" />}
            />

            <Solution
              solutionName={"Business &\nConsulting"}
              jobsCount={12}
              icon={<Handshake color="#29b6f6" width="25px" height="25px" />}
            />

            <Solution
              solutionName={"Customer\nSupport Care"}
              jobsCount={12}
              icon={<MicVocal color="#009688" width="25px" height="25px" />}
            />

            <Solution
              solutionName={"Project\nManagement"}
              jobsCount={12}
              icon={<FolderKanban color="#e040fb" width="25px" height="25px" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
