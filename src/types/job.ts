// Single Job Object from the Muse API
export interface Job {
  id: number;
  name: string;
  company: {
    name: string;
  };
  locations: Array<{
    name: string;
  }>;
  contents: string;
  publication_date: string;
  refs: {
    landing_page: string;
  };
}

// API response when fetching jobs list
export interface JobsResponse {
  results: Job[];
  page_count: number;
  page: number;
  items_per_page: number;
  total: number;
  took: number;
  timed_out: boolean;
}

// Filter parameter for searching jobs
export interface JobFilters {
  search?: string;
  category?: string;
  location?: string;
  page?: number;
}
