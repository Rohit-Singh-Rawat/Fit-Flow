"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themes } from "@/constants";
import { Mode, useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
type Props = {};
const Theme = (props: Props) => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="size-10 rounded hover:bg-slate-100/50 focus:bg-light-900 active:bg-slate-100/50 data-[state='open']:bg-light-900 dark:hover:bg-slate-900/50 dark:focus:bg-dark-200 dark:data-[state='open']:bg-dark-200">
          {mode == "light" ? (
            <Image
              src={"/assets/icons/sun.svg"}
              alt="light mode"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src={"/assets/icons/moon.svg"}
              alt="light mode"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>

        <MenubarContent className="absolute mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((theme) => {
            return (
              <MenubarItem
                className="flex items-center justify-start gap-2"
                onClick={() => {
                  setMode(theme.value);
                  if (theme.value !== Mode.System) {
                    localStorage.setItem("theme", theme.value);
                  } else {
                    localStorage.removeItem("theme");
                  }
                }}
              >
                <Image
                  src={theme.icon}
                  alt={theme.value}
                  height={20}
                  width={20}
                  className={`${mode == theme.value && "active-theme"}`}
                />
                <p
                  className={`body-semibold text-light-500 ${mode == theme.value ? "text-primary-500" : "text-dark100_light900"}`}
                >
                  {theme.label}
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
