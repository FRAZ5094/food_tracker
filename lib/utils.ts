import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function macrosToCalories(macros: {
  protein: number;
  carbs: number;
  fat: number;
}) {
  const { protein, carbs, fat } = macros;

  return Number((protein * 4 + carbs * 4 + fat * 9).toFixed(0));
}
