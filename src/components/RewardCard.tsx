'use client';

import { RewardTier } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface RewardCardProps {
  reward: RewardTier;
  onSelect: () => void;
}

export default function RewardCard({ reward, onSelect }: RewardCardProps) {
  const isLimited = reward.quantityAvailable !== null;
  const remaining = isLimited ? reward.quantityAvailable! - reward.quantityClaimed : null;
  const isSoldOut = isLimited && remaining !== null && remaining <= 0;

  return (
    <div
      className={`border rounded-lg p-5 transition-all ${
        isSoldOut
          ? 'bg-gray-50 border-gray-200 opacity-60'
          : 'bg-white border-gray-200 hover:border-teal-400 hover:shadow-md cursor-pointer'
      }`}
      onClick={() => !isSoldOut && onSelect()}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-2xl font-bold text-teal-600">{formatCurrency(reward.price)}</span>
        {isLimited && (
          <span className={`text-sm px-2 py-1 rounded ${
            isSoldOut
              ? 'bg-red-100 text-red-700'
              : remaining !== null && remaining < 10
                ? 'bg-orange-100 text-orange-700'
                : 'bg-gray-100 text-gray-600'
          }`}>
            {isSoldOut ? 'Sold Out' : `${remaining} left`}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.title}</h3>
      <p className="text-gray-600 text-sm mb-4 whitespace-pre-wrap">{reward.description}</p>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Est. delivery: {reward.estimatedDelivery}</span>
        <span className="text-gray-500">{reward.quantityClaimed} claimed</span>
      </div>

      {!isSoldOut && (
        <button
          className="w-full mt-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          Select This Reward
        </button>
      )}
    </div>
  );
}
