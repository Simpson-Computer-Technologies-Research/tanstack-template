/**
 * cn function.
 *
 * This function is used to merge the classes.
 *
 * Since this is a util function, it'd be good to put it under a separate file (ex: lib/utils/cn.ts).
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
