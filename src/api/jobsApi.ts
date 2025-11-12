import type { Job, JobsResponse, JobFilters } from "../types/job";

const BASE_URL = "https://www.themuse.com/api/public";
// const BASE_URL = "https://BROKEN-URL-THAT-DOESNT-EXIST.com/api";

export async function fetchJobs(
  filters: JobFilters = {}
): Promise<JobsResponse> {
  const { category, location, page = 1 } = filters;

  // Build query parameters
  const params = new URLSearchParams({ page: page.toString() });

  if (category) {
    params.append("category", category); // The Muse API uses "category"
  }

  if (location) {
    params.append("location", location);
  }

  const url = `${BASE_URL}/jobs?${params.toString()}`;
  console.log("Fetching:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  // console.log("response: ", response.json());

  return response.json();
}

// fetch single job by ID
export async function fetchJobById(id: string): Promise<Job> {
  const url = `${BASE_URL}/jobs/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch job ${id}`);
  }

  return response.json();
}
