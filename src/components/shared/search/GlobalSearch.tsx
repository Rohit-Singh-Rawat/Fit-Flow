"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/Icons/SearchIcon";
import { CircleX } from "lucide-react";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      {" "}
      <div className="background-light_dark_gradient dark:border-transparent rounded-full border-2 border-[rgb(162,212,217)] p-[3px]">
        <div className="relative flex min-h-[52px] grow items-center gap-1 rounded-full border border-transparent px-4 focus-within:border-[rgb(113,120,194)] dark:focus-within:border-[#3C3C3C]">
          {" "}
          <SearchIcon className="fill-black dark:fill-[#3C3C3C]" />
          <Input
            type="text"
            placeholder="Search globally"
            onClick={() => {}}
            className="paragraph-regular no-focus placeholder my-0 border-none bg-transparent py-0 shadow-none outline-none dark:text-light-700"
          />
          <CircleX className="size-5 stroke-black dark:stroke-[#3C3C3C]" />
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
