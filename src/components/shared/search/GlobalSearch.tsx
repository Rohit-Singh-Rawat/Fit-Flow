"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/Icons/SearchIcon";
import { CircleX } from "lucide-react";

const GlobalSearch = () => {
  
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      {" "}
      <div className="background-light800_darkgradient rounded-full p-1   ">
        <div className="relative flex min-h-[56px] grow items-center gap-1 rounded-full border border-transparent px-4 focus-within:border-[#3C3C3C]">
          {" "}
          <SearchIcon className="fill-[#3C3C3C]" />
          <Input
            type="text"
            placeholder="Search globally"
            onClick={() => {}}
            className="paragraph-regular no-focus py-0 my-0  placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
          />
          <CircleX className="size-5 stroke-[#3C3C3C]" />
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
