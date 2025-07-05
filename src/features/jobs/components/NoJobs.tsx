import { Search } from "lucide-react";

export function NoJobs() {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-6">
      <div className="text-center max-w-lg mx-auto">
        {/* Modern illustration/icon area */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="h-8 w-8 text-white" />
              </div>
            </div>
            {/* Floating elements for modern touch */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            No matching jobs
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
            We couldn't find any jobs that match your current search criteria.
            Try broadening your search or removing some filters.
          </p>
        </div>
        {/* subtle decoration */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
