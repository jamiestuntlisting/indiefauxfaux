import { Campaign, DonationEngineConfig } from '@/types';

interface ShareableData {
  c: Campaign;     // campaign
  e: DonationEngineConfig; // engine config
}

export function encodeShareData(campaign: Campaign, engineConfig: DonationEngineConfig): string {
  // Strip donations to keep URL shorter — shared page starts fresh
  const cleanCampaign: Campaign = {
    ...campaign,
    donations: [],
    amountRaised: 0,
    backerCount: 0,
    rewardTiers: campaign.rewardTiers.map(t => ({ ...t, quantityClaimed: 0 })),
  };

  const data: ShareableData = {
    c: cleanCampaign,
    e: { ...engineConfig, isRunning: false },
  };

  const json = JSON.stringify(data);
  // Use base64url encoding
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function decodeShareData(encoded: string): ShareableData | null {
  try {
    // Restore base64 padding
    const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(escape(atob(padded)));
    const data = JSON.parse(json) as ShareableData;
    if (data.c && data.c.id && data.c.title) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export function buildShareUrl(campaign: Campaign, engineConfig: DonationEngineConfig): string {
  const encoded = encodeShareData(campaign, engineConfig);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/p/${campaign.id}#${encoded}`;
}
