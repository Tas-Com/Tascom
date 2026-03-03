import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { restComments } from "../repository/restComments";
import type { CreateCommentDto } from "../entities/Comment";

const commentsRepo = restComments();

export const useCommentsByTask = (taskId: number) => {
  return useQuery({
    queryKey: ["comments", taskId],
    queryFn: () => commentsRepo.getCommentsByTask(taskId),
    enabled: !!taskId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentDto) => commentsRepo.createComment(data),
    onSuccess: (_, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      commentsRepo.updateComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => commentsRepo.deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
