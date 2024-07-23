"use client";

import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { RenderIcon } from "./GlobalResults";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="small-regular dark:text-[#a2a69d]">TYPE: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`small-medium :text-light-800 flex items-center justify-center gap-1 rounded-2xl px-5 py-2 capitalize ${
              active === item.value
                ? "bg-transparent text-blue-800 border-blue-400 border dark:text-light-500 dark:border dark:border-light-500/60"
                : "border bg-blue-100 text-blue-700 border-blue-400/50 hover:text-primary-500 dark:border-[#262f28] dark:bg-[#171e19] dark:text-white dark:hover:bg-[#2c372f] dark:hover:text-light-500"
            } `}
            onClick={() => handleTypeClick(item.value)}
          >
            <RenderIcon
              type={item.value}
              className="size-4 fill-current"
            />
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
