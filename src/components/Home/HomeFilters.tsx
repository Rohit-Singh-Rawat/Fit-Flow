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
              ? "bg-primary-100 text-primary-500"
              : "hover:bg-light600 bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-900 dark:hover:bg-dark-500",
          )}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};
export default HomeFilters;
