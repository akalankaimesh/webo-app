"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_THEME,
  getNextTheme,
  getThemeLabel,
  isThemeName,
  type ThemeName,
  THEME_STORAGE_KEY,
} from "./theme-registry";

function getInitialTheme(): ThemeName {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored && isThemeName(stored)) {
    return stored;
  }

  return DEFAULT_THEME;
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const nextTheme = useMemo(() => getNextTheme(theme), [theme]);

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(nextTheme),
    nextTheme,
    nextThemeLabel: getThemeLabel(nextTheme),
    currentThemeLabel: getThemeLabel(theme),
  };
}
