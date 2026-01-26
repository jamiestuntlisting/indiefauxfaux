'use client';

import { useCampaign } from '@/contexts/CampaignContext';
import { formatCurrency, formatNumber, calculatePercentage, calculateDaysRemaining } from '@/lib/utils';
import ProgressBar from '../ProgressBar';

export default function CampaignStats() {
  const { state } = useCampaign();
  const { campaign } = state;

  const percentage = calculatePercentage(campaign.amountRaised, campaign.fundingGoal);
  const daysRemaining = calculateDaysRemaining(campaign.endDate);

  const stats = [
    { label: 'Amount Raised', value: formatCurrency(campaign.amountRaised), color: 'text-teal-600' },
    { label: 'Funding Goal', value: formatCurrency(campaign.fundingGoal), color: 'text-gray-900' },
    { label: 'Backers', value: formatNumber(campaign.backerCount), color: 'text-gray-900' },
    { label: 'Days Left', value: daysRemaining.toString(), color: daysRemaining < 7 ? 'text-red-600' : 'text-gray-900' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign Stats</h2>

      <div className="mb-6">
        <ProgressBar percentage={percentage} size="lg" />
        <p className="text-center text-sm text-gray-600 mt-2">
          <span className="font-semibold text-teal-600">{percentage}%</span> of goal reached
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Donations */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Donations</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {campaign.donations.slice(-10).reverse().map((donation) => (
            <div key={donation.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{donation.backerName}</span>
              <span className="font-medium text-teal-600">{formatCurrency(donation.amount)}</span>
            </div>
          ))}
          {campaign.donations.length === 0 && (
            <p className="text-gray-400 text-center py-4">No donations yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
