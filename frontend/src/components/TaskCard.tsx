'use client';

import { Task } from '@/services/taskService';
import { useToggleTask, useDeleteTask } from '@/hooks/useTasks';
import { CheckCircle2, Circle, Trash2, Edit3, Calendar } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const toggleMutation = useToggleTask();
  const deleteMutation = useDeleteTask();

  const isCompleted = task.status === 'completed';

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMutation.mutate(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this task?')) {
      deleteMutation.mutate(task.id);
    }
  };

  return (
    <div
      className={`group p-5 rounded-xl bg-white border transition-all duration-200 ${
        isCompleted
          ? 'border-slate-200/60 bg-slate-50/40'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Checkbox Button */}
        <button
          onClick={handleToggle}
          disabled={toggleMutation.isPending}
          className={`mt-0.5 rounded-full p-0.5 transition-colors cursor-pointer ${
            isCompleted
              ? 'text-emerald-600 hover:text-emerald-700'
              : 'text-slate-300 hover:text-slate-600'
          }`}
          title={isCompleted ? 'Mark as pending' : 'Mark as complete'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 fill-emerald-50" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        {/* Content Details */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm font-semibold truncate tracking-tight ${
              isCompleted
                ? 'text-slate-400 line-through'
                : 'text-slate-900 group-hover:text-slate-800'
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`mt-1 text-xs line-clamp-2 leading-relaxed ${
                isCompleted ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Metadata Footer */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>

            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                isCompleted
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}
            >
              {isCompleted ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            title="Edit task"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
            title="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
