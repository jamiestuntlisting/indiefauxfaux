'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { Campaign, DonationEngineConfig, Donation, Toast, RewardTier } from '@/types';
import { sampleCampaign, defaultEngineConfig } from '@/lib/sampleData';
import { generateBackerName, generateDonationAmount, getVelocityIntervals } from '@/lib/nameGenerator';
import { generateId } from '@/lib/utils';

interface CampaignState {
  campaign: Campaign;
  engineConfig: DonationEngineConfig;
  toasts: Toast[];
}

type CampaignAction =
  | { type: 'SET_CAMPAIGN'; payload: Campaign }
  | { type: 'UPDATE_CAMPAIGN'; payload: Partial<Campaign> }
  | { type: 'ADD_DONATION'; payload: Donation }
  | { type: 'RESET_CAMPAIGN' }
  | { type: 'SET_ENGINE_CONFIG'; payload: Partial<DonationEngineConfig> }
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'LOAD_STATE'; payload: CampaignState };

const initialState: CampaignState = {
  campaign: sampleCampaign,
  engineConfig: defaultEngineConfig,
  toasts: []
};

function campaignReducer(state: CampaignState, action: CampaignAction): CampaignState {
  switch (action.type) {
    case 'SET_CAMPAIGN':
      return { ...state, campaign: action.payload };
    case 'UPDATE_CAMPAIGN':
      return { ...state, campaign: { ...state.campaign, ...action.payload } };
    case 'ADD_DONATION': {
      const donation = action.payload;
      const newDonations = [...state.campaign.donations, donation];
      return {
        ...state,
        campaign: {
          ...state.campaign,
          donations: newDonations,
          amountRaised: state.campaign.amountRaised + donation.amount,
          backerCount: state.campaign.backerCount + 1,
          rewardTiers: state.campaign.rewardTiers.map(tier =>
            tier.id === donation.rewardTierId
              ? { ...tier, quantityClaimed: tier.quantityClaimed + 1 }
              : tier
          )
        }
      };
    }
    case 'RESET_CAMPAIGN':
      return {
        ...state,
        campaign: {
          ...state.campaign,
          amountRaised: 0,
          backerCount: 0,
          donations: [],
          rewardTiers: state.campaign.rewardTiers.map(tier => ({
            ...tier,
            quantityClaimed: 0
          }))
        }
      };
    case 'SET_ENGINE_CONFIG':
      return { ...state, engineConfig: { ...state.engineConfig, ...action.payload } };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

interface CampaignContextValue {
  state: CampaignState;
  updateCampaign: (data: Partial<Campaign>) => void;
  addDonation: (amount: number, rewardTierId?: string | null) => void;
  triggerManualDonation: (amount?: number) => void;
  resetCampaign: () => void;
  setEngineConfig: (config: Partial<DonationEngineConfig>) => void;
  startEngine: () => void;
  stopEngine: () => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  updateRewardTier: (tierId: string, data: Partial<RewardTier>) => void;
  addRewardTier: (tier: Omit<RewardTier, 'id' | 'quantityClaimed'>) => void;
  deleteRewardTier: (tierId: string) => void;
}

const CampaignContext = createContext<CampaignContextValue | null>(null);

const STORAGE_KEY = 'indiefauxfaux_campaign_state';

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(campaignReducer, initialState);
  const engineTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  // Load state from localStorage on mount
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure engine is stopped when loading
        parsed.engineConfig.isRunning = false;
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      }
    } catch (error) {
      console.error('Failed to load campaign state:', error);
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (!isInitializedRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save campaign state:', error);
    }
  }, [state]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'donation') => {
    const toast: Toast = {
      id: generateId(),
      message,
      type,
      timestamp: Date.now()
    };
    dispatch({ type: 'ADD_TOAST', payload: toast });

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: toast.id });
    }, 5000);
  }, []);

  const addDonation = useCallback((amount: number, rewardTierId?: string | null) => {
    const backerName = generateBackerName();
    const donation: Donation = {
      id: generateId(),
      backerName,
      amount,
      rewardTierId: rewardTierId || null,
      timestamp: Date.now()
    };

    dispatch({ type: 'ADD_DONATION', payload: donation });

    // Show toast
    addToast(`${backerName} just backed $${amount}!`, 'donation');

    // Check for milestones
    const newTotal = state.campaign.amountRaised + amount;
    const percentages = [25, 50, 75, 100];
    for (const pct of percentages) {
      const threshold = state.campaign.fundingGoal * (pct / 100);
      if (state.campaign.amountRaised < threshold && newTotal >= threshold) {
        setTimeout(() => {
          addToast(`${pct}% funded! 🎉`, 'milestone');
        }, 1500);
        break;
      }
    }
  }, [state.campaign.amountRaised, state.campaign.fundingGoal, addToast]);

  const triggerManualDonation = useCallback((customAmount?: number) => {
    const amount = customAmount ?? generateDonationAmount(state.campaign.rewardTiers);
    const matchingTier = state.campaign.rewardTiers.find(t => t.price === amount);
    addDonation(amount, matchingTier?.id);
  }, [state.campaign.rewardTiers, addDonation]);

  const scheduleNextDonation = useCallback(() => {
    if (!state.engineConfig.isRunning) return;

    const { minInterval, maxInterval } = state.engineConfig;
    const delay = (minInterval + Math.random() * (maxInterval - minInterval)) * 1000;

    engineTimerRef.current = setTimeout(() => {
      if (state.engineConfig.isRunning) {
        triggerManualDonation();
        scheduleNextDonation();
      }
    }, delay);
  }, [state.engineConfig, triggerManualDonation]);

  const startEngine = useCallback(() => {
    dispatch({ type: 'SET_ENGINE_CONFIG', payload: { isRunning: true } });
  }, []);

  const stopEngine = useCallback(() => {
    dispatch({ type: 'SET_ENGINE_CONFIG', payload: { isRunning: false } });
    if (engineTimerRef.current) {
      clearTimeout(engineTimerRef.current);
      engineTimerRef.current = null;
    }
  }, []);

  // Effect to manage donation engine
  useEffect(() => {
    if (state.engineConfig.isRunning) {
      scheduleNextDonation();
    } else if (engineTimerRef.current) {
      clearTimeout(engineTimerRef.current);
      engineTimerRef.current = null;
    }

    return () => {
      if (engineTimerRef.current) {
        clearTimeout(engineTimerRef.current);
      }
    };
  }, [state.engineConfig.isRunning, scheduleNextDonation]);

  const updateCampaign = useCallback((data: Partial<Campaign>) => {
    dispatch({ type: 'UPDATE_CAMPAIGN', payload: data });
  }, []);

  const resetCampaign = useCallback(() => {
    dispatch({ type: 'RESET_CAMPAIGN' });
    addToast('Campaign stats have been reset', 'info');
  }, [addToast]);

  const setEngineConfig = useCallback((config: Partial<DonationEngineConfig>) => {
    // If changing velocity mode, update intervals
    if (config.velocityMode) {
      const intervals = getVelocityIntervals(config.velocityMode);
      config.minInterval = intervals.min;
      config.maxInterval = intervals.max;
    }
    dispatch({ type: 'SET_ENGINE_CONFIG', payload: config });
  }, []);

  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  }, []);

  const updateRewardTier = useCallback((tierId: string, data: Partial<RewardTier>) => {
    const updatedTiers = state.campaign.rewardTiers.map(tier =>
      tier.id === tierId ? { ...tier, ...data } : tier
    );
    dispatch({ type: 'UPDATE_CAMPAIGN', payload: { rewardTiers: updatedTiers } });
  }, [state.campaign.rewardTiers]);

  const addRewardTier = useCallback((tier: Omit<RewardTier, 'id' | 'quantityClaimed'>) => {
    const newTier: RewardTier = {
      ...tier,
      id: generateId(),
      quantityClaimed: 0
    };
    dispatch({
      type: 'UPDATE_CAMPAIGN',
      payload: { rewardTiers: [...state.campaign.rewardTiers, newTier] }
    });
  }, [state.campaign.rewardTiers]);

  const deleteRewardTier = useCallback((tierId: string) => {
    const updatedTiers = state.campaign.rewardTiers.filter(tier => tier.id !== tierId);
    dispatch({ type: 'UPDATE_CAMPAIGN', payload: { rewardTiers: updatedTiers } });
  }, [state.campaign.rewardTiers]);

  return (
    <CampaignContext.Provider
      value={{
        state,
        updateCampaign,
        addDonation,
        triggerManualDonation,
        resetCampaign,
        setEngineConfig,
        startEngine,
        stopEngine,
        addToast,
        removeToast,
        updateRewardTier,
        addRewardTier,
        deleteRewardTier
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
}
