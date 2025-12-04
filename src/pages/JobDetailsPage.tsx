import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJobById } from "../api/jobsApi";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

import { useSaveJob } from "../hooks/useSaveJob";
import { isJobSaved } from "../api/savedJobsApi";

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch the job data
  const {
    data: job,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id!),
    enabled: !!id, // only fetch if ID exists
  });

  // save job functionality
  const { saveJobMutation, unsaveJobMutation } = useSaveJob();
  const isSaved = isJobSaved(Number(job?.id));

  // handler for back button
  function handleBackClick(): void {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/jobs");
    }
  }

  // Loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // handle for save/unsave button
  function handleSaveClick(): void {
    if (!job) return;

    if (isSaved) {
      unsaveJobMutation.mutate(job.id);
    } else {
      saveJobMutation.mutate(job);
    }
  }

  // Error state
  if (isError) {
    return <ErrorMessage error={error as Error} onRetry={refetch} />;
  }

  // No job found
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
          <p className="text-gray-600">
            The job you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button Placeholder */}
        <button
          onClick={handleBackClick}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Jobs
        </button>

        {/* Job Details Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* company name */}
          <p className="text-sm text-gray-500 mb-2">{job.company.name}</p>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.name}</h1>

          <div className="flex items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{job.locations[0]?.name || "Remote"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>
                {new Date(job.publication_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: job.contents }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <a
              href={job.refs.landing_page}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-smooth transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Apply on Company Site →
            </a>

            <button
              onClick={handleSaveClick}
              disabled={
                saveJobMutation.isPending || unsaveJobMutation.isPending
              }
              className={`px-6 py-3 rounded-lg transition-colors ${
                isSaved
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              {saveJobMutation.isPending || unsaveJobMutation.isPending
                ? "⏳ Saving..."
                : isSaved
                ? "✅ Saved"
                : "💾 Save Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
