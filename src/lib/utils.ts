import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";
import qs from "query-string";

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

export function getJoinedDate(joinedAt: Date | string): string {
  if (typeof joinedAt === "string") {
    joinedAt = parseISO(joinedAt);
  }

  const formattedDate = format(joinedAt, "MMM dd, yyyy");

  return formattedDate;
}
interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    } ,
    { skipNull: true },
  );
};interface RemoveKeysFromQueryParams {
  params: string;
  keysToRemove:string[]
}
export const removeKeysFromQuery = ({ params,  keysToRemove}: RemoveKeysFromQueryParams) => {
  const currentUrl = qs.parse(params);
 keysToRemove.forEach((key)=>{
  delete currentUrl[key];
  
 })
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};
