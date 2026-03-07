import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { restTasks } from "../repository/restTasks";
import type { TaskFilters, CreateTaskDto } from "../repository/TasksDtos";

const tasksRepo = restTasks();

export const useTasks = (filters?: TaskFilters) => {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => tasksRepo.getTasks(filters),
  });
};

export const useTaskById = (id: number) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await tasksRepo.getTaskById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto & { images?: File[] }) =>
      tasksRepo.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
      queryClient.invalidateQueries({ queryKey: ["tasks-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["map-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["saved-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
      queryClient.invalidateQueries({ queryKey: ["top-taskers"] });
      queryClient.invalidateQueries({ queryKey: ["trending-categories"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateTaskDto>;
    }) => {
      const response = await tasksRepo.updateTask(id, data);
      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["task", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tasksRepo.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useSaveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tasksRepo.saveTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
      queryClient.invalidateQueries({ queryKey: ["tasks-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["map-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["saved-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });
};

export const useSavedTasks = () => {
  return useQuery({
    queryKey: ["saved-tasks"],
    queryFn: () => tasksRepo.getSavedTasks(),
  });
};

export const useLikeTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tasksRepo.likeTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
      queryClient.invalidateQueries({ queryKey: ["tasks-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["map-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["saved-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tasksRepo.completeTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
};

export const useMapTasks = () => {
  return useQuery({
    queryKey: ["map-tasks"],
    queryFn: () => tasksRepo.getMapTasks(),
  });
};

export const useNearbyTasks = (filters?: TaskFilters) => {
  return useQuery({
    queryKey: ["nearby-tasks", filters],
    queryFn: () => tasksRepo.getTasks(filters),
    enabled: filters?.userLat !== undefined && filters?.userLng !== undefined,
  });
};

export const useTopTaskers = (limit?: number) => {
  return useQuery({
    queryKey: ["top-taskers", limit],
    queryFn: () => tasksRepo.getTopTaskers(limit),
  });
};

export const useTrendingCategories = () => {
  return useQuery({
    queryKey: ["trending-categories"],
    queryFn: () => tasksRepo.getTrendingCategories(),
  });
};

export const useInfiniteTasksQuery = (
  filters?: Omit<TaskFilters, "page">,
  limit = 20,
) => {
  return useInfiniteQuery({
    queryKey: ["tasks-infinite", { ...filters, limit }],
    queryFn: ({ pageParam = 1 }) =>
      tasksRepo.getTasks({ ...filters, page: pageParam as number, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page returned fewer items than the limit, we've reached the end
      if (!lastPage?.data || lastPage.data.length < limit) return undefined;
      // Next page is current number of loaded pages + 1
      return allPages.length + 1;
    },
  });
};
