import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function safeParseJSON<T>(text: string): T | undefined {
  try {
    return JSON.parse(text)
  } catch (error) {
    return undefined
  }
}
