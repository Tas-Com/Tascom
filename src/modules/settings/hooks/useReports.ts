import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReportedUsers, reportUser } from "../apis/ReportsApi";

export const useReports = () => {
  const queryClient = useQueryClient();

  const { data: reportedUsers = [], isLoading } = useQuery({
    queryKey: ["reported-users"],
    queryFn: getReportedUsers,
  });

  const reportMutation = useMutation({
    mutationFn: reportUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reported-users"] });
    },
  });

  return {
    reportedUsers,
    isLoading,
    submitReport: reportMutation.mutate,
    isSubmitting: reportMutation.isPending,
    isSuccess: reportMutation.isSuccess,
  };
};