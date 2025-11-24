import type { Job } from "../types/job";

const STORAGE_KEY = "saved_jobs";

// get all saved jobs from localStorage
export function getSavedJobs(): Job[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to parse saved jobs: ", error);
    return [];
  }
}

// save a job to localStorage
export function saveJob(job: Job): void {
  const savedJobs = getSavedJobs();

  // pass existing array to avoid double-read
  if (isJobSaved(job.id, savedJobs)) {
    console.log(`Job with id: ${job.id} already saved!`);
    return;
  }

  // add new job
  const updated = [...savedJobs, job];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// Remove a job from localStorage
export function unSaveJob(jobId: number): void {
  const savedJobs = getSavedJobs();
  const filtered = savedJobs.filter((job) => job.id !== jobId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

// check if a job is saved
export function isJobSaved(jobId: number, savedJobs?: Job[]): boolean {
  const jobs = savedJobs || getSavedJobs();
  return jobs.some((job) => job.id === jobId);
}
