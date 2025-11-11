export const iconMap = {
  // Player Icons
  male01: '/icons/Male01.webp',
  female: '/icons/Female.webp',
  female01: '/icons/Female01.webp',

  // Actions
  accept: '/icons/Accept.webp',
  reject: '/icons/Reject.webp',
  edit: '/icons/Edit.webp',
  info: '/icons/Info.webp',
  blocked: '/icons/Blocked.webp',
  new: '/icons/New.webp',

  // Game Elements
  ball: '/icons/Ball.webp',
  defense: '/icons/Defense.webp',
  balanced: '/icons/Balanced.webp',

  // Career & Management
  career: '/icons/Career.webp',
  contract: '/icons/Contract.webp',
  transfer: '/icons/Transfer.webp',
  retire: '/icons/Retire.webp',
  players: '/icons/Players.webp',

  // Coaches
  coach01: '/icons/Coach01.webp',
  coach02: '/icons/Coach02.webp',
  coach03: '/icons/Coach03.webp',

  // Training & Skills
  trainSkills: '/icons/Train-skills.webp',
  rest: '/icons/Rest.webp',
  teamwork: '/icons/Teamwork.webp',
  personalLife: '/icons/Personal-life.webp',

  // Currency & Rewards
  coins: '/icons/Coins.webp',
  currency01: '/icons/Currency01.webp',
  currency02: '/icons/Currency02.webp',
  currentPrize: '/icons/Current-prize.webp',

  // Fame & Fans
  fame: '/icons/Fame.webp',
  fansFame: '/icons/Fans-fame.webp',

  // Trophies
  trophy03: '/icons/Trophy03.webp',
  trophy04: '/icons/Trophy04.webp',
  trophy05: '/icons/Trophy05.webp',

  // Items
  item03: '/icons/Item03.webp',
  item04: '/icons/Item04.webp',

  // Levels/Difficulty
  low: '/icons/Low.webp',
  medium: '/icons/Medium.webp',

  // Misc
  calendar: '/icons/Calendar.webp',
  background: '/icons/background.webp',

  market: '/icons/Market.webp',
  inventory: '/icons/Inventory.webp',
  LifeStyle: '/icons/Lifestyle.webp',
  Calendar: '/icons/Calendar.webp',
  Tournament: '/icons/Tournament.webp',
  Career: '/icons/Career.webp',
} as const

export type IconKey = keyof typeof iconMap

// Helper function to get icon path safely
export const getIcon = (key: IconKey): string => {
  return iconMap[key]
}

