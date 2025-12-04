function LoadingSkeleton() {
  // Enhanced skeleton card with better shapes
  const SkeletonCard = ({ index }: { index: number }) => (
    <div
      className="bg-white p-6 rounded-lg shadow-md animate-pulse"
      style={{
        animationDelay: `${index * 100}ms`,
        animationDuration: "1.5s",
      }}
    >
      {/* Company name placeholder */}
      <div className="h-4 bg-gray-200 rounded-full w-2/5 mb-3"></div>

      {/* Job title placeholder - wider, more prominent */}
      <div className="h-6 bg-gray-300 rounded w-4/5 mb-4"></div>

      {/* Location and date placeholder */}
      <div className="flex gap-4 mb-6">
        <div className="h-4 bg-gray-200 rounded-full w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
      </div>

      {/* Button placeholders - two buttons side by side */}
      <div className="flex gap-2">
        <div className="h-10 bg-gray-300 rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded w-1/6"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with loading animation */}
        <div className="mb-8">
          <div className="h-8 bg-gray-300 rounded w-64 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>

        {/* Loading message with friendly text */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full">
            <div className="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-blue-700 font-medium">
              Loading awesome jobs for you...
            </span>
          </div>
        </div>

        {/* Skeleton cards grid with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
