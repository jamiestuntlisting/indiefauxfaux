'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllProjects, saveProject, deleteProject, createBlankProject, createProjectFromGenerated, StoredProject, GeneratedCampaignData } from '@/lib/store';
import { formatCurrency, calculatePercentage, calculateDaysRemaining } from '@/lib/utils';

function AIGenerateModal({ isOpen, onClose, onCreated }: { isOpen: boolean; onClose: () => void; onCreated: (id: string) => void }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Generation failed');
      }

      const generated: GeneratedCampaignData = await res.json();
      const project = createProjectFromGenerated(generated);
      saveProject(project);
      onCreated(project.campaign.id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={!loading ? onClose : undefined} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-bounce-in">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">AI Campaign Generator</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Describe your project idea and AI will generate a full campaign with story, FAQ, reward tiers, and more.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What&apos;s your project idea?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A Law & Order parody where detectives are hunting a gorilla that escaped from the zoo and is causing mayhem in a warehouse district..."
              rows={4}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 disabled:opacity-50 resize-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Campaign
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [projects, setProjects] = useState<StoredProject[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  useEffect(() => {
    setProjects(getAllProjects());
    setLoaded(true);
  }, []);

  const handleCreateBlank = () => {
    const project = createBlankProject();
    saveProject(project);
    router.push(`/dashboard/${project.campaign.id}`);
  };

  const handleAICreated = (id: string) => {
    setShowAIModal(false);
    router.push(`/dashboard/${id}`);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    deleteProject(id);
    setProjects(getAllProjects());
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">IF</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Indie<span className="text-teal-600">Faux</span>Faux
              </span>
            </div>
            <span className="text-sm text-gray-500 hidden sm:block">Creator Studio</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Projects</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Create fake crowdfunding campaigns, customise them, and share the public
            <span className="font-semibold text-rose-500"> IndieFoFo </span>
            page with anyone. They&apos;ll see a real-looking campaign with live donations rolling in.
          </p>
        </div>

        {/* Create Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <button
            onClick={() => setShowAIModal(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate with AI
          </button>
          <button
            onClick={handleCreateBlank}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Blank Project
          </button>
        </div>

        {/* Project Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500 text-lg mb-2">No projects yet</p>
            <p className="text-gray-400 text-sm">Generate your first campaign with AI or start from scratch.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const { campaign } = project;
              const pct = calculatePercentage(campaign.amountRaised, campaign.fundingGoal);
              const daysLeft = calculateDaysRemaining(campaign.endDate);

              return (
                <div
                  key={campaign.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-2 bg-gradient-to-r from-teal-500 to-emerald-600" />

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{campaign.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{campaign.tagline}</p>

                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-teal-600 font-semibold">{formatCurrency(campaign.amountRaised)}</span>
                        <span className="text-gray-500">{pct}% of {formatCurrency(campaign.fundingGoal)}</span>
                      </div>
                    </div>

                    <div className="flex gap-4 text-xs text-gray-500 mb-5">
                      <span>{campaign.backerCount} backers</span>
                      <span>{daysLeft} days left</span>
                      <span>by {campaign.creatorName}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/${campaign.id}`}
                        className="flex-1 text-center py-2 px-3 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href={`/p/${campaign.id}`}
                        className="flex-1 text-center py-2 px-3 bg-rose-50 text-rose-600 text-sm font-medium rounded-lg hover:bg-rose-100 transition-colors"
                      >
                        View FoFo Page
                      </Link>
                      <button
                        onClick={() => handleDelete(campaign.id)}
                        className="py-2 px-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete project"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <AIGenerateModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onCreated={handleAICreated}
      />
    </div>
  );
}
