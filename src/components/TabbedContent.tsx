'use client';

import { useState } from 'react';
import { FAQItem, Update } from '@/types';

interface TabbedContentProps {
  story: string;
  faq: FAQItem[];
  updates: Update[];
}

type TabType = 'story' | 'faq' | 'updates';

export default function TabbedContent({ story, faq, updates }: TabbedContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('story');

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'story', label: 'Story' },
    { id: 'faq', label: 'FAQ', count: faq.length },
    { id: 'updates', label: 'Updates', count: updates.length }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'story' && (
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {story.split('\n').map((line, idx) => {
                if (line.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-semibold text-gray-800 mt-6 mb-3">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                  return <li key={idx} className="ml-4 text-gray-600">{line.replace('- ', '')}</li>;
                }
                if (line.trim() === '') {
                  return <br key={idx} />;
                }
                return <p key={idx} className="mb-4">{line}</p>;
              })}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-4">
            {faq.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No FAQ items yet.</p>
            ) : (
              faq.map((item) => (
                <details
                  key={item.id}
                  className="group bg-gray-50 rounded-lg"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-gray-900">
                    {item.question}
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 whitespace-pre-wrap">
                    {item.answer}
                  </div>
                </details>
              ))
            )}
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="space-y-6">
            {updates.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No updates yet.</p>
            ) : (
              updates.map((update) => (
                <article key={update.id} className="border-l-4 border-teal-500 pl-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-500">{formatDate(update.date)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{update.title}</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{update.content}</p>
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
