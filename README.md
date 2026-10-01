# TaskFlow — Modern Task Management System

A full-stack, production-ready task management platform built with Next.js, Express, Prisma, and PostgreSQL. Designed with a clean, minimal light-mode aesthetic, responsive layouts, and robust JWT authentication.

---

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State & Data Fetching**: TanStack React Query
- **Icons**: Lucide React
- **Notifications**: Sonner

### Backend
- **Framework**: Express.js
- **Language**: TypeScript (Node.js runtime via `tsx`)
- **ORM**: Prisma
- **Database**: PostgreSQL (Neon Serverless)
- **Authentication**: JWT (Access & Refresh tokens) + bcrypt + cookie-parser
- **Validation**: Zod

---

## Features

- **Authentication & Security**: Register and log in with JWT stored securely in HTTP-only cookies.
- **Task Management**: Create, view, update, and delete tasks.
- **Status Toggle**: Instant toggle between Pending and Completed with optimistic UI updates.
- **Analytics Bento Grid**: At-a-glance metrics for Total Tasks, Pending, Completed, and Completion Velocity.
- **Search & Filter**: Real-time keyword search and segmented status tabs (All, Pending, Completed).
- **Pagination**: Server-side paginated queries for smooth performance with large task volumes.
- **Clean SaaS UI**: Light, accessible, modern UI with subtle borders, smooth micro-interactions, and zero clutter.

---

## Project Structure

```
TaskManagementSystem/
├── backend/
│   ├── prisma/             # Database schema
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Auth, error handling
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── server.ts       # Express entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js App Router (dashboard, login, register)
│   │   ├── components/     # UI components (TaskCard, TaskForm, StatsBento, Navbar)
│   │   ├── hooks/          # React Query custom hooks
│   │   └── services/       # API client services
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

---

## Getting Started Locally

### 1. Prerequisites
- Node.js 18+ (tested on Node 20 / 24)
- PostgreSQL database (or free Neon PostgreSQL cluster)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT secrets
npm run prisma:generate
npm run prisma:push
npm run dev # Starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Verify NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev # Starts on http://localhost:3000
```

---

## Deployment Guide

### Option 1: Vercel (Frontend) + Render / Railway (Backend)

#### A. Deploy Backend on Render (Web Service)
1. Push repository to GitHub.
2. In Render Dashboard, click **New > Web Service** and select your repository.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Set Environment Variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `JWT_ACCESS_SECRET`: Secure random string
   - `JWT_REFRESH_SECRET`: Secure random string
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: Your Vercel frontend URL (e.g. `https://your-taskflow.vercel.app`)
5. Click **Deploy**. Note the backend URL (e.g. `https://taskflow-api.onrender.com`).

#### B. Deploy Frontend on Vercel
1. In Vercel Dashboard, click **Add New > Project** and import the repository.
2. Configure settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
3. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: Your backend URL (e.g. `https://taskflow-api.onrender.com`)
4. Click **Deploy**.
