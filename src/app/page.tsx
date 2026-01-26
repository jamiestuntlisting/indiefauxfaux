'use client';

import { useState } from 'react';
import { useCampaign } from '@/contexts/CampaignContext';
import Header from '@/components/Header';
import CampaignHero from '@/components/CampaignHero';
import StatsDisplay from '@/components/StatsDisplay';
import RewardCard from '@/components/RewardCard';
import TabbedContent from '@/components/TabbedContent';
import CreatorInfo from '@/components/CreatorInfo';
import BackProjectModal from '@/components/BackProjectModal';
import ToastContainer from '@/components/ToastContainer';

export default function CampaignPage() {
  const { state } = useCampaign();
  const { campaign } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}
            <CampaignHero
              title={campaign.title}
              tagline={campaign.tagline}
              projectImage={campaign.projectImage}
              projectVideo={campaign.projectVideo}
            />

            {/* Stats - Mobile Only */}
            <div className="lg:hidden bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <StatsDisplay
                amountRaised={campaign.amountRaised}
                fundingGoal={campaign.fundingGoal}
                backerCount={campaign.backerCount}
                endDate={campaign.endDate}
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-emerald-700 transition-all shadow-lg shadow-teal-500/25"
              >
                Back This Project
              </button>
            </div>

            {/* Tabbed Content */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <TabbedContent
                story={campaign.story}
                faq={campaign.faq}
                updates={campaign.updates}
              />
            </div>

            {/* Creator Info - Mobile Only */}
            <div className="lg:hidden">
              <CreatorInfo
                name={campaign.creatorName}
                bio={campaign.creatorBio}
                image={campaign.creatorImage}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6 mt-0">
            <div className="sticky top-24">
              {/* Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                <StatsDisplay
                  amountRaised={campaign.amountRaised}
                  fundingGoal={campaign.fundingGoal}
                  backerCount={campaign.backerCount}
                  endDate={campaign.endDate}
                />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-emerald-700 transition-all shadow-lg shadow-teal-500/25"
                >
                  Back This Project
                </button>
              </div>

              {/* Rewards */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Select a Reward</h2>
                {campaign.rewardTiers
                  .sort((a, b) => a.price - b.price)
                  .map((reward) => (
                    <RewardCard
                      key={reward.id}
                      reward={reward}
                      onSelect={() => setIsModalOpen(true)}
                    />
                  ))}
              </div>

              {/* Creator Info */}
              <div className="mt-6">
                <CreatorInfo
                  name={campaign.creatorName}
                  bio={campaign.creatorBio}
                  image={campaign.creatorImage}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Rewards */}
        <div className="lg:hidden mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Select a Reward</h2>
          {campaign.rewardTiers
            .sort((a, b) => a.price - b.price)
            .map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                onSelect={() => setIsModalOpen(true)}
              />
            ))}
        </div>
      </main>

      {/* Modal */}
      <BackProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectTitle={campaign.title}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
