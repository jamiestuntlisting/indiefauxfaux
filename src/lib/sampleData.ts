import { Campaign, DonationEngineConfig } from '@/types';
import { generateId } from './utils';

export const sampleCampaign: Campaign = {
  id: generateId(),
  title: "The Quantum Flux Capacitor: Revolutionizing Time-Adjacent Travel",
  tagline: "Finally, a flux capacitor that probably won't cause any paradoxes. Probably.",
  description: "We're building the world's first consumer-grade temporal displacement device. It's like a time machine, but legally distinct!",
  story: `## Our Vision

For years, humanity has dreamed of traveling through time. Well, not exactly *through* time — that's legally complicated. But what about traveling *adjacent* to time? That's where the Quantum Flux Capacitor comes in.

### The Technology

Our revolutionary device uses a proprietary blend of quantum entanglement, wishful thinking, and a really shiny outer casing to create what we call "temporal adjacency." Users report feeling like time has moved around them, rather than the other way around.

### Why Now?

After 47 failed prototypes (RIP Gerald the test hamster), we've finally cracked the code. Our 48th iteration has achieved a 73% success rate in our "Does it feel like time passed?" survey.

### What We Need

Your funding will go toward:
- Premium aluminum casing (gotta look good while time-adjacent traveling)
- More hamsters (for completely unrelated purposes)
- Legal fees (ongoing)
- One really nice office plant (for morale)

### The Team

We're a ragtag group of theoretical physicists, one guy who claims he's from the future (still verifying), and an accountant named Steve who keeps asking about "regulatory compliance."

Join us on this journey to make history. Or at least, make something that feels like history.`,
  faq: [
    {
      id: generateId(),
      question: "Is this legal?",
      answer: "Our lawyers have confirmed that time-adjacent travel exists in a legal gray area that technically doesn't violate any existing temporal legislation. Mostly because there isn't any. Yet."
    },
    {
      id: generateId(),
      question: "Can I go back and buy Bitcoin in 2009?",
      answer: "The Quantum Flux Capacitor operates in temporal adjacency mode, which means you'll *feel* like you could have bought Bitcoin in 2009. Results may vary. No actual financial advice given."
    },
    {
      id: generateId(),
      question: "What happened to Gerald the hamster?",
      answer: "Gerald is fine. He's just... somewhere else in the temporal spectrum right now. We're working on bringing him back. The important thing is he's alive. Probably."
    },
    {
      id: generateId(),
      question: "Is there a warranty?",
      answer: "Each Quantum Flux Capacitor comes with a 30-day money-back guarantee*\n\n*Time spent in temporal adjacency may not count toward the 30 days."
    },
    {
      id: generateId(),
      question: "Why does it need to be plugged in and also require 47 AA batteries?",
      answer: "Science. Next question."
    }
  ],
  updates: [
    {
      id: generateId(),
      title: "We Found Gerald!",
      content: "Great news, everyone! Gerald the hamster has been located. He was in the break room the whole time, behind the refrigerator. The important thing is he's safe and only slightly temporally displaced.",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      title: "Prototype #49 Update",
      content: "We've made significant progress on our latest prototype. The smoke that comes out of it is now a pleasant lavender color, which our focus groups agree is much more calming than the previous angry red.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      title: "Campaign Launch!",
      content: "We're thrilled to announce the launch of our IndieFauxFaux campaign! Thank you to everyone who believed in us, especially Steve from accounting who finally signed off on the budget.",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  creatorName: "Dr. Emmeline 'Doc' Thornberry",
  creatorBio: "Former theoretical physicist, current temporal enthusiast, and proud hamster parent. When not bending the fabric of spacetime, enjoys knitting and watching reality TV.",
  creatorImage: null,
  projectImage: null,
  projectVideo: null,
  fundingGoal: 150000,
  amountRaised: 0,
  backerCount: 0,
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  createdAt: new Date().toISOString(),
  rewardTiers: [
    {
      id: generateId(),
      title: "Time Traveler's Thanks",
      description: "A heartfelt thank-you email from the team, sent from the future* (*email may arrive at normal time)",
      price: 5,
      quantityAvailable: null,
      quantityClaimed: 0,
      estimatedDelivery: "Immediately (or in the past, depending on perspective)"
    },
    {
      id: generateId(),
      title: "Temporal Explorer Pack",
      description: "Exclusive digital wallpapers featuring the Quantum Flux Capacitor in various temporal states, plus a PDF of our research notes (heavily redacted for your safety)",
      price: 25,
      quantityAvailable: null,
      quantityClaimed: 0,
      estimatedDelivery: "March 2025"
    },
    {
      id: generateId(),
      title: "Gerald's Guardian",
      description: "Adopt Gerald the hamster (spiritually). Receive monthly updates on his temporal status, a certificate of adoption, and a small plush hamster that looks nothing like Gerald",
      price: 50,
      quantityAvailable: 500,
      quantityClaimed: 0,
      estimatedDelivery: "April 2025"
    },
    {
      id: generateId(),
      title: "Early Bird Capacitor",
      description: "Be among the first to receive the Quantum Flux Capacitor! Includes device, carrying case, 47 AA batteries, and a 'Sorry About Any Paradoxes' apology card",
      price: 299,
      quantityAvailable: 100,
      quantityClaimed: 0,
      estimatedDelivery: "Q4 2025"
    },
    {
      id: generateId(),
      title: "Deluxe Time Lord Package",
      description: "Everything in Early Bird plus: premium brushed aluminum casing, personalized temporal displacement certificate, video call with Dr. Thornberry, and first dibs on Gerald's offspring (temporal status permitting)",
      price: 599,
      quantityAvailable: 50,
      quantityClaimed: 0,
      estimatedDelivery: "Q4 2025"
    },
    {
      id: generateId(),
      title: "Founding Chrononaut",
      description: "The ultimate package! Two Quantum Flux Capacitors, your name engraved on our Wall of Temporal Pioneers, dinner with the team (you buy), and a lifetime supply of Gerald-themed merchandise",
      price: 1500,
      quantityAvailable: 10,
      quantityClaimed: 0,
      estimatedDelivery: "Q4 2025"
    }
  ],
  donations: []
};

export const defaultEngineConfig: DonationEngineConfig = {
  isRunning: false,
  velocityMode: 'medium',
  minInterval: 10,
  maxInterval: 45,
  targetAmount: null,
  targetTimeframe: null
};
