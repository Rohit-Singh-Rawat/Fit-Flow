"use client";
import SearchIcon from "@/components/Icons/SearchIcon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";

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
  return (
    <div
      className={cn(
        "background-light900_dark_gradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] dark:border-transparent border-2 border-[rgb(173,216,221)] px-4",
        otherClasses,
        iconPosition == "left" ? "flex" : "flex-row-reverse",
      )}
    >
      <SearchIcon className="fill-black dark:fill-[#3C3C3C]" />
      <div className="flex grow items-center justify-between">
        <Input
          type="text"
          placeholder={placeHolder}
          onClick={() => {}}
          className="paragraph-regular no-focus placeholder text-dark400_light900 my-0 border-none bg-transparent py-0 shadow-none outline-none"
        />
        <CircleX className="size-5 stroke-black dark:stroke-[#3C3C3C]" />
      </div>
    </div>
  );
};
export default LocalSearchBar;
