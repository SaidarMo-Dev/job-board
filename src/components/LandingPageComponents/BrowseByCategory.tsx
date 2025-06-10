import {
  ChartCandlestick,
  Code,
  GraduationCap,
  Home,
  Megaphone,
  Palette,
  PencilLine,
  Stethoscope,
  TrendingUp,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { CategoryCard } from "./CategoryCard";

export function BrowseByCategory() {
  return (
    <section className="bg-white py-15">
      <div className="custom-container">
        <div className="text-center">
          <h1 className="font-bold text-4xl mb-3">Browse By Category</h1>
          <p className="text-neutral-500">
            Expore opportunities across defferent indestries and find the
            perfect role for your expertice
          </p>
        </div>

        {/* Categories */}
        <div className="py-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            category="Technology"
            jobsCount={2}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-blue-100">
                <Code width="20px" height="20px" className="text-sky-500" />
              </div>
            }
          />
          <CategoryCard
            category="Design"
            jobsCount={100}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-purple-100">
                <Palette
                  width="20px"
                  height="20px"
                  className="text-purple-700"
                />
              </div>
            }
          />
          <CategoryCard
            category="Marketing"
            jobsCount={23}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-amber-100">
                <Megaphone
                  width="20px"
                  height="20px"
                  className="text-amber-600"
                />
              </div>
            }
          />
          <CategoryCard
            category="Healthcare"
            jobsCount={1344}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-red-100">
                <Stethoscope
                  width="20px"
                  height="20px"
                  className="text-red-600"
                />
              </div>
            }
          />
          <CategoryCard
            category="Finance"
            jobsCount={0}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-green-100">
                <ChartCandlestick
                  width="20px"
                  height="20px"
                  className="text-green-600"
                />
              </div>
            }
          />
          <CategoryCard
            category="Sales"
            jobsCount={0}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-blue-100">
                <TrendingUp
                  width="20px"
                  height="20px"
                  className="text-blue-600"
                />
              </div>
            }
          />
          <CategoryCard
            category="Human Resources"
            jobsCount={35}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-orange-100">
                <Users width="20px" height="20px" className="text-orange-600" />
              </div>
            }
          />
          <CategoryCard
            category="Engineering"
            jobsCount={33}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-gray-100">
                <Wrench width="20px" height="20px" className="text-gray-600" />
              </div>
            }
          />
          <CategoryCard
            category="Education"
            jobsCount={0}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-yellow-100">
                <GraduationCap
                  width="20px"
                  height="20px"
                  className="text-yellow-600"
                />
              </div>
            }
          />
          <CategoryCard
            category="Legal"
            jobsCount={0}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-green-100">
                <PencilLine
                  width="20px"
                  height="20px"
                  className="text-green-600"
                />
              </div>
            }
          />
          <CategoryCard
            category="Real Estate"
            jobsCount={0}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-teal-100">
                <Home width="20px" height="20px" className="text-teal-600" />
              </div>
            }
          />
          <CategoryCard
            category="Logistics"
            jobsCount={0}
            icon={
              <div className="flex items-center p-2.5 rounded-lg bg-indigo-100">
                <Truck width="20px" height="20px" className="text-indigo-600" />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
