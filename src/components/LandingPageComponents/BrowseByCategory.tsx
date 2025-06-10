import {
  ChevronRight,
  Code2,
  Megaphone,
  Palette,
  Stethoscope,
  Users,
  Wrench,
} from "lucide-react";

export function BrowseByCategory() {
  const categories = [
    {
      id: "healthcare",
      name: "Healthcare",
      jobCount: 1344,
      icon: Stethoscope,
      color: "bg-sky-50 text-sky-700 border-sky-200",
      iconBg: "bg-sky-100",
      featured: true,
    },
    {
      id: "design",
      name: "Design",
      jobCount: 100,
      icon: Palette,
      color: "bg-violet-50 text-violet-600 border-violet-200",
      iconBg: "bg-violet-100",
    },
    {
      id: "human-resources",
      name: "Human Resources",
      jobCount: 35,
      icon: Users,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      iconBg: "bg-emerald-100",
    },
    {
      id: "engineering",
      name: "Engineering",
      jobCount: 33,
      icon: Wrench,
      color: "bg-slate-50 text-slate-600 border-slate-200",
      iconBg: "bg-slate-100",
    },
    {
      id: "marketing",
      name: "Marketing",
      jobCount: 23,
      icon: Megaphone,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      iconBg: "bg-amber-100",
    },
    {
      id: "technology",
      name: "Technology",
      jobCount: 2,
      icon: Code2,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
      iconBg: "bg-indigo-100",
    },
  ];

  const availableCategories = categories
    .filter((cat) => {
      return cat.jobCount > 0;
    })
    .sort((a, b) => b.jobCount - a.jobCount);

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
        <div className="py-15">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {availableCategories.map((cat, index) => {
              const Icon = cat.icon;

              return (
                <div
                  key={index}
                  className={`${cat.color} p-5 rounded-xl border-2 transform duration-300 hover:scale-102 hover:shadow-xl`}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`${cat.iconBg} p-3 rounded-xl flex items-center`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-right font-bold text-2xl">
                        {cat.jobCount}
                      </h3>
                      <p className="text-sm">jobs available</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-bold text-xl">{cat.name}</h4>
                    <div className=" flex items-center gap-2 mt-1 text-sm">
                      View All Jobs <ChevronRight width="18px" height="18px" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
