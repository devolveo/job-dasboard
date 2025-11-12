import React from "react";

function LoadingSkeleton() {
  // single skeleton card
  const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-lg shadow animate-pulse">
      {/* Company name placeholder */}
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>

      {/* Job title placeholder */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

      {/* Location and date placeholder */}
      <div className="flex gap-4 mb-4">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>

      {/* button placeholder */}
      <div className="h-10 bg-gray-300 rounded w-1/3"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Available Jobs</h1>
        <p className="text-gray-600 mb-6">Loading Jobs...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create 6 skeleton cards */}
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default LoadingSkeleton;
