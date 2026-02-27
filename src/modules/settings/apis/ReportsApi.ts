import { apiClient } from "@/shared/api/client";

export interface Reporter {
  id: number;
  name: string;
  email: string;
}

export interface Report {
  id: number;
  reportedId: number;
  createdById: number;
  reason: string;
  type: "USER" | "TASK";
  status: "PENDING" | "RESOLVED" | "REJECTED";
  createdAt: string;
  reporter: Reporter;
}



export const getReportedUsers = (): Promise<Report[]> => {
  return apiClient.get<Report[]>("reports/reported-users");
};

export const reportUser = (payload: {
  reportedId: number;
  reason: string;
}): Promise<void> => {
  return apiClient.post("reports", payload);
};