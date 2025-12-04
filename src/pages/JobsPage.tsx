import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchJobs } from "../api/jobsApi";
import JobCard from "../components/JobCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import { ITEMS_PER_PAGE, JOB_CATEGORIES } from "../constants/jobConstants";

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

  const itemsPerPage = data?.items_per_page || ITEMS_PER_PAGE;

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
  function handleCategoryChange(newCategory: string): void {
    const newParams = new URLSearchParams();
    newParams.set("page", "1"); // Always reset to page 1
    if (newCategory) {
      newParams.set("category", newCategory);
    }
    setSearchParams(newParams);
  }

  // Handler for clearing filter
  function handleClearFilter(): void {
    setSearchParams({ page: "1" });
  }

  // handler for going to previous page
  function handlePreviousPage(): void {
    const newParams = new URLSearchParams();
    newParams.set("page", String(page - 1));
    if (category) {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  }

  // handler for going to next page
  function handleNextPage(): void {
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
          <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 border text-base md:text-sm border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       outline-none transition bg-white"
          >
            <option value="">All Categories</option>
            {JOB_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
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
            disabled={isFirstPage || data?.results.length === 0}
            // className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            className={`px-4 py-2 rounded-lg transition ${
              isFirstPage || data?.results.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "inline-block bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-smooth transform hover:scale-105 shadow-md hover:shadow-lg"
            }`}
          >
            ← Prev
          </button>
          <span className="text-gray-700 font-medium">
            {/* Page {page} of {totalPages} */}
            {data?.results.length === 0
              ? "No pages"
              : `Page ${page} of ${totalPages}`}
          </span>
          <button
            onClick={handleNextPage}
            disabled={isLastPage}
            className={`px-4 py-2 rounded-lg transition ${
              isLastPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "inline-block bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-smooth transform hover:scale-105 shadow-md hover:shadow-lg"
            }`}
          >
            Next →
          </button>
        </div>

        {/* JOB COUNT */}
        <p className="text-gray-600 mb-4">
          {category && <span className="font-semibold">{category}: </span>}
          {data?.results.length === 0
            ? "No jobs found"
            : `Showing ${startIndex.toLocaleString()}-${endIndex.toLocaleString()} of
          ${totalJobs.toLocaleString()}}
           jobs`}
        </p>

        {/* EMPTY STATE or JOB GRID */}
        {data?.results.length === 0 ? (
          <div
            className="flex flex-col text-center bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-smooth 
                hover:scale-[1.02] animate-fadeIn"
            style={{ animationDelay: `100ms` }}
          >
            {/* Icon with subtle animation */}
            <div className="text-7xl mb-6 animate-pulse">🔍</div>

            {/* Dynamic heading based on filter */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {category ? `No ${category} Jobs Found` : "No Jobs Available"}
            </h3>

            {/* Helpful, friendly message */}
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {category
                ? `We couldn't find any active "${category}" positions right now. Try viewing all categories or check back soon!`
                : "There are no jobs available at the moment. Please try again later or adjust your filters."}
            </p>

            {/* Action buttons */}
            <div className="flex gap-4 justify-center">
              {category && (
                <button
                  onClick={handleClearFilter}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white 
                       rounded-lg font-semibold hover:bg-blue-700 transition-all 
                       transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <span>🌐</span>
                  <span>View All Jobs</span>
                </button>
              )}
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 
                     rounded-lg font-semibold hover:bg-gray-200 transition-all 
                     transform hover:scale-105"
              >
                <span>🏠</span>
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.results.map((job, index) => (
              <JobCard job={job} key={job.id} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;
