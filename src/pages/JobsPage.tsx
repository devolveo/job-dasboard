import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../api/jobsApi";
import JobCard from "../components/JobCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import { useSearchParams } from "react-router-dom";
// import ErrorMessage from "../components/ErrorMessage";

function JobsPage() {
  const [categoryInput, setCategoryInput] = useState(""); // useQuery hook - fetches data automatically
  const [searchParams, setSearchParam] = useSearchParams(); // read and write URL search params

  const category = searchParams.get("category") || "";

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["jobs", category],
    queryFn: () => fetchJobs({ category }),
  });

  //Initialize local state from URL on page load
  useEffect(() => {
    const urlSearch = searchParams.get("category") || "";
    setCategoryInput(urlSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categoryInput) {
      setSearchParam({ category: categoryInput });
    } else {
      setSearchParam({});
    }
  }, [categoryInput, setSearchParam]);

  // loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // error state
  if (isError) {
    return <ErrorMessage error={error as Error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       outline-none transition bg-white"
          >
            <option value="">All Categories</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Business & Strategy">Business & Strategy</option>
            <option value="Marketing & PR">Marketing & PR</option>
            <option value="HR & Recruiting">HR & Recruiting</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Healthcare & Medicine">Healthcare & Medicine</option>
            <option value="Education">Education</option>
            <option value="Legal">Legal</option>
          </select>

          {/* clear button - right, only shown when there is text */}
          {categoryInput && (
            <button
              onClick={() => setCategoryInput("")}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 transition"
            >
              X Clear Filter
            </button>
          )}
        </div>

        <p className="text-gray-600 mb-4">
          {categoryInput && (
            <span className="font-semibold">{categoryInput}: </span>
          )}
          Showing {data?.results.length} of {data?.total.toLocaleString() || 0}{" "}
          jobs
        </p>

        {/* Temporary: Just show job titles as a list
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div> */}
        {data?.results.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No jobs found in this category
            </h3>
            <p className="text-gray-600 mb-6">
              {categoryInput
                ? `There are currently no active "${categoryInput}" jobs available.`
                : "Try selecting a different category or check back later."}
            </p>
            {categoryInput && (
              <button
                onClick={() => setCategoryInput("")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition"
              >
                View All Categories
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.results.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;
