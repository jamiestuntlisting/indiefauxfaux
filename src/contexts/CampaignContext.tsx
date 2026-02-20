'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { Campaign, DonationEngineConfig, Donation, Toast, RewardTier } from '@/types';
import { generateBackerName, generateDonationAmount, getVelocityIntervals } from '@/lib/nameGenerator';
import { generateId } from '@/lib/utils';
import { saveProject, StoredProject } from '@/lib/store';

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
  | { type: 'REMOVE_TOAST'; payload: string };

function campaignReducer(state: CampaignState, action: CampaignAction): CampaignState {
  switch (action.type) {
    case 'SET_CAMPAIGN':
      return { ...state, campaign: action.payload };
    case 'UPDATE_CAMPAIGN':
      return { ...state, campaign: { ...state.campaign, ...action.payload } };
    case 'ADD_DONATION': {
      const donation = action.payload;
      return {
        ...state,
        campaign: {
          ...state.campaign,
          donations: [...state.campaign.donations, donation],
          amountRaised: state.campaign.amountRaised + donation.amount,
          backerCount: state.campaign.backerCount + 1,
          rewardTiers: state.campaign.rewardTiers.map(tier =>
            tier.id === donation.rewardTierId
              ? { ...tier, quantityClaimed: tier.quantityClaimed + 1 }
              : tier
          ),
        },
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
            quantityClaimed: 0,
          })),
        },
      };
    case 'SET_ENGINE_CONFIG':
      return { ...state, engineConfig: { ...state.engineConfig, ...action.payload } };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
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

interface CampaignProviderProps {
  children: React.ReactNode;
  /** The project data to initialise from. */
  project: StoredProject;
  /** When true, persists changes back to localStorage (creator mode). */
  persist?: boolean;
  /** When true, auto-starts the donation engine on mount (public/share mode). */
  autoStart?: boolean;
}

export function CampaignProvider({ children, project, persist = false, autoStart = false }: CampaignProviderProps) {
  const [state, dispatch] = useReducer(campaignReducer, {
    campaign: project.campaign,
    engineConfig: project.engineConfig,
    toasts: [],
  });

  const engineTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasAutoStartedRef = useRef(false);

  // Persist to localStorage when in creator mode
  useEffect(() => {
    if (!persist) return;
    try {
      saveProject({ campaign: state.campaign, engineConfig: state.engineConfig });
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  }, [state.campaign, state.engineConfig, persist]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'donation') => {
    const toast: Toast = { id: generateId(), message, type, timestamp: Date.now() };
    dispatch({ type: 'ADD_TOAST', payload: toast });
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
      timestamp: Date.now(),
    };

    dispatch({ type: 'ADD_DONATION', payload: donation });
    addToast(`${backerName} just backed $${amount}!`, 'donation');
  }, [addToast]);

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

  // Auto-start on mount for public pages
  useEffect(() => {
    if (autoStart && !hasAutoStartedRef.current) {
      hasAutoStartedRef.current = true;
      startEngine();
    }
  }, [autoStart, startEngine]);

  // Manage donation engine
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
    const newTier: RewardTier = { ...tier, id: generateId(), quantityClaimed: 0 };
    dispatch({
      type: 'UPDATE_CAMPAIGN',
      payload: { rewardTiers: [...state.campaign.rewardTiers, newTier] },
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
        deleteRewardTier,
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
