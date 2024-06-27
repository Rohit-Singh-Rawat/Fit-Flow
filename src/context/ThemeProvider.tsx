"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Props = { children: React.ReactNode };
enum Mode {
  "Light" = "light",
  "Dark" = "dark",
}
type ThemeProviderType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};
const ThemeContext = createContext<ThemeProviderType | undefined>(undefined);

const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<Mode>(Mode.Light);

  const handleThemeChange = () => {
    if (mode === "dark") {
      setMode(Mode.Light);
    } else {
      setMode(Mode.Dark);
    }
  };
  useEffect(() => {
    handleThemeChange();
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
}
