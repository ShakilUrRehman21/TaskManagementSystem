import prisma from '../config/db';
import { Status } from '@prisma/client';

export interface TaskFilter {
  status?: Status;
  search?: string;
  userId: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export const createTask = async (data: { title: string; description?: string; userId: string }) => {
  return prisma.task.create({
    data,
  });
};

export const getTasks = async (filter: TaskFilter, pagination: PaginationOptions) => {
  const { page, limit } = pagination;
  const skip = (page - 1) * limit;

  const where: any = { userId: filter.userId };
  if (filter.status) where.status = filter.status;
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: 'insensitive' } },
      { description: { contains: filter.search, mode: 'insensitive' } },
    ];
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.task.count({ where }),
  ]);

  return { tasks, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getTaskById = async (id: string, userId: string) => {
  return prisma.task.findFirst({
    where: { id, userId },
  });
};

export const updateTask = async (id: string, userId: string, data: any) => {
  return prisma.task.updateMany({
    where: { id, userId },
    data,
  });
};

export const deleteTask = async (id: string, userId: string) => {
  return prisma.task.deleteMany({
    where: { id, userId },
  });
};
