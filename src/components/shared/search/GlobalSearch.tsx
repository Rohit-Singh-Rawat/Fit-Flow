"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/Icons/SearchIcon";
import { CircleX } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResults from "./GlobalResults";

const GlobalSearch = () => {
  const router = useRouter();
  const searchContainerRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("global");
  const [search, setSearch] = useState(query || "");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const delayDebouncefn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebouncefn);
  }, [search, pathname, router, searchParams, query]);
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        //@ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("click", handleOutsideClick);

    setIsSearchOpen(false);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);
  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      {" "}
      <div className="background-light_dark_gradient rounded-full border-2 border-[rgb(162,212,217)] p-[3px] dark:border-transparent">
        <div className="relative flex min-h-[52px] grow items-center gap-1 rounded-full border border-transparent px-4 focus-within:border-[rgb(113,120,194)] dark:focus-within:border-[#3C3C3C]">
          {" "}
          <SearchIcon className="fill-black dark:fill-[#3C3C3C]" />{" "}
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              if (search) {
                const newUrl = formUrlQuery({
                  params: searchParams.toString(),
                  key: "global",
                  value: search,
                });
                router.push(newUrl, { scroll: false });
              }
            }}
          >
            <Input
              type="text"
              placeholder="Search globally"
              onChange={(e) => {
                setSearch(e.target.value);
                if (!isSearchOpen) setIsSearchOpen(true);
                if (e.target.value === "" && isSearchOpen)
                  setIsSearchOpen(false);
              }}
              value={search}
              className="paragraph-regular no-focus placeholder my-0 border-none bg-transparent py-0 shadow-none outline-none dark:text-light-700"
            />
          </form>{" "}
          {search && (
            <CircleX
              className="size-5 stroke-black dark:stroke-[#3C3C3C]"
              onClick={() => {
                setSearch("");
                setIsSearchOpen(false);
              }}
            />
          )}
        </div>
      </div>
      {isSearchOpen && <GlobalResults />}
    </div>
  );
};

export default GlobalSearch;
