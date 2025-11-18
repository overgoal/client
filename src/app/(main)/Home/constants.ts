export const SEASON_COUNTDOWN_TARGET_DATE = "2025-12-01T23:59:59";

export const HOME_MENU_ITEMS = [
  {
    title: "Season",
    iconName: "calendar",
    href: "/seasons",
    disabled: false,
  },
  {
    title: "Market",
    iconName: "market",
    href: "/market",
    disabled: true,
  },
  {
    title: "Inventory",
    iconName: "inventory",
    href: "/Inventory",
    disabled: true,
  },
] as const;

export const socialLinks = [
  {
    title: "Twitter",
    iconName: "twitter",
    href: "https://twitter.com/overgoal",
  },
  {
    title: "Discord",
    iconName: "discord",
    href: "https://discord.gg/rn6dMNpR2e",
  },
] as const;
