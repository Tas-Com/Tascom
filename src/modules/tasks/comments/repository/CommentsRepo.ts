import type { CreateCommentDto, CommentsResponse, CommentResponse } from "../entities/Comment";

export interface CommentsRepo {
  getCommentsByTask: (taskId: number) => Promise<CommentsResponse>;
  createComment: (data: CreateCommentDto) => Promise<CommentResponse>;
  updateComment: (id: number, content: string) => Promise<CommentResponse>;
  deleteComment: (id: number) => Promise<void>;
}
