"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Props = { children: React.ReactNode };
export enum Mode {
  "Light" = "light",
  "Dark" = "dark",
  "System" = "system",
}
type ThemeProviderType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};
const ThemeContext = createContext<ThemeProviderType | undefined>(undefined);

const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<Mode>(localStorage.theme ?? Mode.Light);

  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode(Mode.Dark);
       
      document.documentElement.classList.add("dark");
    } else {
      setMode(Mode.Light);
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    handleThemeChange();
    console.log('object')
  }, [mode]);
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context == undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
