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
  console.log("Saved jobs data: ", savedJobs);

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
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No saved job yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start saving jobs you're interested in to view them here!
            </p>
            <a
              href="/jobs"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Jobs
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs?.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedJobsPage;
