import { Campaign, DonationEngineConfig } from '@/types';
import { defaultEngineConfig } from './sampleData';
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

export interface GeneratedCampaignData {
  title: string;
  tagline: string;
  description: string;
  story: string;
  faq: { question: string; answer: string }[];
  updates: { title: string; content: string; daysAgo: number }[];
  creatorName: string;
  creatorBio: string;
  fundingGoal: number;
  rewardTiers: {
    title: string;
    description: string;
    price: number;
    quantityAvailable: number | null;
    estimatedDelivery: string;
  }[];
  thumbnailDescription: string;
}

export function createProjectFromGenerated(data: GeneratedCampaignData): StoredProject {
  const id = generateId();

  const campaign: Campaign = {
    id,
    title: data.title,
    tagline: data.tagline,
    description: data.description,
    story: data.story,
    faq: data.faq.map(f => ({ ...f, id: generateId() })),
    updates: data.updates.map(u => ({
      id: generateId(),
      title: u.title,
      content: u.content,
      date: new Date(Date.now() - u.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
    })),
    creatorName: data.creatorName,
    creatorBio: data.creatorBio,
    creatorImage: null,
    projectImage: null,
    projectVideo: null,
    fundingGoal: data.fundingGoal,
    amountRaised: 0,
    backerCount: 0,
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    rewardTiers: data.rewardTiers.map(t => ({
      ...t,
      id: generateId(),
      quantityClaimed: 0,
    })),
    donations: [],
  };

  return { campaign, engineConfig: { ...defaultEngineConfig } };
}

export function createBlankProject(): StoredProject {
  const id = generateId();
  const campaign: Campaign = {
    id,
    title: 'Untitled Campaign',
    tagline: 'Your amazing project tagline goes here.',
    description: 'Describe your project...',
    story: '## Tell Your Story\n\nWhat is your project about? Why should people back it?',
    faq: [],
    updates: [],
    creatorName: 'Your Name',
    creatorBio: 'Tell backers about yourself.',
    creatorImage: null,
    projectImage: null,
    projectVideo: null,
    fundingGoal: 50000,
    amountRaised: 0,
    backerCount: 0,
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    rewardTiers: [],
    donations: [],
  };

  return { campaign, engineConfig: { ...defaultEngineConfig } };
}
