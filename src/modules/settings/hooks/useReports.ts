import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReportedUsers, submitReport } from "../apis/ReportsApi";
import type { CreateReportPayload } from "../apis/ReportsApi";
import { toast } from "sonner";

interface UseReportsOptions {
  fetchReportedUsers?: boolean;
}

export const useReports = ({
  fetchReportedUsers = false,
}: UseReportsOptions = {}) => {
  const queryClient = useQueryClient();

  const { data: reportedUsers = [], isLoading } = useQuery({
    queryKey: ["reported-users"],
    queryFn: getReportedUsers,
    enabled: fetchReportedUsers,
  });

  const reportMutation = useMutation({
    mutationFn: (payload: CreateReportPayload) => submitReport(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reported-users"] });
      toast.success("Report submitted successfully");
    },
    onError: (error: Error) => {
      const message =
        error?.message || "Failed to submit report. Please try again.";
      toast.error(message);
    },
  });

  return {
    reportedUsers,
    isLoading,
    submitReport: reportMutation.mutate,
    submitReportAsync: reportMutation.mutateAsync,
    isSubmitting: reportMutation.isPending,
    isSuccess: reportMutation.isSuccess,
  };
};
