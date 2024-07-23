// components/shared/Loading.js
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="max-w-[730px]">
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center justify-start gap-1">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-7 w-28" />
          </div>
          <div className="flex gap-6">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </div>
        </div>
        <Skeleton className="mt-3.5 h-8 w-full" />
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-7 w-24" />
      </div>
      <Skeleton className="h-48 w-full" />
      <div className="mt-3.5 flex flex-wrap gap-2">
        {Array(4)
          .fill(null)
          .map((item) => (
            <Skeleton key={item} className="h-7 w-24" />
          ))}
      </div>
      <div className="mt-5">
        {Array(3)
          .fill(null)
          .map((item) => (
            <Skeleton key={item} className="mb-5 h-56 w-full" />
          ))}
      </div>
    </div>
  );
};

export default Loading;
