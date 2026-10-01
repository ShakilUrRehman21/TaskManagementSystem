'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import StatsBento from '@/components/StatsBento';
import VengenceNavbar from '@/components/VengenceNavbar';
import { Task } from '@/services/taskService';
import { Plus, Search, RefreshCw, X, Inbox } from 'lucide-react';

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'pending' | 'completed' | ''>('');
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { data, isLoading, refetch } = useTasks({ search, status, page });

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const allTasks = data?.tasks || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <VengenceNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Tasks
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Organize, track, and complete your projects.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => refetch()}
              className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
              title="Refresh list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add task</span>
            </button>
          </div>
        </div>

        {/* Stats Bento Overview */}
        <StatsBento tasks={allTasks} />

        {/* Filter and Search Bar */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none text-slate-900 placeholder-slate-400 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setStatus('')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                status === ''
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatus('pending')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                status === 'pending'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatus('completed')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                status === 'completed'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Tasks List / Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-7 h-7 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
            <p className="text-xs text-slate-500 font-medium">Loading tasks...</p>
          </div>
        ) : allTasks.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-xl border border-dashed border-slate-200">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              No tasks found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {search || status
                ? 'Try adjusting your search query or filter settings.'
                : 'Create your first task to start organizing your work.'}
            </p>
            <div className="mt-4">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add task
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} onEdit={handleEdit} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-1.5 text-xs">
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-md font-medium transition-all ${
                  p === page
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Task Modal */}
      {isFormOpen && <TaskForm task={editingTask} onClose={closeForm} />}
    </div>
  );
}
