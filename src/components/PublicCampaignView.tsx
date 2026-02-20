'use client';

import { useState } from 'react';
import { useCampaign } from '@/contexts/CampaignContext';
import CampaignHero from '@/components/CampaignHero';
import StatsDisplay from '@/components/StatsDisplay';
import RewardCard from '@/components/RewardCard';
import TabbedContent from '@/components/TabbedContent';
import CreatorInfo from '@/components/CreatorInfo';
import BackProjectModal from '@/components/BackProjectModal';
import ToastContainer from '@/components/ToastContainer';

export default function PublicCampaignView() {
  const { state } = useCampaign();
  const { campaign } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Public header — IndieFoFo branding, no dashboard links */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">iF</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Indie<span className="text-rose-500">FoFo</span>
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <span className="text-gray-600 cursor-default hover:text-gray-900">Explore</span>
              <span className="text-gray-600 cursor-default hover:text-gray-900">Start a Project</span>
              <span className="text-gray-600 cursor-default hover:text-gray-900">About</span>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
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
                className="w-full mt-6 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-500/25"
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
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                <StatsDisplay
                  amountRaised={campaign.amountRaised}
                  fundingGoal={campaign.fundingGoal}
                  backerCount={campaign.backerCount}
                  endDate={campaign.endDate}
                />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-500/25"
                >
                  Back This Project
                </button>
              </div>

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

      <BackProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectTitle={campaign.title}
      />

      <ToastContainer />
    </div>
  );
}
