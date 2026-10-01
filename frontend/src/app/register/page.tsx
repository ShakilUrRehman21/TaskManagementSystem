'use client';

import { useState } from 'react';
import { register } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { CheckSquare } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password });
      toast.success('Account created successfully.');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <CheckSquare className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Create an account
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Start organizing your tasks with TaskFlow
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl bg-white border border-slate-200 p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full name
              </label>
              <input
                type="text"
                required
                placeholder="Alex Morgan"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder-slate-400 outline-none text-sm transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder-slate-400 outline-none text-sm transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder-slate-400 outline-none text-sm transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-slate-900 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
