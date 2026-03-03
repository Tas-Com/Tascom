export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  replyId: string | null;
  createdAt: string;
  updatedAt?: string;
  status?: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
    assets?: { url: string }[];
  };
  replies?: Comment[];
}

export interface CreateCommentDto {
  taskId: number;
  content: string;
  replyId?: number | null;
}

export interface CommentsResponse {
  success: boolean;
  data: Comment[];
}

export interface CommentResponse {
  success: boolean;
  data?: Comment;
  message?: string;
}
