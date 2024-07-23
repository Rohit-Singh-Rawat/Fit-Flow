"use client";
import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

export function PaginationSection({
  pageNumber,
  totalPages,
}: {
  pageNumber: number;
  totalPages: number;
}) {
  const [maxPageLinks, setMaxPageLinks] = useState(5);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });
    router.push(newUrl);
  };

  const handleNavigationByNumber = (pageNumber: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });
    router.push(newUrl);
  };

  useEffect(() => {
    const updateMaxPageLinks = () => {
      setMaxPageLinks(window.innerWidth < 768 ? 3 : 5);
    };

    updateMaxPageLinks();

    window.addEventListener("resize", updateMaxPageLinks);

    return () => {
      window.removeEventListener("resize", updateMaxPageLinks);
    };
  }, []);

  const getPaginationItems = () => {
    const items = [];
    let startPage = Math.max(pageNumber - Math.floor(maxPageLinks / 2), 1);
    let endPage = Math.min(startPage + maxPageLinks - 1, totalPages);

    if (endPage - startPage < maxPageLinks - 1) {
      startPage = Math.max(endPage - maxPageLinks + 1, 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className={`md:text-md rounded-md text-xs hover:bg-slate-200/60 dark:hover:bg-gray-600/30 sm:text-sm ${pageNumber === 1 ? "border border-[#27272A]" : ""}`}
            onClick={() => {
              handleNavigationByNumber(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            className={`md:text-md rounded-md text-xs hover:bg-slate-200/60 dark:hover:bg-gray-600/30 sm:text-sm ${i === pageNumber ? "border border-[#27272A]" : ""}`}
            onClick={() => {
              handleNavigationByNumber(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className={`md:text-md rounded-md text-xs hover:bg-slate-200/60 dark:hover:bg-gray-600/30 sm:text-sm ${totalPages === pageNumber ? "border border-[#27272A]" : ""}`}
            onClick={() => {
              handleNavigationByNumber(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return totalPages > 1 ? (
    <Pagination className="flex cursor-pointer justify-center p-4">
      <PaginationContent className="flex cursor-pointer flex-wrap items-center md:space-x-2">
        {pageNumber !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              className="md:text-md rounded-md text-xs hover:bg-slate-200/60 dark:hover:bg-gray-600/30 sm:text-sm"
              aria-disabled={true}
              onClick={() => {
                handleNavigation("prev");
              }}
            />
          </PaginationItem>
        )}
        {getPaginationItems()}
        {pageNumber !== totalPages && (
          <PaginationItem>
            <PaginationNext
              className="md:text-md rounded-md text-xs hover:bg-slate-200/60 dark:hover:bg-gray-600/30 sm:text-sm"
              onClick={() => {
                handleNavigation("next");
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  ) : null;
}
