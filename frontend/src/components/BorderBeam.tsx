'use client';

import React from 'react';

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export default function BorderBeam({
  size = 200,
  duration = 6,
  delay = 0,
  colorFrom = '#a855f7',
  colorTo = '#06b6d4',
  className = '',
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          '--size': size,
          '--duration': duration,
          '--delay': delay,
          '--color-from': colorFrom,
          '--color-to': colorTo,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] [mask-composite:exclude] after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:calc(var(--delay)*1s)] after:[animation-duration:calc(var(--duration)*1s)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:50%_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))] ${className}`}
    />
  );
}
