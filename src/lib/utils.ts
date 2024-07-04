import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function getTime(createdAt: Date | string): string {
  if (typeof createdAt === "string") {
    createdAt = parseISO(createdAt);
  }

  const distance = formatDistanceToNowStrict(createdAt, { addSuffix: true });

  return distance;
}
export function getCompactNumber(value: number): string {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });
  return formatter.format(value);
}