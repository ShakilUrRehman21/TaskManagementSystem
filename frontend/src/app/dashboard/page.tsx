'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/services/taskService';
import { logout } from '@/services/authService';
import { Plus, Search, LogOut, Layout, ListTodo, CheckCircle2, Clock } from 'lucide-react';

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'pending' | 'completed' | ''>('');
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { data, isLoading } = useTasks({ search, status, page });

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                TaskFlow
              </h1>
            </div>
            
            <button 
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Your Tasks</h2>
            <p className="text-gray-500 mt-1">Keep track of your productivity and goals</p>
          </div>
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
          >
            <Plus className="w-5 h-5" />
            Add New Task
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl w-fit">
            <button
              onClick={() => setStatus('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                status === '' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatus('pending')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                status === 'pending' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              <Clock className="w-4 h-4" />
              Pending
            </button>
            <button
              onClick={() => setStatus('completed')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                status === 'completed' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </button>
          </div>
        </div>

        {/* Tasks Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading your tasks...</p>
          </div>
        ) : data?.tasks.length === 0 ? (
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ListTodo className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No tasks found</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              {search || status ? "Try adjusting your filters or search term." : "Time to add your first task and stay organized!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.tasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} onEdit={handleEdit} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg font-bold transition ${
                  p === page ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-indigo-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </main>

      {isFormOpen && <TaskForm task={editingTask} onClose={closeForm} />}
    </div>
  );
}
