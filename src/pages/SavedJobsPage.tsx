import { useQuery } from "@tanstack/react-query";
import { getSavedJobs } from "../api/savedJobsApi";
import JobCard from "../components/JobCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

function SavedJobsPage() {
  // Fetch saved jobs from localStorage
  const {
    data: savedJobs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["savedJobs"],
    queryFn: getSavedJobs,
    staleTime: 0,
  });

  // log to console so we can see its working!

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ErrorMessage error={error as Error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Saved Job</h1>
        <p className="text-gray-600 mb-8">
          You have saved {savedJobs?.length || 0} job
          {savedJobs?.length !== 1 ? "s" : ""}
        </p>

        {/* conditional rendering */}
        {savedJobs?.length === 0 ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              {/* Larger, more prominent icon */}
              <div className="text-8xl mb-6 animate-bounce">💼</div>

              {/* Better heading */}
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Your Saved Jobs List is Empty
              </h3>

              {/* More engaging copy */}
              <p className="text-gray-600 mb-8 text-lg">
                When you find jobs you're interested in, save them here for easy
                access later. Start building your dream job collection!
              </p>

              {/* Better CTA button */}
              <a
                href="/jobs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg 
                   font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 
                   shadow-lg hover:shadow-xl"
              >
                <span>🔍</span>
                <span>Explore Jobs Now</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs?.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedJobsPage;
