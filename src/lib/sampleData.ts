import { Campaign, DonationEngineConfig } from '@/types';
import { generateId } from './utils';

export const sampleCampaign: Campaign = {
  id: generateId(),
  title: "Gorillaw and Order",
  tagline: "In the criminal justice system, primate-based offenses are considered especially heinous.",
  description: "A gritty Law & Order parody about the NYPD's most unusual case: tracking down a gorilla responsible for a warehouse massacre. Ripped from the headlines. Of a zoo newsletter.",
  story: `## The Case That Changed Everything

*DUN DUN*

In New York City, the dedicated detectives who investigate these vicious felonies are members of an elite squad known as the Special Primates Unit. This is their story.

### The Premise

It was a night like any other at the Hoboken Industrial Warehouse District. Twelve people entered for what they thought was a routine after-hours CrossFit class. Only one survived. And he can only say two words: "Big. Monkey."

Now, Detectives Lenny Bananno and Olivia Benson-Adjacent must track down the most dangerous suspect they've ever faced: a 400-pound silverback gorilla named "Gerald."

### Why We Need Your Help

We've got the script. We've got the passion. We've got a guy who knows a guy with a gorilla suit. What we don't have is money.

Your funding will go toward:
- Professional gorilla suit (the current one smells like a different crime)
- Warehouse rental (preferably one without an existing gorilla problem)
- Fake blood (gallons of it)
- That "DUN DUN" sound effect license (surprisingly expensive)
- Craft services (bananas, obviously)

### The Team

**Director:** Marcus "The Visionary" Thompson - Has seen every Law & Order episode. Twice. Including the spin-offs nobody asked for.

**Lead Detective:** Sarah Chen - Trained at Juilliard. This is somehow her first role.

**The Gorilla:** Method actor Kevin Reynolds - Has been "in character" for 3 weeks. His family is concerned.

**Executive Producer:** A guy named Dave who has a really nice camera.

### Our Vision

"Gorillaw and Order" isn't just a parody. It's a meditation on justice, humanity, and what happens when you really, really cheap out on warehouse security.

We're aiming for that perfect blend of dramatic tension and absurdist comedy. Think "True Detective" meets "Planet of the Apes" meets "your uncle's home movies from that one vacation."

*DUN DUN*`,
  faq: [
    {
      id: generateId(),
      question: "Is this an actual Law & Order spin-off?",
      answer: "Absolutely not. Dick Wolf's lawyers have already sent us three cease-and-desist letters, which we're using as props in the film. We consider this method filmmaking."
    },
    {
      id: generateId(),
      question: "Will there be a real gorilla?",
      answer: "No. Kevin (our gorilla actor) is a trained professional who has spent 6 months studying gorilla movement at the Bronx Zoo. He was eventually asked to leave but learned a lot before security got involved."
    },
    {
      id: generateId(),
      question: "How graphic will the warehouse scene be?",
      answer: "We're going for a 'tastefully implied massacre' vibe. Think lots of reaction shots, dramatic music, and one really committed guy in a gorilla suit breathing heavily. PG-13 violence, R-rated gorilla intensity."
    },
    {
      id: generateId(),
      question: "Why a gorilla?",
      answer: "The original script called for a bear, but our lead investor (Dave) is afraid of bears. He's fine with gorillas. We don't ask questions anymore."
    },
    {
      id: generateId(),
      question: "Will there be the 'DUN DUN' sound?",
      answer: "Every 45 seconds, minimum. We're also working on a gorilla-specific version: 'OOH OOH.' Focus groups were divided."
    },
    {
      id: generateId(),
      question: "Is this based on a true story?",
      answer: "All characters and events in this film are fictional. Any resemblance to actual gorillas, living or escaped, is purely coincidental. The Hoboken Police Department has no comment."
    }
  ],
  updates: [
    {
      id: generateId(),
      title: "Kevin Has Emerged From Method Acting",
      content: "Great news! After 3 weeks of living exclusively on a diet of bananas and sleeping in a tire swing, our gorilla actor Kevin has briefly returned to human society. He attended a production meeting yesterday and only beat his chest twice. We consider this progress. He says he's 'found the gorilla within' and frankly, we're a little scared.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      title: "Warehouse Location Secured!",
      content: "We've locked down an actual abandoned warehouse in Hoboken! The owner said we can use it for free as long as we 'get rid of whatever's making that noise in the back.' We assured him it's probably just rats. We have not investigated. This is fine.",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      title: "Script Update: Now With 40% More DUN DUNs",
      content: "Based on focus group feedback, we've added 47 additional 'DUN DUN' moments throughout the script. Our sound designer quit, but we found a guy on Fiverr who does 'legally distinct dramatic stings' for $5 each. The dream is alive.",
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      title: "Campaign Launch: Justice Has No Species",
      content: "We're live! After months of planning, several threatening letters from NBC's legal team, and one unfortunate incident at the zoo, 'Gorillaw and Order' is officially seeking funding. Help us bring this important story to screens everywhere. The gorilla demands justice. Or bananas. We're still working on the ending.",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  creatorName: "Marcus 'The Visionary' Thompson",
  creatorBio: "Indie filmmaker, Law & Order superfan, and amateur primatologist. Has been practicing the 'DUN DUN' sound with his mouth for 15 years. Once shook Ice-T's hand at a gas station. Ready to bring justice to the primate community.",
  creatorImage: null,
  projectImage: null,
  projectVideo: null,
  fundingGoal: 75000,
  amountRaised: 0,
  backerCount: 0,
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
  rewardTiers: [
    {
      id: generateId(),
      title: "The Witness",
      description: "A heartfelt thank-you email and your name in the 'Special Thanks' credits. You saw something. You're saying something.",
      price: 10,
      quantityAvailable: null,
      quantityClaimed: 0,
      estimatedDelivery: "Upon film release"
    },
    {
      id: generateId(),
      title: "The Informant",
      description: "Digital download of the film, behind-the-scenes photos, and exclusive access to our 'Gorilla Diaries' - Kevin's method acting journal (surprisingly philosophical)",
      price: 25,
      quantityAvailable: null,
      quantityClaimed: 0,
      estimatedDelivery: "March 2025"
    },
    {
      id: generateId(),
      title: "Junior Detective",
      description: "Everything above PLUS: Official 'Gorillaw and Order' t-shirt featuring our tagline, a prop crime scene photo signed by the cast, and a digital 'DUN DUN' soundboard app",
      price: 50,
      quantityAvailable: 500,
      quantityClaimed: 0,
      estimatedDelivery: "April 2025"
    },
    {
      id: generateId(),
      title: "Special Primates Unit",
      description: "All previous rewards PLUS: Your name as a 'Consulting Detective' in the credits, a replica NYPD badge (clearly marked as fake, we learned our lesson), and a Zoom call with the cast where Kevin may or may not be in character",
      price: 150,
      quantityAvailable: 100,
      quantityClaimed: 0,
      estimatedDelivery: "May 2025"
    },
    {
      id: generateId(),
      title: "The Prosecutor",
      description: "Everything above PLUS: A walk-on role as a warehouse victim (no lines, just screaming), your own director's chair on set, and the gorilla suit after we're done with it (dry cleaning not included)",
      price: 500,
      quantityAvailable: 20,
      quantityClaimed: 0,
      estimatedDelivery: "Upon filming"
    },
    {
      id: generateId(),
      title: "Executive Producer",
      description: "THE FULL PACKAGE: Executive Producer credit, set visit with catered lunch (bananas available), private screening for you and 10 friends, original prop from the film, AND you get to yell 'DUN DUN' live during the premiere",
      price: 2500,
      quantityAvailable: 5,
      quantityClaimed: 0,
      estimatedDelivery: "Film premiere"
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
