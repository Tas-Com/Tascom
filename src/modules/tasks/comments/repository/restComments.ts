import type { CommentsRepo } from "./CommentsRepo";
import { apiClient } from "@/shared/api/client";
import type { CreateCommentDto, CommentsResponse, CommentResponse } from "../entities/Comment";

export const restComments = (): CommentsRepo => ({
  getCommentsByTask: async (taskId: number) => {
    return apiClient.get<CommentsResponse>(`/comments/task/${taskId}`);
  },

  createComment: async (data: CreateCommentDto) => {
    return apiClient.post<CommentResponse>("/comments", data);
  },

  updateComment: async (id: number, content: string) => {
    return apiClient.patch<CommentResponse>(`/comments/${id}`, { content });
  },

  deleteComment: async (id: number) => {
    return apiClient.delete(`/comments/${id}`);
  },
});
