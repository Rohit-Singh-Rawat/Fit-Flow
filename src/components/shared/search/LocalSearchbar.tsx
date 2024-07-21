"use client";
import SearchIcon from "@/components/Icons/SearchIcon";
import { Input } from "@/components/ui/input";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  route: string;
  iconPosition: string;
  placeHolder: string;
  otherClasses: string;
};
const LocalSearchBar = ({
  iconPosition,
  otherClasses,
  placeHolder,
  route,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebouncefn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname == route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebouncefn);
  }, [search, route, pathname, router, searchParams, query]);
  return (
    <div
      className={cn(
        "background-light900_dark_gradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] border-2 border-[rgb(173,216,221)] px-4 dark:border-transparent",
        otherClasses,
        iconPosition == "left" ? "flex" : "flex-row-reverse",
      )}
    >
      <SearchIcon className="fill-black dark:fill-[#3C3C3C]" />
      <div className="flex grow items-center justify-between">
        <form
          className="flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            if (search) {
              const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "q",
                value: search,
              });
              router.push(newUrl, { scroll: false });
            }
          }}
        >
          <Input
            type="text"
            placeholder={placeHolder}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="paragraph-regular no-focus placeholder text-dark400_light900 my-0 border-none bg-transparent py-0 shadow-none outline-none"
          />
        </form>

        {search && (
          <CircleX
            className="size-5 cursor-pointer stroke-black dark:stroke-[#3C3C3C]"
            onClick={() => {
              setSearch("");
            }}
          />
        )}
      </div>
    </div>
  );
};
export default LocalSearchBar;
