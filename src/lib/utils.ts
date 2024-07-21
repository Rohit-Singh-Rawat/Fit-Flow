import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

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
    },
    { skipNull: true },
  );
};
interface RemoveKeysFromQueryParams {
  params: string;
  keysToRemove: string[];
}
export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveKeysFromQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  const { criteria } = params;
  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });
  return badgeCounts;
};
