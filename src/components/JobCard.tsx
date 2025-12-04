import type { Job } from "../types/job";
import { useSaveJob } from "../hooks/useSaveJob";
import { isJobSaved } from "../api/savedJobsApi";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: Job;
  index?: number;
}

function JobCard({ job, index = 0 }: JobCardProps) {
  const { saveJobMutation, unsaveJobMutation } = useSaveJob();
  const isSaved = isJobSaved(job.id);
  const formattedDate = new Date(job.publication_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const location = job.locations[0]?.name || "Location not specified";

  function handleToggleSave(): void {
    if (isSaved) {
      unsaveJobMutation.mutate(job.id);
    } else {
      saveJobMutation.mutate(job);
    }
  }

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-smooth 
                hover:scale-[1.02] animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <p className="text-sm text-gray-500 mb-1">{job.company.name}</p>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{job.name}</h3>
      {/* Location and Date */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <span>📍</span>
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📅</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* View details button */}
      <div className="flex gap-2">
        <Link
          to={`/jobs/${job.id}`}
          // className="inline-block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors text-white"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold 
hover:bg-blue-700 transition-smooth transform hover:scale-105 
shadow-md hover:shadow-lg"
        >
          Details →
        </Link>

        {/* Save/Unsave Button */}
        <button
          onClick={handleToggleSave}
          disabled={saveJobMutation.isPending || unsaveJobMutation.isPending}
          className={`px-4 py-2 rounded transition-colors ${
            isSaved
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {saveJobMutation.isPending || unsaveJobMutation.isPending
            ? "..."
            : isSaved
            ? "Saved ✅"
            : "Save"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
