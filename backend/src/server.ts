import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://task-management-system-teal-gamma-52.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, mobile, server-side)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed list or vercel preview domains
    const isAllowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      process.env.NODE_ENV !== 'production';

    if (isAllowed) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive to avoid breaking preview branches
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Root & Health check routes
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'TaskFlow API Server is running',
    version: '1.0.0',
    databaseConfigured: Boolean(process.env.DATABASE_URL),
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/auth',
      tasks: '/tasks',
      health: '/health',
    },
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    databaseConfigured: Boolean(process.env.DATABASE_URL),
  });
});

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Database URL configured: ${Boolean(process.env.DATABASE_URL)}`);
});
