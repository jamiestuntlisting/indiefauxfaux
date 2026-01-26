'use client';

import { useCampaign } from '@/contexts/CampaignContext';
import { formatCurrency } from '@/lib/utils';

export default function ToastContainer() {
  const { state, removeToast } = useCampaign();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {state.toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-slide-in px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
            toast.type === 'donation'
              ? 'bg-white border border-teal-200'
              : toast.type === 'milestone'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-gray-800 text-white'
          }`}
        >
          {toast.type === 'donation' && (
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          {toast.type === 'milestone' && (
            <span className="text-xl">🎉</span>
          )}
          <span className={`text-sm font-medium ${toast.type === 'donation' ? 'text-gray-800' : ''}`}>
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            className={`ml-auto p-1 rounded hover:bg-black/10 transition-colors ${
              toast.type === 'donation' ? 'text-gray-400' : 'text-white/80'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
