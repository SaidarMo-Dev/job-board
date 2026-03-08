"use client";

import {
  Lightbulb,
  Code2,
  TrendingUp,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

interface CategoryCard {
  id: number;
  title: string;
  icon: React.ReactNode;
  jobs: number;
  color: string;
  textColor: string;
  hoverColor: string;
}

export function CategorySection() {
  const categories: CategoryCard[] = [
    {
      id: 1,
      title: "Design & Creative",
      icon: <Lightbulb className="w-8 h-8" />,
      jobs: 2340,
      color: "bg-blue-50",
      textColor: "text-primary",
      hoverColor: "group-hover:bg-primary-hover",
    },
    {
      id: 2,
      title: "Development",
      icon: <Code2 className="w-8 h-8" />,
      jobs: 5120,
      color: "bg-purple-50",
      textColor: "text-purple-600",
      hoverColor: "group-hover:bg-purple-600",
    },
    {
      id: 3,
      title: "Marketing & Sales",
      icon: <TrendingUp className="w-8 h-8" />,
      jobs: 1450,
      color: "bg-green-50",
      textColor: "text-green-600",
      hoverColor: "group-hover:bg-green-600",
    },
    {
      id: 4,
      title: "Finance & Business",
      icon: <BarChart3 className="w-8 h-8" />,
      jobs: 1820,
      color: "bg-orange-50",
      textColor: "text-orange-600",
      hoverColor: "group-hover:bg-orange-600",
    },
  ];
  return (
    <section className="relative z-10 py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Floating Container */}
        <div className="bg-white rounded-2xl shadow-xl p-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Explore by <span className="text-primary">Category</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover jobs across popular roles and industries. We have
              opportunities for every skill set.
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/jobs?category=${category.title.toLowerCase().replace(/ & /g, "-")}`}
                className="flex flex-col justify-center items-center group bg-white rounded-xl p-8 text-center border
                border-gray-100 hover:-translate-y-1 hover:shadow-xl 
                transition-all duration-300 focus:outline-none focus:ring-2
              focus:ring-primary focus:ring-offset-2"
                aria-label={`Browse ${category.jobs} ${category.title} jobs`}
              >
                <div
                  className={`${category.color} w-16 h-16 rounded-xl flex 
                  items-center justify-center ${category.textColor} mb-4
                group-hover:text-white ${category.hoverColor}
                  group-hover:scale-110 transition-transform`}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 font-medium text-sm">
                  {category.jobs.toLocaleString()} jobs
                </p>
                <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity gap-4">
                  <span className={`text-sm ${category.textColor} font-medium`}>
                    Explore
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ${category.textColor} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
