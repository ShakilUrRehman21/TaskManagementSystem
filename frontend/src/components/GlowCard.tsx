'use client';

import React from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function GlowCard({
  children,
  className = '',
}: GlowCardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200/80 bg-white shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
