'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function ProgressBar({
  percentage,
  showLabel = false,
  size = 'md',
  animated = true
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => {
      setWidth(Math.min(100, percentage));
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const heightClass = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }[size];

  return (
    <div className="w-full">
      <div className={`bg-gray-200 rounded-full overflow-hidden ${heightClass}`}>
        <div
          className={`${heightClass} bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full ${
            animated ? 'transition-all duration-1000 ease-out' : ''
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-right">
          <span className="text-sm font-semibold text-teal-600">{Math.round(percentage)}% funded</span>
        </div>
      )}
    </div>
  );
}
