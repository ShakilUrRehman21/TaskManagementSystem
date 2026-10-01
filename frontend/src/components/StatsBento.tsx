'use client';

import React from 'react';
import { Task } from '@/services/taskService';
import { CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react';

interface StatsBentoProps {
  tasks: Task[];
}

export default function StatsBento({ tasks }: StatsBentoProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Tasks */}
      <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Total Tasks</span>
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <ListTodo className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900">{total}</span>
          <span className="text-xs text-slate-400">tasks created</span>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Pending</span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900">{pending}</span>
          <span className="text-xs text-amber-600 font-medium">in progress</span>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Completed</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900">{completed}</span>
          <span className="text-xs text-emerald-600 font-medium">finished</span>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Completion Rate</span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900">{completionRate}%</span>
        </div>
        <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
