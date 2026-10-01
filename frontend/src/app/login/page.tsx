'use client';

import { useState } from 'react';
import { login } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { CheckSquare } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success('Signed in successfully.');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid email or password.');
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
            Sign in to TaskFlow
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your credentials to access your workspace
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl bg-white border border-slate-200 p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-slate-900 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
