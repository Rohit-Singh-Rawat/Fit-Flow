"use client";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {};
const HomeFilters = (props: Props) => {
  const active = "newest";
  return (
    <div className="mt-10 hidden w-full flex-wrap gap-3 md:flex md:justify-around">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
          className={cn(
            "body-medium rounded-lg px-6 py-3 capitalize shadow-none",
            active === item.value
              ? "border-[#d1a1fa] border bg-[#e0c2fa] text-white dark:border-[#1a4334] dark:bg-[#1621204d]"
              : "hover:bg-light600 bg-light-700/30 text-accent-blue dark:bg-dark-300 dark:text-light-900 dark:hover:bg-dark-500",
          )}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};
export default HomeFilters;
