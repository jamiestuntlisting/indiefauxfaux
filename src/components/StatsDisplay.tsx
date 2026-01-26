'use client';

import { formatCurrency, formatNumber, calculateDaysRemaining, calculatePercentage } from '@/lib/utils';
import ProgressBar from './ProgressBar';

interface StatsDisplayProps {
  amountRaised: number;
  fundingGoal: number;
  backerCount: number;
  endDate: string;
}

export default function StatsDisplay({
  amountRaised,
  fundingGoal,
  backerCount,
  endDate
}: StatsDisplayProps) {
  const daysRemaining = calculateDaysRemaining(endDate);
  const percentage = calculatePercentage(amountRaised, fundingGoal);

  return (
    <div className="space-y-4">
      <ProgressBar percentage={percentage} size="lg" />

      <div className="space-y-2">
        <div>
          <span className="text-3xl font-bold text-gray-900">{formatCurrency(amountRaised)}</span>
          <span className="text-gray-500 ml-2">raised of {formatCurrency(fundingGoal)} goal</span>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600">
          <div>
            <span className="font-semibold text-gray-900">{formatNumber(backerCount)}</span>
            <span className="ml-1">backers</span>
          </div>
          <div>
            <span className="font-semibold text-gray-900">{daysRemaining}</span>
            <span className="ml-1">{daysRemaining === 1 ? 'day' : 'days'} to go</span>
          </div>
        </div>
      </div>

      {percentage >= 100 && (
        <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Funded!
        </div>
      )}
    </div>
  );
}
