import { Task } from '@/services/taskService';
import { useToggleTask, useDeleteTask } from '@/hooks/useTasks';
import { CheckCircle, Circle, Trash2, Edit2, Calendar } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const toggleMutation = useToggleTask();
  const deleteMutation = useDeleteTask();

  const handleToggle = () => {
    toggleMutation.mutate(task.id);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(task.id);
    }
  };

  return (
    <div className={cn(
      "p-6 bg-white rounded-xl shadow-sm border transition-all duration-200 group hover:shadow-md",
      task.status === 'completed' ? "border-green-100 bg-green-50/10" : "border-gray-100"
    )}>
      <div className="flex items-start gap-4">
        <button 
          onClick={handleToggle}
          className={cn(
            "mt-1 transition-transform active:scale-90",
            task.status === 'completed' ? "text-green-500" : "text-gray-400 hover:text-indigo-500"
          )}
        >
          {task.status === 'completed' ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-lg font-semibold truncate",
            task.status === 'completed' && "text-gray-400 line-through"
          )}>
            {task.title}
          </h3>
          {task.description && (
            <p className={cn(
              "mt-1 text-gray-600 line-clamp-2 text-sm",
              task.status === 'completed' && "text-gray-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(task.createdAt).toLocaleDateString()}
            </div>
            <div className={cn(
              "px-2 py-0.5 rounded-full font-medium uppercase tracking-wider",
              task.status === 'completed' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            )}>
              {task.status}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
