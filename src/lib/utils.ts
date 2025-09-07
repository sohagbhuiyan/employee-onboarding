import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn() merges Tailwind classes conditionally and prevents conflicts.
 *
 * Example:
 *   cn("px-2 py-1", isActive && "bg-blue-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
