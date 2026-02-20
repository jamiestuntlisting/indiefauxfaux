'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllProjects, saveProject, deleteProject, duplicateAsGorillaw, createNewProject, StoredProject } from '@/lib/store';
import { formatCurrency, calculatePercentage, calculateDaysRemaining } from '@/lib/utils';

export default function HomePage() {
  const [projects, setProjects] = useState<StoredProject[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProjects(getAllProjects());
    setLoaded(true);
  }, []);

  const handleCreateNew = (useTemplate: boolean) => {
    const project = useTemplate ? duplicateAsGorillaw() : createNewProject();
    saveProject(project);
    setProjects(getAllProjects());
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
        {/* Hero / Intro */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Projects</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Create crowdfunding campaigns, customise them, and share the public &ldquo;FauxFaux&rdquo; page with anyone.
            They&apos;ll see a real-looking campaign with live donations rolling in.
          </p>
        </div>

        {/* Create Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <button
            onClick={() => handleCreateNew(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-emerald-700 transition-all shadow-lg shadow-teal-500/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New from &ldquo;Gorillaw and Order&rdquo; Template
          </button>
          <button
            onClick={() => handleCreateNew(false)}
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
            <p className="text-gray-400 text-sm">Create your first campaign above to get started.</p>
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
                  {/* Card Header */}
                  <div className="h-2 bg-gradient-to-r from-teal-500 to-emerald-600" />

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{campaign.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{campaign.tagline}</p>

                    {/* Mini Stats */}
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

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/${campaign.id}`}
                        className="flex-1 text-center py-2 px-3 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href={`/p/${campaign.id}`}
                        className="flex-1 text-center py-2 px-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        View FauxFaux Page
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
    </div>
  );
}
