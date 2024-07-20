"use client";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {};
const HomeFilters = (props: Props) => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(searchParams.get("filter") || "");
  const router = useRouter();
  const handelTypeClick = (item: string) => {
    if (active == item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="mt-10 hidden w-full flex-wrap gap-3 md:flex md:justify-around">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {
            handelTypeClick(item.value);
          }}
          className={cn(
            "body-medium rounded-lg px-6 py-3 capitalize shadow-none",
            active === item.value
              ? "border border-[#d1a1fa] bg-[#e0c2fa] text-white dark:border-[#1a4334] dark:bg-[#1621204d]"
              : "hover:bg-light600 bg-light-700/30 border border-transparent text-accent-blue dark:bg-dark-300 dark:text-light-900 dark:hover:bg-dark-500",
          )}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};
export default HomeFilters;
