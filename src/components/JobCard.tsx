import type { Job } from "../types/job";

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  const formattedDate = new Date(job.publication_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const location = job.locations[0]?.name || "Location not specified";

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
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
      <a
        href={job.refs.landing_page}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        View Details →
      </a>
    </div>
  );
}

export default JobCard;
