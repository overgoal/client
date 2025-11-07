export const iconMap = {
  // Player Icons
  male01: '/icons/Male01.png',
  female: '/icons/Female.png',
  female01: '/icons/Female01.png',

  // Actions
  accept: '/icons/Accept.png',
  reject: '/icons/Reject.png',
  edit: '/icons/Edit.png',
  info: '/icons/Info.png',
  blocked: '/icons/Blocked.png',
  new: '/icons/New.png',

  // Game Elements
  ball: '/icons/Ball.png',
  defense: '/icons/Defense.png',
  balanced: '/icons/Balanced.png',

  // Career & Management
  career: '/icons/Career.png',
  contract: '/icons/Contract.png',
  transfer: '/icons/Transfer.png',
  retire: '/icons/Retire.png',
  players: '/icons/Players.png',

  // Coaches
  coach01: '/icons/Coach01.png',
  coach02: '/icons/Coach02.png',
  coach03: '/icons/Coach03.png',

  // Training & Skills
  trainSkills: '/icons/Train-skills.png',
  rest: '/icons/Rest.png',
  teamwork: '/icons/Teamwork.png',
  personalLife: '/icons/Personal-life.png',

  // Currency & Rewards
  coins: '/icons/Coins.png',
  currency01: '/icons/Currency01.png',
  currency02: '/icons/Currency02.png',
  currentPrize: '/icons/Current-prize.png',

  // Fame & Fans
  fame: '/icons/Fame.png',
  fansFame: '/icons/Fans-fame.png',

  // Trophies
  trophy03: '/icons/Trophy03.png',
  trophy04: '/icons/Trophy04.png',
  trophy05: '/icons/Trophy05.png',

  // Items
  item03: '/icons/Item03.png',
  item04: '/icons/Item04.png',

  // Levels/Difficulty
  low: '/icons/Low.png',
  medium: '/icons/Medium.png',

  // Misc
  calendar: '/icons/Calendar.png',
  background: '/icons/background.webp',

  market: '/icons/Market.png',
  inventory: '/icons/Inventory.png',
  LifeStyle: '/icons/Lifestyle.png',
  Calendar: '/icons/Calendar.png',
  Tournament: '/icons/Tournament.png',
  Career: '/icons/Career.png',
} as const

export type IconKey = keyof typeof iconMap

// Helper function to get icon path safely
export const getIcon = (key: IconKey): string => {
  return iconMap[key]
}

