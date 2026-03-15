import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import * as userService from '../services/userService';
import * as jwtUtils from '../utils/jwt';
import { AppError } from '../middlewares/errorHandler';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      throw new AppError('Missing required fields', 400);
    }

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const user = await userService.createUser({ name, email, password });
    
    const accessToken = jwtUtils.generateAccessToken(user.id);
    const refreshToken = jwtUtils.generateRefreshToken(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Missing email or password', 400);
    }

    const user = await userService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid credentials', 401);
    }

    const accessToken = jwtUtils.generateAccessToken(user.id);
    const refreshToken = jwtUtils.generateRefreshToken(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email },
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError('No refresh token provided', 401);
    }

    const decoded = jwtUtils.verifyRefreshToken(refreshToken);
    const accessToken = jwtUtils.generateAccessToken(decoded.userId);

    res.json({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    next(new AppError('Invalid refresh token', 401));
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
};
