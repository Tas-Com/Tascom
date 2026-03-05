import { apiClient } from "@/shared/api/client";

export interface Reporter {
  id: number;
  name: string;
  email: string;
}

export interface Report {
  id: string;
  reportedId: string;
  createdById: string;
  reason: string;
  type: "USER" | "TASK";
  status: "PENDING" | "RESOLVED" | "REJECTED";
  createdAt: string;
  reporter?: Reporter;
}

export interface CreateReportPayload {
  reportedId: number;
  reason: string;
  type: "USER" | "TASK";
}

export interface CreateReportResponse {
  success: boolean;
  data: {
    message: string;
    report: Report;
  };
}

export const getReportedUsers = (): Promise<Report[]> => {
  return apiClient.get<Report[]>("reports/reported-users");
};

export const submitReport = (
  payload: CreateReportPayload,
): Promise<CreateReportResponse> => {
  return apiClient.post<CreateReportResponse>("reports", payload);
};
