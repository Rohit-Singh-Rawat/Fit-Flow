"use client";
import MoonIcon from "@/components/Icons/MoonIcon";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themes } from "@/constants";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
type Props = {};
const Theme = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Menubar className="border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="size-10 rounded hover:bg-light-800 focus:bg-light-900 active:bg-light-850 data-[state='open']:bg-light-900 dark:hover:bg-dark-500 dark:focus:bg-dark-200 dark:data-[state='open']:bg-dark-200">
          {resolvedTheme == "light" ? (
            <Sun className="size-7" />
          ) : (
            <MoonIcon className="fill-white" />
          )}
        </MenubarTrigger>

        <MenubarContent className="absolute mt-3 min-w-[120px] rounded-md border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((the) => {
            return (
              <MenubarItem
                key={the.value}
                className="flex items-center justify-start gap-2 rounded-md hover:bg-light-800 dark:hover:bg-dark-500"
                onClick={() => {
                  setTheme(the.value);
                }}
              >
                <the.icon
                  className={`size-4 ${resolvedTheme == the.value ? "fill-light-500 stroke-light-500" : "stroke-black dark:fill-white dark:stroke-white"}`}
                />

                <p
                  className={`regular-medium ${resolvedTheme == the.value ? "text-light-500" : "text-dark100_light900"}`}
                >
                  {the.label}
                </p>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
export default Theme;
