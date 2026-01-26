'use client';

import { useCampaign } from '@/contexts/CampaignContext';
import { VelocityMode } from '@/types';

export default function EngineControls() {
  const { state, setEngineConfig, startEngine, stopEngine, triggerManualDonation, resetCampaign } = useCampaign();
  const { engineConfig } = state;

  const velocityModes: { value: VelocityMode; label: string; description: string }[] = [
    { value: 'slow', label: 'Slow', description: '30-90 seconds' },
    { value: 'medium', label: 'Medium', description: '10-45 seconds' },
    { value: 'fast', label: 'Fast', description: '3-15 seconds' },
    { value: 'viral', label: 'Viral', description: '1-5 seconds' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Donation Engine</h2>

      {/* Engine Status */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className={`w-3 h-3 rounded-full ${engineConfig.isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
        <span className="font-medium text-gray-900">
          {engineConfig.isRunning ? 'Engine Running' : 'Engine Stopped'}
        </span>
      </div>

      {/* Start/Stop Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={startEngine}
          disabled={engineConfig.isRunning}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            engineConfig.isRunning
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Start
          </span>
        </button>
        <button
          onClick={stopEngine}
          disabled={!engineConfig.isRunning}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            !engineConfig.isRunning
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
            </svg>
            Pause
          </span>
        </button>
      </div>

      {/* Velocity Mode */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Donation Velocity
        </label>
        <div className="grid grid-cols-2 gap-2">
          {velocityModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => setEngineConfig({ velocityMode: mode.value })}
              className={`p-3 rounded-lg border-2 text-left transition-colors ${
                engineConfig.velocityMode === mode.value
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="font-medium text-gray-900">{mode.label}</span>
              <span className="block text-xs text-gray-500">{mode.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Interval */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Interval Range (seconds)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={engineConfig.minInterval}
            onChange={(e) => setEngineConfig({ minInterval: Number(e.target.value) })}
            min={1}
            max={300}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            value={engineConfig.maxInterval}
            onChange={(e) => setEngineConfig({ maxInterval: Number(e.target.value) })}
            min={1}
            max={300}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Manual Trigger */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Manual Controls</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => triggerManualDonation()}
            className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Random Donation
          </button>
          <button
            onClick={() => triggerManualDonation(25)}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            $25
          </button>
          <button
            onClick={() => triggerManualDonation(50)}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            $50
          </button>
          <button
            onClick={() => triggerManualDonation(100)}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            $100
          </button>
          <button
            onClick={() => triggerManualDonation(500)}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            $500
          </button>
        </div>
      </div>

      {/* Reset */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <button
          onClick={resetCampaign}
          className="w-full py-2 px-4 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
        >
          Reset Campaign Stats
        </button>
      </div>
    </div>
  );
}
