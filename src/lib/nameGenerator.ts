const firstNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
  'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia',
  'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander', 'Abigail', 'Michael',
  'Emily', 'Daniel', 'Ella', 'Matthew', 'Elizabeth', 'Aiden', 'Camila',
  'Joseph', 'Luna', 'Samuel', 'Sofia', 'David', 'Avery', 'Jackson', 'Mila',
  'Sebastian', 'Aria', 'Carter', 'Scarlett', 'Owen', 'Penelope', 'Wyatt',
  'Riley', 'John', 'Chloe', 'Jack', 'Layla', 'Luke', 'Grace', 'Dylan',
  'Zoey', 'Grayson', 'Nora', 'Levi', 'Lily', 'Isaac', 'Hannah', 'Gabriel',
  'Sarah', 'Julian', 'Violet', 'Mateo', 'Stella', 'Anthony', 'Aurora',
  'Jaxon', 'Natalie', 'Lincoln', 'Emilia', 'Joshua', 'Hazel', 'Christopher',
  'Kennedy', 'Andrew', 'Paisley', 'Theodore', 'Eleanor', 'Caleb', 'Savannah',
  'Ryan', 'Audrey', 'Asher', 'Brooklyn', 'Nathan', 'Bella', 'Thomas', 'Claire',
  'Leo', 'Skylar', 'Isaiah', 'Lucy', 'Charles', 'Paisley', 'Josiah', 'Everly',
  'Hudson', 'Anna', 'Christian', 'Caroline', 'Hunter', 'Nova', 'Connor',
  'Genesis', 'Eli', 'Emery', 'Ezra', 'Maya', 'Aaron', 'Naomi', 'Landon',
  'Aaliyah', 'Adrian', 'Elena', 'Jonathan', 'Sadie', 'Nolan', 'Allison',
  'Jeremiah', 'Hailey', 'Easton', 'Gabriella', 'Elias', 'Alice', 'Colton',
  'Madelyn', 'Cameron', 'Iris', 'Carson', 'Ariana', 'Robert', 'Josephine'
];

const lastNameInitials = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function generateBackerName(): string {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastInitial = lastNameInitials[Math.floor(Math.random() * lastNameInitials.length)];
  return `${firstName} ${lastInitial}.`;
}

export function generateDonationAmount(rewardTiers: { price: number }[]): number {
  // 70% chance to pick a reward tier amount, 30% chance for custom amount
  if (rewardTiers.length > 0 && Math.random() < 0.7) {
    const tier = rewardTiers[Math.floor(Math.random() * rewardTiers.length)];
    // Sometimes add a small tip (0-20%)
    const tip = Math.random() < 0.3 ? Math.round(tier.price * Math.random() * 0.2) : 0;
    return tier.price + tip;
  }

  // Custom amounts with realistic distribution
  const customAmounts = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 250, 500];
  const weights = [5, 15, 10, 20, 15, 8, 7, 10, 4, 3, 1.5, 0.8, 0.5, 0.2];

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < customAmounts.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return customAmounts[i];
    }
  }

  return 25; // fallback
}

export function getVelocityIntervals(mode: 'slow' | 'medium' | 'fast' | 'viral'): { min: number; max: number } {
  switch (mode) {
    case 'slow':
      return { min: 30, max: 90 };
    case 'medium':
      return { min: 10, max: 45 };
    case 'fast':
      return { min: 3, max: 15 };
    case 'viral':
      return { min: 1, max: 5 };
    default:
      return { min: 10, max: 45 };
  }
}
