'use client';

import Header from '@/components/Header';
import EngineControls from '@/components/Dashboard/EngineControls';
import CampaignStats from '@/components/Dashboard/CampaignStats';
import CampaignEditor from '@/components/Dashboard/CampaignEditor';
import RewardTierEditor from '@/components/Dashboard/RewardTierEditor';
import ToastContainer from '@/components/ToastContainer';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Creator Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your campaign and control the donation engine</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Campaign
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Engine Controls & Stats */}
          <div className="space-y-6">
            <EngineControls />
            <CampaignStats />
          </div>

          {/* Right Column - Campaign & Reward Editors */}
          <div className="lg:col-span-2 space-y-6">
            <CampaignEditor />
            <RewardTierEditor />
          </div>
        </div>
      </main>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
