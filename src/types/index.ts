export interface RewardTier {
  id: string;
  title: string;
  description: string;
  price: number;
  quantityAvailable: number | null; // null = unlimited
  quantityClaimed: number;
  estimatedDelivery: string;
}

export interface Donation {
  id: string;
  backerName: string;
  amount: number;
  rewardTierId: string | null;
  timestamp: number;
}

export interface Campaign {
  id: string;
  title: string;
  tagline: string;
  description: string;
  story: string;
  faq: FAQItem[];
  updates: Update[];
  creatorName: string;
  creatorBio: string;
  creatorImage: string | null;
  projectImage: string | null;
  projectVideo: string | null;
  fundingGoal: number;
  amountRaised: number;
  backerCount: number;
  endDate: string; // ISO date string
  createdAt: string;
  rewardTiers: RewardTier[];
  donations: Donation[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
}

export type VelocityMode = 'slow' | 'medium' | 'fast' | 'viral';

export interface DonationEngineConfig {
  isRunning: boolean;
  velocityMode: VelocityMode;
  minInterval: number; // seconds
  maxInterval: number; // seconds
  targetAmount: number | null;
  targetTimeframe: number | null; // minutes
}

export interface Toast {
  id: string;
  message: string;
  type: 'donation' | 'milestone' | 'info';
  timestamp: number;
}
