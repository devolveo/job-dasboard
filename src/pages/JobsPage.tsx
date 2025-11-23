import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchJobs } from "../api/jobsApi";
import JobCard from "../components/JobCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL is the ONLY source of truth
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1");

  // Fetch data based on URL
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["jobs", category, page],
    queryFn: () => fetchJobs({ category, page }),
  });

  const itemsPerPage = data?.items_per_page || 20;

  // Add ?page=1 to URL on first visit (if missing)
  useEffect(() => {
    if (!searchParams.has("page")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", "1");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // calculate total pages from API Response
  const totalPages =
    (data?.results.length ?? 0) < itemsPerPage &&
    (data?.results.length ?? 0) > 0
      ? page
      : data?.page_count || 1;

  // calculate boundary calculation
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages || data?.results.length === 0;

  const totalJobs = data?.total || 0;
  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = isLastPage
    ? startIndex + ((data?.results.length || 0) - 1)
    : Math.min(page * itemsPerPage, totalJobs);

  // Handler for category changes
  function handleCategoryChange(newCategory: string) {
    const newParams = new URLSearchParams();
    newParams.set("page", "1"); // Always reset to page 1
    if (newCategory) {
      newParams.set("category", newCategory);
    }
    setSearchParams(newParams);
  }

  // Handler for clearing filter
  function handleClearFilter() {
    setSearchParams({ page: "1" });
  }

  // handler for going to previous page
  function handlePreviousPage() {
    const newParams = new URLSearchParams();
    newParams.set("page", String(page - 1));
    if (category) {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  }

  // handler for going to next page
  function handleNextPage() {
    const newParams = new URLSearchParams();
    newParams.set("page", String(page + 1));
    if (category) {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ErrorMessage error={error as Error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>

        {/* CATEGORY FILTER */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
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

          {/* CLEAR FILTER BUTTON */}
          {category && (
            <button
              onClick={handleClearFilter}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 transition"
            >
              ✕ Clear Filter
            </button>
          )}
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={handlePreviousPage}
            disabled={isFirstPage}
            // className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            className={`px-4 py-2 rounded-lg transition ${
              isFirstPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            ← Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={isLastPage}
            className={`px-4 py-2 rounded-lg transition ${
              isLastPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next →
          </button>
        </div>

        {/* JOB COUNT */}
        <p className="text-gray-600 mb-4">
          {category && <span className="font-semibold">{category}: </span>}
          Showing {startIndex.toLocaleString()}-{endIndex.toLocaleString()} of{" "}
          {totalJobs.toLocaleString()} jobs
        </p>

        {/* EMPTY STATE or JOB GRID */}
        {data?.results.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No jobs found in this category
            </h3>
            <p className="text-gray-600 mb-6">
              {category
                ? `There are currently no active "${category}" jobs available.`
                : "Try selecting a different category or check back later."}
            </p>
            {category && (
              <button
                onClick={handleClearFilter}
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
