'use client';

import React from 'react';
import { logout } from '@/services/authService';
import { LogOut, CheckSquare } from 'lucide-react';

export default function VengenceNavbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white shadow-xs">
              <CheckSquare className="w-4 h-4" />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-base tracking-tight text-slate-900">
                TaskFlow
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Workspace
              </span>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
