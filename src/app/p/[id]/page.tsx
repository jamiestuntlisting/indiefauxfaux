'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getProject, StoredProject } from '@/lib/store';
import { decodeShareData } from '@/lib/sharing';
import { defaultEngineConfig } from '@/lib/sampleData';
import { CampaignProvider } from '@/contexts/CampaignContext';
import PublicCampaignView from '@/components/PublicCampaignView';

export default function PublicPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<StoredProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // First try to load from URL hash (shared link - works cross-device)
    const hash = window.location.hash.slice(1);
    if (hash) {
      const decoded = decodeShareData(hash);
      if (decoded) {
        setProject({ campaign: decoded.c, engineConfig: decoded.e });
        setLoading(false);
        return;
      }
    }

    // Fall back to localStorage (same device)
    const local = getProject(id);
    if (local) {
      setProject(local);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading campaign...</div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Campaign Not Found</h1>
          <p className="text-gray-600">
            This campaign doesn&apos;t exist or the link may have expired.
            If someone shared this link with you, ask them to re-share it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <CampaignProvider project={project} persist={false} autoStart={true}>
      <PublicCampaignView />
    </CampaignProvider>
  );
}
