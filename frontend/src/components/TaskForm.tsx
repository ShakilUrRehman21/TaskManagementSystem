'use client';

import { useState, useEffect } from 'react';
import { useCreateTask, useUpdateTask } from '@/hooks/useTasks';
import { Task } from '@/services/taskService';
import { X, Tag } from 'lucide-react';

interface TaskFormProps {
  task?: Task | null;
  onClose: () => void;
}

const PRESET_TAGS = ['Feature', 'Bug Fix', 'Urgent', 'Documentation'];

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (task) {
      updateMutation.mutate(
        { id: task.id, data: { title, description } },
        { onSuccess: onClose }
      );
    } else {
      createMutation.mutate(
        { title, description },
        { onSuccess: onClose }
      );
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {task ? 'Edit task' : 'Create new task'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {task ? 'Update task details and specifications' : 'Fill in details to add a task to your workspace'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Quick Category Tags */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Category Tag (Optional)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_TAGS.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => {
                    if (!title.includes(`[${tag}]`)) {
                      setTitle(`[${tag}] ${title}`.trim());
                    }
                  }}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 transition-colors cursor-pointer"
                >
                  +{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Prepare quarterly performance summary"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder-slate-400 outline-none text-sm transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Add context, action items, or relevant links..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder-slate-400 outline-none text-sm transition-all resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !title.trim()}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
            >
              {isPending ? 'Saving...' : task ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
