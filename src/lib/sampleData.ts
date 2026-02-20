import { DonationEngineConfig } from '@/types';

export const defaultEngineConfig: DonationEngineConfig = {
  isRunning: false,
  velocityMode: 'medium',
  minInterval: 10,
  maxInterval: 45,
  targetAmount: null,
  targetTimeframe: null,
};
