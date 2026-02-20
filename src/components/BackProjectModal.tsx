'use client';

import { useState, useEffect } from 'react';

interface BackProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export default function BackProjectModal({ isOpen, onClose, projectTitle }: BackProjectModalProps) {
  const [showSecondModal, setShowSecondModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowSecondModal(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleYes = () => {
    setShowSecondModal(true);
  };

  const handleNo = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-bounce-in">
        {!showSecondModal ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤔</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Hold Up!</h2>
              <p className="text-gray-600">
                Do you <span className="font-semibold">seriously</span> want to give money to these jokers?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleNo}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                No, I&apos;m Good
              </button>
              <button
                onClick={handleYes}
                className="flex-1 py-3 px-4 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Yes, Take My Money!
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">😅</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Plot Twist!</h2>
              <p className="text-gray-600 mb-4">
                This is <span className="font-semibold text-rose-500">IndieFoFo</span> — a crowdfunding parody site!
              </p>
              <p className="text-sm text-gray-500">
                No actual payment processing here. But we appreciate your enthusiasm for &quot;{projectTitle}&quot;!
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-semibold">Fun fact:</span> This site is designed for creative projects, comedy sketches, and film production. The donations you see are simulated!
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              Got It, Very Clever!
            </button>
          </>
        )}
      </div>
    </div>
  );
}
