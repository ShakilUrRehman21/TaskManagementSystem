import api from './api';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResponse {
  success: boolean;
  data: {
    tasks: Task[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getTasks = async (params: { status?: string; search?: string; page?: number; limit?: number }) => {
  const response = await api.get<TaskListResponse>('/tasks', { params });
  return response.data.data;
};

export const createTask = async (data: { title: string; description?: string }) => {
  const response = await api.post('/tasks', data);
  return response.data.data;
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  const response = await api.patch(`/tasks/${id}`, data);
  return response.data.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data.data;
};

export const toggleTask = async (id: string) => {
  const response = await api.patch(`/tasks/${id}/toggle`);
  return response.data.data;
};
