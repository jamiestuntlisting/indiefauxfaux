'use client';

import { useState } from 'react';
import { useCampaign } from '@/contexts/CampaignContext';
import { RewardTier } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function RewardTierEditor() {
  const { state, updateRewardTier, addRewardTier, deleteRewardTier } = useCampaign();
  const { campaign } = state;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Partial<RewardTier>>({});

  const startEditing = (tier: RewardTier) => {
    setEditingId(tier.id);
    setEditForm({ ...tier });
  };

  const saveEdit = () => {
    if (editingId && editForm) {
      updateRewardTier(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const startAdding = () => {
    setIsAdding(true);
    setEditForm({
      title: '',
      description: '',
      price: 0,
      quantityAvailable: null,
      estimatedDelivery: ''
    });
  };

  const saveNew = () => {
    if (editForm.title && editForm.price) {
      addRewardTier({
        title: editForm.title!,
        description: editForm.description || '',
        price: editForm.price!,
        quantityAvailable: editForm.quantityAvailable ?? null,
        estimatedDelivery: editForm.estimatedDelivery || 'TBD'
      });
      setIsAdding(false);
      setEditForm({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setEditForm({});
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Reward Tiers</h2>
        {!isAdding && !editingId && (
          <button
            onClick={startAdding}
            className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Add Tier
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Add New Tier Form */}
        {isAdding && (
          <div className="border-2 border-teal-500 rounded-lg p-4 bg-teal-50">
            <h3 className="font-medium text-gray-900 mb-3">New Reward Tier</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={editForm.price || ''}
                  onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <textarea
                placeholder="Description"
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Quantity (leave empty for unlimited)"
                  value={editForm.quantityAvailable ?? ''}
                  onChange={(e) => setEditForm({ ...editForm, quantityAvailable: e.target.value ? Number(e.target.value) : null })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Est. Delivery (e.g., March 2025)"
                  value={editForm.estimatedDelivery || ''}
                  onChange={(e) => setEditForm({ ...editForm, estimatedDelivery: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNew}
                  className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Add Tier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Tiers */}
        {campaign.rewardTiers
          .sort((a, b) => a.price - b.price)
          .map((tier) => (
            <div
              key={tier.id}
              className={`border rounded-lg p-4 ${
                editingId === tier.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
              }`}
            >
              {editingId === tier.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                      type="number"
                      value={editForm.price || ''}
                      onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Quantity (leave empty for unlimited)"
                      value={editForm.quantityAvailable ?? ''}
                      onChange={(e) => setEditForm({ ...editForm, quantityAvailable: e.target.value ? Number(e.target.value) : null })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                      type="text"
                      value={editForm.estimatedDelivery || ''}
                      onChange={(e) => setEditForm({ ...editForm, estimatedDelivery: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEdit}
                      className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-teal-600">{formatCurrency(tier.price)}</span>
                      <span className="font-medium text-gray-900">{tier.title}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{tier.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>{tier.quantityClaimed} claimed</span>
                      <span>
                        {tier.quantityAvailable ? `${tier.quantityAvailable - tier.quantityClaimed} left` : 'Unlimited'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(tier)}
                      className="p-2 text-gray-400 hover:text-teal-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteRewardTier(tier.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
