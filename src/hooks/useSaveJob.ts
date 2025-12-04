import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveJob, unSaveJob } from "../api/savedJobsApi";
import type { Job } from "../types/job";

export function useSaveJob() {
  // get query client to invalidate queries
  const queryClient = useQueryClient();

  // Mutation for saving a job
  const saveJobMutation = useMutation({
    mutationFn: (job: Job) => {
      saveJob(job);
      return Promise.resolve(); // saveJob is sync, wrap in promise
    },
    // After successfull event
    onSuccess: () => {
      // Invalidate saved job query - tells react query to refetch
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
    },
    // If save fails
    onError: (error) => {
      console.error("Failed to save job:", error);
    },
  });

  // Mutation for UNSAVING a job
  const unsaveJobMutation = useMutation({
    mutationFn: (jobId: number) => {
      unSaveJob(jobId);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
    },
    onError: (error) => {
      console.error("Failed to unsave job: ", error);
    },
  });

  return {
    saveJobMutation,
    unsaveJobMutation,
  };
}
