import { TrendingUp } from "lucide-react";

export function StatusSection() {
  return (
    <section className=" bg-gradient-to-br from-slate-50 to-blue-50 py-15">
      <div className="custom-container grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <TrendingUp className="text-sky-600" />
          </div>
          <h3 className="mt-2 mb-2 font-bold text-xl">95%</h3>
          <h4 className="font-semibold mb-1">Success Rate</h4>
          <p className="text-gray-500">job seekers find thier ideal position</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <TrendingUp className="text-sky-600" />
          </div>
          <h3 className="mt-2 mb-2 font-bold text-xl">24h</h3>
          <h4 className="font-semibold mb-1">Average Response</h4>
          <p className="text-gray-500">Quick emploser responses</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <TrendingUp className="text-sky-600" />
          </div>
          <h3 className="mt-2 mb-2 font-bold text-xl">10k+</h3>
          <h4 className="font-semibold mb-1">Active Users</h4>
          <p className="text-gray-500">Professionals trust our platform</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <TrendingUp className="text-sky-600" />
          </div>
          <h3 className="mt-2 mb-2 font-bold text-xl">150+</h3>
          <h4 className="font-semibold mb-1">Countries</h4>
          <p className="text-gray-500">Global job opportinuties</p>
        </div>
      </div>
    </section>
  );
}
