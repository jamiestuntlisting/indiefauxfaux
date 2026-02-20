'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProject, StoredProject } from '@/lib/store';
import { buildShareUrl } from '@/lib/sharing';
import { CampaignProvider, useCampaign } from '@/contexts/CampaignContext';
import Header from '@/components/Header';
import EngineControls from '@/components/Dashboard/EngineControls';
import CampaignStats from '@/components/Dashboard/CampaignStats';
import CampaignEditor from '@/components/Dashboard/CampaignEditor';
import RewardTierEditor from '@/components/Dashboard/RewardTierEditor';
import ToastContainer from '@/components/ToastContainer';

function ShareButton() {
  const { state } = useCampaign();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = buildShareUrl(state.campaign, state.engineConfig);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {copied ? 'Link Copied!' : 'Copy Share Link'}
    </button>
  );
}

function DashboardContent({ campaignId }: { campaignId: string }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showDashboardLink={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Creator Dashboard</h1>
              </div>
              <p className="text-gray-600 ml-8">Manage your campaign and control the donation engine</p>
            </div>
            <div className="flex gap-3 ml-8 sm:ml-0">
              <ShareButton />
              <Link
                href={`/p/${campaignId}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View FoFo Page
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <EngineControls />
            <CampaignStats />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <CampaignEditor />
            <RewardTierEditor />
          </div>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}

export default function DashboardPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<StoredProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = getProject(id);
    setProject(p);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h1>
          <p className="text-gray-600 mb-6">This project doesn&apos;t exist or has been deleted.</p>
          <Link href="/" className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <CampaignProvider project={project} persist={true}>
      <DashboardContent campaignId={id} />
    </CampaignProvider>
  );
}
