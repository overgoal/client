import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {iconMap} from "./iconMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatAddress = (addr: string) => {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export const calculateStamina = (stamina: number) => {
  return stamina * 100;
};

export const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || null;
};