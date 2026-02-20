import { Campaign, DonationEngineConfig } from '@/types';
import { sampleCampaign, defaultEngineConfig } from './sampleData';
import { generateId } from './utils';

export interface StoredProject {
  campaign: Campaign;
  engineConfig: DonationEngineConfig;
}

const PROJECTS_KEY = 'indiefauxfaux_projects';

export function getAllProjects(): StoredProject[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getProject(id: string): StoredProject | null {
  const projects = getAllProjects();
  return projects.find(p => p.campaign.id === id) ?? null;
}

export function saveProject(project: StoredProject): void {
  const projects = getAllProjects();
  const idx = projects.findIndex(p => p.campaign.id === project.campaign.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.push(project);
  }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function deleteProject(id: string): void {
  const projects = getAllProjects().filter(p => p.campaign.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function createNewProject(name?: string): StoredProject {
  const id = generateId();
  const campaign: Campaign = {
    ...sampleCampaign,
    id,
    title: name || 'Untitled Campaign',
    tagline: 'Your amazing project tagline goes here.',
    description: 'Describe your project...',
    story: '## Tell Your Story\n\nWhat is your project about? Why should people back it?',
    faq: [],
    updates: [],
    creatorName: 'Your Name',
    creatorBio: 'Tell backers about yourself.',
    amountRaised: 0,
    backerCount: 0,
    donations: [],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    rewardTiers: sampleCampaign.rewardTiers.map(t => ({ ...t, id: generateId(), quantityClaimed: 0 })),
  };

  return { campaign, engineConfig: { ...defaultEngineConfig } };
}

export function duplicateAsGorillaw(): StoredProject {
  const id = generateId();
  const campaign: Campaign = {
    ...sampleCampaign,
    id,
    rewardTiers: sampleCampaign.rewardTiers.map(t => ({ ...t, id: generateId(), quantityClaimed: 0 })),
    faq: sampleCampaign.faq.map(f => ({ ...f, id: generateId() })),
    updates: sampleCampaign.updates.map(u => ({ ...u, id: generateId() })),
    amountRaised: 0,
    backerCount: 0,
    donations: [],
  };

  return { campaign, engineConfig: { ...defaultEngineConfig } };
}
