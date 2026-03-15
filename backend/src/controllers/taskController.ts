import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as taskService from '../services/taskService';
import { AppError } from '../middlewares/errorHandler';
import { Status } from '@prisma/client';

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;
    const userId = req.user!.userId;

    if (!title) {
      throw new AppError('Title is required', 400);
    }

    const task = await taskService.createTask({ title, description, userId });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const { status, search, page = '1', limit = '10' } = req.query;

    const filter = {
      userId,
      status: status as Status,
      search: search as string,
    };

    const pagination = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
    };

    const result = await taskService.getTasks(filter, pagination);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const task = await taskService.getTaskById(id, userId);
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const { title, description, status } = req.body;

    const result = await taskService.updateTask(id, userId, { title, description, status });
    if (result.count === 0) {
      throw new AppError('Task not found or unauthorized', 404);
    }

    res.json({ success: true, message: 'Task updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const result = await taskService.deleteTask(id, userId);
    if (result.count === 0) {
      throw new AppError('Task not found or unauthorized', 404);
    }

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const toggleTaskStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const task = await taskService.getTaskById(id, userId);
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    await taskService.updateTask(id, userId, { status: newStatus });

    res.json({ success: true, message: `Task marked as ${newStatus}` });
  } catch (error) {
    next(error);
  }
};
